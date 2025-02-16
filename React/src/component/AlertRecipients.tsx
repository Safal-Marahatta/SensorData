"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AlertCircle, Mail, Phone } from "lucide-react"

interface AlertSetting {
  id?: string
  name: string
  designation: string
  mobile_number: string
  email: string
  alert_type: string[]
}

export default function AlertRecipients() {
  const [alertSettings, setAlertSettings] = useState<AlertSetting[]>([])
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [alertError, setAlertError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  useEffect(() => {
    fetchAlertSettings()
  }, [])

  const fetchAlertSettings = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("http://127.0.0.1:8000/alert-settings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      if (Array.isArray(data) && data.length > 0) {
        setAlertSettings(
          data.map((a: any, idx: number) => ({
            ...a,
            id: a.id !== undefined ? String(a.id) : `alert-${idx}`,
          })),
        )
      } else {
        setAlertSettings([])
      }
    } catch (error) {
      console.error("Error fetching alert settings:", error)
      setAlertError("Failed to load alert settings")
    }
  }

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation(true)
  }

  const handleConfirmation = async () => {
    setShowConfirmation(false)
    setIsSaving(true)
    setAlertError(null)

    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("http://127.0.0.1:8000/alert-settings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alertSettings),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Alert settings saved successfully:", result)
    } catch (error) {
      console.error("Error saving alert settings:", error)
      setAlertError("Failed to save alert settings. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleAlertTypeChange = (index: number, type: string) => {
    setAlertSettings((prev) => {
      const newSettings = [...prev]
      const setting = { ...newSettings[index] }

      if (setting.alert_type.includes(type)) {
        setting.alert_type = setting.alert_type.filter((t) => t !== type)
      } else {
        setting.alert_type = [...setting.alert_type, type]
      }

      newSettings[index] = setting
      return newSettings
    })
  }

  const addAlertRow = () => {
    const newId = String(Date.now())
    setAlertSettings((prev) => [
      ...prev,
      {
        id: newId,
        name: "",
        designation: "",
        mobile_number: "",
        email: "",
        alert_type: [],
      },
    ])
  }

  const updateAlertSetting = (index: number, field: keyof AlertSetting, value: any) => {
    setAlertSettings((prev) => {
      const newSettings = [...prev]
      newSettings[index] = { ...newSettings[index], [field]: value }
      return newSettings
    })
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Alert Recipients</h2>
        </div>
        <button
          onClick={addAlertRow}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
        >
          Add Recipient
        </button>
      </div>
      {alertError && <div className="bg-red-600 text-white p-4 rounded-md mb-4">{alertError}</div>}
      <form onSubmit={handleAlertSubmit} className="space-y-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                  Alert Methods
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                  Mobile Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                  Email Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {alertSettings.map((alert, index) => (
                <tr key={alert.id || index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={alert.name}
                      onChange={(e) => updateAlertSetting(index, "name", e.target.value)}
                      className="block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                      required
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={alert.designation}
                      onChange={(e) => updateAlertSetting(index, "designation", e.target.value)}
                      className="block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                      required
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-4">
                      {["sms", "email", "siren", "online"].map((type) => (
                        <label key={type} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={alert.alert_type.includes(type)}
                            onChange={() => handleAlertTypeChange(index, type)}
                            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-500 bg-gray-700 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-gray-200 capitalize">{type}</span>
                        </label>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="tel"
                        value={alert.mobile_number}
                        onChange={(e) => updateAlertSetting(index, "mobile_number", e.target.value)}
                        className="block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10 pr-4 py-2"
                        required={alert.alert_type.includes("sms")}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="email"
                        value={alert.email}
                        onChange={(e) => updateAlertSetting(index, "email", e.target.value)}
                        className="block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10 pr-4 py-2"
                        required={alert.alert_type.includes("email")}
                      />
                    </div>
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
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Alert Settings"}
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

