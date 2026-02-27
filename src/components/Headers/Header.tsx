"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoChevronDownSharp,
  IoMenu,
  IoClose,
  IoChevronUpSharp,
} from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { useModal } from "../../context/ModalContext";
import Hero from "../home/sections/Hero";
import styles from "./Header.module.css";
import { FaCircle } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { useAuth } from "@/context/AuthContext";
import { User } from "lucide-react";

interface UserProfile {
  fullname: string;
}

export default function Header() {
  const { openModal } = useModal();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const isPortal = pathname === "/portal" || pathname === "/forget-password";
  const { logout } = useAuth();

  // dropdown & mobile state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutPopoup, setLogoutPopoup] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const desktopLogoutButtonRef = useRef<HTMLButtonElement>(null);
  const desktopLogoutPopupRef = useRef<HTMLDivElement>(null);
  const mobileLogoutButtonRef = useRef<HTMLButtonElement>(null);
  const mobileLogoutPopupRef = useRef<HTMLDivElement>(null);

  const solutions = [
    "Sales Development Rep",
    "Customer Support Rep",
    "Leads Researcher",
    "Digital Marketing Rep",
    "UI/UX Designer",
    "Front-end Developer",
    "Back-end Developer",
    "Executive Assistant",
  ];

  const toggleDropdown = () => setDropdownOpen((o) => !o);
  const toggleMobileDropdown = () => setMobileDropdownOpen((o) => !o);
  const toggleMobile = () => setMobileOpen((o) => !o);
  const handleClick = () => {
    router.push("/portal");
    toggleMobile();
  };
  const handleProfile = () => {
    router.push("/profile");
    setLogoutPopoup((o) => !o);
    toggleMobile();
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!logoutPopoup) return;

      const clickedInsideDesktop =
        desktopLogoutPopupRef.current?.contains(e.target as Node) ||
        desktopLogoutButtonRef.current?.contains(e.target as Node);

      const clickedInsideMobile =
        mobileLogoutPopupRef.current?.contains(e.target as Node) ||
        mobileLogoutButtonRef.current?.contains(e.target as Node);

      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setLogoutPopoup(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [logoutPopoup]);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_URI}/api/auth/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Not authorized");
        const { user } = await res.json();
        setUser(user);
      })
      .catch(() => setUser(null));
  }, []);

  if (isPortal) return null;
  return (
    <header
      className={[
        styles.header,
        isHome ? styles.home + `${mobileOpen ? " lg:!z-0 !z-30" : ""}` : "",
        "lg:pt-5",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container mx-auto mb-8 relative lg:bg-transparent bg-[#f0f0f3]">
        <nav className="flex justify-between items-center lg:rounded-full lg:pl-12 lg:ml-0 ml-10 lg:pr-3 lg:mr-0 mr-6 lg:pt-3 pt-8 lg:pb-3 pb-6 z-10 relative border-b border-[#CFCFCF]">
          {/* Logo */}
          <div className="logo">
            <Link href="/">
              <Image
                src="/images/digireps-logo-new.png"
                alt="Digi Reps"
                width={148}
                height={40}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center font-medium">
            <li>
              <Link href="/" className={pathname === "/" ? styles.active : ""}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/aboutus"
                className={pathname === "/aboutus" ? styles.active : ""}
              >
                About
              </Link>
            </li>
            <li className="relative">
              <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className="flex items-center gap-1"
              >
                Solution <IoChevronDownSharp className="h-4 w-4" />
              </button>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full mt-2 w-60 bg-gray-100 rounded-2xl shadow-xl z-20"
                >
                  <ul>
                    {solutions.map((sol, i) => {
                      const slug =
                        "/" + sol.toLowerCase().replace(/[\/\s]+/g, "-");
                      return (
                        <li key={i}>
                          <Link
                            href={slug}
                            className={`block px-4 py-2 hover:bg-gray-200 ${
                              pathname === slug ? styles.active : ""
                            }`}
                            onClick={() => setDropdownOpen(false)}
                          >
                            {sol}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
            <li>
              <Link
                href="/contact"
                className={pathname === "/contact" ? styles.active : ""}
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Actions & Mobile Toggle */}
          <div className="flex items-center">
            <div className="hidden lg:flex items-center relative">
              {user ? (
                <>
                  <button
                    ref={desktopLogoutButtonRef}
                    onClick={() => setLogoutPopoup((o) => !o)}
                    className={`${styles.loginBtn} text-white p-4 rounded-full px-6`}
                  >
                    Hi, {user.fullname}
                  </button>
                  {logoutPopoup && (
                    <div
                      ref={desktopLogoutPopupRef}
                      className="border overflow-hidden bg-white border-[#7777778C] absolute top-[120%] rounded-2xl"
                    >
                      <button
                        onClick={handleProfile}
                        className="hover:bg-gray-100 cursor-pointer border-b border-[#7777778C] px-10 py-4 flex items-center gap-2 font-medium w-full z-50"
                      >
                        <User className="size-6" /> Profile
                      </button>
                      <button
                        onClick={logout}
                        className="hover:bg-gray-100 cursor-pointer px-10 py-4 flex items-center gap-2 font-medium w-full z-50"
                      >
                        <TbLogout2 className="size-6" /> Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  className={`${styles.loginBtn} text-white p-4 rounded-full px-6`}
                  onClick={handleClick}
                >
                  Login / Sign Up
                </button>
              )}
              <button
                onClick={() => openModal()}
                className={`${styles.bookConsultationBtn} text-white p-4 rounded-full px-6 ml-2`}
              >
                <Image
                  src="/images/phone-icon.svg"
                  alt="Phone icon"
                  width={27.37}
                  height={26.01}
                />{" "}
                Book Consultation
              </button>
            </div>
            <button onClick={toggleMobile} className="lg:hidden p-2 ml-2">
              {mobileOpen ? (
                <IoClose className="h-6 w-6 text-gray-700" />
              ) : (
                <IoMenu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer (below header) */}
        <div
          className={`fixed top-0 left-0 w-full bg-[#F0F0F3] h-screen !z-40 transform transition-transform duration-300 overflow-scroll lg:hidden
            ${mobileOpen ? "translate-y-0" : "-translate-y-[150%]"}`}
        >
          <div className="lg:hidden flex flex-col gap-2 justify-between h-full">
            <div>
              <nav className="flex justify-between items-center lg:rounded-full lg:pl-12 lg:ml-0 ml-10 lg:pr-3 lg:mr-0 mr-6 lg:pt-3 pt-8 lg:pb-3 pb-6 z-50 relative border-b border-[#CFCFCF]">
                {/* Logo */}
                <div className="logo">
                  <Link href="/">
                    <Image
                      src="/images/digireps-logo-new.png"
                      alt="Digi Reps"
                      width={148}
                      height={40}
                    />
                  </Link>
                </div>

                {/* Actions & Mobile Toggle */}
                <div className="flex items-center">
                  <div className="hidden lg:flex items-center">
                    <button
                      onClick={handleClick}
                      className={`${styles.loginBtn} text-white p-4 rounded-full px-6 mr-3`}
                    >
                      {user ? `Hi, ${user.fullname}` : "Login / Sign Up"}
                    </button>
                    <button
                      onClick={() => openModal()}
                      className={`${styles.bookConsultationBtn} text-white p-4 rounded-full px-6`}
                    >
                      <Image
                        src="/images/phone-icon.svg"
                        alt="Phone icon"
                        width={27.37}
                        height={26.01}
                      />{" "}
                      Book Consultation
                    </button>
                  </div>
                  <button onClick={toggleMobile} className="lg:hidden p-2 ml-2">
                    {mobileOpen ? (
                      <IoClose className="h-6 w-6 text-gray-700" />
                    ) : (
                      <IoMenu className="h-6 w-6 text-gray-700" />
                    )}
                  </button>
                </div>
              </nav>
              <ul className="pt-4 px-12 !text-[18px] mobileNav">
                <li className="border-b border-[#E0DFE6] pt-8">
                  <Link
                    href="/"
                    className={
                      pathname === "/" ? styles.active + " pb-4" : "pb-4"
                    }
                    onClick={toggleMobile}
                  >
                    Home
                  </Link>
                </li>
                <li className="border-b border-[#E0DFE6] pt-8">
                  <Link
                    href="/aboutus"
                    className={
                      pathname === "/aboutus" ? styles.active + " pb-4" : "pb-4"
                    }
                    onClick={toggleMobile}
                  >
                    About Us
                  </Link>
                </li>
                <li className="border-b border-[#E0DFE6] pt-8">
                  <button
                    onClick={toggleMobileDropdown}
                    className="flex items-center justify-between w-full !text-[18px] pb-4"
                  >
                    Solutions{" "}
                    {mobileDropdownOpen ? (
                      <IoChevronUpSharp className="ml-2" />
                    ) : (
                      <IoChevronDownSharp className="ml-2" />
                    )}
                  </button>
                  {mobileDropdownOpen && (
                    <ul className="mt-2">
                      {solutions.map((sol, i) => {
                        const slug =
                          "/" + sol.toLowerCase().replace(/[\/\s]+/g, "-");

                        return (
                          <li key={i}>
                            <Link
                              href={slug}
                              onClick={() => {
                                // first navigate…
                                // then collapse both dropdown and mobile menu
                                setMobileDropdownOpen((o) => !o);
                                setDropdownOpen(false);
                                setMobileOpen(false);
                              }}
                              className={`flex gap-4 items-center py-4 ${
                                pathname === slug ? styles.active : ""
                              }`}
                            >
                              <FaCircle className="text-[#FEB402] size-3" />
                              {sol}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
                <li className="border-b border-[#E0DFE6] pt-8">
                  <Link
                    href="/contact"
                    className={
                      pathname === "/contact" ? styles.active + " pb-4" : "pb-4"
                    }
                    onClick={toggleMobile}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4 mt-6 px-12 pb-12 relative">
              {user ? (
                <>
                  <button
                    ref={mobileLogoutButtonRef}
                    onClick={() => setLogoutPopoup((o) => !o)}
                    className={`${styles.loginBtn} text-white p-4 rounded-full px-6`}
                  >
                    Hi, {user.fullname}
                  </button>
                  {logoutPopoup && (
                    <div
                      ref={mobileLogoutPopupRef}
                      className="border overflow-hidden bg-white border-[#7777778C] absolute top-12 transform -translate-x-1/2 left-1/2 rounded-2xl"
                    >
                      <button
                        onClick={handleProfile}
                        className="hover:bg-gray-100 cursor-pointer border-b border-[#7777778C] px-10 py-4 flex items-center gap-2 font-medium w-full z-50"
                      >
                        <User className="size-6" /> Profile
                      </button>
                      <button
                        onClick={logout}
                        className="hover:bg-gray-100 cursor-pointer px-10 py-4 flex items-center gap-2 font-medium w-full z-50"
                      >
                        <TbLogout2 className="size-6" /> Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  className={`${styles.loginBtn} text-white p-4 rounded-full px-6`}
                  onClick={handleClick}
                >
                  Login / Sign Up
                </button>
              )}
              <button
                onClick={() => openModal()}
                className={`${styles.bookConsultationBtn} text-white p-4 rounded-full px-6 w-full flex justify-center`}
              >
                <Image
                  src="/images/phone-icon.svg"
                  alt="Phone icon"
                  width={27.37}
                  height={26.01}
                />{" "}
                Book Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Optional Overlay (below header) */}
        {/* {mobileOpen && (
          <div
            className="absolute top-full left-0 w-full h-screen bg-opacity-30 z-30"
            onClick={toggleMobile}
          />
        )} */}
      </div>

      {/* Hero Section */}
      {isHome && (
        <div className={styles.heroContainer}>
          <Hero />
        </div>
      )}
    </header>
  );
}
