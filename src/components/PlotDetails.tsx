import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Ruler, Home, Shield, CheckCircle } from 'lucide-react';

export default function PlotDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Plot Details</h1>
            <p className="text-sm text-gray-600">Plot ID: {id}</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Plot Information</h2>
            <p className="text-gray-600 mb-6">
              View detailed information about this plot from the estate details page.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-blue-900 text-white rounded-xl font-semibold"
            >
              Browse Estates
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}