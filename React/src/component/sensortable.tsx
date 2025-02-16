"use client"

import { useState, useEffect } from "react"
import { Database } from "lucide-react"

interface SensorTableSetting {
  sensor_id?: number
  sensor_name: string
  sensor_location: string
  station_id: number
  sensor_serial_number: string
  bluetooth_code: string
  gauge_height: number
  sensor_distance: number
}

interface SensorConfigurationProps {
  sensorTableSettings: SensorTableSetting[]
  onSave: (settings: SensorTableSetting[]) => Promise<void>
  onAdd: () => void
  onChange: (index: number, field: string, value: any) => void
  isSaving: boolean
  error?: string | null
}

export function SensorConfiguration({
  sensorTableSettings,
  onSave,
  onAdd,
  onChange,
  isSaving,
  error
}: SensorConfigurationProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSave(sensorTableSettings)
  }

  return (
    <div className="bg-gray-800 p-6 mb-6 rounded-lg shadow-xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Database className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Sensor Configuration</h2>
        </div>
        <button
          onClick={onAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
        >
          Add Sensor
        </button>
      </div>
      
      {error && <div className="bg-red-600 text-white p-4 rounded-md mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Sensor Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Station ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Serial Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Bluetooth Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Gauge Height</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Distance</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {sensorTableSettings.map((sensor, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={sensor.sensor_name}
                      onChange={(e) => onChange(index, 'sensor_name', e.target.value)}
                      className="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={sensor.sensor_location}
                      onChange={(e) => onChange(index, 'sensor_location', e.target.value)}
                      className="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={sensor.station_id}
                      onChange={(e) => onChange(index, 'station_id', Number(e.target.value))}
                      className="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={sensor.sensor_serial_number}
                      onChange={(e) => onChange(index, 'sensor_serial_number', e.target.value)}
                      className="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={sensor.bluetooth_code}
                      onChange={(e) => onChange(index, 'bluetooth_code', e.target.value)}
                      className="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      step="0.01"
                      value={sensor.gauge_height}
                      onChange={(e) => onChange(index, 'gauge_height', Number(e.target.value))}
                      className="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      step="0.01"
                      value={sensor.sensor_distance}
                      onChange={(e) => onChange(index, 'sensor_distance', Number(e.target.value))}
                      className="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Sensor Configuration"}
          </button>
        </div>
      </form>
    </div>
  )
}