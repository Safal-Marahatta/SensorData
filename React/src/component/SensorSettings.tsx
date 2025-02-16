"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Database } from "lucide-react"

interface SensorSetting {
  sensor_id: number | string
  slave_id: number
  function_code: string
  register_address: number
  register_count: number
  variable: string
  multiplier: number
  offset: number
  parameter_name: string
  unit: string
  upper_threshold: number
  lower_threshold: number
}

export default function SensorSettings() {
  const [sensorSettings, setSensorSettings] = useState<SensorSetting[]>([])
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [sensorError, setSensorError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  useEffect(() => {
    fetchSensorSettings()
  }, [])

  const fetchSensorSettings = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("http://127.0.0.1:8000/sensor-settings", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      if (Array.isArray(data) && data.length > 0) {
        setSensorSettings(data)
      } else {
        setSensorSettings([])
      }
    } catch (error) {
      console.error("Error fetching sensor settings:", error)
      setSensorError("Failed to load sensor settings")
    }
  }

  const handleSensorSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation(true)
  }

  const handleConfirmation = async () => {
    setShowConfirmation(false)
    setIsSaving(true)
    setSensorError(null)

    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("http://127.0.0.1:8000/sensor-settings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sensorSettings),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Sensor settings saved successfully:", result)
    } catch (error) {
      console.error("Error saving sensor settings:", error)
      setSensorError("Failed to save sensor settings. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const addSensorRow = () => {
    const newSensorId = Date.now() // Generate a unique ID
    setSensorSettings([
      ...sensorSettings,
      {
        sensor_id: newSensorId,
        slave_id: 0,
        function_code: "",
        register_address: 0,
        register_count: 0,
        variable: "",
        multiplier: 0,
        offset: 0,
        parameter_name: "",
        unit: "",
        upper_threshold: 0,
        lower_threshold: 0,
      },
    ])
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Database className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Sensor Settings</h2>
        </div>
        <button
          onClick={addSensorRow}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
        >
          Add Sensor
        </button>
      </div>
      {sensorError && <div className="bg-red-600 text-white p-4 rounded-md mb-4">{sensorError}</div>}
      <form onSubmit={handleSensorSubmit}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                {sensorSettings[0] &&
                  Object.keys(sensorSettings[0]).map((key) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                    >
                      {key.replace("_", " ")}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {sensorSettings.map((sensor, index) => (
                <tr key={`sensor-${index}`}>
                  {Object.entries(sensor).map(([field, value]) => (
                    <td key={field} className="px-6 py-4 whitespace-nowrap">
                      {field === "variable" ? (
                        <select
                          value={value as string}
                          onChange={(e) => {
                            const newSensorSettings = [...sensorSettings]
                            newSensorSettings[index] = {
                              ...newSensorSettings[index],
                              [field]: e.target.value,
                            }
                            setSensorSettings(newSensorSettings)
                          }}
                          className="block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 min-w-[150px]"
                        >
                          <option value="">Select Variable Type</option>
                          <option value="Integer">Integer</option>
                          <option value="Float">Float</option>
                          <option value="Swapped">Swapped</option>
                          <option value="float">float</option>
                        </select>
                      ) : (
                        <input
                          type={
                            field === "function_code" || field === "parameter_name" || field === "unit"
                              ? "text"
                              : "number"
                          }
                          value={value === "" ? "" : value}
                          onChange={(e) => {
                            const newSensorSettings = [...sensorSettings]
                            const inputVal = e.target.value
                            let newValue: string | number = inputVal
                            // If the input is cleared, set the value to an empty string
                            if (inputVal === "") {
                              newValue = ""
                            } else if (field !== "function_code" && field !== "parameter_name" && field !== "unit") {
                              newValue =
                                field === "multiplier" ||
                                field === "offset" ||
                                field === "upper_threshold" ||
                                field === "lower_threshold"
                                  ? Number.parseFloat(inputVal)
                                  : Number.parseInt(inputVal, 10)
                            }
                            newSensorSettings[index] = {
                              ...newSensorSettings[index],
                              [field]: newValue,
                            }
                            setSensorSettings(newSensorSettings)
                          }}
                          step={
                            field === "multiplier" ||
                            field === "offset" ||
                            field === "upper_threshold" ||
                            field === "lower_threshold"
                              ? "any"
                              : "1"
                          }
                          className="block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 min-w-[150px]"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Sensor Settings"}
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Confirm Save</h3>
            <p className="text-gray-300 mb-6">Do you want to save the current parameters?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmation}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Yes, Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

