import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Account() {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="container-x py-16 md:py-24 max-w-lg mx-auto">
      <h1 className="section-heading mb-1">My Account</h1>
      <p className="text-ink/50 text-sm mb-8">Welcome back, {user.name}.</p>

      <div className="border border-line p-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-ink/50">Name</span>
          <span>{user.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink/50">Email</span>
          <span>{user.email}</span>
        </div>
      </div>

      <p className="text-xs text-ink/50 mt-6">
        Order history appears here once the API is connected -- your most
        recent order was placed successfully if you just checked out.
      </p>

      <button onClick={logout} className="btn-light mt-8">Log Out</button>
    </div>
  );
}
