// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Settings } from "lucide-react"

// interface GeneralSettings {
//   id?: number
//   station_id: number | null
//   station_name: string
//   server_address: string
//   com_port: string
//   baud_rate: number
//   byte_size: number
//   parity: string
//   stopbit: number
//   poll_interval: number
//   poll_delay: number
//   log_interval: number
//   installed_date?: string
// }

// const baudRateOptions = [9600, 19200, 38400, 57600, 115200]
// const parityOptions = ["None", "Even", "Odd"]
// const loggingIntervalOptions = ["0.5", "1", "5", "10", "30", "60"]
// const comPortOptions = ["COM1", "COM2", "COM3", "COM4", "COM5", "COM6"]
// const stopBitOptions = [1, 1.5, 2]
// const byteSizeOptions = [5, 6, 7, 8]

// export default function GeneralSettings() {
//   const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
//     station_id: null,
//     station_name: "",
//     server_address: "",
//     com_port: "",
//     baud_rate: 9600,
//     byte_size: 8,
//     parity: "None",
//     stopbit: 1,
//     poll_interval: 5000,
//     poll_delay: 1000,
//     log_interval: 60,
//     installed_date: new Date().toISOString().split("T")[0],
//   })

//   const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
//   const [generalError, setGeneralError] = useState<string | null>(null)
//   const [isSaving, setIsSaving] = useState<boolean>(false)

//   useEffect(() => {
//     fetchGeneralSettings()
//   }, [])

//   const fetchGeneralSettings = async () => {
//     try {
//       const token = localStorage.getItem("accessToken")
//       const response = await fetch("http://127.0.0.1:8000/general-settings", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })

//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
//       const data = await response.json()
//       if (Array.isArray(data) && data.length > 0) {
//         setGeneralSettings(data[0])
//       } else if (typeof data === "object" && data !== null) {
//         setGeneralSettings(data)
//       }
//     } catch (error) {
//       console.error("Error fetching general settings:", error)
//       setGeneralError("Failed to load general settings")
//     }
//   }

//   const handleGeneralSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     setShowConfirmation(true)
//   }

//   const handleConfirmation = async () => {
//     setShowConfirmation(false)
//     setIsSaving(true)
//     setGeneralError(null)

//     try {
//       const token = localStorage.getItem("accessToken")
//       const response = await fetch("http://127.0.0.1:8000/general-settings", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(generalSettings),
//       })

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }

