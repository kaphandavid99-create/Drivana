"use client";

import { useState } from "react";
import { 
  Users, 
  Mail, 
  Calendar, 
  Shield, 
  Ban, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  MoreVertical,
  UserPlus,
  Crown
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  status: "active" | "inactive" | "banned";
  joinDate: string;
  lastActive: string;
  avatar?: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-01-20"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "user",
      status: "active",
      joinDate: "2024-01-10",
      lastActive: "2024-01-19"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@example.com",
      role: "moderator",
      status: "active",
      joinDate: "2024-01-08",
      lastActive: "2024-01-18"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.w@example.com",
      role: "user",
      status: "inactive",
      joinDate: "2024-01-05",
      lastActive: "2024-01-12"
    },
    {
      id: 5,
      name: "Tom Brown",
      email: "tom.brown@example.com",
      role: "user",
      status: "banned",
      joinDate: "2024-01-03",
      lastActive: "2024-01-10"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleRoleChange = (userId: number, newRole: User["role"]) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleStatusChange = (userId: number, newStatus: User["status"]) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const getRoleIcon = (role: User["role"]) => {
    switch (role) {
      case "admin": return <Crown size={16} className="text-yellow-400" />;
      case "moderator": return <Shield size={16} className="text-blue-400" />;
      default: return <Users size={16} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "active": return "bg-green-600 text-white";
      case "inactive": return "bg-gray-600 text-gray-300";
      case "banned": return "bg-red-600 text-white";
      default: return "bg-gray-600 text-gray-300";
    }
  };

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    admins: users.filter(u => u.role === "admin").length,
    banned: users.filter(u => u.status === "banned").length
  };

  return (
    <div className="space-y-8 pt-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">Manage users, roles, and permissions</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors">
          <UserPlus size={20} />
          <span>Invite User</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Users size={24} className="text-gray-400" />
            <span className="text-2xl font-bold text-white">{userStats.total}</span>
          </div>
          <p className="text-gray-400 text-sm">Total Users</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            <span className="text-2xl font-bold text-white">{userStats.active}</span>
          </div>
          <p className="text-gray-400 text-sm">Active Users</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Crown size={24} className="text-yellow-400" />
            <span className="text-2xl font-bold text-white">{userStats.admins}</span>
          </div>
          <p className="text-gray-400 text-sm">Administrators</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Ban size={24} className="text-red-400" />
            <span className="text-2xl font-bold text-white">{userStats.banned}</span>
          </div>
          <p className="text-gray-400 text-sm">Banned Users</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">All Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-medium py-3 px-4">User</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Role</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Status</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Join Date</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Last Active</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(user.role)}
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as User["role"])}
                        className="bg-gray-700 text-white px-2 py-1 rounded border border-gray-600 focus:border-sky-500 focus:outline-none text-sm"
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value as User["status"])}
                      className={`px-2 py-1 rounded text-sm font-medium border focus:border-sky-500 focus:outline-none ${getStatusColor(user.status)}`}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="banned">Banned</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{user.joinDate}</td>
                  <td className="py-3 px-4 text-gray-300">{user.lastActive}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-sky-400 hover:text-sky-300 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-300 transition-colors">
                        <Mail size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <Users size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-400">No users found matching your criteria</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center mt-6 space-x-2">
          <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 bg-sky-600 text-white rounded">1</button>
          <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
            2
          </button>
          <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
            3
          </button>
          <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
