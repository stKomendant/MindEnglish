import { Check, X } from "lucide-react";

const criteria = [
  { label: "At least 6 characters", test: (p: string) => p.length >= 6 },
  { label: "Contains uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Contains lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "Contains a number", test: (p: string) => /\d/.test(p) },
  {
    label: "Contains special character",
    test: (p: string) => /[^A-Za-z0-9]/.test(p),
  },
];

function getStrength(password: string) {
  const passed = criteria.filter((c) => c.test(password)).length;
  if (passed === 0)
    return { label: "Very Weak", percent: 0, color: "bg-red-500" };
  if (passed <= 2) return { label: "Weak", percent: 25, color: "bg-red-500" };
  if (passed <= 3)
    return { label: "Fair", percent: 50, color: "bg-yellow-500" };
  if (passed <= 4)
    return { label: "Good", percent: 75, color: "bg-violet-400" };
  return { label: "Strong", percent: 100, color: "bg-violet-500" };
}

const PasswordStrengthMeter = ({ password }: { password: string }) => {
  const strength = getStrength(password);


  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400">Password strength</span>
        <span className="text-gray-400">
          {password ? strength.label : "Very Weak"}
        </span>
      </div>
      <div className="h-1 w-full rounded-full bg-[#251540]">
        <div
          className={`h-1 rounded-full ${password ? strength.color : ""} transition-all duration-300`}
          style={{ width: `${password ? strength.percent : 0}%` }}
        />
      </div>

      <div className="space-y-1.5 mt-2">
        {criteria.map((criterion) => {
          const met = criterion.test(password);
          return (
            <div
              key={criterion.label}
              className="flex items-center gap-2 text-xs"
            >
              {met ? (
                <Check className="size-3.5 text-violet-400" />
              ) : (
                <X className="size-3.5 text-gray-500" />
              )}
              <span className={met ? "text-violet-400" : "text-gray-500"}>
                {criterion.label}''
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
