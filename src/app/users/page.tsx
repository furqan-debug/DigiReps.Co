"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  _id: string;
  fullname: string;
  email: string;
  role: string;
  isPublic: boolean;
}

function AccessDenied() {
  return (
    <div className="flex items-center justify-center h-[80vh] bg-gray-50">
      <div className="max-w-sm w-full text-center p-6 bg-white rounded-2xl shadow">
        <svg
          className="mx-auto mb-4 h-12 w-12 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Whoops!</h2>
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bgColorBlue text-white rounded-full sm:px-11 px-6 py-4 animated-button overflow-x-hidden cursor-pointer"
        >
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [authed, setAuthed] = useState<boolean>(false);
  const [adminCreds, setCreds] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  useEffect(() => {
    const pwd = window.prompt("Enter admin password:");
    if (!pwd) return;
    const creds = btoa(`admin:${pwd}`);
    fetch(`${process.env.NEXT_PUBLIC_URI}/api/users`, {
      headers: { Authorization: `Basic ${creds}` },
    }).then(async (r) => {
      if (r.ok) {
        setCreds(creds);
        setAuthed(true);
        setUsers(await r.json());
      } else {
        alert("Invalid password");
      }
    });
  }, []);

  if (!authed) return <AccessDenied />;

  const toggle = async (id: string, current: boolean) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URI}/api/users/${id}/visibility`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${adminCreds}`,
        },
        body: JSON.stringify({ isPublic: !current }),
      }
    );
    if (!res.ok) {
      alert("Failed to update visibility");
      return;
    }
    const upd = await res.json();
    // setUsers(users.map((u) => (u._id === upd._id ? upd : u)));
    setUsers(users.map((u) => (u._id === upd._id ? { ...u, ...upd } : u)));
  };

  const deleteUser = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${adminCreds}`,
      },
    });

    if (!res.ok) {
      alert("Failed to delete user.");
      return;
    }

    setUsers(users.filter((u) => u._id !== id));
  };

  const filteredUsers = users.filter((user) => {
    const matchesName = user.fullname
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole =
      selectedRoles.length === 0 || selectedRoles.includes(user.role);
    return matchesName && matchesRole;
  });

  const roleCounts: Record<string, number> = users.reduce((acc, user) => {
    const role = user.role || "Incomplete Profile";
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-[80vh]">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">All Users</h1>
        <p className="text-gray-600 text-sm mb-4">
          Manage user visibility and access
        </p>
        <p className="text-gray-600 text-sm mb-4">
          Total Users: {filteredUsers.length}
        </p>
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            Filter by Role
          </h3>
          <div className="flex flex-wrap gap-3 items-center">
            {Array.from(new Set(users.map((u) => u.role))).map((role) => {
              const displayRole = role !== "" ? role : "Incomplete Profile";
              const count = roleCounts[displayRole] || 0;

              return (
                <label
                  key={role}
                  className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 transition-all"
                >
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(role)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRoles([...selectedRoles, role]);
                      } else {
                        setSelectedRoles(
                          selectedRoles.filter((r) => r !== role)
                        );
                      }
                    }}
                    className="form-checkbox text-blue-600 mr-2"
                  />
                  <span className="text-sm capitalize">
                    {displayRole} ({count})
                  </span>
                </label>
              );
            })}

            {selectedRoles.length > 0 && (
              <button
                onClick={() => setSelectedRoles([])}
                className="text-sm text-red-600 underline ml-2 hover:text-red-700 cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="space-y-3">
        {filteredUsers.map((user: User) => (
          <div
            key={user._id}
            className="grid grid-cols-15 gap-6 w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <Link href={`/users/${user._id}`} className="col-span-4">
              <p className="text-gray-900 font-medium hover:text-blue-600 transition-colors">
                {user.fullname}
              </p>
            </Link>
            <p className="text-gray-900 font-medium col-span-4">
              {user.role}
            </p>
            <p className="text-gray-900 font-medium col-span-4">
              {user.email}
            </p>

            <div className="flex items-center space-x-3 ml-4 col-span-2">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  user.isPublic
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {user.isPublic ? "Public" : "Private"}
              </span>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.isPublic}
                  onChange={() => toggle(user._id, user.isPublic)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>

              <button
                onClick={() => deleteUser(user._id)}
                className="text-red-600 hover:text-red-800 text-sm cursor-pointer"
                title="Delete User"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
          </div>
          <p className="text-gray-500">No users found</p>
        </div>
      )}
    </div>
  );
}
