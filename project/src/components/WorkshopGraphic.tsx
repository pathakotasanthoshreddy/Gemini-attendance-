import React from 'react';

const WorkshopGraphic = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="relative w-96 h-[600px] bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-cyan-400/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-10 w-24 h-24 border-2 border-yellow-400/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-5 w-16 h-16 border-2 border-green-400/30 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-20 right-20 w-8 h-8 bg-blue-400/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-44 left-16 w-6 h-6 bg-purple-400/20 rounded-full animate-bounce delay-300"></div>
        </div>
        
        {/* Gradient Mesh Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-purple-600/20"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/10 via-transparent to-pink-500/10"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between items-center text-center px-6 py-8">
          {/* Main Workshop Content */}
          <div className="flex-1 flex flex-col justify-center items-center">
            {/* Free Workshop */}
            <h1 className="text-3xl font-bold text-cyan-300 mb-3 tracking-wide drop-shadow-lg">
              Free Workshop
            </h1>
            
            {/* on */}
            <p className="text-xl text-white mb-4 font-light drop-shadow-md">
              on
            </p>
            
            {/* DevOps with AI Tools - FIXED TO BE PROPERLY WHITE */}
            <h2 className="text-4xl font-black mb-6 leading-tight drop-shadow-2xl" style={{ color: '#FFFFFF' }}>
              DevOps with
              <br />
              AI Tools
            </h2>
            
            {/* Presented by */}
            <p className="text-lg text-white mb-3 font-light drop-shadow-md">
              Presented by
            </p>
            
            {/* V Cube Software Solutions */}
            <h3 className="text-2xl font-bold text-orange-400 leading-tight drop-shadow-lg mb-6">
              V Cube Software
              <br />
              Solutions
            </h3>
          </div>

          {/* Location and Contact Section */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 w-full border border-white/10">
            {/* Location */}
            <div className="mb-4">
              <h4 className="text-sm font-bold text-yellow-300 mb-2 flex items-center justify-center">
                📍 Location
              </h4>
              <p className="text-xs text-white leading-relaxed">
                2nd Floor, Road No. 3, HIG 218,<br />
                Opposite Aniq Salon, Kphb,<br />
                Near Netaji Park, Kukatpally<br />
                Housing Board Colony, KPHB-Phase-1,<br />
                Kukatpally, Hyderabad,<br />
                Telangana-500072
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold text-green-300 mb-2">
                📞 Contact us For more details
              </h4>
              <p className="text-sm font-bold text-cyan-300">
                +91 7780466038
              </p>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-8 right-8 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute top-1/3 left-6 w-2 h-2 bg-orange-400 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute top-1/2 right-6 w-2 h-2 bg-pink-400 rounded-full animate-pulse shadow-lg"></div>
          
          {/* Tech Icons Pattern */}
          <div className="absolute top-16 left-16 text-cyan-400/30 text-xs">⚡</div>
          <div className="absolute top-1/2 left-4 text-orange-400/30 text-xs">💡</div>
        </div>
        
        {/* Professional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none"></div>
        
        {/* Subtle Border Glow */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 shadow-inner"></div>
      </div>
    </div>
  );
};

export default WorkshopGraphic;