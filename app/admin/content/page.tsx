"use client";

import { useState } from "react";
import { FileText, Edit, Trash2, Plus, Save, X, Eye } from "lucide-react";

interface ContentPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: "published" | "draft";
  lastModified: string;
  author: string;
}

export default function ContentManagement() {
  const [pages, setPages] = useState<ContentPage[]>([
    {
      id: 1,
      title: "About Us",
      slug: "about",
      content: "Learn more about Drivana and our mission...",
      status: "published",
      lastModified: "2024-01-15",
      author: "Admin"
    },
    {
      id: 2,
      title: "Contact",
      slug: "contact",
      content: "Get in touch with our team...",
      status: "published",
      lastModified: "2024-01-14",
      author: "Jane Smith"
    },
    {
      id: 3,
      title: "Privacy Policy",
      slug: "privacy",
      content: "Our privacy policy and data handling...",
      status: "draft",
      lastModified: "2024-01-13",
      author: "Admin"
    },
    {
      id: 4,
      title: "Terms of Service",
      slug: "terms",
      content: "Terms and conditions for using Drivana...",
      status: "published",
      lastModified: "2024-01-12",
      author: "Admin"
    }
  ]);

  const [editingPage, setEditingPage] = useState<ContentPage | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newPage, setNewPage] = useState<Pick<ContentPage, 'title' | 'slug' | 'content' | 'status'>>({
    title: "",
    slug: "",
    content: "",
    status: "draft"
  });

  const handleEdit = (page: ContentPage) => {
    setEditingPage({ ...page });
  };

  const handleSave = () => {
    if (editingPage) {
      setPages(prev => prev.map(p => 
        p.id === editingPage.id 
          ? { ...editingPage, lastModified: new Date().toISOString().split('T')[0] }
          : p
      ));
      setEditingPage(null);
    }
  };

  const handleCreate = () => {
    const page: ContentPage = {
      id: Date.now(),
      ...newPage,
      lastModified: new Date().toISOString().split('T')[0],
      author: "Admin"
    };
    setPages(prev => [page, ...prev]);
    setNewPage({ title: "", slug: "", content: "", status: "draft" });
    setIsCreating(false);
  };

  const handleDelete = (id: number) => {
    setPages(prev => prev.filter(p => p.id !== id));
  };

  const handlePublish = (id: number) => {
    setPages(prev => prev.map(p => 
      p.id === id ? { ...p, status: "published" } : p
    ));
  };

  return (
    <div className="space-y-8 pt-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Content Management</h1>
          <p className="text-gray-400">Manage your website content and pages</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
        >
          <Plus size={20} />
          <span>New Page</span>
        </button>
      </div>

      {/* Create New Page Modal */}
      {isCreating && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Create New Page</h2>
            <button
              onClick={() => setIsCreating(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Page Title</label>
              <input
                type="text"
                value={newPage.title}
                onChange={(e) => setNewPage(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                placeholder="Enter page title"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">URL Slug</label>
              <input
                type="text"
                value={newPage.slug}
                onChange={(e) => setNewPage(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                placeholder="enter-url-slug"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Content</label>
              <textarea
                value={newPage.content}
                onChange={(e) => setNewPage(prev => ({ ...prev, content: e.target.value }))}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none h-32"
                placeholder="Enter page content..."
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 text-white">
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={newPage.status === "draft"}
                    onChange={(e) => setNewPage(prev => ({ ...prev, status: "draft" }))}
                    className="text-sky-600"
                  />
                  <span>Draft</span>
                </label>
                <label className="flex items-center space-x-2 text-white">
                  <input
                    type="radio"
                    name="status"
                    value="published"
                    checked={newPage.status === "published"}
                    onChange={(e) => setNewPage(prev => ({ ...prev, status: "published" }))}
                    className="text-sky-600"
                  />
                  <span>Published</span>
                </label>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                >
                  Create Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pages List */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">All Pages</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-medium py-3 px-4">Page</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Status</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Author</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Last Modified</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-b border-gray-700">
                  <td className="py-3 px-4">
                    {editingPage?.id === page.id ? (
                      <input
                        type="text"
                        value={editingPage.title}
                        onChange={(e) => setEditingPage(prev => prev ? { ...prev, title: e.target.value } : null)}
                        className="bg-gray-700 text-white px-2 py-1 rounded border border-gray-600 focus:border-sky-500 focus:outline-none"
                      />
                    ) : (
                      <div>
                        <p className="text-white font-medium">{page.title}</p>
                        <p className="text-gray-400 text-sm">/{page.slug}</p>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {editingPage?.id === page.id ? (
                      <select
                        value={editingPage.status}
                        onChange={(e) => setEditingPage(prev => prev ? { ...prev, status: e.target.value as "published" | "draft" } : null)}
                        className="bg-gray-700 text-white px-2 py-1 rounded border border-gray-600 focus:border-sky-500 focus:outline-none"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    ) : (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        page.status === "published" 
                          ? "bg-green-600 text-white" 
                          : "bg-gray-600 text-gray-300"
                      }`}>
                        {page.status}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-300">{page.author}</td>
                  <td className="py-3 px-4 text-gray-300">{page.lastModified}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {editingPage?.id === page.id ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="p-1 text-green-400 hover:text-green-300 transition-colors"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            onClick={() => setEditingPage(null)}
                            className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(page)}
                            className="p-1 text-sky-400 hover:text-sky-300 transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-300 transition-colors">
                            <Eye size={16} />
                          </button>
                          {page.status === "draft" && (
                            <button
                              onClick={() => handlePublish(page.id)}
                              className="p-1 text-green-400 hover:text-green-300 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(page.id)}
                            className="p-1 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Editor (when editing) */}
      {editingPage && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Edit Content</h2>
            <button
              onClick={() => setEditingPage(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">URL Slug</label>
              <input
                type="text"
                value={editingPage.slug}
                onChange={(e) => setEditingPage(prev => prev ? { ...prev, slug: e.target.value } : null)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Page Content</label>
              <textarea
                value={editingPage.content}
                onChange={(e) => setEditingPage(prev => prev ? { ...prev, content: e.target.value } : null)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none h-64"
                placeholder="Enter page content..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