//       const result = await response.json()
//       console.log("General settings saved successfully:", result)
//     } catch (error) {
//       console.error("Error saving general settings:", error)
//       setGeneralError("Failed to save general settings. Please try again.")
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleDownloadGeneralSettings = () => {
//     const dataStr = JSON.stringify(generalSettings, null, 2)
//     const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
//     const exportFileDefaultName = "general_settings.json"

//     const linkElement = document.createElement("a")
//     linkElement.setAttribute("href", dataUri)
//     linkElement.setAttribute("download", exportFileDefaultName)
//     linkElement.click()
//   }

//   return (
//     <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
//       <div className="flex items-center space-x-2 mb-6">
//         <Settings className="h-6 w-6 text-blue-400" />
//         <h2 className="text-xl font-semibold text-white">General Settings</h2>
//       </div>
//       {generalError && <div className="bg-red-600 text-white p-4 rounded-md mb-4">{generalError}</div>}
//       <form onSubmit={handleGeneralSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {Object.entries(generalSettings).map(([key, value]) => {
//             if (key === "id") return null
//             return (
//               <div key={key}>
//                 <label className="block text-sm font-medium text-gray-200">{key.replace("_", " ").toUpperCase()}</label>
//                 {["baud_rate", "parity", "com_port", "stopbit", "byte_size"].includes(key) ? (
//                   <select
//                     value={value?.toString() ?? ""}
//                     onChange={(e) =>
//                       setGeneralSettings({
//                         ...generalSettings,
//                         [key]: key === "parity" || key === "com_port" ? e.target.value : Number(e.target.value),
//                       })
//                     }
//                     className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
//                   >
//                     {(key === "baud_rate"
//                       ? baudRateOptions
//                       : key === "parity"
//                         ? parityOptions
//                         : key === "com_port"
//                           ? comPortOptions
//                           : key === "stopbit"
//                             ? stopBitOptions
//                             : byteSizeOptions
//                     ).map((option) => (
//                       <option key={option} value={option.toString()}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   <input
//                     type={
//                       key === "station_id" ||
//                       key === "baud_rate" ||
//                       key === "byte_size" ||
//                       key === "stopbit" ||
//                       key === "poll_interval" ||
//                       key === "poll_delay" ||
//                       key === "log_interval"
//                         ? "number"
//                         : key === "installed_date"
//                           ? "date"
//                           : "text"
//                     }
//                     value={value?.toString() ?? ""}
//                     onChange={(e) => {
//                       const newValue =
//                         key === "station_id" ||
//                         key === "baud_rate" ||
//                         key === "byte_size" ||
//                         key === "stopbit" ||
//                         key === "poll_interval" ||
//                         key === "poll_delay" ||
//                         key === "log_interval"
//                           ? Number(e.target.value)
//                           : e.target.value
//                       setGeneralSettings({ ...generalSettings, [key]: newValue })
//                     }}
//                     className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
//                   />
//                 )}
//               </div>
//             )
//           })}
//         </div>
//         <div className="pt-4 flex">
//           <button
//             type="submit"
//             disabled={isSaving}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm disabled:opacity-50"
//           >
//             {isSaving ? "Saving..." : "Save General Settings"}
//           </button>
//           <button
//             type="button"
//             onClick={handleDownloadGeneralSettings}
//             className="ml-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm"
//           >
//             Download Settings
//           </button>
//         </div>
//       </form>

//       {/* Confirmation Modal */}
//       {showConfirmation && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
//             <h3 className="text-xl font-semibold text-white mb-4">Confirm Save</h3>
//             <p className="text-gray-300 mb-6">Do you want to save the current parameters?</p>
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={() => setShowConfirmation(false)}
//                 className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleConfirmation}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//               >
//                 Yes, Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }



"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Settings } from "lucide-react"

interface GeneralSettings {
  id?: number
  station_id: number | null
  station_name: string
  server_address: string
  com_port: string
  baud_rate: number
  byte_size: number
  parity: string
  stopbit: number
  poll_interval: number
  poll_delay: number
  log_interval: number
  installed_date?: string
}

const baudRateOptions = [9600, 19200, 38400, 57600, 115200]
const parityOptions = ["None", "Even", "Odd"]
const loggingIntervalOptions = ["0.5", "1", "5", "10", "30", "60"]
const comPortOptions = ["COM1", "COM2", "COM3", "COM4", "COM5", "COM6"]
const stopBitOptions = [1, 1.5, 2]
const byteSizeOptions = [5, 6, 7, 8]

export default function GeneralSettingsComponent() {
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    station_id: null,
    station_name: "",
    server_address: "",
    com_port: "",
    baud_rate: 9600,
    byte_size: 8,
    parity: "None",
    stopbit: 1,
    poll_interval: 5000,
    poll_delay: 1000,
    log_interval: 60,
    installed_date: new Date().toISOString().split("T")[0],
  })

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  useEffect(() => {
    fetchGeneralSettings()
  }, [])

  const fetchGeneralSettings = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("http://127.0.0.1:8000/general-settings", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()

      // Only update if data is non-empty.
      if (Array.isArray(data) && data.length > 0) {
        setGeneralSettings(data[0])
      } else if (typeof data === "object" && data !== null && Object.keys(data).length > 0) {
        setGeneralSettings(data)
      }
      // Otherwise, keep the default state
    } catch (error) {
      console.error("Error fetching general settings:", error)
      setGeneralError("Failed to load general settings")
    }
  }

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation(true)
  }

  const handleConfirmation = async () => {
    setShowConfirmation(false)
    setIsSaving(true)
    setGeneralError(null)

    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("http://127.0.0.1:8000/general-settings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(generalSettings),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("General settings saved successfully:", result)
    } catch (error) {
      console.error("Error saving general settings:", error)
      setGeneralError("Failed to save general settings. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDownloadGeneralSettings = () => {
    const dataStr = JSON.stringify(generalSettings, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "general_settings.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="h-6 w-6 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">General Settings</h2>
      </div>
      {generalError && (
        <div className="bg-red-600 text-white p-4 rounded-md mb-4">
          {generalError}
        </div>
      )}
      <form onSubmit={handleGeneralSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(generalSettings).map(([key, value]) => {
            if (key === "id") return null
            return (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-200">
                  {key.replace("_", " ").toUpperCase()}
                </label>
                {["baud_rate", "parity", "com_port", "stopbit", "byte_size"].includes(key) ? (
                  <select
                    value={value?.toString() ?? ""}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        [key]:
                          key === "parity" || key === "com_port"
                            ? e.target.value
                            : Number(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                  >
                    {(key === "baud_rate"
                      ? baudRateOptions
                      : key === "parity"
                      ? parityOptions
                      : key === "com_port"
                      ? comPortOptions
                      : key === "stopbit"
                      ? stopBitOptions
                      : byteSizeOptions
                    ).map((option) => (
                      <option key={option} value={option.toString()}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={
                      key === "station_id" ||
                      key === "baud_rate" ||
                      key === "byte_size" ||
                      key === "stopbit" ||
                      key === "poll_interval" ||
                      key === "poll_delay" ||
                      key === "log_interval"
                        ? "number"
                        : key === "installed_date"
                        ? "date"
                        : "text"
                    }
                    value={value?.toString() ?? ""}
                    onChange={(e) => {
                      const newValue =
                        key === "station_id" ||
                        key === "baud_rate" ||
                        key === "byte_size" ||
                        key === "stopbit" ||
                        key === "poll_interval" ||
                        key === "poll_delay" ||
                        key === "log_interval"
                          ? Number(e.target.value)
                          : e.target.value
                      setGeneralSettings({ ...generalSettings, [key]: newValue })
                    }}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                  />
                )}
              </div>
            )
          })}
        </div>
        <div className="pt-4 flex">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save General Settings"}
          </button>
          <button
            type="button"
            onClick={handleDownloadGeneralSettings}
            className="ml-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm"
          >
            Download Settings
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
              Do you want to save the current parameters?
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
  )
}
