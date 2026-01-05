"use client";
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  MoreVertical,
  ChevronDown,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  MapPin,
  UserCheck,
  UserX,
  Loader2
} from 'lucide-react';
import { useDeleteUserMutation, useGetUsersQuery } from '@/redux/services/userApi';
import { useRouter } from 'next/navigation';

export default function UsersManagement() {
  const navigate = useRouter();
  const { data, isLoading, isError, refetch } = useGetUsersQuery();
  const usersData = data?.users || [];
  const [deleteUser] = useDeleteUserMutation();
  console.log('==================hello1==================');
  console.log('==================useGetUsersQuery()==================');
  console.log(useGetUsersQuery());
  console.log('==================useGetUsersQuery()==================');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showActionsDropdown, setShowActionsDropdown] = useState(null);
  
  // Handle View User
  const handleViewUser = (user) => {
    navigate.push(`/users/${user.user_id}`);
  };
  
  // Handle Edit User
  const handleEditUser = (user) => {
    navigate.push(`/users/edit/${user.user_id}`);
  };
  
  // Handle Delete User
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId).unwrap();
        refetch();
        setShowActionsDropdown(null);
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };
  
  // Toggle User Status
  const handleToggleStatus = async (userId, currentStatus) => {
    // You'll need to implement update mutation for status toggle
    console.log('Toggle status for user:', userId, 'to:', !currentStatus);
    // Call update mutation here
  };
  
  // Filter users based on search and filters
  const filteredUsers = usersData?.filter(user => {
    const matchesSearch = 
      user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm);
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);
    
    const matchesRole = 
      roleFilter === 'all' || 
      user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  }) || [];
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get role badge color
  const getRoleColor = (role) => {
    switch(role?.toLowerCase()) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'manager': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'branch-head': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'area-manager': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Get role display name
  const getRoleDisplayName = (role) => {
    switch(role?.toLowerCase()) {
      case 'admin': return 'Admin';
      case 'manager': return 'Manager';
      case 'branch-head': return 'Branch Head';
      case 'area-manager': return 'Area Manager';
      default: return 'User';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800">Error Loading Users</h3>
            <p className="mt-2 text-sm text-gray-600">Failed to load users. Please try again.</p>
            <button
              onClick={refetch}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor all user accounts ({filteredUsers.length} users)
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Add New User Button */}
          <button
            onClick={() => navigate.push('/users/add')}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Add New User
          </button>
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          {/* Filter Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
        
        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="branch-head">Branch Head</option>
                <option value="area-manager">Area Manager</option>
                <option value="user">User</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setStatusFilter('all');
                  setRoleFilter('all');
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-700">
          <div className="col-span-3">USER</div>
          <div className="col-span-2">CONTACT</div>
          <div className="col-span-2">ROLE & STATUS</div>
          <div className="col-span-3">ADDITIONAL INFO</div>
          <div className="col-span-2 text-right">ACTIONS</div>
        </div>
        
        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {filteredUsers.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-gray-600">
                {searchTerm || statusFilter !== 'all' || roleFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'No users available in the system'}
              </p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div key={user.user_id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors">
                {/* User Info */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={user.profileImage || '/default-avatar.png'}
                      alt={user.userName}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${user.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{user.userName}</h4>
                    <p className="text-sm text-gray-500">ID: {user.user_id.substring(0, 8)}...</p>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="col-span-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm truncate">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{user.phone}</span>
                    </div>
                  )}
                </div>
                
                {/* Role & Status */}
                <div className="col-span-2 space-y-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {getRoleDisplayName(user.role)}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <span className="text-sm">{user.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
                
                {/* Additional Info */}
                <div className="col-span-3">
                  <div className="flex flex-wrap gap-2">
                    {user.gender && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                        {user.gender}
                      </span>
                    )}
                    {user.dateOfBirth && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                        <Calendar className="w-3 h-3" />
                        {formatDate(user.dateOfBirth)}
                      </div>
                    )}
                    {user.address && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg truncate max-w-[200px]">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{user.address}</span>
                      </div>
                    )}
                  </div>
                  {user.createdAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      Joined {formatDate(user.createdAt)}
                    </p>
                  )}
                </div>
                
                {/* Actions */}
                <div className="col-span-2 relative">
                  <div className="flex items-center justify-end gap-2">
                    {/* Quick Actions */}
                    <button
                      onClick={() => handleViewUser(user)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleEditUser(user)}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    {/* More Options Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setShowActionsDropdown(showActionsDropdown === user.user_id ? null : user.user_id)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      
                      {showActionsDropdown === user.user_id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                handleToggleStatus(user.user_id, user.isActive);
                                setShowActionsDropdown(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {user.isActive ? (
                                <>
                                  <UserX className="w-4 h-4 mr-3" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <UserCheck className="w-4 h-4 mr-3" />
                                  Activate
                                </>
                              )}
                            </button>
                            
                            <button
                              onClick={() => handleDeleteUser(user.user_id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 mr-3" />
                              Delete User
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Table Footer */}
        {filteredUsers.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredUsers.length}</span> of{' '}
              <span className="font-medium">{usersData?.length || 0}</span> users
            </p>
            
            <div className="flex items-center gap-2">
              <button
                onClick={refetch}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Refresh
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{usersData?.length || 0}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {usersData?.filter(u => u.isActive).length || 0}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactive Users</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {usersData?.filter(u => !u.isActive).length || 0}
              </h3>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <UserX className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Admins</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {usersData?.filter(u => u.role?.toLowerCase() === 'admin').length || 0}
              </h3>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Building className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}