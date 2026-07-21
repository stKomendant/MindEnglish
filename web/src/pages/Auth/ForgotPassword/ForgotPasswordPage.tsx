import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import useAuthStore from "../../../store/authStore";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
const {isLoading, forgotPassword  } = useAuthStore();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="w-[430px] rounded-2xl border border-white/10 bg-[#1d1033]/80 backdrop-blur-2xl shadow-2xl p-8">
      <h1 className="text-center text-3xl font-bold bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
        Forgot Password
      </h1>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <p className="text-center text-sm text-gray-400">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          <div className="flex items-center gap-3 h-12 rounded-lg border border-purple-700/40 bg-[#251540] px-4">
            <Mail className="size-5 text-violet-400 shrink-0" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-1 h-12 rounded-lg bg-linear-to-r from-[#7a2cff] to-[#bf33ff] text-lg font-semibold text-white transition hover:opacity-90 active:scale-[0.98]"
          >
            Send Reset Link
          </button>
        </form>
      ) : (
        <div className="mt-8 flex flex-col gap-4 text-center">
          <p className="text-gray-400">
            If an account exists for{" "}
            <span className="text-violet-400">{email}</span>, you will receive a
            password reset link shortly.
          </p>
        </div>
      )}
{isLoading && (
        <div className="mt-4 text-center">
          <p className="text-gray-400">Sending reset link...</p>
        </div>
      )}
      <div className="mt-6 text-center">
        <Link
          to="/auth/login"
          className="inline-flex items-center gap-1 text-sm font-semibold text-violet-400 hover:text-violet-300"
        >
          <ArrowLeft className="size-4" />
          Back to Login
        </Link>
      </div>
    </div>
  );
};
