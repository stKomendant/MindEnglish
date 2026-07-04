import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const VerifyEmailPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const isComplete = code.every((d) => d !== "");

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key >= "0" && e.key <= "9") {
      e.preventDefault();
      const newCode = [...code];
      newCode[index] = e.key;
      setCode(newCode);
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      } else {
        inputRefs.current[index]?.blur();
      }
    } else if (e.key === "Backspace") {
      e.preventDefault();
      if (code[index]) {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;

    const newCode = [...code];
    for (let i = 0; i < pasted.length; i++) {
      newCode[i] = pasted[i];
    }
    setCode(newCode);
    if (pasted.length === 6) {
      inputRefs.current[5]?.blur();
    } else {
      inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    navigate("/");
  };

  return (
    <div
      className="w-[430px] rounded-2xl border border-white/10
     bg-[#1d1033]/80 backdrop-blur-2xl shadow-2xl p-8"
    >
      <h1
        className="text-center text-3xl font-bold bg-linear-to-r
       from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
      >
        Verify Your Email
      </h1>

      <p className="mt-4 text-center text-sm text-gray-400">
        Enter the 6-digit code sent to your email address.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
        <div className="flex justify-between gap-2" onPaste={handlePaste}>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              readOnly
              value={digit}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="size-14 cursor-default caret-transparent rounded-lg border
               border-purple-700/40 bg-[#251540] text-center text-2xl font-bold
                text-white outline-none transition-colors duration-200 select-none
                 focus:border-violet-400 focus:ring-1 focus:ring-violet-400"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={!isComplete}
          className="h-12 rounded-lg bg-linear-to-r from-[#7a2cff]
           to-[#bf33ff] text-lg font-semibold text-white transition hover:opacity-90 
           active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed
            disabled:active:scale-100"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
};
