import { useDispatch, useSelector } from "react-redux";
import { addMobile } from "../features/mobile/mobileSlice";
import { useState } from "react";
import { 
  DevicePhoneMobileIcon, 
  PlusCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  ArrowPathIcon 
} from "@heroicons/react/24/outline";

export default function AddMobile() {
  const dispatch = useDispatch();
  const { list, lastUpdated, totalAdded } = useSelector((state) => state.mobiles);

  const [form, setForm] = useState({
    name: "",
    brand: "Apple",
    price: "",
    storage: "128GB",
    color: "#3B82F6",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const mobileData = {
      id: Date.now(),
      ...form,
      price: parseFloat(form.price) || 0,
    };
    
    dispatch(addMobile(mobileData));
    setShowSuccess(true);
    
    // Reset form
    setForm({
      name: "",
      brand: "Apple",
      price: "",
      storage: "128GB",
      color: "#3B82F6",
    });
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const brands = ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "OPPO", "Vivo", "Realme"];
  const storageOptions = ["64GB", "128GB", "256GB", "512GB", "1TB"];
  const colorOptions = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Black", value: "#1F2937" },
    { name: "White", value: "#F3F4F6" },
    { name: "Red", value: "#EF4444" },
    { name: "Green", value: "#10B981" },
    { name: "Purple", value: "#8B5CF6" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <PlusCircleIcon className="h-10 w-10" />
              <h1 className="text-3xl font-bold">Add New Mobile</h1>
            </div>
            <p className="text-indigo-100">Add mobile devices to your inventory</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-indigo-200">Total Mobiles</p>
            <p className="text-4xl font-bold">{list.length}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            {showSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3 animate-fade-in">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800">Mobile Added Successfully!</p>
                  <p className="text-sm text-green-600">The mobile has been added to your inventory.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mobile Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., iPhone 15 Pro Max"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Brand */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brand *
                  </label>
                  <select
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white"
                  >
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (PKR) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-500">Rs</span>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      required
                      min="0"
                      placeholder="250000"
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Storage */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Storage
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {storageOptions.map(storage => (
                      <button
                        key={storage}
                        type="button"
                        onClick={() => setForm({...form, storage})}
                        className={`px-4 py-2 rounded-lg transition-all duration-200 ${form.storage === storage ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        {storage}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {colorOptions.map(color => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setForm({...form, color: color.value})}
                        className="flex flex-col items-center space-y-1 group"
                      >
                        <div 
                          className={`w-10 h-10 rounded-full border-4 transition-all duration-200 ${form.color === color.value ? 'border-indigo-500 scale-110' : 'border-gray-200 group-hover:scale-105'}`}
                          style={{ backgroundColor: color.value }}
                        />
                        <span className="text-xs text-gray-600">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center space-x-2">
                  <PlusCircleIcon className="h-6 w-6" />
                  <span>Add to Inventory</span>
                </div>
              </button>
            </form>
          </div>
        </div>

        {/* RTK Details Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-xl p-6 text-white sticky top-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <InformationCircleIcon className="h-6 w-6 text-indigo-400" />
              </div>
              <h2 className="text-xl font-bold">Redux Toolkit Status</h2>
            </div>

            <div className="space-y-6">
              {/* RTK Info Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <h3 className="font-semibold text-gray-300 mb-3">Store Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Slice Name:</span>
                    <code className="px-2 py-1 bg-gray-900 rounded text-sm">mobiles</code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Items:</span>
                    <span className="text-2xl font-bold text-indigo-400">{list.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Last Updated:</span>
                    <span className="text-sm">{lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Never'}</span>
                  </div>
                </div>
              </div>

              {/* Actions Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <h3 className="font-semibold text-gray-300 mb-3">Available Actions</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <code className="text-sm font-mono text-green-400">addMobile()</code>
                    <span className="text-xs text-gray-400 ml-auto">Called: {totalAdded} times</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                    <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                    <code className="text-sm font-mono text-red-400">removeMobile()</code>
                  </div>
                </div>
              </div>

              {/* State Structure */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <h3 className="font-semibold text-gray-300 mb-3">State Structure</h3>
                <pre className="text-xs font-mono text-gray-300 bg-black/30 p-3 rounded-lg overflow-x-auto">
{`{
  list: [{
    id: number,
    name: string,
    brand: string,
    price: number,
    storage: string,
    color: string,
    createdAt: string
  }],
  status: "idle",
  lastUpdated: string,
  totalAdded: number,
  totalDeleted: number
}`}
                </pre>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-4 border border-indigo-500/30">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Quick Stats</h3>
                  <ArrowPathIcon className="h-5 w-5 text-indigo-400" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{list.length}</p>
                    <p className="text-xs text-gray-300">Current</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{totalAdded}</p>
                    <p className="text-xs text-gray-300">Total Added</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}