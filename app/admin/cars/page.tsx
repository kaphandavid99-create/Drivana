"use client";

import { useState } from "react";
import { 
  Car, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Image,
  DollarSign,
  Calendar,
  Fuel,
  Users,
  Settings
} from "lucide-react";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  type: string;
  status: "available" | "rented" | "maintenance";
  fuelType: string;
  seats: number;
  transmission: string;
  images: string[];
  description: string;
  addedDate: string;
}

export default function CarsManagement() {
  const [cars, setCars] = useState<Car[]>([
    {
      id: 1,
      make: "Tesla",
      model: "Model 3",
      year: 2024,
      price: 45000,
      type: "Sedan",
      status: "available",
      fuelType: "Electric",
      seats: 5,
      transmission: "Automatic",
      images: ["/api/placeholder/300/200"],
      description: "Premium electric sedan with autopilot",
      addedDate: "2024-01-15"
    },
    {
      id: 2,
      make: "BMW",
      model: "X5",
      year: 2023,
      price: 65000,
      type: "SUV",
      status: "rented",
      fuelType: "Gasoline",
      seats: 7,
      transmission: "Automatic",
      images: ["/api/placeholder/300/200"],
      description: "Luxury SUV with advanced features",
      addedDate: "2024-01-14"
    },
    {
      id: 3,
      make: "Mercedes",
      model: "C-Class",
      year: 2024,
      price: 42000,
      type: "Sedan",
      status: "available",
      fuelType: "Hybrid",
      seats: 5,
      transmission: "Automatic",
      images: ["/api/placeholder/300/200"],
      description: "Elegant sedan with hybrid technology",
      addedDate: "2024-01-13"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [isAddingCar, setIsAddingCar] = useState(false);

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || car.status === filterStatus;
    const matchesType = filterType === "all" || car.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: Car["status"]) => {
    switch (status) {
      case "available": return "bg-green-600 text-white";
      case "rented": return "bg-blue-600 text-white";
      case "maintenance": return "bg-orange-600 text-white";
      default: return "bg-gray-600 text-gray-300";
    }
  };

  const carStats = {
    total: cars.length,
    available: cars.filter(c => c.status === "available").length,
    rented: cars.filter(c => c.status === "rented").length,
    maintenance: cars.filter(c => c.status === "maintenance").length
  };

  return (
    <div className="space-y-8 pt-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Cars Management</h1>
          <p className="text-gray-400">Manage your car inventory and listings</p>
        </div>
        <button
          onClick={() => setIsAddingCar(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Car</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Car size={24} className="text-gray-400" />
            <span className="text-2xl font-bold text-white">{carStats.total}</span>
          </div>
          <p className="text-gray-400 text-sm">Total Cars</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            <span className="text-2xl font-bold text-white">{carStats.available}</span>
          </div>
          <p className="text-gray-400 text-sm">Available</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            <span className="text-2xl font-bold text-white">{carStats.rented}</span>
          </div>
          <p className="text-gray-400 text-sm">Rented</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Settings size={24} className="text-orange-400" />
            <span className="text-2xl font-bold text-white">{carStats.maintenance}</span>
          </div>
          <p className="text-gray-400 text-sm">Maintenance</p>
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
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Truck">Truck</option>
            <option value="Coupe">Coupe</option>
          </select>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Car Inventory</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-gray-700 rounded-lg overflow-hidden">
              {/* Car Image */}
              <div className="aspect-video bg-gray-600 relative">
                <img
                  src={car.images[0] || "/api/placeholder/300/200"}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(car.status)}`}>
                    {car.status}
                  </span>
                </div>
              </div>
              
              {/* Car Details */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {car.make} {car.model}
                  </h3>
                  <span className="text-sky-400 font-bold">
                    ${car.price.toLocaleString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Fuel size={14} />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={14} />
                    <span>{car.seats} seats</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Settings size={14} />
                    <span>{car.transmission}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {car.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">
                    Added {car.addedDate}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-sky-400 hover:text-sky-300 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-300 transition-colors">
                      <Image size={16} />
                    </button>
                    <button className="p-1 text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-8">
            <Car size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-400">No cars found matching your criteria</p>
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

      {/* Add Car Modal */}
      {isAddingCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Add New Car</h2>
              <button
                onClick={() => setIsAddingCar(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Make</label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                    placeholder="e.g., Tesla"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Model</label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                    placeholder="e.g., Model 3"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Year</label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                    placeholder="2024"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Price</label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                    placeholder="45000"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Type</label>
                  <select className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none">
                    <option value="">Select Type</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Truck">Truck</option>
                    <option value="Coupe">Coupe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Status</label>
                  <select className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none">
                    <option value="available">Available</option>
                    <option value="rented">Rented</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none h-24"
                  placeholder="Enter car description..."
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsAddingCar(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsAddingCar(false)}
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                >
                  Add Car
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
