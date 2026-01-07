"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateUserMutation } from "@/redux/services/userApi";
import {
  ArrowLeft,
  Upload,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  Building,
  Users,
  Eye,
  EyeOff,
  Check,
  X,
  Loader2,
  UserCheck,
  UserX,
  Key,
  Lock,
  Image,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function AddUserPage() {
  const router = useRouter();
  const [createUser, { isLoading }] = useCreateUserMutation();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    role: "user",
    gender: "",
    dateOfBirth: "",
    address: "",
    isActive: true,
    password: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState("/default-avatar.png");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState("basic");

  const roles = [
    {
      value: "user",
      label: "Standard User",
      icon: User,
      color: "from-gray-500 to-gray-600",
      desc: "Basic access only",
    },
    {
      value: "admin",
      label: "Administrator",
      icon: Shield,
      color: "from-red-500 to-red-600",
      desc: "Full system access",
    },
    {
      value: "manager",
      label: "Manager",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      desc: "Team management",
    },
    {
      value: "branch-head",
      label: "Branch Head",
      icon: Building,
      color: "from-blue-500 to-blue-600",
      desc: "Single branch access",
    },
    {
      value: "area-manager",
      label: "Area Manager",
      icon: Building,
      color: "from-indigo-500 to-indigo-600",
      desc: "Multiple branches",
    },
  ];

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer-not-to-say", label: "Prefer not to say" },
  ];

  const sections = [
    { id: "basic", label: "Basic Info", icon: User },
    { id: "profile", label: "Profile", icon: Image },
    { id: "security", label: "Security", icon: Lock },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      toast.error("Only JPG, JPEG & PNG files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setProfileImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName.trim()) newErrors.userName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!profileImage) newErrors.profileImage = "Profile image is required";
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((error) => toast.error(error));
      return;
    }

    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== "") {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (profileImage) {
        formDataToSend.append("profileImage", profileImage);
      }

      await createUser(formDataToSend).unwrap();

      toast.success("User created successfully!");
      router.push("/users");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(
        error?.data?.message || "Failed to create user. Please try again."
      );
    }
  };

  const InputField = ({
    label,
    name,
    type = "text",
    icon: Icon,
    placeholder,
    required = false,
    ...props
  }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className={`w-full ${
            Icon ? "pl-11" : "pl-4"
          } pr-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
            errors[name]
              ? "border-red-300"
              : "border-gray-300 hover:border-gray-400"
          }`}
          placeholder={placeholder}
          {...props}
        />
      </div>
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <X className="w-4 h-4" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/users")}
              className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-white rounded-xl transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Users</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Add New User
              </h1>
              <p className="text-gray-600">
                Create a new user account with specific permissions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Progress Steps */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Setup Process
              </h3>

              <div className="space-y-4">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                      activeSection === section.id
                        ? "bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activeSection === section.id
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <section.icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-gray-900">
                        {section.label}
                      </div>
                      <div className="text-xs text-gray-500">
                        Step {index + 1} of {sections.length}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Form Progress */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Form Progress
                  </span>
                  <span className="text-sm font-bold text-blue-600">33%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: "33%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div
                className={`transition-all duration-300 ${
                  activeSection === "basic" ? "block" : "hidden"
                }`}
              >
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Basic Information
                      </h2>
                      <p className="text-gray-600">
                        Enter the basic details for the new user
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Full Name"
                      name="userName"
                      icon={User}
                      placeholder="Enter full name"
                      required
                    />

                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      icon={Mail}
                      placeholder="user@example.com"
                      required
                    />

                    <InputField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      icon={Phone}
                      placeholder="+1 (555) 000-0000"
                    />

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Gender
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <User className="w-5 h-5" />
                        </div>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all"
                        >
                          <option value="">Select gender</option>
                          {genders.map((gender) => (
                            <option key={gender.value} value={gender.value}>
                              {gender.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => setActiveSection("profile")}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold shadow-lg shadow-blue-500/25 transition-all duration-200"
                    >
                      Continue to Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Section */}
              <div
                className={`transition-all duration-300 ${
                  activeSection === "profile" ? "block" : "hidden"
                }`}
              >
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg">
                      <Image className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Profile Setup
                      </h2>
                      <p className="text-gray-600">
                        Upload profile picture and set permissions
                      </p>
                    </div>
                  </div>

                  {/* Profile Image Upload */}
                  <div className="mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                          <img
                            src={profilePreview}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {profileImage && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Profile Picture
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Upload a clear photo for identification
                        </p>

                        <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl hover:from-blue-100 hover:to-blue-200 font-semibold transition-all duration-200 border border-blue-200">
                          <Upload className="w-5 h-5" />
                          Choose File
                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>

                        <p className="text-sm text-gray-500 mt-3">
                          JPG, PNG up to 5MB. Recommended size: 400×400px
                        </p>
                        {errors.profileImage && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <X className="w-4 h-4" />
                            {errors.profileImage}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Role Selection */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      User Role
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Select the appropriate role for this user
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {roles.map((role) => (
                        <label
                          key={role.value}
                          className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                            formData.role === role.value
                              ? "border-blue-500 bg-gradient-to-br from-blue-50 to-white shadow-md"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role.value}
                            checked={formData.role === role.value}
                            onChange={handleInputChange}
                            className="sr-only"
                          />

                          <div className="flex items-start gap-3">
                            <div
                              className={`p-2.5 rounded-lg bg-gradient-to-r ${role.color} shadow-sm`}
                            >
                              <role.icon className="w-5 h-5 text-white" />
                            </div>

                            <div className="flex-1">
                              <div className="font-bold text-gray-900">
                                {role.label}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                {role.desc}
                              </div>
                            </div>
                          </div>

                          {formData.role === role.value && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Status Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Account Status
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label
                        className={`cursor-pointer rounded-xl border-2 p-5 transition-all duration-200 ${
                          formData.isActive === true
                            ? "border-green-500 bg-gradient-to-br from-green-50 to-white shadow-md"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="isActive"
                          value="true"
                          checked={formData.isActive === true}
                          onChange={() =>
                            setFormData((prev) => ({ ...prev, isActive: true }))
                          }
                          className="sr-only"
                        />

                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                            <UserCheck className="w-6 h-6 text-white" />
                          </div>

                          <div>
                            <div className="font-bold text-gray-900">
                              Active
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              User can immediately access the system
                            </div>
                          </div>
                        </div>
                      </label>

                      <label
                        className={`cursor-pointer rounded-xl border-2 p-5 transition-all duration-200 ${
                          formData.isActive === false
                            ? "border-gray-500 bg-gradient-to-br from-gray-50 to-white shadow-md"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="isActive"
                          value="false"
                          checked={formData.isActive === false}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              isActive: false,
                            }))
                          }
                          className="sr-only"
                        />

                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
                            <UserX className="w-6 h-6 text-white" />
                          </div>

                          <div>
                            <div className="font-bold text-gray-900">
                              Inactive
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              User access is disabled initially
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveSection("basic")}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSection("security")}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold shadow-lg shadow-blue-500/25 transition-all duration-200"
                    >
                      Continue to Security
                    </button>
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div
                className={`transition-all duration-300 ${
                  activeSection === "security" ? "block" : "hidden"
                }`}
              >
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
                      <Lock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Security Settings
                      </h2>
                      <p className="text-gray-600">
                        Set up password and additional information
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <InputField
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      icon={Calendar}
                    />

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-gray-400">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all resize-none"
                          placeholder="Enter complete address..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password Section */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Key className="w-5 h-5 text-blue-600" />
                      Set Password
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Set a secure password for the user. Leave blank if you
                      want to send an invitation email.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Password
                        </label>
                        <div className="relative group">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500">
                            <Lock className="w-5 h-5" />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`w-full pl-11 pr-10 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                              errors.password
                                ? "border-red-300"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                            placeholder="Enter password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <X className="w-4 h-4" />
                            {errors.password}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative group">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500">
                            <Lock className="w-5 h-5" />
                          </div>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`w-full pl-11 pr-10 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                              errors.confirmPassword
                                ? "border-red-300"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                            placeholder="Confirm password"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <X className="w-4 h-4" />
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Password Strength */}
                    {formData.password && (
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-gray-800">
                            Password Strength
                          </span>
                          <span
                            className={`text-sm font-bold ${
                              formData.password.length >= 8
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {formData.password.length >= 8 ? "Strong" : "Weak"}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              formData.password.length >= 8
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                            style={{
                              width: `${Math.min(
                                (formData.password.length / 8) * 100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-gray-600">
                            {formData.password.length >= 8
                              ? "Password meets security requirements"
                              : "Minimum 8 characters required"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveSection("profile")}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                        isLoading
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25"
                      } text-white`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Creating User...
                        </>
                      ) : (
                        <>
                          <Check className="w-5 h-5" />
                          Create User Account
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
