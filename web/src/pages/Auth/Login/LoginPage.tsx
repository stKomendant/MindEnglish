import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import useAuthStore from "../../../store/authStore";

export const LoginPage = () => {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
const {login, error} = useAuthStore();

const handleLogin = async(e: React.FormEvent) => {
  e.preventDefault();
  await login(email, password);
}

  return (
    <div className="w-[430px] rounded-2xl border border-white/10 bg-[#1d1033]/80 backdrop-blur-2xl shadow-2xl p-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 pb-3"
      >
        <ArrowLeft className="size-4" />
        Back to Home
      </Link>

      <h1 className="text-center text-3xl font-bold bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
        Welcome Back
      </h1>

      <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-4">
        <div className="flex items-center gap-3 h-12 rounded-lg border border-purple-700/40 bg-[#251540] px-4">
          <Mail className="size-5 text-violet-400 shrink-0" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEamil(e.target.value)}
            className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-3 h-12 rounded-lg border border-purple-700/40 bg-[#251540] px-4">
          <Lock className="size-5 text-violet-400 shrink-0" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
          />
        </div>

{error && <p className="text-red-500 text-sm">{error}</p>}

        <Link
          to="/auth/forgot-password"
          className="text-sm text-violet-400 hover:text-violet-300"
        >
          Forgot password?
        </Link>

        <button type="submit" className="mt-1 h-12 rounded-lg bg-linear-to-r from-[#7a2cff] to-[#bf33ff] text-lg font-semibold text-white transition hover:opacity-90 active:scale-[0.98]">
          Login
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?
        <Link
          to="/auth/signup"
          className="font-semibold pl-1 text-violet-400 hover:text-violet-300"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};
