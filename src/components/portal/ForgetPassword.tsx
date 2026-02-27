import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import PasswordModal from "../Modals/PasswordModal";

type Step = 1 | 2 | 3;

export default function ForgetPassword() {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState<string>("");
  const [codes, setCodes] = useState<string[]>(["", "", "", "", "", ""]);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const [hireModalOpen, setHireModalOpen] = useState<boolean>(false);

  const [timer, setTimer] = useState<number>(0);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const openModal = () => setHireModalOpen(true);
  const closeModal = () => setHireModalOpen(false);

  // countdown for resend button
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const sendForgotPassword = async () => {
    setLoading(true);
    // setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to resend");
      alert("Verification code resent. Check your email.");
      setTimer(60);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const strength = useMemo<number>(() => {
    let score = 0;
    if (password.length >= 1) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const strengthLabel = useMemo<string>(() => {
    switch (strength) {
      case 0:
      case 1:
        return "Very Weak";
      case 2:
        return "Weak";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      case 5:
        return "Very Strong";
      default:
        return "";
    }
  }, [strength]);

  // password criteria
  const criteria = [
    { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
    { label: "An uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
    { label: "A number", test: (pw: string) => /[0-9]/.test(pw) },
    {
      label: "A special character",
      test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
    },
  ];
  const meetsAll = criteria.every((c) => c.test(password));

  const togglePasswordVisibility = () => setShowPassword((v) => !v);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((v) => !v);

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid email");
      alert("Verification code sent. Please check your email.");
      setStep(2);
      setTimer(60);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      alert(msg);
      // setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // handle individual input change
  const handleCodeInput = (index: number, value: string) => {
    if (!/^[0-9]$/.test(value)) return;
    setCodes((codes) => {
      const nc = [...codes];
      nc[index] = value;
      return nc;
    });
    // move next
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // handle key down for backspace
  const handleCodeKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key !== "Backspace") return;
    e.preventDefault();
    setCodes((prev) => {
      const nc = [...prev];
      if (nc[index]) {
        // clear current
        nc[index] = "";
      } else if (index > 0) {
        // clear previous and move focus
        nc[index - 1] = "";
        inputRefs.current[index - 1]?.focus();
      }
      return nc;
    });
  };

  const handleCodeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const code = codes.join("");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/auth/verify-reset-code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("Code verified.");
      setStep(3);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!meetsAll) {
      alert(
        `Password must: ${criteria
          .filter((c) => !c.test(password))
          .map((c) => c.label)
          .join(", ")}`
      );
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    setLoading(true);
    // setError(null);
    try {
      const code = codes.join("");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            code,
            newPassword: password,
            confirmPassword,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Reset failed");
      openModal();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      alert(msg);
      // setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const stepImages: Record<Step, string> = {
    1: "/images/forgetpassword.png",
    2: "/images/newpassword.png",
    3: "/images/newpassword.png",
  };

  return (
    <div className="max-w-[110rem] m-auto flex md:flex-row flex-col justify-between gap-4 px-12 py-12 pb-[25rem]">
      <PasswordModal openState={hireModalOpen} closeModal={closeModal} />

      <div className="md:w-1/2 w-full flex justify-center">
        <div className="max-w-md w-full flex flex-col gap-2">
          <Link href="/" className="w-fit">
            <Image
              src="/images/digireps-logo-new.png"
              alt="Digi Reps"
              width={250}
              height={40}
            />
          </Link>
          <h4 className="text-[#0B409C] font-semibold text-[32px] mt-6">
            Candidates Portal
          </h4>
          <p className="!text-[#1E1E1E]">
            Forget Password? You can reset your Password from here...
          </p>

          {/* Step indicator */}
          <p className="!text-[#10316B] !text-xl mt-4 !font-medium">
            Forget Password
          </p>

          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-4 mt-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[#00000073] font-medium">
                  Email address*
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#FEB402] hover:bg-[#e29f01] text-white font-bold text-[18px] p-4 rounded-full cursor-pointer"
              >
                Send Code
              </button>
            </form>
          )}

          {step === 2 && (
            <form
              onSubmit={handleCodeSubmit}
              className="space-y-2 flex flex-col gap-0 mt-8"
            >
              <label className="text-[#00000073] font-medium">Enter Code</label>
              <div className="flex items-center gap-2 justify-between w-full">
                {codes.map((c, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputRefs.current[i] = el;
                    }}
                    type="tel"
                    maxLength={1}
                    value={c}
                    onChange={(e) => handleCodeInput(i, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(i, e)}
                    className="bg-[#F4F4F6] size-14 p-4 pl-5 text-2xl focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px]"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between w-full mt-2">
                <p className="text-[#00000073] font-medium">
                  {timer > 0 ? `00:${timer}` : "00:00"}
                </p>
                <button
                  type="button"
                  disabled={timer > 0 || loading}
                  onClick={sendForgotPassword}
                  className="!text-[#10316B] font-medium underline cursor-pointer disabled:cursor-not-allowed"
                >
                  Resent Code
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-[#FEB402] hover:bg-[#e29f01] text-white font-bold text-[18px] p-4 mt-5 rounded-full cursor-pointer"
              >
                Verify Code
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4 mt-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-[#00000073] font-medium"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px]"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9A999C]"
                  >
                    {showPassword ? (
                      <IoEyeOffOutline className="h-6 w-6" />
                    ) : (
                      <IoEyeOutline className="h-6 w-6" />
                    )}
                  </button>
                </div>
                {password.length > 0 && (
                  <>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          strength < 3
                            ? "bg-red-500"
                            : strength < 4
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${(strength / 5) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm font-medium mt-2 text-[#1E1E1E80]">
                      {strengthLabel}
                    </p>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-[#00000073] font-medium"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px]"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9A999C]"
                  >
                    {showConfirmPassword ? (
                      <IoEyeOffOutline className="h-6 w-6" />
                    ) : (
                      <IoEyeOutline className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-[#FEB402] hover:bg-[#e29f01] text-white font-bold text-[18px] p-4 mt-2 rounded-full cursor-pointer"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="md:w-[45%] w-full flex items-center justify-center">
        <Image
          src={stepImages[step as Step]}
          alt={`Step ${step} illustration`}
          width={700}
          height={720}
        />
      </div>
    </div>
  );
}
