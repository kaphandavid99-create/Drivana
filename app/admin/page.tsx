"use client";

import { useUser } from "@clerk/nextjs";
import { 
  Car, 
  Users, 
  Image, 
  FileText, 
  TrendingUp, 
  DollarSign,
  Eye,
  Calendar
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useUser();

  // Mock data - in a real app, this would come from your database
  const stats = [
    {
      title: "Total Cars",
      value: "24",
      change: "+12%",
      icon: Car,
      color: "bg-blue-500"
    },
    {
      title: "Total Users", 
      value: "1,429",
      change: "+23%",
      icon: Users,
      color: "bg-green-500"
    },
    {
      title: "Images Uploaded",
      value: "342",
      change: "+8%",
      icon: Image,
      color: "bg-purple-500"
    },
    {
      title: "Content Pages",
      value: "18",
      change: "+5%",
      icon: FileText,
      color: "bg-orange-500"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "New car added",
      details: "Tesla Model 3 - 2024",
      time: "2 hours ago",
      user: "John Doe"
    },
    {
      id: 2,
      action: "User registration",
      details: "New user signed up",
      time: "3 hours ago", 
      user: "System"
    },
    {
      id: 3,
      action: "Image uploaded",
      details: "Car gallery updated",
      time: "5 hours ago",
      user: "Jane Smith"
    },
    {
      id: 4,
      action: "Content updated",
      details: "About page modified",
      time: "1 day ago",
      user: "Admin"
    }
  ];

  return (
    <div className="space-y-8 pt-24">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">
          Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.details}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                  <p className="text-gray-500 text-xs">{activity.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-center">
              <Car size={24} className="mx-auto mb-2 text-sky-400" />
              <p className="text-white text-sm">Add Car</p>
            </button>
            <button className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-center">
              <Image size={24} className="mx-auto mb-2 text-sky-400" />
              <p className="text-white text-sm">Upload Image</p>
            </button>
            <button className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-center">
              <Users size={24} className="mx-auto mb-2 text-sky-400" />
              <p className="text-white text-sm">View Users</p>
            </button>
            <button className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-center">
              <FileText size={24} className="mx-auto mb-2 text-sky-400" />
              <p className="text-white text-sm">Edit Content</p>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Analytics Overview</h2>
          <select className="bg-gray-700 text-white px-3 py-1 rounded-lg border border-gray-600">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Eye size={20} className="text-sky-400 mr-2" />
              <span className="text-2xl font-bold text-white">8,432</span>
            </div>
            <p className="text-gray-400">Page Views</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users size={20} className="text-green-400 mr-2" />
              <span className="text-2xl font-bold text-white">1,234</span>
            </div>
            <p className="text-gray-400">Unique Visitors</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar size={20} className="text-purple-400 mr-2" />
              <span className="text-2xl font-bold text-white">3.2</span>
            </div>
            <p className="text-gray-400">Avg. Session Duration</p>
          </div>
        </div>
      </div>
    </div>
  );
}
