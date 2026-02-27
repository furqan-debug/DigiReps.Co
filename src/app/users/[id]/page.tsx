"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { MapPin, Calendar1Icon, Lock } from "lucide-react";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { LiaLanguageSolid } from "react-icons/lia";
import { BsCameraVideo } from "react-icons/bs";

interface WorkExperience {
  companyName: string;
  startMonth: string;
  startYear: string;
  endMonth?: string;
  endYear?: string;
  description: string;
}

interface Education {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startMonth: string;
  startYear: string;
  endMonth?: string;
  endYear?: string;
}

interface UserProfile {
  fullname: string;
  role?: string;
  yearsOfExp?: string;
  address?: string;
  bio?: string;
  profileImage?: string;
  videoUrl?: string;
  experiences?: WorkExperience[];
  educations?: Education[];
  skills?: string[];
  languages?: string[];
}

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_URI}/api/users/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || "This profile is private.");
        }
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] p-6">
        <div className="bg-gray-50 border border-gray-200 flex flex-col items-center justify-center rounded-lg p-8 max-w-md w-full text-center h-[300px]">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Lock className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            This profile is private
          </h3>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  const params = [
    "hideEmbedTopBar=true",
    "hide_share=true",
    "hide_title=true",
    "hide_owner=true",
    "hide_speed=true",
  ].join("&");

  function extractLoomId(link: string): string | null {
    try {
      const url = new URL(link);
      const parts = url.pathname.split("/");
      return parts[2] || null;
    } catch {
      return null;
    }
  }

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Static defaults for any missing field
  const defaults = {
    fullname: "John Doe",
    role: "",
    yearsOfExp: "",
    address: "",
    bio: "",
    image: "/images/user_placeholder.png",
    // experienceLabel: "5 Years of Experience",
    skills: [""],
    languages: [""],
    experiences: [
      {
        companyName: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        description: "",
      },
    ],
    educations: [
      {
        degree: "",
        school: "",
        fieldOfStudy: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
      },
    ],
  };
  if (!user) {
    // Optionally render a loader here while you fetch…
    return null;
  }
  // Pull from user or fall back
  const profileName = user.fullname ? user.fullname : defaults.fullname;
  const profileRole = user.role ? user.role : defaults.role;
  const yearsOfExp = user.yearsOfExp ? user.yearsOfExp : defaults.yearsOfExp;
  const profileAddress = user.address ? user.address : defaults.address;
  const profileBio = user.bio ? user.bio : defaults.bio;
  const profileImageSrc = user.profileImage
    ? user.profileImage
    : defaults.image;
  // const profileExpLabel = user.experiences?.length && defaults.experienceLabel;

  const workExperience = user.experiences?.length
    ? user.experiences!
    : defaults.experiences;

  const education = user.educations?.length
    ? user.educations!
    : defaults.educations;

  const skills = user.skills?.length ? user.skills! : defaults.skills;

  const languages = user.languages?.length
    ? user.languages!
    : defaults.languages;

  // Pull out the embed URL if present
  const videoId = user.videoUrl ? extractLoomId(user.videoUrl) : null;
  const embedSrc = videoId
    ? `https://www.loom.com/embed/${videoId}?${params}`
    : null;

  const parts = profileName.split(" ");

  // Leave the first element as-is, mask all the rest
  const maskedParts = [
    parts[0], // keep “arthur”
    ...parts.slice(1).map(() => "*****"),
  ];

  // Re-join into a single string
  const result = maskedParts.join(" ");

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-10 md:pr-32">
            {/* Profile Header */}
            <div className="flex flex-row items-start sm:items-center gap-6">
              <div className="relative overflow-hidden w-fit md:pr-0 pr-6">
                <Image
                  src={profileImageSrc}
                  alt={profileName}
                  width={180}
                  height={180}
                  className="object-cover object-center size-44 rounded-full"
                />
              </div>
              <div className="md:w-fit w-1/2 flex flex-col self-center">
                <h1 className="text-2xl font-semibold capitalize">{result}</h1>
                <p className="text-[#10316B] text-[18px] mt-1">{profileRole}</p>
                <div className="flex md:items-center md:flex-row flex-col md:gap-8 md:mt-1 mt-4 -ml-1 md:justify-baseline justify-between">
                  {profileAddress != "" && (
                    <div className="flex items-center text-[#021442]">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="capitalize">{profileAddress}</span>
                    </div>
                  )}
                  {yearsOfExp != "" && (
                    <div className="flex items-center text-[#021442]">
                      <Calendar1Icon className="w-4 h-4 mr-1" />
                      <span className="capitalize">
                        {yearsOfExp}{" "}
                        {yearsOfExp == "1"
                          ? "Year of Experience"
                          : "Years of Experience"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            {profileBio != "" && (
              <div>
                <h2 className="!text-2xl font-bold text-[#021442] mb-3">Bio</h2>
                <div>
                  {profileBio.split("\n").map((line, i) =>
                    line.trim() ? (
                      <p key={i} className="text-[#1E1E1E90] !text-[18px] mb-4">
                        {line}
                      </p>
                    ) : null
                  )}
                </div>
              </div>
            )}

            {/* Work Experience */}
            {workExperience[0].companyName != "" && (
              <div>
                <h2 className="!text-2xl font-bold text-[#021442] mb-4">
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {workExperience.map((job, idx) => (
                    <div key={idx} className="pb-2">
                      <div className="flex justify-between mb-2">
                        <div>
                          {profileRole != "" && (
                            <h3 className="!font-semibold text-[#02144290] text-xl capitalize">
                              {profileRole}
                            </h3>
                          )}
                          <p className="text-[#0B409C] !text-xl !font-medium capitalize">
                            {job.companyName}
                          </p>
                        </div>
                        <p className="text-[#1E1E1E90] text-[18px] !font-bold">
                          {`${job.startMonth} ${job.startYear} – ${
                            job.endMonth || ""
                          } ${job.endYear || ""}`.trim()}
                        </p>
                      </div>
                      <div>
                        {job.description.split("\n").map((line, i) =>
                          line.trim() ? (
                            <p
                              key={i}
                              className="text-[#1E1E1E90] !text-[18px] mb-4"
                            >
                              {line}
                            </p>
                          ) : null
                        )}
                      </div>
                      {/* <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="!font-semibold text-[#02144290] text-xl">
                          {job.companyName}
                        </h3>
                        <p className="text-[#0B409C] !text-xl !font-medium">
                          {`${job.startMonth} ${job.startYear} – ${
                            job.endMonth || ""
                          } ${job.endYear || ""}`.trim()}
                        </p>
                      </div>
                      <p className="text-[#1E1E1E90] text-[18px] !font-bold">
                        {job.description}
                      </p>
                    </div> */}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education[0].degree != "" && (
              <div>
                <h2 className="!text-2xl font-bold text-[#021442] mb-4">
                  Education
                </h2>
                <div className="space-y-6">
                  {education.map((edu, idx) => (
                    <div key={idx} className="flex justify-between mb-8">
                      <div>
                        <h3 className="!font-semibold text-[#02144290] text-xl capitalize">
                          {edu.degree}&apos;s Degree in {edu.fieldOfStudy}
                        </h3>
                        <p className="text-[#0B409C] !text-xl !font-medium capitalize">
                          {edu.school}
                        </p>
                      </div>
                      <p className="text-[#1E1E1E90] text-[18px] !font-bold">
                        {`${edu.startYear} –  ${edu.endYear || ""}`.trim()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8 flex flex-col">
            {/* Video Section */}
            <div className="bg-gray-100 rounded-lg overflow-hidden mt-8">
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src={"/images/profilevideo.jpeg"}
                  alt="Introduction video"
                  width={400}
                  height={300}
                  className="object-cover w-full"
                />
                <button
                  onClick={openModal}
                  className="absolute top-1/2 left-1/2 transform -translate-1/2 bg-[#FEB402] text-white cursor-pointer px-4 py-3 w-[70%] rounded-full flex items-center justify-center"
                >
                  <BsCameraVideo className="mr-2 text-3xl" />
                  <span>Watch Introduction</span>
                </button>
                {isOpen && embedSrc && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 animate-fadeIn">
                    <div className="videoArea relative aspect-video w-full mx-auto">
                      {/* Close Button */}
                      <button
                        onClick={closeModal}
                        className="absolute top-5 right-5 text-white text-2xl font-bold z-10 cursor-pointer"
                      >
                        ✖
                      </button>

                      <iframe
                        src={embedSrc}
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {skills[0] != "" && (
              <div className="p-6 rounded-[20px] border border-[#0B409C36]">
                <div className="flex items-center gap-2 mb-4">
                  <HiOutlineBookOpen className="text-[#021442] text-4xl" />
                  <h2 className="!text-2xl font-bold text-[#021442]">Skills</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, idx) => (
                    <p
                      key={idx}
                      className="bg-[#0B409C] py-2 px-3 text-white rounded-full !text-sm"
                    >
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages[0] != "" && (
              <div className="p-6 rounded-[20px] border border-[#0B409C36]">
                <div className="flex items-center gap-2 mb-4">
                  <LiaLanguageSolid className="text-[#021442] text-4xl" />
                  <h2 className="!text-2xl font-bold text-[#021442]">
                    Languages
                  </h2>
                </div>
                <div className="space-y-4 flex flex-col gap-4 py-4 text-[#1E1E1E90] text-[18px]">
                  {languages.map((lang, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span>•</span>
                      <span>{lang}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
