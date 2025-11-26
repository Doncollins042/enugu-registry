import React from 'react';
import { Home, Shield } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto border border-white/20 shadow-2xl">
            <Home className="w-12 h-12 text-amber-400" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Enugu State</h1>
        <p className="text-blue-200 mb-8 text-sm sm:text-base">Digital Land Registry & Transaction Hub</p>

        {/* Loading Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-amber-400 rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <p className="text-blue-300 text-sm animate-pulse">Loading secure environment...</p>

        {/* Bottom Badge */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-blue-300/60 text-xs">
          <Shield className="w-4 h-4" />
          <span>Government Verified Platform</span>
        </div>
      </div>
    </div>
  );
}