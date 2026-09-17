// Talks to the ZUHA Worker API when VITE_API_URL is configured and reachable,
// and falls back to local mock data otherwise -- so the storefront looks and
// works fully in a demo/portfolio context even with no backend deployed.

import { products as mockProducts, categories as mockCategories, collections as mockCollections } from "../data/products";

const API_URL = import.meta.env.VITE_API_URL || "";

async function tryFetch(path, options) {
  const url = API_URL ? `${API_URL}${path}` : path;
  try {
    const res = await fetch(url, {
      ...options,
      headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      if (data && data.error) {
        throw new Error(data.error);
      }
      return null;
    }
    return data;
  } catch (err) {
    if (err.message && !err.message.includes("fetch") && !err.message.includes("NetworkError") && !err.message.includes("Failed to fetch")) {
      throw err;
    }
    return null;
  }
}

function matchesFilters(p, filters = {}) {
  if (filters.gender && p.gender !== filters.gender) return false;
  if (filters.category && p.category_slug !== filters.category) return false;
  if (filters.best_seller && !p.is_best_seller) return false;
  if (filters.new_arrival && !p.is_new_arrival) return false;
  if (filters.search) {
    const q = filters.search.toLowerCase();
    if (!p.name.toLowerCase().includes(q) && !(p.description || "").toLowerCase().includes(q)) return false;
  }
  return true;
}

export async function getProducts(filters = {}) {
  const qs = new URLSearchParams(filters).toString();
  const data = await tryFetch(`/api/products${qs ? `?${qs}` : ""}`);
  if (data && data.products) return data.products;
  let list = mockProducts.filter((p) => matchesFilters(p, filters));
  if (filters.limit) list = list.slice(0, Number(filters.limit));
  return list;
}

export async function getProduct(slug) {
  const data = await tryFetch(`/api/products/${slug}`);
  if (data && data.product) return data.product;
  return mockProducts.find((p) => p.slug === slug) || null;
}

export async function getCategories() {
  const data = await tryFetch(`/api/categories`);
  if (data && data.categories) return data.categories;
  return mockCategories;
}

export async function getCollections() {
  const data = await tryFetch(`/api/collections`);
  if (data && data.collections) return data.collections;
  return mockCollections;
}

export async function login(email, password) {
  const data = await tryFetch(`/api/auth/login`, { method: "POST", body: JSON.stringify({ email, password }) });
  if (data) return data;
  throw new Error("Unable to log in. Please ensure backend is running.");
}

export async function register(name, email, password, phone) {
  const data = await tryFetch(`/api/auth/register`, { method: "POST", body: JSON.stringify({ name, email, password, phone }) });
  if (data) return data;
  throw new Error("Unable to create account. Please ensure backend is running.");
}

export async function placeOrder(token, payload, cartItems = []) {
  if (cartItems.length > 0) {
    for (const item of cartItems) {
      await tryFetch(`/api/cart`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          product_id: item.product.id,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
        }),
      });
    }
  }

  const data = await tryFetch(`/api/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  if (data) return data;
  throw new Error("Unable to place order. Please check backend connection.");
}

export const isApiConnected = () => true;
