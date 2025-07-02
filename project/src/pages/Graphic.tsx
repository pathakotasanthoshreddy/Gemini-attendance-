import React from 'react';
import WorkshopGraphic from '../components/WorkshopGraphic';
import { Download, Share2 } from 'lucide-react';

const Graphic = () => {
  const downloadGraphic = () => {
    // Create a canvas to convert the SVG to image
    const graphicElement = document.getElementById('workshop-graphic');
    if (graphicElement) {
      // This would require html2canvas library for actual implementation
      // For now, we'll show a message
      alert('To download the graphic, right-click on the image and select "Save image as..."');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Workshop Digital Graphic
          </h1>
          <p className="text-xl text-gray-600">
            Professional 4:5 ratio graphic for social media and marketing
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div id="workshop-graphic" className="flex justify-center">
            <WorkshopGraphic />
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={downloadGraphic}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Download Graphic</span>
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 max-w-2xl mx-auto">
            <h3 className="font-semibold text-blue-900 mb-2">Graphic Specifications:</h3>
            <ul className="text-sm text-blue-800 space-y-1 text-left">
              <li>• <strong>Ratio:</strong> 4:5 (Portrait, Instagram-friendly)</li>
              <li>• <strong>Background:</strong> Professional dark gradient (Navy to Purple)</li>
              <li>• <strong>Colors:</strong> Light blue, Black, Light purple, Bright orange</li>
              <li>• <strong>Style:</strong> Modern, corporate, minimal, elegant</li>
              <li>• <strong>Text:</strong> High contrast, centered, well-spaced</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graphic;