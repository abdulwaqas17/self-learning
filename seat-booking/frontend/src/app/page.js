"use client";

import { bookSeat, confirmSeat, getSeats } from "@/services/seatServices";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import socket from "../socket/socket";
import {
  UserCircle,
  Home,
  Ticket,
  Info,
  Contact,
  Menu,
  X,
  Lock,
  CheckCircle,
  User,
  Clock,
  Loader2,
  Shield,
  AlertCircle,
  LogOut,
  Settings,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Star,
  ShieldCheck,
  Clock as ClockIcon,
  ArrowRight,
  Users,
  Crown
} from "lucide-react";
import { useRouter } from "next/navigation";

/* =========================
   Decode token helper
========================= */
const getLoggedInUser = () => {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("userToken");
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

/* =========================
   Navigation Component
========================= */
function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = getLoggedInUser();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    toast.success("Logged out successfully");
    router.push("/login");
    setProfileDropdownOpen(false);
  };

  const getInitials = () => {
    if (!user) return "G";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "U";
  };

  const handleProfileClick = () => {
    if (!user) {
      router.push("/login");
      toast.error("Please login to access profile");
      return;
    }
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg border-b border-orange-100" : "bg-white"}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-md">
              <Ticket className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-black">TicketVibe</span>
              <span className="text-xs text-orange-500 font-medium">Live Experiences</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-black hover:text-orange-500 transition-colors font-medium flex items-center space-x-2 group">
              <Home className="h-4 w-4 group-hover:text-orange-500" />
              <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-300 group-hover:after:w-full">Home</span>
            </a>
            <a href="#events" className="text-black hover:text-orange-500 transition-colors font-medium flex items-center space-x-2 group">
              <Ticket className="h-4 w-4 group-hover:text-orange-500" />
              <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-300 group-hover:after:w-full">Events</span>
            </a>
            <a href="#seats" className="text-black hover:text-orange-500 transition-colors font-medium flex items-center space-x-2 group">
              <Crown className="h-4 w-4 group-hover:text-orange-500" />
              <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-300 group-hover:after:w-full">Seats</span>
            </a>
            <a href="#contact" className="text-black hover:text-orange-500 transition-colors font-medium flex items-center space-x-2 group">
              <Contact className="h-4 w-4 group-hover:text-orange-500" />
              <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-300 group-hover:after:w-full">Contact</span>
            </a>
          </div>

          {/* Profile and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Profile Icon with Dropdown */}
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="relative group"
                title={user ? `${user.firstName || ""} ${user.lastName || ""}` : "Guest"}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold shadow-md transition-all duration-300 ${user ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg" : "bg-black text-white hover:bg-gray-800"}`}>
                  {getInitials()}
                </div>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && user && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">
                  {/* User Info */}
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-b">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                        {getInitials()}
                      </div>
                      <div>
                        <h3 className="font-bold text-black">{user.firstName} {user.lastName}</h3>
                        <p className="text-sm text-gray-600 truncate">{user.email}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 text-orange-500 fill-current" />
                          <span className="text-xs text-gray-500 ml-1">Premium Member</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <div className="flex items-center">
                        <UserCircle className="h-5 w-5 text-gray-500 mr-3" />
                        <span className="text-gray-700">My Profile</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <div className="flex items-center">
                        <Ticket className="h-5 w-5 text-gray-500 mr-3" />
                        <span className="text-gray-700">My Tickets</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <div className="flex items-center">
                        <Settings className="h-5 w-5 text-gray-500 mr-3" />
                        <span className="text-gray-700">Settings</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>

                  {/* Logout Button */}
                  <div className="p-3 border-t">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-lg hover:from-gray-800 hover:to-black transition-all duration-300 font-medium"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 text-black hover:bg-orange-50 hover:text-orange-500 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-200 pt-4">
            <a href="#" className="flex items-center p-3 rounded-lg hover:bg-orange-50 text-black transition-colors">
              <Home className="h-5 w-5 mr-3" />
              <span className="font-medium">Home</span>
            </a>
            <a href="#events" className="flex items-center p-3 rounded-lg hover:bg-orange-50 text-black transition-colors">
              <Ticket className="h-5 w-5 mr-3" />
              <span className="font-medium">Events</span>
            </a>
            <a href="#seats" className="flex items-center p-3 rounded-lg hover:bg-orange-50 text-black transition-colors">
              <Crown className="h-5 w-5 mr-3" />
              <span className="font-medium">Seats</span>
            </a>
            <a href="#contact" className="flex items-center p-3 rounded-lg hover:bg-orange-50 text-black transition-colors">
              <Contact className="h-5 w-5 mr-3" />
              <span className="font-medium">Contact</span>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

/* =========================
   Hero Section
========================= */
function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-white via-orange-50 to-red-50 pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-orange-100 to-red-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-orange-50 to-red-50 rounded-full opacity-20 blur-3xl"></div>
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white text-sm font-medium mb-6 shadow-lg">
            <Star className="h-3 w-3 mr-2 fill-current" />
            Over 1 Million Tickets Sold Worldwide
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-black">
            Your Ticket to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              Unforgettable Moments
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Book tickets for concerts, sports, theater, and exclusive events. 
            Secure your spot with our lightning-fast booking system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#seats"
              className="inline-flex items-center justify-center bg-gradient-to-r from-black to-gray-800 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-gray-800 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              <Ticket className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
              View Available Seats
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </a>
            <a
              href="#events"
              className="inline-flex items-center justify-center bg-white text-black border-2 border-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-black hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Calendar className="mr-3 h-5 w-5" />
              Browse Events
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   Stats Section
========================= */
function StatsSection() {
  const stats = [
    { label: "Events Booked", value: "10K+", icon: Ticket, color: "from-orange-500 to-red-500" },
    { label: "Happy Customers", value: "98%", icon: Users, color: "from-black to-gray-800" },
    { label: "Success Rate", value: "99.9%", icon: ShieldCheck, color: "from-orange-500 to-red-500" },
    { label: "Active Users", value: "50K+", icon: User, color: "from-black to-gray-800" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-7 w-7 text-white" />
              </div>
              <div className="text-3xl font-bold text-black mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   Seats Grid Component
========================= */
function SeatsGrid({ seats, handleBookSeat, bookingId, user, userGender, reopenConfirmModal }) {
  const getSeatStatusColor = (status) => {
    switch (status) {
      case "available": return "border-green-200 bg-gradient-to-br from-white to-green-50";
      case "locked": return "border-orange-200 bg-gradient-to-br from-white to-orange-50";
      case "booked": return "border-gray-300 bg-gradient-to-br from-white to-gray-100";
      default: return "border-gray-200 bg-white";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "available": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "locked": return <ClockIcon className="h-5 w-5 text-orange-500" />;
      case "booked": return <Lock className="h-5 w-5 text-gray-500" />;
      default: return null;
    }
  };

  if (seats.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mb-4">
          <AlertCircle className="h-10 w-10 text-orange-500" />
        </div>
        <h3 className="text-2xl font-bold text-black mb-2">No Seats Available</h3>
        <p className="text-gray-600">Check back later for new seat releases</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {seats.map((seat) => {
        const isLockedByMe = seat.status === "locked" && seat.lockedTime?.lockBy === user?.email;
        const isGenderMismatch = userGender && seat.seatGender && seat.seatGender !== userGender;

        return (
          <div
            key={seat._id}
            className={`rounded-2xl border-2 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${getSeatStatusColor(seat.status)}`}
          >
            {/* Seat Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border text-sm font-medium mb-2 shadow-sm">
                  {getStatusIcon(seat.status)}
                  <span className="ml-2 capitalize font-medium">{seat.status}</span>
                </div>
                <h3 className="text-2xl font-bold text-black">Seat #{seat.seatNum}</h3>
                <p className="text-lg font-semibold text-gray-800">{seat.seatName}</p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                seat.seatGender === "male" 
                  ? "border-blue-400 bg-blue-50 text-blue-600" 
                  : seat.seatGender === "female"
                  ? "border-pink-400 bg-pink-50 text-pink-600"
                  : "border-gray-400 bg-gray-50 text-gray-600"
              }`}>
                {seat.seatGender === "male" ? "♂" : seat.seatGender === "female" ? "♀" : "?"}
              </div>
            </div>

            {/* Seat Details */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-gray-700">
                <User className="h-4 w-4 mr-2" />
                <span className="capitalize font-medium">{seat.seatGender || "Any Gender"}</span>
              </div>
              {seat.lockedTime?.lockBy && seat.status === "locked" && (
                <div className="flex items-center text-sm text-gray-600 bg-orange-50 px-3 py-2 rounded-lg">
                  <ClockIcon className="h-3 w-3 mr-2 text-orange-500" />
                  <span className="truncate">Locked by: {seat.lockedTime.lockBy}</span>
                </div>
              )}
            </div>

            {/* Action Button */}
            {seat.status === "available" && (
              <button
                onClick={() => handleBookSeat(seat)}
                disabled={bookingId === seat._id || isGenderMismatch}
                className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                  isGenderMismatch
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-inner"
                    : bookingId === seat._id
                    ? "bg-gradient-to-r from-orange-400 to-red-400"
                    : "bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black"
                } text-white shadow-lg hover:shadow-xl`}
              >
                {isGenderMismatch ? (
                  <span className="flex items-center justify-center">
                    <Shield className="mr-2 h-4 w-4" />
                    Restricted
                  </span>
                ) : bookingId === seat._id ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Processing...
                  </span>
                ) : (
                  "Book Now"
                )}
              </button>
            )}

            {isLockedByMe && (
              <button
                onClick={() => reopenConfirmModal(seat)}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <span className="flex items-center justify-center">
                  <ClockIcon className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                  Confirm Booking
                </span>
              </button>
            )}

            {seat.status === "booked" && (
              <button
                disabled
                className="w-full py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl font-bold cursor-not-allowed shadow-inner"
              >
                <span className="flex items-center justify-center opacity-75">
                  <Lock className="mr-2 h-4 w-4" />
                  Booked
                </span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* =========================
   Loader Component
========================= */
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-orange-50">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-20 h-20 border-4 border-orange-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-orange-500 rounded-full animate-spin border-t-transparent"></div>
          <Ticket className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-orange-500" />
        </div>
        <p className="mt-6 text-lg font-bold text-black">Loading Seats...</p>
        <p className="text-sm text-gray-600 mt-2">Preparing your booking experience</p>
      </div>
    </div>
  );
}

/* =========================
   Features Section (Above Footer)
========================= */
function FeaturesSection() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Secure Booking",
      description: "Your transactions are 100% secure with bank-level encryption",
      color: "text-orange-500"
    },
    {
      icon: Clock,
      title: "Instant Confirmation",
      description: "Get your tickets confirmed instantly via email",
      color: "text-black"
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your queries",
      color: "text-orange-500"
    },
    {
      icon: Ticket,
      title: "Easy Refunds",
      description: "Simple and quick refund process within 24 hours",
      color: "text-black"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">
            Why Choose <span className="text-orange-500">TicketVibe</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience seamless booking with our premium features designed for your convenience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 group">
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color.includes('orange') ? 'from-orange-50 to-red-50' : 'from-gray-50 to-gray-100'} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`h-7 w-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   Main Seats Page
========================= */
export default function SeatsPage() {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const user = getLoggedInUser();
  const userEmail = user?.email || null;
  const userGender = user?.gender || null;
  const router = useRouter();

  const fetchSeats = async () => {
    try {
      const res = await getSeats();
      setSeats(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    socket.on("seatUpdated", () => {
      fetchSeats();
    });

    fetchSeats();

    return () => {
      socket.off("seatUpdated");
    };
  }, []);

  const handleBookSeat = async (seat) => {
    if (!user) {
      toast.error("Please login to book seats");
      router.push("/login");
      return;
    }

    const isConfirm = window.confirm(
      `Are you sure you want to book ${seat.seatName}?`
    );
    if (!isConfirm) return;

    setBookingId(seat._id);

    try {
      const res = await bookSeat({ seatID: seat._id });
      toast.success(res.message || "Seat locked successfully!");
      setSelectedSeat(seat);
      setConfirmModalOpen(true);
      fetchSeats();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBookingId(null);
    }
  };

  const handleConfirmSeat = async () => {
    if (!selectedSeat) return;

    setConfirmLoading(true);
    try {
      const res = await confirmSeat({ seatID: selectedSeat._id });
      toast.success(res.message || "Seat confirmed successfully!");
      setConfirmModalOpen(false);
      setSelectedSeat(null);
      fetchSeats();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setConfirmLoading(false);
    }
  };

  const reopenConfirmModal = (seat) => {
    setSelectedSeat(seat);
    setConfirmModalOpen(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main>
        <HeroSection />
        <StatsSection />

        {/* Seats Section */}
        <section id="seats" className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-50 to-red-50 rounded-full text-orange-600 text-sm font-medium mb-4">
                <Crown className="h-3 w-3 mr-2" />
                Premium Seating
              </div>
              <h2 className="text-4xl font-bold text-black mb-4">
                Select Your <span className="text-orange-500">Perfect Seat</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose from our premium seating options. Each seat comes with its own unique view and experience.
              </p>
            </div>

            <SeatsGrid
              seats={seats}
              handleBookSeat={handleBookSeat}
              bookingId={bookingId}
              user={user}
              userGender={userGender}
              reopenConfirmModal={reopenConfirmModal}
            />

            {/* Legend */}
            <div className="mt-12 p-8 bg-white rounded-2xl border border-gray-200 shadow-lg">
              <h3 className="text-2xl font-bold text-black mb-6">Seat Status Guide</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-4"></div>
                  <div>
                    <h4 className="font-bold text-black">Available</h4>
                    <p className="text-sm text-gray-600">Ready to book instantly</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
                  <div className="w-4 h-4 rounded-full bg-orange-500 mr-4"></div>
                  <div>
                    <h4 className="font-bold text-black">Locked</h4>
                    <p className="text-sm text-gray-600">Pending confirmation (2 min)</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <div className="w-4 h-4 rounded-full bg-gray-500 mr-4"></div>
                  <div>
                    <h4 className="font-bold text-black">Booked</h4>
                    <p className="text-sm text-gray-600">No longer available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturesSection />
      </main>

      {/* Confirm Modal */}
      {confirmModalOpen && selectedSeat && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-scale-up border border-orange-100">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold text-black mb-2">Confirm Your Booking</h2>
              <p className="text-gray-600">
                Secure your seat now! Please confirm within 2 minutes.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 mb-6 border border-orange-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Seat Number</span>
                  <span className="text-xl font-bold text-black">#{selectedSeat.seatNum}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Seat Name</span>
                  <span className="text-lg font-semibold text-black">{selectedSeat.seatName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Gender</span>
                  <span className="capitalize font-medium text-black">{selectedSeat.seatGender}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Status</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium">
                    <ClockIcon className="h-3 w-3 mr-2" />
                    Locked
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setConfirmModalOpen(false)}
                className="flex-1 py-3 bg-white border-2 border-black text-black rounded-xl font-bold hover:bg-black hover:text-white transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSeat}
                disabled={confirmLoading}
                className="flex-1 py-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl font-bold hover:from-gray-800 hover:to-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {confirmLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Confirming...
                  </span>
                ) : (
                  "Confirm & Pay"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                  <Ticket className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">TicketVibe</span>
                  <p className="text-sm text-gray-400">Live Experiences</p>
                </div>
              </div>
              <p className="text-gray-400">
                Your premier destination for event tickets and unforgettable experiences.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                  <MapPin className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Home</a></li>
                <li><a href="#events" className="text-gray-400 hover:text-orange-400 transition-colors">Events</a></li>
                <li><a href="#seats" className="text-gray-400 hover:text-orange-400 transition-colors">Seats</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">My Tickets</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Contact Info</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-orange-500" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-orange-500" />
                  support@ticketvibe.com
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3 text-orange-500" />
                  123 Event Street, NY
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} TicketVibe. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}