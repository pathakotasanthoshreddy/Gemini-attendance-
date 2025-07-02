import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, QrCode, BarChart3, Shield, Clock, Users, Calendar, MapPin, User, GraduationCap } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: GraduationCap,
      title: 'kubectl for Kubernetes',
      description: 'Master kubectl for Kubernetes automation and container orchestration',
      color: 'bg-blue-500'
    },
    {
      icon: QrCode,
      title: 'GitHub Copilot',
      description: 'Boost productivity with AI-powered coding assistance and automation',
      color: 'bg-green-500'
    },
    {
      icon: BarChart3,
      title: 'Azure AI Foundry',
      description: 'Discover the power of Azure AI Foundry for cloud-native AI applications',
      color: 'bg-purple-500'
    },
    {
      icon: Shield,
      title: 'Modern Platforms',
      description: 'Work with cutting-edge platforms and tools for DevOps excellence',
      color: 'bg-orange-500'
    },
    {
      icon: Clock,
      title: 'Hands-on Experience',
      description: 'Real-time tools and project knowledge, not just theory',
      color: 'bg-teal-500'
    },
    {
      icon: Users,
      title: 'For All Levels',
      description: 'Perfect for freshers, learners, and IT professionals',
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-7xl font-bold mb-6 text-blue-300 leading-tight">
                Free Workshop
              </h1>
              <h2 className="text-3xl md:text-5xl font-medium mb-8 text-black leading-tight">
                on
              </h2>
              <h3 className="text-5xl md:text-8xl font-bold mb-8 text-white leading-tight">
                DevOps with AI Tools
              </h3>
              
              <div className="mt-12 mb-8">
                <h4 className="text-xl md:text-3xl font-medium mb-4 text-black">
                  Presented by
                </h4>
                <h5 className="text-2xl md:text-4xl font-bold text-orange-400">
                  V Cube Software Solutions
                </h5>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-4xl mx-auto">
              <p className="text-lg mb-4 font-semibold text-yellow-200">
                "Exciting announcement!"
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                Join us for a completely free, live hands-on workshop designed for Tech Enthusiasts, Students, and Cloud Professionals.
              </p>
              <p className="text-xl font-bold mb-4 text-green-300">
                The future is now — and it's all about AI-Integrated DevOps.
              </p>
            </div>

            {/* Speaker Info */}
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <User className="h-8 w-8 mr-3 text-blue-300" />
                <div className="text-left">
                  <h4 className="text-xl font-bold">Mr. Krishna Reddy</h4>
                  <p className="text-blue-200">Multi-Cloud & DevSecOps Trainer</p>
                  <p className="text-blue-200">V Cube Software Solutions</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-colors shadow-lg transform hover:scale-105"
              >
                📝 Register Now - 100% Free!
              </Link>
              <Link
                to="/scanner"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                QR Code Scanner
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Workshop Details */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              📍 Event Highlights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In this exclusive session, we'll explore how AI is revolutionizing the way we do DevOps
            </p>
          </div>

          {/* Event Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Date</h3>
              <p className="text-gray-600">05th July, 2025</p>
              <p className="text-gray-600 font-semibold">(Saturday)</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
              <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Mode</h3>
              <p className="text-gray-600 font-semibold">Offline Only</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
              <User className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Trainer</h3>
              <p className="text-gray-600">Mr. Krishna Reddy</p>
              <p className="text-sm text-gray-500">Multi-Cloud & DevSecOps</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
              <GraduationCap className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Fee</h3>
              <p className="text-green-600 font-bold text-xl">100% Free</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What You'll Learn
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get ready to dive into tools that are shaping the cloud landscape with hands-on experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ✅ {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workshop Benefits */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Attend This Workshop?
          </h2>
          <div className="space-y-4 mb-8">
            <p className="text-xl opacity-90">
              💡 Whether you're a fresher, learner, or already in IT, this workshop will push your skills to the next level.
            </p>
            <p className="text-lg opacity-90">
              This is not just another theory session – it's a hands-on experience to equip you with real-time tools and project knowledge.
            </p>
            <p className="text-xl font-bold text-yellow-300">
              🔗 Don't miss your chance to upgrade your tech journey.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Build, Automate, and Innovate – Together!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            📝 Register now and join the DevOps + AI revolution!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-105"
            >
              🚀 Register for Free Workshop
            </Link>
            <Link
              to="/login"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;