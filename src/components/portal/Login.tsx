"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useMemo, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { IoCheckmark, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { FaSortDown } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import { allCountries as raw } from "country-telephone-data";

// import { useRouter } from "next/navigation";

export const countries = raw.map((c) => ({
  name: c.name,
  code: c.iso2.toUpperCase(),
  dialCode: `+${c.dialCode}`,
  format: c.format,
  flagUrl: `https://flagicons.lipis.dev/flags/4x3/${c.iso2}.svg`,
}));

const defaultCountry = countries.find((c) => c.code === "US")!;

export default function Login() {
  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [signUpMethod, setSignUpMethod] = useState(true);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // signup-specific state
  const [fullName, setFullName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // UI feedback
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [verifyError, setVerifyError] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const { login } = useAuth();

  const togglePasswordVisibility = () => setShowPassword((v) => !v);
  const toggleConfirmPasswordVisibility = () =>
    setshowConfirmPassword((v) => !v);

  // Password strength logic
  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 1) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const strengthLabel = useMemo(() => {
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

  const criteria = [
    { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
    { label: "An uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
    { label: "A number", test: (pw: string) => /[0-9]/.test(pw) },
    {
      label: "A special character",
      test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
    },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // login flow
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URI}/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );
        const data = await res.json();
        if (res.status === 403 && data.resendEndpoint) {
          setVerifyError(true);
        } else if (res.ok) {
          login(data.token);
          window.location.href = "/edit-profile";
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
        alert("An unexpected error occurred.");
      }
    } else {
      // signup flow
      const missing = criteria
        .filter((c) => !c.test(password))
        .map((c) => c.label);
      if (missing.length) {
        alert(`Password must contain: ${missing.join(", ")}`);
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      if (!termsAccepted) {
        alert("You must agree to the terms and conditions.");
        return;
      }
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URI}/api/auth/signup`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullname: fullName,
              email: signUpEmail,
              phone: `${selectedCountry.dialCode}${phoneNumber}`,
              country: selectedCountry.name,
              password,
              confirmPassword,
            }),
          }
        );
        const data = await res.json();
        if (res.ok) {
          setSignupSuccess(true);
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
        alert("An unexpected error occurred during sign up.");
      }
    }
  };

  const handleResend = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/auth/resend-verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setResendMessage("Verification email resent. Please check your inbox.");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to resend verification email.");
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_URI}/api/auth/google`;
  };

  const tabClass = (active: boolean) =>
    [
      "w-1/2 py-3 text-xl font-medium cursor-pointer text-center",
      active
        ? "border-b-4 border-[#FEB402] text-[#10316B] transition-all duration-300 md:!text-[20px] !text-18px]"
        : "border-b-4 border-[#0B409C36] text-[#10316B60] hover:text-[#10316B] hover:border-[#FEB402] transition-all duration-300 md:!text-[20px] !text-18px]",
    ].join(" ");

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries;
    return countries.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="max-w-[110rem] m-auto flex md:flex-row flex-col justify-between gap-4 px-12 py-12 pb-[25rem]">
      <div className="md:w-1/2 w-full flex justify-center">
        <div className="max-w-md w-full flex flex-col gap-1">
          <Link href={"/"} className="w-fit">
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
            {isLogin
              ? "Login to your DigiReps Profile"
              : "Create your DigiReps Profile"}
          </p>
          <div className="flex w-full mt-4">
            <button
              onClick={() => (setIsLogin(true), setSignUpMethod(true))}
              className={tabClass(isLogin)}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={tabClass(!isLogin)}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {isLogin && (
            <div className="w-full">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-2 flex flex-col gap-0 mt-3">
                  <label
                    htmlFor="email"
                    className="text-[#00000073] font-medium"
                  >
                    Email address*
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px]"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2 flex flex-col gap-0">
                  <label
                    htmlFor="password"
                    className="text-[#00000073] font-medium"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px]"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9A999C]"
                    >
                      {showPassword ? (
                        <IoEyeOffOutline className="h-6 w-6 cursor-pointer" />
                      ) : (
                        <IoEyeOutline className="h-6 w-6 cursor-pointer" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-5 w-5 rounded accent-[#FEB402]"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="ml-2 text-[#B1ADC0]">
                      Keep me signed in
                    </span>
                  </label>
                  <Link
                    href="/forget-password"
                    className="text-[#0027B4] underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {verifyError && (
                  <div className="p-4 bg-yellow-100 text-yellow-800 rounded">
                    <p className="mb-2">
                      Your email is not verified. Please check your inbox.
                    </p>
                    <Button onClick={handleResend}>
                      Resend verification email
                    </Button>
                    {resendMessage && (
                      <p className="mt-2 text-green-600">{resendMessage}</p>
                    )}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#FEB402] hover:bg-[#e29f01] text-white font-bold text-[18px] p-4 mt-3 rounded-full cursor-pointer"
                >
                  LOGIN
                </button>

                <div className="relative flex items-center justify-center py-2">
                  <div className="border-t border-gray-300 absolute w-full"></div>
                  <span className="bg-white px-6 text-[#00000059] relative">
                    OR
                  </span>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  type="button"
                  className="w-full flex items-center justify-center gap-2 border border-[#0b409c35] rounded-full p-4 text-[18px] cursor-pointer text-[#64626C] hover:bg-gray-50"
                >
                  <FcGoogle className="size-6" />
                  Sign in with google
                </button>
              </form>

              <div className="mt-6">
                <p className="text-[#1E1E1E80] !text-[22px] font-medium">
                  <span className="italic"> Are you a Client? </span>
                  <Link
                    href="https://discoverycall.digireps.co"
                    target="_blank"
                    className="text-[#10316B] underline font-medium !text-[18px]"
                  >
                    Click Here
                  </Link>
                </p>
              </div>
            </div>
          )}

          {/* Sign Up Form */}
          {!isLogin &&
            // Sign Up Google
            (signUpMethod ? (
              <div className="w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <button
                    onClick={handleGoogleSignIn}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 border border-[#0b409c35] rounded-full p-4 mt-6 text-[18px] cursor-pointer text-[#64626C] hover:bg-gray-50"
                  >
                    <FcGoogle className="size-6" />
                    Sign up with google
                  </button>
                  <button
                    onClick={() => setSignUpMethod(false)}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 border border-[#0b409c35] rounded-full p-4 mt-4 text-[18px] cursor-pointer text-[#64626C] hover:bg-gray-50"
                  >
                    <AiOutlineMail className="size-6 text-[#0B409C]" />
                    Sign up with Email
                  </button>
                </form>

                <div className="mt-6">
                  <p className="text-[#1E1E1E80] !text-[22px] font-medium">
                    <span className="italic"> Are you a Client? </span>
                    <Link
                      href="https://discoverycall.digireps.co"
                      target="_blank"
                      className="text-[#10316B] underline font-medium !text-[18px]"
                    >
                      Click Here
                    </Link>
                  </p>
                </div>
              </div>
            ) : signupSuccess ? (
              <div className="p-6 bg-blue-50 text-[#0B409C] rounded mt-4">
                <h2>Almost there!</h2>
                <p>
                  Registration successful. We sent a verification email to{" "}
                  <strong>{signUpEmail}</strong>. <br />
                  Please click the link in that email to activate your account.
                </p>
              </div>
            ) : (
              // Sign Up with Email
              <div className="w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2 mt-3">
                    <label
                      htmlFor="fullName"
                      className="text-[#00000073] font-medium"
                    >
                      Full Name
                    </label>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      type="text"
                      required
                      className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                    />
                  </div>

                  <div className="space-y-2 mt-3">
                    <label
                      htmlFor="email"
                      className="text-[#00000073] font-medium"
                    >
                      Email address*
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      required
                      className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="countryCode"
                      className="text-[#00000073] font-medium"
                    >
                      Phone No
                    </label>
                    <div className="space-y-2 mt-3 flex gap-4">
                      <div className="w-1/3">
                        <Popover open={open1} onOpenChange={setOpen1}>
                          <PopoverTrigger
                            id="countryCode"
                            asChild
                            className="bg-[#F4F4F6] h-14 border-0 rounded-[15px] cursor-pointer"
                          >
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open1}
                              className="w-full justify-between"
                            >
                              <div className="flex items-center gap-4">
                                <div className="relative h-7 w-10 overflow-hidden">
                                  <Image
                                    src={
                                      selectedCountry.flagUrl ||
                                      "/placeholder.svg"
                                    }
                                    alt={`${selectedCountry.name} flag`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <span className="font-normal">
                                  {selectedCountry.dialCode}
                                </span>
                              </div>
                              <FaSortDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 !translate-x-[70px]">
                            <Command>
                              <div className="p-2 bg-[#F4F4F6]">
                                <div className="flex items-center px-1 bg-white rounded-[15px]">
                                  {/* <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" /> */}
                                  <CommandInput
                                    placeholder="Search"
                                    className=""
                                    value={searchQuery}
                                    onValueChange={setSearchQuery}
                                  />
                                </div>
                              </div>
                              <CommandList>
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup className="!max-h-full !h-full overflow-auto bg-[#F4F4F6]">
                                  {filteredCountries.map((country) => (
                                    <CommandItem
                                      key={country.code}
                                      value={country.name}
                                      onSelect={() => {
                                        setSelectedCountry(country);
                                        setOpen1(false);
                                      }}
                                      className="flex items-center gap-6 py-2"
                                    >
                                      <div className="relative h-7 w-10 overflow-hidden rounded-sm">
                                        <Image
                                          src={
                                            country.flagUrl ||
                                            "/placeholder.svg"
                                          }
                                          alt={`${country.name} flag`}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <span>{country.name}</span>
                                      <IoCheckmark
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          selectedCountry.code === country.code
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="w-2/3">
                        <input
                          id="number"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                          // placeholder={format}
                          className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mt-3">
                    <Popover open={open} onOpenChange={setOpen}>
                      <label
                        htmlFor="country"
                        className="text-[#00000073] font-medium"
                      >
                        Country
                      </label>
                      <PopoverTrigger
                        id="country"
                        asChild
                        className="bg-[#F4F4F6] h-14 border-0 rounded-[15px] cursor-pointer"
                      >
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative h-7 w-10 overflow-hidden">
                              <Image
                                src={
                                  selectedCountry.flagUrl || "/placeholder.svg"
                                }
                                alt={`${selectedCountry.name} flag`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="font-normal">
                              {selectedCountry.name}
                            </span>
                          </div>
                          <FaSortDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <div className="p-2 bg-[#F4F4F6]">
                            <div className="flex items-center px-1 bg-white rounded-[15px]">
                              {/* <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" /> */}
                              <CommandInput
                                placeholder="Search"
                                className=""
                                value={searchQuery}
                                onValueChange={setSearchQuery}
                              />
                            </div>
                          </div>
                          <CommandList>
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup className="!max-h-full !h-full overflow-auto bg-[#F4F4F6]">
                              {filteredCountries.map((country) => (
                                <CommandItem
                                  key={country.code}
                                  value={country.name}
                                  onSelect={() => {
                                    setSelectedCountry(country);
                                    setOpen(false);
                                  }}
                                  className="flex items-center gap-6 py-2"
                                >
                                  <div className="relative h-7 w-10 overflow-hidden rounded-sm">
                                    <Image
                                      src={
                                        country.flagUrl || "/placeholder.svg"
                                      }
                                      alt={`${country.name} flag`}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <span>{country.name}</span>
                                  <IoCheckmark
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      selectedCountry.code === country.code
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="text-[#00000073] font-medium"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 mt-1 transform -translate-y-1/2 text-[#9A999C] cursor-pointer"
                      >
                        {showPassword ? (
                          <IoEyeOffOutline className="h-6 w-6" />
                        ) : (
                          <IoEyeOutline className="h-6 w-6" />
                        )}
                      </button>
                    </div>

                    {/* Password Strength Meter */}
                    {password.length >= 1 && (
                      <div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className={`h-full rounded-full transition-all duration-300 mt-4 ${
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
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
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
                        className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute right-3 top-1/2 mt-1 transform -translate-y-1/2 text-[#9A999C] cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <IoEyeOffOutline className="h-6 w-6" />
                        ) : (
                          <IoEyeOutline className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="termsConditions"
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="h-5 w-5 border-[#EEECF3] bg-[#EEECF3] rounded accent-[#FEB402]"
                      />
                      <label
                        htmlFor="termsConditions"
                        className="ml-2 text-[#B1ADC0]"
                      >
                        I agree with all&nbsp;
                        <Link href={"/terms-condition"} className="text-[#0B409C] underline">
                          terms and conditions&nbsp;
                        </Link>
                        and&nbsp;
                        <Link href={"/privacy-policy"} className="text-[#0B409C] underline">
                          privacy policy
                        </Link>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FEB402] hover:bg-[#e29f01] text-white font-bold text-[18px] p-4 mt-3 rounded-full cursor-pointer"
                  >
                    Sign Up
                  </button>
                </form>

                <div className="mt-6">
                  <p className="text-[#1E1E1E80] !text-[22px] font-medium">
                    <span className="italic"> Are you a Client? </span>
                    <Link
                      href="https://discoverycall.digireps.co"
                      target="_blank"
                      className="text-[#10316B] underline font-medium !text-[18px]"
                    >
                      Click Here
                    </Link>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="md:w-[45%] w-full flex items-start pt-12">
        {isLogin ? (
          <Image
            src={"/images/portalimg.png"}
            alt=""
            width={700}
            height={720}
          />
        ) : signUpMethod ? (
          <Image
            src={"/images/portalimg2.png"}
            alt=""
            width={680}
            height={720}
          />
        ) : (
          <Image
            src={"/images/portalimg3.png"}
            alt=""
            width={680}
            height={720}
          />
        )}
      </div>
    </div>
  );
}
