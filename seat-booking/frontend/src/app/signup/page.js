"use client";

import { registerUser } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Ticket,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  Shield,
  CheckCircle,
  Sparkles,
  Calendar,
  Users,
  Crown,
  ArrowLeft
} from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Calculate password strength
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const getStrengthColor = (strength) => {
    if (strength < 50) return "bg-red-500";
    if (strength < 75) return "bg-orange-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength) => {
    if (strength < 50) return "Weak";
    if (strength < 75) return "Good";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    if (passwordStrength < 50) {
      toast.error("Please use a stronger password");
      return;
    }

    setLoading(true);

    try {
      console.log('=================before res===================');
      const res = await registerUser(formData);
      console.log("==================>",res);
      
      console.log('=================after res ===================');
   
      toast.success(res.message || "Account created successfully!");
      
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

   console.log('=================hello app1===================');

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-white via-orange-50 to-red-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-200 to-red-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-black to-gray-800 rounded-full blur-3xl"></div>
      </div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 max-w-2xl">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 lg:p-10">
            {/* Back to Login */}
            <button
              onClick={() => router.push("/login")}
              className="flex items-center text-sm text-gray-600 hover:text-orange-500 transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-50 to-red-50 rounded-full mb-4">
                <Ticket className="h-8 w-8 text-orange-500" />
              </div>
              <h2 className="text-3xl font-bold text-black mb-2">Join TicketVibe</h2>
              <p className="text-gray-600">Create your account and start your journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 outline-none"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                
                {/* Password Strength Meter */}
                {formData.password && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Password strength</span>
                      <span className={`text-sm font-medium ${getStrengthColor(passwordStrength).replace('bg-', 'text-')}`}>
                        {getStrengthText(passwordStrength)}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getStrengthColor(passwordStrength)} transition-all duration-300`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      • Minimum 8 characters
                      <br />
                      • Include uppercase & lowercase
                      <br />
                      • Include numbers & symbols
                    </div>
                  </div>
                )}
              </div>

              {/* Gender Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["male", "female", "other"].map((gender) => (
                    <label
                      key={gender}
                      className={`relative cursor-pointer rounded-xl border-2 p-4 text-center transition-all duration-300 ${
                        formData.gender === gender
                          ? "border-orange-500 bg-gradient-to-r from-orange-50 to-red-50"
                          : "border-gray-300 hover:border-orange-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        formData.gender === gender
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        {gender === "male" ? "♂" : gender === "female" ? "♀" : "?"}
                      </div>
                      <span className="font-medium capitalize">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-4 w-4 mt-1 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/terms")}
                    className="text-orange-500 hover:text-orange-600 font-medium"
                  >
                    Terms & Conditions
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/privacy")}
                    className="text-orange-500 hover:text-orange-600 font-medium"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !acceptTerms}
                className="w-full py-3 px-4 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl font-bold hover:from-gray-800 hover:to-black transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="font-bold text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Security Note */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <div className="flex items-center justify-center space-x-1">
              <Shield className="h-3 w-3" />
              <span>Your information is secured with 256-bit SSL encryption</span>
            </div>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="mb-8 lg:mb-12">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-black">Join TicketVibe</h1>
                <p className="text-sm text-orange-500 font-medium">Premium Member Benefits</p>
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-black">
              Unlock Exclusive
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Experiences
              </span>
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              Create your account today and get access to premium features, exclusive events, and special member benefits.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-6 mb-8">
            <div className="flex items-start space-x-4 p-5 bg-white/80 rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-3 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl">
                <CheckCircle className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-black mb-2">Priority Access</h4>
                <p className="text-gray-600">Get early access to sold-out events and exclusive pre-sales</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-5 bg-white/80 rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-3 bg-gradient-to-r from-black to-gray-800 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-black mb-2">Member Rewards</h4>
                <p className="text-gray-600">Earn points on every booking and redeem for special offers</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-5 bg-white/80 rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-3 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl">
                <Calendar className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-black mb-2">Personalized Recommendations</h4>
                <p className="text-gray-600">Get event suggestions based on your preferences and booking history</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-5 bg-white/80 rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-3 bg-gradient-to-r from-black to-gray-800 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-black mb-2">Community Access</h4>
                <p className="text-gray-600">Join our exclusive community of event enthusiasts and creators</p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold mr-3">
                S
              </div>
              <div>
                <h4 className="font-bold text-black">Sarah Johnson</h4>
                <p className="text-sm text-gray-600">Premium Member since 2022</p>
              </div>
              <div className="ml-auto flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Sparkles key={star} className="h-4 w-4 text-orange-500 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-700 italic">
              "Joining TicketVibe was the best decision! The exclusive access and premium features have completely transformed my event experiences."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}