import React from 'react';
import Navbar from '../component/Navbar';

function Settings() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Settings</h1>

      {/* Sensor Settings Card */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Sensor Settings</h2>

        <div className="space-y-4">
          {/* Sensor Name Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium">Sensor Name</label>
            <select className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400">
              <option>Select...</option>
              <option>Sensor 1</option>
              <option>Sensor 2</option>
            </select>
          </div>

          {/* Threshold Value Input */}
          <div>
            <label className="block text-gray-700 font-medium">Threshold Value</label>
            <input
              type="text"
              placeholder="Enter Threshold Value"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Location Input */}
          <div>
            <label className="block text-gray-700 font-medium">Location</label>
            <input
              type="text"
              placeholder="Enter Sensor Location"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Save Button */}
          <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
            Save Sensor Settings
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Settings;
