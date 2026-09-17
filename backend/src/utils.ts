// Small helpers for auth: password hashing (PBKDF2) and a minimal signed token.
// Not a full JWT library -- kept dependency-free so the Worker stays lightweight.
// Swap in a proper JWT lib (e.g. @tsndr/cloudflare-worker-jwt) before real production use.

function bufToHex(buf: ArrayBuffer) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function hashPassword(password: string, salt?: string): Promise<string> {
  const s = salt ?? bufToHex(crypto.getRandomValues(new Uint8Array(16)).buffer);
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: enc.encode(s), iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return `${s}:${bufToHex(bits)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt] = stored.split(":");
  const recomputed = await hashPassword(password, salt);
  return recomputed === stored;
}

async function hmac(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return bufToHex(sig);
}

export async function signToken(payload: Record<string, unknown>, secret: string): Promise<string> {
  const body = btoa(JSON.stringify({ ...payload, iat: Date.now() }));
  const sig = await hmac(secret, body);
  return `${body}.${sig}`;
}

export async function verifyToken(token: string, secret: string): Promise<Record<string, any> | null> {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = await hmac(secret, body);
  if (expected !== sig) return null;
  try {
    return JSON.parse(atob(body));
  } catch {
    return null;
  }
}
