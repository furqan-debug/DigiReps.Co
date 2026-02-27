"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Read the hash: "#token=eyJ…"
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("authToken");

    if (token) {
      // 1) Save it however you like
      localStorage.setItem("authToken", token);

      // 2) (Optional) fetch user profile now, or just reload
      // router.replace('/profile');
      window.location.href = "/edit-profile";
    } else {
      // No token? bounce back to login
      window.location.href = "/portal";
    }
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <span className="loader"></span>
    </div>
  );
}
