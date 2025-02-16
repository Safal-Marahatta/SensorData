"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Database, Plus } from "lucide-react";

interface Sensor {
  sensor_id: number;
  sensor_name: string;
  sensor_location: string | null;
  station_id: number;
  sensor_serial_number: string | null;
  bluetooth_code: string | null;
  gauge_height: number | null;
  sensor_distance: number | null;
}

export default function SensorTable() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [sensorError, setSensorError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    fetchSensors();
  }, []);

  const fetchSensors = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:8000/sensors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch sensors");
      const data = await response.json();
      setSensors(data);
    } catch (error) {
      console.error("Error fetching sensors:", error);
      setSensorError("Failed to load sensors");
    }
  };

  const handleSensorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmation = async () => {
    setShowConfirmation(false);
    setIsSaving(true);
    setSensorError(null);
    console.log(sensors)

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:8000/sensors", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sensors),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Sensors saved successfully:", result);
      await fetchSensors(); // Refresh the sensor data after saving
    } catch (error) {
      console.error("Error saving sensors:", error);
      setSensorError("Failed to save sensors. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Use Date.now() to generate a unique temporary sensor_id for new sensors
  const addSensor = () => {
    setSensors((prev) => [
      ...prev,
      {
        sensor_id: Date.now(), // temporary unique id (editable by the user)
        sensor_name: "",
        sensor_location: null,
        station_id: 1, // Default station_id, update as needed
        sensor_serial_number: null,
        bluetooth_code: null,
        gauge_height: null,
        sensor_distance: null,
      },
    ]);
  };

  const updateSensor = (index: number, field: keyof Sensor, value: any) => {
    setSensors((prev) => {
      const newSensors = [...prev];
      let newValue: any = value;

      // Check for empty string first to prevent NaN issues
      if (value === "") {
        newValue = null;
      } else if (field === "sensor_id" || field === "station_id") {
        newValue = parseInt(value, 10);
      } else if (field === "gauge_height" || field === "sensor_distance") {
        newValue = parseFloat(value);
      }

      newSensors[index] = { ...newSensors[index], [field]: newValue };
      return newSensors;
    });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Database className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Sensors</h2>
        </div>
        <button
          onClick={addSensor}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Sensor
        </button>
      </div>

      {sensorError && (
        <div className="bg-red-600 text-white p-4 rounded-md mb-4">
          {sensorError}
        </div>
      )}

      <form onSubmit={handleSensorSubmit} className="space-y-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                {Object.keys(sensors[0] || {}).map((key) => (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                  >
                    {key.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {sensors.map((sensor, index) => (
                // Use the index as the key to prevent re-render issues when sensor_id changes
                <tr key={index}>
                  {Object.entries(sensor).map(([key, value]) => {
                    // Set input type and step based on the field
                    const inputType =
                      key === "sensor_id" ||
                      key === "station_id" ||
                      key.includes("height") ||
                      key.includes("distance")
                        ? "number"
                        : "text";
                    const inputStep =
                      key === "sensor_id" || key === "station_id"
                        ? "1"
                        : key.includes("height") || key.includes("distance")
                        ? "0.01"
                        : undefined;
                    return (
                      <td key={key} className="px-6 py-4 whitespace-nowrap">
                        <input
                          type={inputType}
                          value={value ?? ""}
                          onChange={(e) =>
                            updateSensor(index, key as keyof Sensor, e.target.value)
                          }
                          className="block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                          step={inputStep}
                        />
                      </td>
                    );
                  })}
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
            {isSaving ? "Saving..." : "Save Sensors"}
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-4">
              Confirm Save
            </h3>
            <p className="text-gray-300 mb-6">
              Do you want to save the current sensor data?
            </p>
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
  );
}
