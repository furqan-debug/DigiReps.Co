"use client";

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

// Define the shape of the decoded JWT payload
interface JwtPayload {
  sub: string;
  email: string;
  fullname?: string;
  exp: number;
}

type User = { id: string; fullname: string; email: string };
type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Manual logout: clear timer, storage, state, then redirect
  const logout = () => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }
    localStorage.removeItem("authToken");
    setUser(null);
    window.location.href = "/portal";
  };

  // Schedule an automatic logout at the token's exp time
  const scheduleAutoLogout = (token: string) => {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      const msUntilExpiry = exp * 1000 - Date.now();

      if (msUntilExpiry <= 0) {
        // Already expired
        logout();
        return;
      }

      // Clear any existing timer
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }

      // Schedule new timer
      logoutTimer.current = setTimeout(logout, msUntilExpiry);
    } catch (err) {
      console.error("Failed to schedule auto-logout", err);
    }
  };

  // Call this on successful login
  const login = (token: string) => {
    // Persist only the token
    localStorage.setItem("authToken", token);

    // Decode token to get user info
    try {
      const { sub: id, email, fullname } = jwtDecode<JwtPayload>(token);
      setUser({
        id,
        email,
        fullname: fullname || "",
      });

      // Schedule automatic logout
      scheduleAutoLogout(token);

      // Redirect to profile
      router.push("/profile");
    } catch (err) {
      console.error("Failed to decode token on login", err);
      logout();
    }
  };

  // On mount, restore any existing session
  useEffect(() => {
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const { exp, sub: id, email, fullname } = jwtDecode<JwtPayload>(token);

        if (exp * 1000 > Date.now()) {
          // Token still valid
          setUser({ id, email, fullname: fullname || "" });
          scheduleAutoLogout(token);
        } else {
          // Token expired
          logout();
        }
      } catch {
        // Invalid token
        logout();
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
