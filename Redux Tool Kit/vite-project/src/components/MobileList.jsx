import { useSelector, useDispatch } from "react-redux";
import { editMobile, removeMobile } from "../features/mobile/mobileSlice";
import { 
  TrashIcon, 
  ShoppingBagIcon,
  CurrencyRupeeIcon,
  ArchiveBoxIcon,
  DevicePhoneMobileIcon,
  FunnelIcon,
  XMarkIcon,
  PencilSquareIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function MobileList() {
 
  console.log('Rendering MobileList Component');
  const { lastUpdated, list } = useSelector((state) => state.mobiles);
  const mobiles = list;
  const dispatch = useDispatch();
  
  const [filterBrand, setFilterBrand] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMobile, setEditingMobile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    storage: "",
    color: ""
  });

  // Filter and sort mobiles
  const filteredMobiles = mobiles
    .filter(mobile => filterBrand === "all" || mobile.brand === filterBrand)
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "price-low") return a.price - b.price;
      return 0;
    });

  const brands = [...new Set(mobiles.map(m => m.brand))];
  const totalValue = mobiles.reduce((sum, m) => sum + (parseFloat(m.price) || 0), 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Open edit modal with mobile data
  const handleEditClick = (mobile) => {
    setEditingMobile(mobile);
    setFormData({
      name: mobile.name || "",
      brand: mobile.brand || "",
      price: mobile.price || "",
      storage: mobile.storage || "",
      color: mobile.color || ""
    });
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingMobile(null);
    setFormData({
      name: "",
      brand: "",
      price: "",
      storage: "",
      color: ""
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!editingMobile) return;
    
    const updatedMobile = {
      id: editingMobile.id,
      data: {
        ...editingMobile, // Keep existing properties
        ...formData, // Update with new form data
        price: parseFloat(formData.price) || 0,
        createdAt: editingMobile.createdAt // Preserve original creation date
      }
    };


    
    dispatch(editMobile(updatedMobile));
    console.log('==========mobile after edit==========================');
    console.log(mobiles);
    console.log('==========mobile after edit==========================');  
    handleCloseModal();
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    
    if (isEditModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isEditModalOpen]);

  return (
    <>
      <div className="space-y-8">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Mobiles</p>
                <p className="text-3xl font-bold">{mobiles.length}</p>
              </div>
              <ShoppingBagIcon className="h-10 w-10 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Inventory Value</p>
                <p className="text-3xl font-bold">{formatPrice(totalValue)}</p>
              </div>
              <CurrencyRupeeIcon className="h-10 w-10 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Brands</p>
                <p className="text-3xl font-bold">{brands.length}</p>
              </div>
              <DevicePhoneMobileIcon className="h-10 w-10 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Last Updated</p>
                <p className="text-lg font-bold">
                  {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Never'}
                </p>
              </div>
              <ArchiveBoxIcon className="h-10 w-10 opacity-80" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-500" />
              <h3 className="font-semibold text-gray-700">Filter & Sort</h3>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {/* Brand Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Brand:</span>
                <select 
                  value={filterBrand}
                  onChange={(e) => setFilterBrand(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              
              {/* Sort By */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="price-low">Price: Low to High</option>
                </select>
              </div>
              
              {/* Clear Filters */}
              {(filterBrand !== "all" || sortBy !== "newest") && (
                <button
                  onClick={() => {
                    setFilterBrand("all");
                    setSortBy("newest");
                  }}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  <XMarkIcon className="h-4 w-4" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile List */}
        {filteredMobiles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300">
            <ShoppingBagIcon className="h-20 w-20 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Mobiles Found</h3>
            <p className="text-gray-500 mb-6">
              {filterBrand !== "all" ? `No mobiles found for brand: ${filterBrand}` : "Add your first mobile to get started"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMobiles.map((mobile) => (
              <div
                key={mobile.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden"
              >
                {/* Color Banner */}
                <div 
                  className="h-2 w-full"
                  style={{ backgroundColor: mobile.color || '#3B82F6' }}
                />
                
                {/* Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        mobile.brand === 'Apple' ? 'bg-gray-100 text-gray-800' :
                        mobile.brand === 'Samsung' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {mobile.brand}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mt-2">{mobile.name}</h3>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEditClick(mobile)}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${mobile.name}?`)) {
                            dispatch(removeMobile(mobile.id));
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Price</span>
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(mobile.price)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Storage</span>
                      <span className="font-medium text-gray-900">{mobile.storage}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Color</span>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="h-5 w-5 rounded-full border border-gray-300"
                          style={{ backgroundColor: mobile.color || '#3B82F6' }}
                        />
                        <span className="font-medium text-gray-900">
                          {mobile.color || 'Blue'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Added Date */}
                  {mobile.createdAt && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        Added: {new Date(mobile.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RTK Info Footer */}
        {mobiles.length > 0 && (
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">Redux Toolkit Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Current State</p>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="font-mono">state.mobiles.list</span>
                  <span className="ml-auto">{mobiles.length} items</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Actions Used</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">addMobile</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">editMobile</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">removeMobile</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Last Action</p>
                <p className="font-mono text-sm">
                  {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'No actions yet'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={handleCloseModal}
          />
          
          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div 
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 pt-6 pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Edit Mobile</h3>
                    <p className="text-sm text-gray-500 mt-1">Update mobile details</p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Brand */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand
                    </label>
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Brand</option>
                      <option value="Apple">Apple</option>
                      <option value="Samsung">Samsung</option>
                      <option value="Google">Google</option>
                      <option value="OnePlus">OnePlus</option>
                      <option value="OPPO">OPPO</option>
                      <option value="Vivo">Vivo</option>
                      <option value="Xiaomi">Xiaomi</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (PKR)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      min="0"
                      step="100"
                      required
                    />
                  </div>

                  {/* Storage */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Storage
                    </label>
                    <select
                      name="storage"
                      value={formData.storage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Storage</option>
                      <option value="64GB">64GB</option>
                      <option value="128GB">128GB</option>
                      <option value="256GB">256GB</option>
                      <option value="512GB">512GB</option>
                      <option value="1TB">1TB</option>
                    </select>
                  </div>

                  {/* Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color
                    </label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., Midnight Black"
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Update Mobile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}