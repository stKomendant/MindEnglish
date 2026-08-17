// import { useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Lock, ArrowLeft } from "lucide-react";
// import PasswordStrengthMeter from "../Password-strength-meter/PasswordStrengthMeter";
// import useAuthStore from "../../../store/authStore";

// export const ResetPasswordPage = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const { resetPassword, isLoading, error } = useAuthStore();
  
//   const { token } = useParams();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }
//     if (!token) return;

//     try {
//       await resetPassword(token, password);
//       setIsSubmitted(true);
//       setTimeout(() => navigate("/auth/login"), 2000);
//     } catch {
//       console.log("Failed to reset password");
//     }
//   };

//   return (
//     <div className="w-[430px] rounded-2xl border border-white/10 bg-[#1d1033]/80 backdrop-blur-2xl shadow-2xl p-8">
//       <Link
//         to="/auth/login"
//         className="inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 pb-3"
//       >
//         <ArrowLeft className="size-4" />
//         Back to Login
//       </Link>

//       <h1 className="text-center text-3xl font-bold bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
//         Reset Password
//       </h1>

//       {!isSubmitted ? (
//         <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
//           <div className="flex items-center gap-3 h-12 rounded-lg border border-purple-700/40 bg-[#251540] px-4">
//             <Lock className="size-5 text-violet-400 shrink-0" />
//             <input
//               type="password"
//               placeholder="New Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
//             />
//           </div>

//           <div className="flex items-center gap-3 h-12 rounded-lg border border-purple-700/40 bg-[#251540] px-4">
//             <Lock className="size-5 text-violet-400 shrink-0" />
//             <input
//               type="password"
//               placeholder="Confirm New Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <PasswordStrengthMeter password={password} />

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="mt-1 h-12 rounded-lg bg-linear-to-r from-[#7a2cff] to-[#bf33ff] text-lg font-semibold text-white transition hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             {isLoading ? "Resetting..." : "Reset Password"}
//           </button>
//         </form>
//       ) : (
//         <div className="mt-8 flex flex-col gap-4 text-center">
//           <p className="text-gray-400">
//             Your password has been reset successfully. Redirecting to
//             login...
//           </p>
//           <Link
//             to="/auth/login"
//             className="text-violet-400 hover:text-violet-300"
//           >
//             Go to Login
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResetPasswordPage;