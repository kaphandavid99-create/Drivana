"use client";

import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer, 
  Clock,
  Calendar,
  Download,
  Filter
} from "lucide-react";

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("visitors");

  // Mock analytics data
  const overviewStats = [
    {
      title: "Total Visitors",
      value: "12,432",
      change: "+23.5%",
      icon: Users,
      color: "bg-blue-500",
      trend: "up"
    },
    {
      title: "Page Views",
      value: "45,678",
      change: "+12.3%",
      icon: Eye,
      color: "bg-green-500",
      trend: "up"
    },
    {
      title: "Avg. Session Duration",
      value: "3m 24s",
      change: "+8.7%",
      icon: Clock,
      color: "bg-purple-500",
      trend: "up"
    },
    {
      title: "Bounce Rate",
      value: "42.3%",
      change: "-5.2%",
      icon: TrendingUp,
      color: "bg-orange-500",
      trend: "down"
    }
  ];

  const trafficSources = [
    { source: "Direct", visitors: 3421, percentage: 27.5, color: "bg-blue-500" },
    { source: "Organic Search", visitors: 2890, percentage: 23.2, color: "bg-green-500" },
    { source: "Social Media", visitors: 1876, percentage: 15.1, color: "bg-purple-500" },
    { source: "Referral", visitors: 1567, percentage: 12.6, color: "bg-orange-500" },
    { source: "Email", visitors: 1234, percentage: 9.9, color: "bg-red-500" },
    { source: "Other", visitors: 1444, percentage: 11.7, color: "bg-gray-500" }
  ];

  const topPages = [
    { page: "/", visitors: 3421, views: 8923, avgTime: "2m 15s", bounceRate: "38.2%" },
    { page: "/cars", visitors: 2876, views: 12456, avgTime: "4m 32s", bounceRate: "31.5%" },
    { page: "/about", visitors: 1543, views: 2876, avgTime: "3m 18s", bounceRate: "45.7%" },
    { page: "/contact", visitors: 987, views: 1234, avgTime: "1m 45s", bounceRate: "52.3%" },
    { page: "/blog", visitors: 765, views: 987, avgTime: "5m 12s", bounceRate: "28.9%" }
  ];

  const recentActivity = [
    { time: "2 hours ago", action: "Traffic spike detected", details: "+45% increase in visitors" },
    { time: "5 hours ago", action: "New page published", details: "Tesla Model X page added" },
    { time: "1 day ago", action: "Campaign launched", details: "Social media campaign started" },
    { time: "2 days ago", action: "Server maintenance", details: "Minor downtime recorded" }
  ];

  return (
    <div className="space-y-8 pt-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Track your website performance and user behavior</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-sky-500 focus:outline-none"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors">
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.trend === "up" ? "text-green-400" : "text-red-400"
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Traffic Sources & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Traffic Sources</h2>
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                  <span className="text-white text-sm">{source.source}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-sm">{source.visitors.toLocaleString()}</span>
                  <span className="text-white text-sm font-medium">{source.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Top Pages</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 font-medium py-2 text-sm">Page</th>
                  <th className="text-left text-gray-400 font-medium py-2 text-sm">Visitors</th>
                  <th className="text-left text-gray-400 font-medium py-2 text-sm">Bounce</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-3">
                      <p className="text-white text-sm font-medium">{page.page}</p>
                      <p className="text-gray-400 text-xs">{page.views.toLocaleString()} views</p>
                    </td>
                    <td className="py-3 text-gray-300 text-sm">{page.visitors.toLocaleString()}</td>
                    <td className="py-3">
                      <span className="text-gray-300 text-sm">{page.bounceRate}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Visitor Chart */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Visitor Trends</h2>
          <div className="flex items-center space-x-2">
            {["visitors", "pageViews", "sessionDuration"].map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  selectedMetric === metric
                    ? "bg-sky-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {metric === "visitors" ? "Visitors" : metric === "pageViews" ? "Page Views" : "Session Duration"}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mock Chart */}
        <div className="h-64 flex items-center justify-center bg-gray-700 rounded-lg">
          <div className="text-center">
            <BarChart3 size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-400">Interactive chart would be displayed here</p>
            <p className="text-gray-500 text-sm mt-2">Showing {selectedMetric} over selected period</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-700 last:border-0">
              <div className="p-2 bg-gray-700 rounded-lg">
                <TrendingUp size={16} className="text-sky-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{activity.action}</p>
                <p className="text-gray-400 text-sm">{activity.details}</p>
              </div>
              <span className="text-gray-500 text-xs">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Device & Browser Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Stats */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Device Categories</h2>
          <div className="space-y-4">
            {[
              { device: "Desktop", users: 6234, percentage: 50.1 },
              { device: "Mobile", users: 4876, percentage: 39.2 },
              { device: "Tablet", users: 1322, percentage: 10.7 }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm">{item.device}</span>
                  <span className="text-gray-400 text-sm">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-sky-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browser Stats */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Top Browsers</h2>
          <div className="space-y-4">
            {[
              { browser: "Chrome", users: 7890, percentage: 63.4 },
              { browser: "Safari", users: 2345, percentage: 18.8 },
              { browser: "Firefox", users: 1234, percentage: 9.9 },
              { browser: "Edge", users: 987, percentage: 7.9 }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm">{item.browser}</span>
                  <span className="text-gray-400 text-sm">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
