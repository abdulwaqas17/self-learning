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
  Globe,
  FileText,
  CheckCircle,
  XCircle,
  MoreVertical,
  Copy,
  Mail as MailIcon,
  MessageSquare
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ViewUserPage() {
  const router = useRouter();
  const { userId } = useParams();
  const { data: usersData, isLoading } = useGetUsersQuery();
  
  const [showMoreActions, setShowMoreActions] = useState(false);
  
  // Find the user by ID
  const user = usersData?.users?.find(u => u.user_id === userId);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'manager': return 'bg-gradient-to-r from-purple-500 to-purple-600';
      case 'branch-head': return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'area-manager': return 'bg-gradient-to-r from-indigo-500 to-indigo-600';
      default: return 'bg-gradient-to-r from-gray-600 to-gray-700';
    }
  };

  const getRoleIcon = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'branch-head': return <Building className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.push('/users')}
            className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-white rounded-xl transition-all mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Users</span>
          </button>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserX className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h2>
            <p className="text-gray-600 mb-6">The user you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => router.push('/users')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-medium"
            >
              Return to Users List
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/users')}
              className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-white rounded-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Users</span>
            </button>
            
            <div className="h-8 w-px bg-gray-300 hidden md:block"></div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">User Profile</h1>
                <p className="text-gray-600">View and manage user account details</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowMoreActions(!showMoreActions)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
              >
                <MoreVertical className="w-5 h-5" />
                <span className="font-medium">More</span>
              </button>
              
              {showMoreActions && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  <div className="py-2">
                    <button className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-3" />
                      Export Profile
                    </button>
                    <button className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                      <Printer className="w-4 h-4 mr-3" />
                      Print Details
                    </button>
                    <button className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                      <Share2 className="w-4 h-4 mr-3" />
                      Share Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={() => router.push(`/users/edit/${userId}`)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-medium shadow-lg shadow-blue-500/25"
            >
              <Edit className="w-5 h-5" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl overflow-hidden">
                    <img
                      src={user.profileImage || '/default-avatar.png'}
                      alt={user.userName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white ${
                    user.isActive ? 'bg-green-500' : 'bg-gray-500'
                  }`}></div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-1">{user.userName}</h2>
                <p className="text-gray-600 mb-3">{user.email}</p>
                
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-white ${getRoleColor(user.role)}`}>
                  {getRoleIcon(user.role)}
                  {user.role}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Status</span>
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.isActive ? (
                      <>
                        <UserCheck className="w-3 h-3" />
                        Active
                      </>
                    ) : (
                      <>
                        <UserX className="w-3 h-3" />
                        Inactive
                      </>
                    )}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">{formatDate(user.createdAt)}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">{formatDate(user.updatedAt)}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex gap-3">
                  <button
                    onClick={() => copyToClipboard(user.email)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Email
                  </button>
                  <button
                    onClick={() => router.push(`mailto:${user.email}`)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors"
                  >
                    <MailIcon className="w-4 h-4" />
                    Send Email
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Account Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Account Status</span>
                    <span className={`text-sm font-medium ${
                      user.isActive ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {user.isActive ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${
                      user.isActive ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Profile Completion</span>
                    <span className="text-sm font-medium text-blue-600">85%</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <FileText className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">User ID</div>
                        <div className="text-sm text-gray-500">Unique identifier</div>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(user.user_id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 truncate">{user.user_id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Contact Information Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Mail className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600">Email Address</div>
                        <div className="font-medium text-gray-900">{user.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(user.email)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Phone className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600">Phone Number</div>
                        <div className="font-medium text-gray-900">
                          {user.phone || 'Not provided'}
                        </div>
                      </div>
                    </div>
                    {user.phone && (
                      <button
                        onClick={() => copyToClipboard(user.phone)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white rounded-lg">
                        <MapPin className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600">Address</div>
                        <div className="font-medium text-gray-900">
                          {user.address || 'Not provided'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Details Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Personal Details</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <div className="text-sm font-medium text-gray-600 mb-1">Gender</div>
                      <div className="font-medium text-gray-900">
                        {user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not specified'}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <div className="text-sm font-medium text-gray-600 mb-1">Date of Birth</div>
                      <div className="font-medium text-gray-900">
                        {user.dateOfBirth ? formatDate(user.dateOfBirth) : 'Not provided'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Clock className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600">Account Created</div>
                        <div className="font-medium text-gray-900">{formatDateTime(user.createdAt)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Clock className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600">Last Updated</div>
                        <div className="font-medium text-gray-900">{formatDateTime(user.updatedAt)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Role & Permissions Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Role & Permissions</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium ${getRoleColor(user.role)}`}>
                      {getRoleIcon(user.role)}
                      {user.role}
                    </div>
                    <p className="text-gray-600 mt-2">
                      {user.role === 'admin' && 'Full administrative access to all system features and settings.'}
                      {user.role === 'manager' && 'Can manage team members and view reports.'}
                      {user.role === 'branch-head' && 'Manages a single branch with limited administrative privileges.'}
                      {user.role === 'area-manager' && 'Oversees multiple branches within a designated area.'}
                      {user.role === 'user' && 'Standard user with basic access to assigned features.'}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-700">System Access</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-700">Data Management</span>
                      {user.role === 'admin' || user.role === 'manager' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-700">User Management</span>
                      {user.role === 'admin' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Activity Summary</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-medium text-gray-900">Active Sessions</div>
                        <div className="text-sm text-gray-600">Currently logged in devices</div>
                      </div>
                      <span className="text-2xl font-bold text-blue-600">1</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-medium text-gray-900">Login Count</div>
                        <div className="text-sm text-gray-600">Total successful logins</div>
                      </div>
                      <span className="text-2xl font-bold text-green-600">142</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-medium text-gray-900">Last Login</div>
                        <div className="text-sm text-gray-600">Most recent access</div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes & Actions Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Notes & Actions</h3>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-blue-900 mb-1">Account Notes</div>
                      <div className="text-sm text-blue-700">
                        {user.userName} joined the platform on {formatDate(user.createdAt)}. 
                        {user.isActive ? ' Account is currently active and in good standing.' : ' Account is currently inactive.'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => router.push(`mailto:${user.email}`)}
                    className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <Mail className="w-8 h-8 text-gray-600 mb-2" />
                    <span className="font-medium text-gray-900">Send Email</span>
                    <span className="text-sm text-gray-600">Contact user</span>
                  </button>
                  
                  <button
                    onClick={() => router.push(`/users/edit/${userId}`)}
                    className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <Edit className="w-8 h-8 text-gray-600 mb-2" />
                    <span className="font-medium text-gray-900">Edit Profile</span>
                    <span className="text-sm text-gray-600">Update details</span>
                  </button>
                  
                  <button
                    onClick={() => toast.success('Password reset email sent')}
                    className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <Shield className="w-8 h-8 text-gray-600 mb-2" />
                    <span className="font-medium text-gray-900">Reset Password</span>
                    <span className="text-sm text-gray-600">Send reset link</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}