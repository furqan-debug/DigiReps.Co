"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Login from "@/components/portal/Login";
import Footer from "@/components/portal/Footer";

export default function PortalPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // logged-in → bounce to /profile
      router.replace("/edit-profile");
    }
  }, [user, loading, router]);

  // 1) Still checking auth? show spinner or blank
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  // 2) We know loading is false. If there's a user, we’re redirecting—don't render the login at all.
  if (user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
    // or simply: return null
  }

  // 3) Not loading and no user → safe to show portal login
  return (
    <div className="conditionalCssBubbles">
      <Login />
      <Footer />
    </div>
  );
}
