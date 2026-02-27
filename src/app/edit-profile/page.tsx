"use client";

import type React from "react";
import { v4 as uuid } from "uuid";
import { useState, useRef, type KeyboardEvent, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { TbCameraPlus } from "react-icons/tb";
import { useAuth } from "@/context/AuthContext";

const blankExperience = (): WorkExperience => ({
  id: uuid(),
  companyName: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
  description: "",
});

const blankEducation = (): Education => ({
  id: uuid(),
  school: "",
  degree: "",
  fieldOfStudy: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
});

interface WorkExperience {
  id: string;
  companyName: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
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

export default function ProfileBuilder() {
  const router = useRouter();
  // Profile state
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [exp, setExp] = useState("");
  const [address, setAddress] = useState("");
  const [loomVideo, setLoomVideo] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Skills state
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  // Language state
  const [langs, setLangs] = useState<string[]>([]);
  const [langInput, setLangInput] = useState("");

  // Work Experience state
  const [experiences, setExperiences] = useState<WorkExperience[]>(() => [
    blankExperience(),
  ]);
  const [educations, setEducations] = useState<Education[]>(() => [
    blankEducation(),
  ]);

  const { user, loading } = useAuth();
  const [loaded, setLoaded] = useState(false);
  const [users, setUsers] = useState<UserProfile | null>(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  );
  const exps = [
    // "Select Your Years of Experience",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "10+",
  ];
  const roles = [
    // "Select Role (e.g UI/UX Designer)",
    "Sales Development Rep",
    "Customer Support Rep",
    "Leads Researcher",
    "Digital Marketing Rep",
    "UI-UX Designer",
    "Front-end Developer",
    "Back-end Developer",
    "Executive Assistant",
    "Full Stack Developer",
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const langsContainerRef = useRef<HTMLDivElement>(null);

  // NEW: grab the token however you store it
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  // 1) On mount, fetch the last-saved profile
  useEffect(() => {
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
        // populate each piece of state:
        setName(user.fullname);
        setRole(user.role);
        setExp(user.yearsOfExp);
        setAddress(user.address);
        setLoomVideo(user.videoUrl);
        setBio(user.bio);
        setProfileImage(user.profileImage || null);
        setSkills(user.skills || []);
        setLangs(user.languages || []);
        // restore experiences/educations, re-adding an “id” for React keys
        const fetchedExps = user.experiences || [];
        setExperiences(
          fetchedExps.length > 0
            ? fetchedExps.map((exp: string[], i: number) => ({
              id: String(i),
              ...exp,
            }))
            : [blankExperience()]
        );

        // Same for educations:
        const fetchedEds = user.educations || [];
        setEducations(
          fetchedEds.length > 0
            ? fetchedEds.map((edu: string[], i: number) => ({
              id: String(i),
              ...edu,
            }))
            : [blankEducation()]
        );
      })
      .catch(() => {
        // not logged in or fetch failed
      });
  }, [token]);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoaded(true);
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_URI}/api/auth/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Not authorized");
        const { user } = await res.json();
        // console.log("user", user);
        setUsers(user);
      })
      .catch(() => setUsers(null))
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/portal");
    }
  }, [user, loading, router]);

  // 2) While we’re verifying / fetching
  if (loading || !loaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }
  // 3) We know loading is false and user is null → we’re redirecting
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  // Handle profile image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Build FormData for Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        setProfileImage(data.secure_url);
      } else {
        console.error("Cloudinary upload error:", data);
        alert("Image upload failed");
      }
    } catch (err) {
      console.error("Upload exception:", err);
      alert("Image upload failed");
    }
  };

  // Skills handlers
  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      e.stopPropagation();
      if (skillInput.trim()) {
        addSkill();
      }
    }
  };
  const handleLangKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      e.stopPropagation();
      if (langInput.trim()) {
        addLang();
      }
    }
  };

  const addSkill = () => {
    const trimmedInput = skillInput.trim();
    if (trimmedInput && !skills.includes(trimmedInput)) {
      setSkills([...skills, trimmedInput]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const addLang = () => {
    const trimmedInput = langInput.trim();
    if (trimmedInput && !langs.includes(trimmedInput)) {
      setLangs([...langs, trimmedInput]);
      setLangInput("");
    }
  };

  const removeLang = (langToRemove: string) => {
    setLangs(langs.filter((lang) => lang !== langToRemove));
  };

  // Work Experience handlers
  const handleExperienceChange = (
    id: string,
    field: keyof WorkExperience,
    value: string
  ) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const addExperienceSection = () => {
    setExperiences((prev) => [...prev, blankExperience()]);
  };

  // Education handlers
  const handleEducationChange = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    setEducations(
      educations.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const addEducationSection = () => {
    setEducations((prev) => [...prev, blankEducation()]);
  };

  if (!users) {
    // Optionally render a loader here while you fetch…
    return null;
  }

  const handleSave = async (e: React.FormEvent) => {
    if (!token) {
      alert("You must be logged in to save your profile");
      return;
    }
    e.preventDefault();
    if (!profileImage) {
      alert("Please upload a profile image.");
      return;
    }

    // strip out the `id` from experiences & educations
    const cleanExperiences = experiences.map(
      ({
        companyName,
        startMonth,
        startYear,
        endMonth,
        endYear,
        description,
      }) => ({
        companyName,
        startMonth,
        startYear,
        endMonth,
        endYear,
        description,
      })
    );
    const cleanEducations = educations.map(
      ({
        school,
        degree,
        fieldOfStudy,
        startMonth,
        startYear,
        endMonth,
        endYear,
      }) => ({
        school,
        degree,
        fieldOfStudy,
        startMonth,
        startYear,
        endMonth,
        endYear,
      })
    );

    const payload = {
      fullname: name,
      role,
      yearsOfExp: exp,
      address,
      bio,
      profileImage,
      videoUrl: loomVideo,
      skills,
      languages: langs,
      experiences: cleanExperiences,
      educations: cleanEducations,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/auth/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || res.statusText);
      }

      window.location.href = "/profile";
      // TODO: maybe update local context or show a success message
      // console.log("Profile updated:", user);
      alert("Profile saved successfully!");
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert("Error saving profile: " + e.message);
      } else {
        alert("An unexpected non-Error was thrown");
      }
    }
  };

  return (
    <form
      className="max-w-[95rem] mx-auto bg-white rounded-lg overflow-hidden pb-32"
      onSubmit={(e) => {
        e.preventDefault();
        handleSave(e);
      }}
    >
      <div className="flex justify-end gap-4 p-4 md:-mb-12 md:mt-12 relative">
        <button
          type="button"
          onClick={() => router.push("/profile")}
          className="px-14 py-4 bg-[#CFCFCF] text-white rounded-full cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-14 py-4 bg-[#0B409C] text-white rounded-full cursor-pointer"
        >
          Save
        </button>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-8 md:max-w-[88%] max-w-full p-4">
        {/* Sidebar with required attributes on inputs */}
        <div className="w-full md:w-80 h-fit bg-[#F8F8F8] px-4 pt-12 pb-24">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6">
            <div
              className="w-40 h-40 rounded-full border-2 border-dashed border-[#0B409C] flex items-center justify-center mb-2 overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <TbCameraPlus size={44} className="text-[#0B409C]" />
                  <p className="!text-[12px] text-[#00000040] text-center">
                    Allowed JPG, GIF or PNG. Max size of 800K
                  </p>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept=".jpg,.jpeg,.png,.gif"
            />
            <button
              type="button"
              className="text-[#021442] font-semibold mt-2"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Profile Picture
            </button>
          </div>

          {/* Video Section */}
          <div className="mb-6">
            <label className="text-[#00000073] font-medium">
              Loom Video Link
            </label>
            <input
              type="text"
              value={loomVideo}
              placeholder=""
              onChange={(e) => setLoomVideo(e.target.value)}
              className="w-full px-4 py-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
            />
          </div>
          <div className="mt-2">
            {/* <div className="border-2 border-dashed border-[#0B409C] rounded-[8px] p-3 flex items-center justify-center gap-6">
              <Image src="/images/video.svg" alt="" width={40} height={28} />
              <p className="!text-sm text-[#00000040]">
                {" "}
                <span className="underline text-[#0B409C]">Click here</span> to
                upload Video Introduction
              </p>
            </div> */}
            <div className="mt-2">
              <p className="!text-[14px] text-[#606060] mt-2">
                <span className="text-[#FF002E] font-bold">Format: </span>
                https://www.loom.com/share/0281766
                <br />
                fa2d04bb788eaf19e65135184
              </p>
              <p className="!text-[14px] text-[#606060] mt-2">
                <span className="text-[#FF002E] font-bold">Note: </span>
                Want to improve your chances of getting hired quickly? Record
                and upload your LOOM introduction video
              </p>
              <p className="!text-[14px] text-[#606060] mt-2">
                <span className="text-[#0B409C] font-bold">Instruction: </span>
                Please keep your video introduction within a 90 seconds duration
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="text-[#00000073] font-medium">Skills</h3>
            <div
              ref={skillsContainerRef}
              className="bg-white p-3 rounded-[15px] min-h-[230px] mt-2"
              onClick={() =>
                skillsContainerRef.current?.querySelector("input")?.focus()
              }
            >
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-1 bg-[#0B409C] text-white px-3 py-1 rounded-full text-sm"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSkill(skill);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  onKeyDownCapture={handleSkillKeyDown}
                  enterKeyHint="done"
                  placeholder="Type skills and press Enter"
                  className="outline-none border-none flex-grow min-w-[60px] text-sm"
                />
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-[#00000073] font-medium">Languages</h3>
            <div
              ref={langsContainerRef}
              className="bg-white p-3 rounded-[15px] min-h-[230px] mt-2"
              onClick={() =>
                langsContainerRef.current?.querySelector("input")?.focus()
              }
            >
              <div className="flex flex-wrap gap-2">
                {langs.map((lang) => (
                  <div
                    key={lang}
                    className="flex items-center gap-1 bg-[#0B409C] text-white px-3 py-1 rounded-full text-sm"
                  >
                    <span>{lang}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeLang(lang);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={langInput}
                  onChange={(e) => setLangInput(e.target.value)}
                  onKeyDown={handleLangKeyDown}
                  onKeyDownCapture={handleLangKeyDown}
                  enterKeyHint="done"
                  placeholder="Type languages and press Enter"
                  className="outline-none border-none flex-grow min-w-[60px] text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content with required attributes */}
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="!text-xl font-semibold mb-6 text-[#021442]">
              Personal Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
              <div>
                <label className="text-[#00000073] font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                />
              </div>
              <div>
                <label className="text-[#00000073] font-medium">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
              <div>
                <label className="text-[#00000073] font-medium">Country</label>
                <input
                  type="text"
                  value={address}
                  placeholder="California, United States"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                />
              </div>
              <div>
                <label className="text-[#00000073] font-medium">Years of Experience</label>
                <select
                  value={exp}
                  onChange={(e) => setExp(e.target.value)}
                  required
                  className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                >
                  {exps.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[#00000073] font-medium">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
                placeholder="Type Description"
                className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2 min-h-[250px]"
              />
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-8">
            <h2 className="!text-xl font-semibold mb-6 text-[#021442]">
              Work Experience
            </h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="mb-6">
                  <label className="text-[#00000073] font-medium">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g Google, Yahoo"
                    value={exp.companyName}
                    onChange={(e) =>
                      handleExperienceChange(
                        exp.id,
                        "companyName",
                        e.target.value
                      )
                    }
                    required
                    className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
                  <div>
                    <label className="text-[#00000073] font-medium">
                      Start Month
                    </label>
                    <select
                      value={exp.startMonth}
                      onChange={(e) =>
                        handleExperienceChange(
                          exp.id,
                          "startMonth",
                          e.target.value
                        )
                      }
                      required
                      className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                    >
                      <option value="">Select Month</option>
                      {months.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[#00000073] font-medium">
                      Start Year
                    </label>
                    <select
                      value={exp.startYear}
                      onChange={(e) =>
                        handleExperienceChange(
                          exp.id,
                          "startYear",
                          e.target.value
                        )
                      }
                      required
                      className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                    >
                      <option value="">Select Year</option>
                      {years.map((y) => (
                        <option key={y} value={y.toString()}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
                  <div>
                    <label className="text-[#00000073] font-medium">
                      End Month
                    </label>
                    <select
                      value={exp.endMonth}
                      onChange={(e) =>
                        handleExperienceChange(
                          exp.id,
                          "endMonth",
                          e.target.value
                        )
                      }
                      required
                      className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                    >
                      <option value="">Select Month</option>
                      {months.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[#00000073] font-medium">
                      End Year
                    </label>
                    <select
                      value={exp.endYear}
                      onChange={(e) =>
                        handleExperienceChange(
                          exp.id,
                          "endYear",
                          e.target.value
                        )
                      }
                      required
                      className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                    >
                      <option value="">Select Year</option>
                      {years.map((y) => (
                        <option key={y} value={y.toString()}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[#00000073] font-medium">
                    Activities and Responsibilities
                  </label>
                  <textarea
                    value={exp.description}
                    placeholder="Type Description"
                    onChange={(e) =>
                      handleExperienceChange(
                        exp.id,
                        "description",
                        e.target.value
                      )
                    }
                    required
                    className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] h-[125px]"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addExperienceSection}
              className="flex items-center gap-1 bg-[#0B409C29] text-[#0B409C] px-6 py-3 cursor-pointer rounded-full text-[14px]"
            >
              <Plus size={20} />
              <span>Add New Section</span>
            </button>
          </div>

          {/* Education */}
          <div>
            <h2 className="!text-xl font-semibold mb-6 text-[#021442]">
              Education
            </h2>
            {educations.map((ed) => (
              <div key={ed.id} className="mb-6">
                <div className="mb-6">
                  <label className="text-[#00000073] font-medium">
                    School / University
                  </label>
                  <input
                    type="text"
                    placeholder="e.g Business"
                    value={ed.school}
                    onChange={(e) =>
                      handleEducationChange(ed.id, "school", e.target.value)
                    }
                    required
                    className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                  />
                </div>
                <div className="mb-6">
                  <label className="text-[#00000073] font-medium">Degree</label>
                  <input
                    type="text"
                    placeholder="e.g Bachelors"
                    value={ed.degree}
                    onChange={(e) =>
                      handleEducationChange(ed.id, "degree", e.target.value)
                    }
                    required
                    className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                  />
                </div>
                <div className="mb-6">
                  <label className="text-[#00000073] font-medium">
                    Field Of Study
                  </label>
                  <input
                    type="text"
                    placeholder="e.g Computer Science"
                    value={ed.fieldOfStudy}
                    onChange={(e) =>
                      handleEducationChange(
                        ed.id,
                        "fieldOfStudy",
                        e.target.value
                      )
                    }
                    required
                    className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
                  <div>
                    <label className="text-[#00000073] font-medium">
                      Start Month
                    </label>
                    <select
                      value={ed.startMonth}
                      onChange={(e) =>
                        handleEducationChange(
                          ed.id,
                          "startMonth",
                          e.target.value
                        )
                      }
                      required
                      className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                    >
                      <option value="">Select Month</option>
                      {months.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[#00000073] font-medium">
                      Start Year
                    </label>
                    <select
                      value={ed.startYear}
                      onChange={(e) =>
                        handleEducationChange(
                          ed.id,
                          "startYear",
                          e.target.value
                        )
                      }
                      required
                      className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                    >
                      <option value="">Select Year</option>
                      {years.map((y) => (
                        <option key={y} value={y.toString()}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
                  <div>
                    <label className="text-[#00000073] font-medium">
                      End Month
                    </label>
                    <select
                      value={ed.endMonth}
                      onChange={(e) =>
                        handleEducationChange(ed.id, "endMonth", e.target.value)
                      }
                      required
                      className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                    >
                      <option value="">Select Month</option>
                      {months.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[#00000073] font-medium">
                      End Year
                    </label>
                    <select
                      value={ed.endYear}
                      onChange={(e) =>
                        handleEducationChange(ed.id, "endYear", e.target.value)
                      }
                      required
                      className="w-full px-4 py-4 bg-[#F4F4F6] focus:outline-none focus:ring-2 focus:ring-[#FEB402] rounded-[15px] mt-2"
                    >
                      <option value="">Select Year</option>
                      {years.map((y) => (
                        <option key={y} value={y.toString()}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addEducationSection}
              className="flex items-center gap-1 bg-[#0B409C29] text-[#0B409C] px-6 py-3 cursor-pointer rounded-full text-[14px]"
            >
              <Plus size={20} />
              <span>Add New Section</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
