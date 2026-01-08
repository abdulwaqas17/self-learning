"use client";
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useGetUsersQuery } from '@/redux/services/userApi';
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  Building,
  Users,
  Edit,
  Download,
  Printer,
  Share2,
  UserCheck,
  UserX,
  Clock,
  Copy,
  MoreVertical
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ViewUserPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: usersData, isLoading } = useGetUsersQuery();
  const [showMoreActions, setShowMoreActions] = useState(false);
  
  // Find the user by ID
  const user = usersData?.users?.find(u => u.user_id === id);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-purple-100 text-purple-800';
      case 'branch-head': return 'bg-blue-100 text-blue-800';
      case 'area-manager': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': return <Shield className="w-3 h-3" />;
      case 'branch-head': return <Building className="w-3 h-3" />;
      default: return <User className="w-3 h-3" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/users')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Users
          </button>
          
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserX className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">User Not Found</h2>
            <p className="text-gray-600 mb-6">The requested user could not be found.</p>
            <button
              onClick={() => router.push('/users')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Return to Users
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push('/users')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Users
        </button>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
              <p className="text-gray-600">View user information</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMoreActions(!showMoreActions)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 relative"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
              
              {showMoreActions && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="py-1">
                    <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                    <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Printer className="w-4 h-4 mr-2" />
                      Print
                    </button>
                  </div>
                </div>
              )}
            </button>
            
            <button
              onClick={() => router.push(`/users/edit/${id}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <img
                    src={user.profileImage || '/default-avatar.png'}
                    alt={user.userName}
                    className="w-24 h-24 rounded-full border-2 border-white shadow"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    user.isActive ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{user.userName}</h2>
                <p className="text-gray-600 text-sm mb-3">{user.email}</p>
                
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                  {getRoleIcon(user.role)}
                  {user.role}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Status</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Joined</span>
                  <span className="font-medium text-sm">{formatDate(user.createdAt)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Last Updated</span>
                  <span className="font-medium text-sm">{formatDate(user.updatedAt)}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(user.email)}
                    className="flex-1 py-2 px-3 bg-blue-50 text-blue-700 rounded text-sm hover:bg-blue-100"
                  >
                    Copy Email
                  </button>
                  <button
                    onClick={() => window.location.href = `mailto:${user.email}`}
                    className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                  >
                    Send Email
                  </button>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Account Information</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-600 text-sm">User ID</span>
                    <button
                      onClick={() => copyToClipboard(user.user_id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{user.user_id}</p>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-600 text-sm">Profile Complete</span>
                    <span className="text-sm font-medium text-blue-600">85%</span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Contact Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-600 text-sm">Email Address</span>
                      <button
                        onClick={() => copyToClipboard(user.email)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  
                  <div>
                    <div className="text-gray-600 text-sm mb-1">Phone Number</div>
                    <p className="font-medium">
                      {user.phone || (
                        <span className="text-gray-400">Not provided</span>
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <div className="text-gray-600 text-sm mb-1">Address</div>
                    <p className="font-medium">
                      {user.address || (
                        <span className="text-gray-400">Not provided</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  Personal Details
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-600 text-sm mb-1">Gender</div>
                    <p className="font-medium">
                      {user.gender ? (
                        user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
                      ) : (
                        <span className="text-gray-400">Not specified</span>
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <div className="text-gray-600 text-sm mb-1">Date of Birth</div>
                    <p className="font-medium">
                      {user.dateOfBirth ? formatDate(user.dateOfBirth) : (
                        <span className="text-gray-400">Not provided</span>
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <div className="text-gray-600 text-sm mb-1">Account Created</div>
                    <p className="font-medium">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Role & Permissions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-500" />
                Role & Permissions
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium ${getRoleColor(user.role)}`}>
                    {getRoleIcon(user.role)}
                    {user.role}
                  </div>
                  <p className="text-gray-600 text-sm mt-2">
                    {user.role === 'admin' && 'Full administrative access to all system features.'}
                    {user.role === 'manager' && 'Can manage team members and view reports.'}
                    {user.role === 'branch-head' && 'Manages a single branch.'}
                    {user.role === 'area-manager' && 'Oversees multiple branches.'}
                    {user.role === 'user' && 'Standard user with basic access.'}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-medium text-gray-900 text-sm mb-1">Active Sessions</div>
                    <div className="text-2xl font-bold text-blue-600">1</div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-medium text-gray-900 text-sm mb-1">Total Logins</div>
                    <div className="text-2xl font-bold text-green-600">142</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <button
                  onClick={() => window.location.href = `mailto:${user.email}`}
                  className="p-3 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                >
                  <Mail className="w-5 h-5 mx-auto mb-2" />
                  <div className="font-medium text-sm">Send Email</div>
                </button>
                
                <button
                  onClick={() => router.push(`/users/edit/${id}`)}
                  className="p-3 bg-gray-50 text-gray-700 rounded hover:bg-gray-100"
                >
                  <Edit className="w-5 h-5 mx-auto mb-2" />
                  <div className="font-medium text-sm">Edit Profile</div>
                </button>
                
                <button
                  onClick={() => toast.success('Password reset link sent')}
                  className="p-3 bg-gray-50 text-gray-700 rounded hover:bg-gray-100"
                >
                  <Shield className="w-5 h-5 mx-auto mb-2" />
                  <div className="font-medium text-sm">Reset Password</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}