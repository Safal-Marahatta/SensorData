import React, { useState } from 'react';
import { Save } from 'lucide-react';
import Navbar from '../component/Navbar';

interface ModbusRow {
  sensorId: string;
  functionCode: string;
  registerAddress: string;
  registerCount: string;
  variable: string;
  multiplier: string;
  offset: string;
}

interface ModpollRow {
  sensorId: string;
  pollingInterval: string;
  delay: string;
}

interface SensorSettings {
  sensorId: string;
  thresholdValue: string;
  location: string;
}

const emptyModbusRow: ModbusRow = {
  sensorId: '',
  functionCode: '',
  registerAddress: '',
  registerCount: '',
  variable: '',
  multiplier: '',
  offset: ''
};

const emptyModpollRow: ModpollRow = {
  sensorId: '',
  pollingInterval: '',
  delay: ''
};

function ModbusSettings() {
  const [modbusRows, setModbusRows] = useState<ModbusRow[]>(Array(7).fill({ ...emptyModbusRow }));
  const [modpollRows, setModpollRows] = useState<ModpollRow[]>(Array(3).fill({ ...emptyModpollRow }));
  const [sensorSettings, setSensorSettings] = useState<SensorSettings>({
    sensorId: '',
    thresholdValue: '',
    location: ''
  });

  const handleModbusChange = (rowIndex: number, field: keyof ModbusRow, value: string) => {
    const newRows = [...modbusRows];
    newRows[rowIndex] = { ...newRows[rowIndex], [field]: value };
    setModbusRows(newRows);
  };

  const handleModpollChange = (rowIndex: number, field: keyof ModpollRow, value: string) => {
    const newRows = [...modpollRows];
    newRows[rowIndex] = { ...newRows[rowIndex], [field]: value };
    setModpollRows(newRows);
  };

  const handleSensorSettingsChange = (field: keyof SensorSettings, value: string) => {
    setSensorSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSensorSettings = () => {
    console.log('Saving sensor settings:', sensorSettings);
    // Add your save logic here
  };

  const handleSaveModbusSettings = () => {
    console.log('Saving modbus settings:', modbusRows);
    // Add your save logic here
  };

  const handleSaveModpollSettings = () => {
    console.log('Saving modpoll settings:', modpollRows);
    // Add your save logic here
  };

  const getInputType = (field: keyof ModbusRow | keyof ModpollRow) => {
    switch (field) {
      case 'sensorId':
      case 'registerAddress':
      case 'registerCount':
      case 'pollingInterval':
      case 'delay':
        return 'number';
      case 'multiplier':
      case 'offset':
        return 'number';
      default:
        return 'text';
    }
  };

  const getInputStep = (field: keyof ModbusRow | keyof ModpollRow) => {
    switch (field) {
      case 'multiplier':
      case 'offset':
        return 'any';
      default:
        return '1';
    }
  };

  return (
    <>
    <Navbar/>
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Sensor Settings Card */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 mx-auto">
        <h2 className="text-xl font-semibold mb-4">Sensor Settings</h2>

        <div className="space-y-4">
          {/* Sensor id Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium">Sensor id</label>
            <select 
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
              value={sensorSettings.sensorId}
              onChange={(e) => handleSensorSettingsChange('sensorId', e.target.value)}
            >
              <option value="">Select...</option>
              {modbusRows.map((row, idx) => 
                row.sensorId && (
                  <option key={idx} value={row.sensorId}>Sensor {row.sensorId}</option>
                )
              )}
            </select>
          </div>

          {/* Threshold Value Input */}
          <div>
            <label className="block text-gray-700 font-medium">Threshold Value</label>
            <input
              type="text"
              placeholder="Enter Threshold Value"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
              value={sensorSettings.thresholdValue}
              onChange={(e) => handleSensorSettingsChange('thresholdValue', e.target.value)}
            />
          </div>

          {/* Location Input */}
          <div>
            <label className="block text-gray-700 font-medium">Location</label>
            <input
              type="text"
              placeholder="Enter Sensor Location"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
              value={sensorSettings.location}
              onChange={(e) => handleSensorSettingsChange('location', e.target.value)}
            />
          </div>

          {/* Save Button */}
          <button 
            onClick={handleSaveSensorSettings}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save Sensor Settings
          </button>
        </div>
      </div>

      {/* Modbus Settings Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Modbus Settings</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-sm rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Sensor ID (Slave ID)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Function Code</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Register Address</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Register Count</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Variable</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Multiplier</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Offset</th>
              </tr>
            </thead>
            <tbody>
              {modbusRows.map((row, index) => (
                <tr key={index} className="border-t border-gray-200">
                  {Object.keys(emptyModbusRow).map((field) => (
                    <td key={field} className="px-4 py-2">
                      <input
                        type={getInputType(field as keyof ModbusRow)}
                        step={getInputStep(field as keyof ModbusRow)}
                        value={row[field as keyof ModbusRow]}
                        onChange={(e) => handleModbusChange(index, field as keyof ModbusRow, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min={getInputType(field as keyof ModbusRow) === 'number' ? '0' : undefined}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSaveModbusSettings}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Save size={20} />
            Save Modbus Settings
          </button>
        </div>
      </div>

      {/* Modpoll Settings Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Modpoll Settings</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-sm rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Sensor ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Polling Interval</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Delay</th>
              </tr>
            </thead>
            <tbody>
              {modpollRows.map((row, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-4 py-2">
                    <select
                      value={row.sensorId}
                      onChange={(e) => handleModpollChange(index, 'sensorId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Sensor ID</option>
                      {modbusRows.map((modbusRow, idx) => (
                        modbusRow.sensorId && (
                          <option key={idx} value={modbusRow.sensorId}>
                            Sensor {modbusRow.sensorId}
                          </option>
                        )
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      value={row.pollingInterval}
                      onChange={(e) => handleModpollChange(index, 'pollingInterval', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      value={row.delay}
                      onChange={(e) => handleModpollChange(index, 'delay', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSaveModpollSettings}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Save size={20} />
            Save Modpoll Settings
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default ModbusSettings;