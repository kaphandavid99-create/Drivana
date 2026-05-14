"use client";

import { useState } from "react";
import { Image, Upload, X, Download, Trash2, Eye } from "lucide-react";

export default function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState([
    {
      id: 1,
      name: "tesla-model-3-front.jpg",
      url: "/api/placeholder/300/200",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      category: "Car Images"
    },
    {
      id: 2,
      name: "bmw-x5-side.jpg",
      url: "/api/placeholder/300/200",
      size: "1.8 MB",
      uploadDate: "2024-01-14",
      category: "Car Images"
    },
    {
      id: 3,
      name: "logo-dark.png",
      url: "/api/placeholder/300/200",
      size: "45 KB",
      uploadDate: "2024-01-13",
      category: "Logos"
    }
  ]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    // In a real app, this would upload to your server/cloud storage
    const newImages = selectedFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      url: URL.createObjectURL(file),
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split('T')[0],
      category: "Uncategorized"
    }));
    
    setUploadedImages(prev => [...newImages, ...prev]);
    setSelectedFiles([]);
  };

  const deleteImage = (id: number) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="space-y-8 pt-24">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Image Management</h1>
        <p className="text-gray-400">Upload and manage images for your website</p>
      </div>

      {/* Upload Section */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Upload Images</h2>
        
        {/* Drag & Drop Area */}
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-sky-500 transition-colors">
          <Upload size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-white mb-2">Drag and drop images here</p>
          <p className="text-gray-400 text-sm mb-4">or</p>
          <label className="inline-block">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <span className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors cursor-pointer">
              Browse Files
            </span>
          </label>
          <p className="text-gray-500 text-xs mt-4">Supported formats: JPG, PNG, GIF, WebP (Max 10MB)</p>
        </div>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-white font-medium mb-3">Selected Files</h3>
            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Image size={20} className="text-gray-400" />
                    <div>
                      <p className="text-white text-sm">{file.name}</p>
                      <p className="text-gray-400 text-xs">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleUpload}
              className="w-full mt-4 bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Upload {selectedFiles.length} {selectedFiles.length === 1 ? 'File' : 'Files'}
            </button>
          </div>
        )}
      </div>

      {/* Image Gallery */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Uploaded Images</h2>
        
        {uploadedImages.length === 0 ? (
          <div className="text-center py-12">
            <Image size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-400">No images uploaded yet</p>
            <p className="text-gray-500 text-sm">Upload your first image using the form above</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedImages.map((image) => (
              <div key={image.id} className="bg-gray-700 rounded-lg overflow-hidden group">
                <div className="relative aspect-video">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button
                      onClick={() => window.open(image.url, '_blank')}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      title="View"
                    >
                      <Eye size={16} className="text-white" />
                    </button>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = image.url;
                        link.download = image.name;
                        link.click();
                      }}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      title="Download"
                    >
                      <Download size={16} className="text-white" />
                    </button>
                    <button
                      onClick={() => deleteImage(image.id)}
                      className="p-2 bg-red-500/80 rounded-full hover:bg-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} className="text-white" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium text-sm mb-1 truncate">{image.name}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{image.size}</span>
                    <span>{image.uploadDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
