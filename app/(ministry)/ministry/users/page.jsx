"use client";

import { useEffect, useState } from "react";
import { User, Search, Shield, MoreVertical } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: "usr_1",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "investor",
      status: "active",
      joined: "2026-01-15",
    },
    {
      id: "usr_2",
      name: "John Doe",
      email: "john.d@example.com",
      role: "owner",
      status: "active",
      joined: "2026-02-10",
    },
    {
      id: "usr_3",
      name: "Bob Smith",
      email: "bob.smith@example.com",
      role: "owner",
      status: "suspended",
      joined: "2025-11-20",
    },
    {
      id: "usr_4",
      name: "Sarah Connor",
      email: "s.connor@example.com",
      role: "investor",
      status: "active",
      joined: "2026-03-05",
    },
  ]);

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          User Management
        </h1>
        <p className="text-gray-500 font-medium">
          Manage platform users, roles, and account statuses.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:max-w-md">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-[#9afb21] focus:border-[#9afb21] outline-none"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium w-full sm:w-auto outline-none">
              <option>All Roles</option>
              <option>investor</option>
              <option>owner</option>
            </select>
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-white border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm uppercase">
                User
              </th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm uppercase">
                Role
              </th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm uppercase">
                Status
              </th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm uppercase">
                Joined
              </th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-sm font-bold text-gray-700 capitalize">
                    {user.role === "owner" ? (
                      <Shield size={14} className="text-blue-500" />
                    ) : (
                      <User size={14} className="text-green-500" />
                    )}
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-500">
                  {new Date(user.joined).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
