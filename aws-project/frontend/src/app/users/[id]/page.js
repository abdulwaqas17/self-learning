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
  MoreVertical,
  Globe,
  FileText,
  MessageSquare
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
      case 'admin': return 'bg-red-50 border-red-200 text-red-700';
      case 'manager': return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'branch-head': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'area-manager': return 'bg-indigo-50 border-indigo-200 text-indigo-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
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
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 mb-6 hover:bg-white rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Users
          </button>
          
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
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
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/users')}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
            
            <div className="h-8 w-px bg-gray-300"></div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">User Profile</h1>
                <p className="text-sm text-gray-600">View and manage user details</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowMoreActions(!showMoreActions)}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
              
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
                    <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={() => router.push(`/users/edit/${id}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <img
                    src={user.profileImage || '/default-avatar.png'}
                    alt={user.userName}
                    className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                    user.isActive ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                
                <h2 className="text-lg font-bold text-gray-900 mb-1">{user.userName}</h2>
                <p className="text-gray-600 text-sm mb-3">{user.email}</p>
                
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                  {user.role === 'admin' && <Shield className="w-3 h-3" />}
                  {user.role === 'branch-head' && <Building className="w-3 h-3" />}
                  {user.role === 'manager' && <Users className="w-3 h-3" />}
                  {user.role}
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded ${user.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                      {user.isActive ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">Status</div>
                      <div className={`text-sm font-medium ${user.isActive ? 'text-green-600' : 'text-gray-600'}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-blue-100 text-blue-600 rounded">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">Joined</div>
                      <div className="text-sm font-medium text-gray-900">{formatDate(user.createdAt)}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="space-y-2">
           
                <button
                  onClick={() => window.location.href = `mailto:${user.email}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 border border-gray-200"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </button>
              </div>
            </div>

            {/* User Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                Account Summary
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">User ID</span>
                    <button
                      onClick={() => copyToClipboard(user.user_id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 font-mono truncate">{user.user_id}</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Profile Completion</span>
                    <span className="text-sm font-medium text-blue-600">85%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Basic Info</span>
                    <span>Contact</span>
                    <span>Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Contact Information */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Email Address</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(user.email)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-medium text-gray-900 pl-6">{user.email}</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Phone Number</span>
                    </div>
                    <p className="font-medium text-gray-900 pl-6">
                      {user.phone || (
                        <span className="text-gray-400 italic">Not provided</span>
                      )}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Address</span>
                    </div>
                    <p className="font-medium text-gray-900 pl-6">
                      {user.address || (
                        <span className="text-gray-400 italic">Not provided</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  Personal Details
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-700 mb-1">Gender</div>
                      <div className="font-medium text-gray-900">
                        {user.gender ? (
                          <span className="capitalize">{user.gender}</span>
                        ) : (
                          <span className="text-gray-400 italic">Not specified</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-700 mb-1">Date of Birth</div>
                      <div className="font-medium text-gray-900">
                        {user.dateOfBirth ? formatDate(user.dateOfBirth) : (
                          <span className="text-gray-400 italic">Not provided</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Account Created</span>
                    </div>
                    <p className="font-medium text-gray-900 pl-6">{formatDate(user.createdAt)}</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Last Updated</span>
                    </div>
                    <p className="font-medium text-gray-900 pl-6">{formatDate(user.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Role & Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Shield className="w-4 h-4 text-red-600" />
                </div>
                Role & Activity
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium mb-3 ${getRoleColor(user.role)}`}>
                    {user.role === 'admin' && <Shield className="w-4 h-4" />}
                    {user.role === 'branch-head' && <Building className="w-4 h-4" />}
                    {user.role === 'manager' && <Users className="w-4 h-4" />}
                    {user.role === 'user' && <User className="w-4 h-4" />}
                    {user.role}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {user.role === 'admin' && 'Full administrative access to all system features and settings.'}
                    {user.role === 'manager' && 'Can manage team members and view reports.'}
                    {user.role === 'branch-head' && 'Manages a single branch with limited administrative privileges.'}
                    {user.role === 'area-manager' && 'Oversees multiple branches within a designated area.'}
                    {user.role === 'user' && 'Standard user with basic access to assigned features.'}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2">
                      <span className="text-sm text-gray-600">User Management</span>
                      <div className={`w-3 h-3 rounded-full ${user.role === 'admin' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <span className="text-sm text-gray-600">Data Access</span>
                      <div className={`w-3 h-3 rounded-full ${user.role === 'admin' || user.role === 'manager' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <span className="text-sm text-gray-600">Reporting</span>
                      <div className={`w-3 h-3 rounded-full ${user.role === 'admin' || user.role === 'manager' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Activity Summary</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Active Sessions</div>
                        <div className="text-sm text-gray-600">Currently logged in</div>
                      </div>
                      <span className="text-lg font-bold text-blue-600">1</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Total Logins</div>
                        <div className="text-sm text-gray-600">All time</div>
                      </div>
                      <span className="text-lg font-bold text-green-600">142</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Last Active</div>
                        <div className="text-sm text-gray-600">Recent activity</div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">2 hours ago</span>
                    </div>
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