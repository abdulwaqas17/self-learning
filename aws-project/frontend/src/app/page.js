'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Shield,
  Database,
  Cloud,
  Lock,
  Zap,
  Smartphone,
  RefreshCw,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Upload,
  Key,
  Globe,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  ChevronRight,
  Server,
  Image as ImageIcon,
  UserCog,
  Settings,
  Bell,
  Search
} from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <Database className="w-8 h-8" />,
      title: 'DynamoDB Backend',
      description: 'Scalable NoSQL database for lightning-fast user data operations',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: 'S3 Storage',
      description: 'Secure and scalable image storage with CDN integration',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'IAM Roles',
      description: 'Granular access control with AWS Identity & Access Management',
      color: 'from-blue-400 to-blue-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'High Performance',
      description: 'Leverage AWS serverless architecture for millisecond response times',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Bank-level Security',
      description: 'End-to-end encryption with AWS KMS and secure IAM role management',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Fully Responsive',
      description: 'Beautiful UI that works perfectly on all devices and screen sizes',
      color: 'from-blue-400 to-blue-500'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'User Authentication',
      description: 'Secure login with AWS Cognito or custom IAM roles',
      icon: <Key className="w-6 h-6" />,
      awsService: 'AWS Cognito'
    },
    {
      number: '02',
      title: 'Data Storage',
      description: 'Store user profiles in DynamoDB with automatic indexing',
      icon: <Database className="w-6 h-6" />,
      awsService: 'DynamoDB'
    },
    {
      number: '03',
      title: 'File Management',
      description: 'Upload and manage images in S3 buckets with CDN',
      icon: <ImageIcon className="w-6 h-6" />,
      awsService: 'S3 + CloudFront'
    },
    {
      number: '04',
      title: 'Role Management',
      description: 'Assign granular permissions using IAM policies',
      icon: <UserCog className="w-6 h-6" />,
      awsService: 'IAM'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">UserManager</span>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded ml-2">AWS</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition">
                How It Works
              </a>
              <a href="#dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Dashboard
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Contact
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
              >
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-blue-100 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                  How It Works
                </a>
                <a href="#dashboard" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                  Dashboard
                </a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium py-2 mb-4">
                  Contact
                </a>
                <Link
                  href="/dashboard"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition flex items-center justify-center"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Secure User Management
              <span className="text-blue-600 block">Powered by AWS</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Enterprise-grade user management system with AWS DynamoDB, S3 storage, 
              and IAM role management. Scalable, secure, and fully customizable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                href="/dashboard"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                <Users className="w-5 h-5 mr-2" />
                 Manage Users
              </Link>
              <Link 
                href="#features"
                className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-8 rounded-lg border-2 border-blue-600 transition duration-300 flex items-center justify-center"
              >
                Learn More
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
                <div className="text-blue-600 mb-3">
                  <Database className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">DynamoDB Backend</h3>
                <p className="text-gray-600 text-sm">Scalable NoSQL database for fast user data operations</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
                <div className="text-blue-600 mb-3">
                  <Cloud className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">S3 Storage</h3>
                <p className="text-gray-600 text-sm">Secure and scalable image storage with CDN integration</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
                <div className="text-blue-600 mb-3">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">IAM Roles</h3>
                <p className="text-gray-600 text-sm">Granular access control with AWS Identity & Access Management</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need to manage users efficiently with AWS cloud infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-100"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
                <div className="mt-6 pt-6 border-t border-blue-100">
                  <div className="flex items-center text-blue-600 font-semibold text-sm">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Seamless integration with AWS services for optimal performance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`relative ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left lg:mt-32'}`}
              >
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100">
                  <div className="flex lg:flex-col items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        {step.icon}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-blue-600 mb-1">STEP {step.number}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={`absolute ${index % 2 === 0 ? 'lg:right-0 lg:left-auto' : 'lg:left-0'} top-full mt-4`}>
                  <div className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-mono">
                    <span className="text-yellow-400 mr-2">AWS</span>
                    {step.awsService}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="dashboard" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Intuitive Dashboard for User Management
              </h2>
              <p className="text-gray-600 mb-8">
                Access a comprehensive dashboard to manage all user operations efficiently. 
                Built with Next.js and Tailwind CSS for a smooth, responsive experience.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">User CRUD Operations</h4>
                    <p className="text-gray-600 text-sm">Create, read, update, and delete users with ease</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Role-based Access</h4>
                    <p className="text-gray-600 text-sm">Manage permissions and roles with IAM integration</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">File Management</h4>
                    <p className="text-gray-600 text-sm">Upload and manage profile images in S3 buckets</p>
                  </div>
                </div>
              </div>
              
              <Link 
                href="/dashboard"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
              >
                <span>🚀 Access Dashboard</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            
            {/* Dashboard Preview */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-1 shadow-2xl">
                <div className="bg-gray-900 rounded-xl p-6">
                  {/* Mock Dashboard Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <span className="ml-3 text-white font-bold text-lg">Dashboard</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <Settings className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  {/* Mock Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="text-xs text-gray-400">Total Users</div>
                      <div className="text-2xl font-bold text-white">1,248</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="text-xs text-gray-400">Active Today</div>
                      <div className="text-2xl font-bold text-white">342</div>
                    </div>
                  </div>
                  
                  {/* Mock User List */}
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                          <div className="ml-3">
                            <div className="text-white text-sm font-medium">John Doe</div>
                            <div className="text-gray-400 text-xs">admin@example.com</div>
                          </div>
                        </div>
                        <div className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs font-medium">
                          Admin
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Manage Your Users Efficiently?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Join thousands of teams using our AWS-powered user management system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                <Users className="w-5 h-5 mr-2" />
                Get Started Free
              </Link>
              <Link
                href="#contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center"
              >
                Schedule a Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold">UserManager</span>
              </div>
              <p className="text-gray-400 text-sm">
                Enterprise user management powered by AWS infrastructure.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition text-sm">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition text-sm">How It Works</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition text-sm">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">API Docs</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  support@usermanager.com
                </li>
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  San Francisco, CA
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} UserManager. All rights reserved.</p>
            <p className="mt-2">Built with AWS, Next.js, and Tailwind CSS</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <Link
          href="/dashboard"
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center"
        >
          <Users className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}