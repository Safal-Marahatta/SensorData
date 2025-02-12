// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Settings, AlertCircle, Database, Mail, Phone } from "lucide-react"

// // Types for our forms
// interface GeneralSettings {
//   station_id: string
//   station_name: string
//   server_address: string
//   com_port: string
//   baud_rate: string
//   byte_size: string
//   parity: string
//   stopbit: string
//   poll_interval: string
//   poll_delay: string
//   log_interval: string
// }

// interface SensorSetting {
//   sensor_id: string
//   function_code: string
//   register_address: string
//   register_count: string
//   variable: string
//   multiplier: string
//   offset: string
//   parameter_name: string
//   unit: string
//   upper_threshold: string
//   lower_threshold: string
// }

// interface AlertSetting {
//   id: string
//   name: string
//   designation: string
//   mobile_number: string
//   email: string
//   alert_type: string[]
// }

// const baudRateOptions = ["9600", "19200", "38400", "57600", "115200"]
// const parityOptions = ["None", "Even", "Odd"]
// const loggingIntervalOptions = ["30", "60", "300", "600", "1800", "3600"]
// const comPortOptions = ["COM1", "COM2", "COM3", "COM4", "COM5", "COM6"]
// const stopBitOptions = ["1", "1.5", "2"]
// const byteSizeOptions = ["5", "6", "7", "8"]

// function App() {
//   const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
//     station_id: "",
//     station_name: "",
//     server_address: "",
//     com_port: "",
//     baud_rate: "",
//     byte_size: "",
//     parity: "",
//     stopbit: "",
//     poll_interval: "",
//     poll_delay: "",
//     log_interval: "",
//   })

//   const [sensorSettings, setSensorSettings] = useState<SensorSetting[]>([])
//   const [alertSettings, setAlertSettings] = useState<AlertSetting[]>([])
//   const [showConfirmation, setShowConfirmation] = useState<string | null>(null)

//   useEffect(() => {
//     // Simulating API calls to fetch initial data
//     fetchGeneralSettings()
//     fetchSensorSettings()
//     fetchAlertSettings()
//   }, [])

//   const fetchGeneralSettings = () => {
//     // Simulated API call
//     setTimeout(() => {
//       setGeneralSettings({
//         station_id: "STATION001",
//         station_name: "Main Station",
//         server_address: "192.168.1.100",
//         com_port: "COM3",
//         baud_rate: "9600",
//         byte_size: "8",
//         parity: "None",
//         stopbit: "1",
//         poll_interval: "5",
//         poll_delay: "1",
//         log_interval: "60",
//       })
//     }, 1000)
//   }

//   const fetchSensorSettings = () => {
//     // Simulated API call
//     setTimeout(() => {
//       setSensorSettings([
//         {
//           sensor_id: "SENSOR001",
//           function_code: "03",
//           register_address: "40001",
//           register_count: "2",
//           variable: "Temperature",
//           multiplier: "0.1",
//           offset: "0",
//           parameter_name: "Ambient Temperature",
//           unit: "°C",
//           upper_threshold: "40",
//           lower_threshold: "10",
//         },
//         {
//           sensor_id: "SENSOR002",
//           function_code: "04",
//           register_address: "30001",
//           register_count: "1",
//           variable: "Humidity",
//           multiplier: "1",
//           offset: "0",
//           parameter_name: "Relative Humidity",
//           unit: "%",
//           upper_threshold: "80",
//           lower_threshold: "20",
//         },
//       ])
//     }, 1000)
//   }

//   const fetchAlertSettings = () => {
//     // Simulated API call
//     setTimeout(() => {
//       setAlertSettings([
//         {
//           id: "1",
//           name: "John Doe",
//           designation: "System Administrator",
//           mobile_number: "+1234567890",
//           email: "john@example.com",
//           alert_type: ["sms", "email"],
//         },
//         {
//           id: "2",
//           name: "Jane Smith",
//           designation: "Technician",
//           mobile_number: "+9876543210",
//           email: "jane@example.com",
//           alert_type: ["email"],
//         },
//       ])
//     }, 1000)
//   }

//   const handleGeneralSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     setShowConfirmation("general")
//   }

//   const handleSensorSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     setShowConfirmation("sensor")
//   }

//   const handleAlertSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     setShowConfirmation("alert")
//   }

//   const handleConfirmation = (type: string) => {
//     console.log(`Saving ${type} settings...`)

//     let settingsToSave
//     switch (type) {
//       case "general":
//         settingsToSave = generalSettings
//         break
//       case "sensor":
//         settingsToSave = sensorSettings
//         break
//       case "alert":
//         settingsToSave = alertSettings
//         break
//       default:
//         settingsToSave = {}
//     }

//     console.log("Settings to save:", settingsToSave)

//     // Simulated API call
//     setTimeout(() => {
//       console.log(`${type} settings saved successfully!`)
//       setShowConfirmation(null)
//     }, 1000)
//   }

//   const handleAlertTypeChange = (index: number, type: string) => {
//     setAlertSettings((prev) => {
//       const newSettings = [...prev]
//       const setting = { ...newSettings[index] }

//       if (setting.alert_type.includes(type)) {
//         setting.alert_type = setting.alert_type.filter((t) => t !== type)
//       } else {
//         setting.alert_type = [...setting.alert_type, type]
//       }

//       newSettings[index] = setting
//       return newSettings
//     })
//   }

//   const addSensorRow = () => {
//     setSensorSettings([
//       ...sensorSettings,
//       {
//         sensor_id: "",
//         function_code: "",
//         register_address: "",
//         register_count: "",
//         variable: "",
//         multiplier: "",
//         offset: "",
//         parameter_name: "",
//         unit: "",
//         upper_threshold: "",
//         lower_threshold: "",
//       },
//     ])
//   }

//   const addAlertRow = () => {
//     const newId = String(Date.now())
//     setAlertSettings((prev) => [
//       ...prev,
//       {
//         id: newId,
//         name: "",
//         designation: "",
//         mobile_number: "",
//         email: "",
//         alert_type: [],
//       },
//     ])
//   }

//   const updateAlertSetting = (index: number, field: keyof AlertSetting, value: any) => {
//     setAlertSettings((prev) => {
//       const newSettings = [...prev]
//       newSettings[index] = { ...newSettings[index], [field]: value }
//       return newSettings
//     })
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         <h1 className="text-3xl font-bold text-white mb-8">System Settings</h1>

//         <div className="space-y-8">
//           {/* General Settings Form */}
//           <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
//             <div className="flex items-center space-x-2 mb-6">
//               <Settings className="h-6 w-6 text-blue-400" />
//               <h2 className="text-xl font-semibold text-white">General Settings</h2>
//             </div>
//             <form onSubmit={handleGeneralSubmit} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {Object.entries(generalSettings).map(([key, value]) => (
//                   <div key={key}>
//                     <label className="block text-sm font-medium text-gray-200">
//                       {key.replace("_", " ").toUpperCase()}
//                     </label>
//                     {["baud_rate", "parity", "log_interval", "com_port", "stopbit", "byte_size"].includes(key) ? (
//                       <select
//                         value={value}
//                         onChange={(e) => setGeneralSettings({ ...generalSettings, [key]: e.target.value })}
//                         className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
//                       >
//                         {(key === "baud_rate"
//                           ? baudRateOptions
//                           : key === "parity"
//                             ? parityOptions
//                             : key === "log_interval"
//                               ? loggingIntervalOptions
//                               : key === "com_port"
//                                 ? comPortOptions
//                                 : key === "stopbit"
//                                   ? stopBitOptions
//                                   : byteSizeOptions
//                         ).map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     ) : (
//                       <input
//                         type="text"
//                         value={value}
//                         onChange={(e) => setGeneralSettings({ ...generalSettings, [key]: e.target.value })}
//                         className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//               <div className="pt-4">
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm"
//                 >
//                   Save General Settings
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Sensor Settings Form */}
//           <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center space-x-2">
//                 <Database className="h-6 w-6 text-blue-400" />
//                 <h2 className="text-xl font-semibold text-white">Sensor Settings</h2>
//               </div>
//               <button
//                 onClick={addSensorRow}
//                 className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
//               >
//                 Add Sensor
//               </button>
//             </div>
//             <form onSubmit={handleSensorSubmit}>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-700">
//                   <thead className="bg-gray-700">
//                     <tr>
//                       {Object.keys(sensorSettings[0] || {}).map((key) => (
//                         <th
//                           key={key}
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
//                         >
//                           {key.replace("_", " ")}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="bg-gray-800 divide-y divide-gray-700">
//                     {sensorSettings.map((sensor, index) => (
//                       <tr key={index}>
//                         {Object.entries(sensor).map(([key, value]) => (
//                           <td key={key} className="px-6 py-4 whitespace-nowrap">
//                             <input
//                               type="text"
//                               value={value}
//                               onChange={(e) => {
//                                 const newSensorSettings = [...sensorSettings]
//                                 newSensorSettings[index] = { ...newSensorSettings[index], [key]: e.target.value }
//                                 setSensorSettings(newSensorSettings)
//                               }}
//                               className="block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 min-w-[150px]"
//                             />
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="mt-6">
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm"
//                 >
//                   Save Sensor Settings
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Alert Recipients Form */}
//           <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center space-x-2">
//                 <AlertCircle className="h-6 w-6 text-blue-400" />
//                 <h2 className="text-xl font-semibold text-white">Alert Recipients</h2>
//               </div>
//               <button
//                 onClick={addAlertRow}
//                 className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
//               >
//                 Add Recipient
//               </button>
//             </div>
//             <form onSubmit={handleAlertSubmit} className="space-y-6">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-700">
//                   <thead className="bg-gray-700">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
//                         Name
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
//                         Designation
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
//                         Alert Methods
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
//                         Mobile Number
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
//                         Email Address
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-gray-800 divide-y divide-gray-700">
//                     {alertSettings.map((alert, index) => (
//                       <tr key={alert.id}>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <input
//                             type="text"
//                             value={alert.name}
//                             onChange={(e) => updateAlertSetting(index, "name", e.target.value)}
//                             className="block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
//                             required
//                           />
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <input
//                             type="text"
//                             value={alert.designation}
//                             onChange={(e) => updateAlertSetting(index, "designation", e.target.value)}
//                             className="block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
//                             required
//                           />
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex space-x-4">
//                             <label className="inline-flex items-center">
//                               <input
//                                 type="checkbox"
//                                 checked={alert.alert_type.includes("sms")}
//                                 onChange={() => handleAlertTypeChange(index, "sms")}
//                                 className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-500 bg-gray-700 focus:ring-blue-500"
//                               />
//                               <span className="ml-2 text-gray-200">SMS</span>
//                             </label>
//                             <label className="inline-flex items-center">
//                               <input
//                                 type="checkbox"
//                                 checked={alert.alert_type.includes("email")}
//                                 onChange={() => handleAlertTypeChange(index, "email")}
//                                 className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-500 bg-gray-700 focus:ring-blue-500"
//                               />
//                               <span className="ml-2 text-gray-200">Email</span>
//                             </label>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="relative">
//                             <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                             <input
//                               type="tel"
//                               value={alert.mobile_number}
//                               onChange={(e) => updateAlertSetting(index, "mobile_number", e.target.value)}
//                               className="block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10 pr-4 py-2"
//                               required={alert.alert_type.includes("sms")}
//                             />
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="relative">
//                             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                             <input
//                               type="email"
//                               value={alert.email}
//                               onChange={(e) => updateAlertSetting(index, "email", e.target.value)}
//                               className="block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10 pr-4 py-2"
//                               required={alert.alert_type.includes("email")}
//                             />
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="mt-6">
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm"
//                 >
//                   Save Alert Settings
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirmation && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
//             <h3 className="text-xl font-semibold text-white mb-4">Confirm Save</h3>
//             <p className="text-gray-300 mb-6">Do you want to save the current parameters?</p>
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={() => setShowConfirmation(null)}
//                 className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleConfirmation(showConfirmation)}
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

// export default App


"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Settings, AlertCircle, Database, Mail, Phone } from "lucide-react"

// Types for our forms
interface GeneralSettings {
  station_id: string
  station_name: string
  server_address: string
  com_port: string
  baud_rate: string
  byte_size: string
  parity: string
  stopbit: string
  poll_interval: string
  poll_delay: string
  log_interval: string
}

interface SensorSetting {
  sensor_id: string
  function_code: string
  register_address: string
  register_count: string
  variable: string
  multiplier: string
  offset: string
  parameter_name: string
  unit: string
  upper_threshold: string
  lower_threshold: string
}

interface AlertSetting {
  id: string
  name: string
  designation: string
  mobile_number: string
  email: string
  alert_type: string[]
}

const baudRateOptions = ["9600", "19200", "38400", "57600", "115200"]
const parityOptions = ["None", "Even", "Odd"]
const loggingIntervalOptions = ["30", "60", "300", "600", "1800", "3600"]
const comPortOptions = ["COM1", "COM2", "COM3", "COM4", "COM5", "COM6"]
const stopBitOptions = ["1", "1.5", "2"]
const byteSizeOptions = ["5", "6", "7", "8"]

function App() {
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    station_id: "",
    station_name: "",
    server_address: "",
    com_port: "",
    baud_rate: "",
    byte_size: "",
    parity: "",
    stopbit: "",
    poll_interval: "",
    poll_delay: "",
    log_interval: "",
  })

  const [sensorSettings, setSensorSettings] = useState<SensorSetting[]>([])
  const [alertSettings, setAlertSettings] = useState<AlertSetting[]>([])
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null)
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [sensorError, setSensorError] = useState<string | null>(null)
  const [alertError, setAlertError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSaving, setIsSaving] = useState<{
    general: boolean
    sensor: boolean
    alert: boolean
  }>({
    general: false,
    sensor: false,
    alert: false,
  })

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true)
      try {
        await Promise.all([fetchGeneralSettings(), fetchSensorSettings(), fetchAlertSettings()])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllData()
  }, [])

  const fetchGeneralSettings = () => {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setGeneralSettings({
          station_id: "STATION001",
          station_name: "Main Station",
          server_address: "192.168.1.100",
          com_port: "COM3",
          baud_rate: "9600",
          byte_size: "8",
          parity: "None",
          stopbit: "1",
          poll_interval: "5",
          poll_delay: "1",
          log_interval: "60",
        })
        resolve(null)
      }, 1000)
    })
  }

  const fetchSensorSettings = () => {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setSensorSettings([
          {
            sensor_id: "SENSOR001",
            function_code: "03",
            register_address: "40001",
            register_count: "2",
            variable: "Temperature",
            multiplier: "0.1",
            offset: "0",
            parameter_name: "Ambient Temperature",
            unit: "°C",
            upper_threshold: "40",
            lower_threshold: "10",
          },
          {
            sensor_id: "SENSOR002",
            function_code: "04",
            register_address: "30001",
            register_count: "1",
            variable: "Humidity",
            multiplier: "1",
            offset: "0",
            parameter_name: "Relative Humidity",
            unit: "%",
            upper_threshold: "80",
            lower_threshold: "20",
          },
        ])
        resolve(null)
      }, 1000)
    })
  }

  const fetchAlertSettings = () => {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setAlertSettings([
          {
            id: "1",
            name: "John Doe",
            designation: "System Administrator",
            mobile_number: "+1234567890",
            email: "john@example.com",
            alert_type: ["sms", "email"],
          },
          {
            id: "2",
            name: "Jane Smith",
            designation: "Technician",
            mobile_number: "+9876543210",
            email: "jane@example.com",
            alert_type: ["email"],
          },
        ])
        resolve(null)
      }, 1000)
    })
  }

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation("general")
  }

  const handleSensorSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation("sensor")
  }

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation("alert")
  }

  const handleConfirmation = async (type: string) => {
    setShowConfirmation(null)
    setIsSaving((prev) => ({ ...prev, [type]: true }))
    let settingsToSave
    let endpoint

    switch (type) {
      case "general":
        settingsToSave = generalSettings
        endpoint = "http://127.0.0.1:8000/api/general-settings"
        setGeneralError(null)
        break
      case "sensor":
        settingsToSave = sensorSettings
        endpoint = "http://127.0.0.1:8000/api/sensor-settings"
        setSensorError(null)
        break
      case "alert":
        settingsToSave = alertSettings
        endpoint = "http://127.0.0.1:8000/api/alert-settings"
        setAlertError(null)
        break
      default:
        setIsSaving((prev) => ({ ...prev, [type]: false }))
        return
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settingsToSave),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log(`${type} settings saved successfully:`, result)
    } catch (error) {
      console.error(`Error saving ${type} settings:`, error)
      switch (type) {
        case "general":
          setGeneralError(`Failed to save general settings. Please try again.`)
          break
        case "sensor":
          setSensorError(`Failed to save sensor settings. Please try again.`)
          break
        case "alert":
          setAlertError(`Failed to save alert settings. Please try again.`)
          break
      }
    } finally {
      setIsSaving((prev) => ({ ...prev, [type]: false }))
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

  const addSensorRow = () => {
    setSensorSettings([
      ...sensorSettings,
      {
        sensor_id: "",
        function_code: "",
        register_address: "",
        register_count: "",
        variable: "",
        multiplier: "",
        offset: "",
        parameter_name: "",
        unit: "",
        upper_threshold: "",
        lower_threshold: "",
      },
    ])
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
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">System Settings</h1>

        {isLoading ? (
          <div className="text-white text-center">Loading settings...</div>
        ) : (
          <div className="space-y-8">
            {/* General Settings Form */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
              <div className="flex items-center space-x-2 mb-6">
                <Settings className="h-6 w-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">General Settings</h2>
              </div>
              {generalError && <div className="bg-red-600 text-white p-4 rounded-md mb-4">{generalError}</div>}
              <form onSubmit={handleGeneralSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(generalSettings).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-200">
                        {key.replace("_", " ").toUpperCase()}
                      </label>
                      {["baud_rate", "parity", "log_interval", "com_port", "stopbit", "byte_size"].includes(key) ? (
                        <select
                          value={value}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, [key]: e.target.value })}
                          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                        >
                          {(key === "baud_rate"
                            ? baudRateOptions
                            : key === "parity"
                              ? parityOptions
                              : key === "log_interval"
                                ? loggingIntervalOptions
                                : key === "com_port"
                                  ? comPortOptions
                                  : key === "stopbit"
                                    ? stopBitOptions
                                    : byteSizeOptions
                          ).map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, [key]: e.target.value })}
                          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSaving.general}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm disabled:opacity-50"
                  >
                    {isSaving.general ? "Saving..." : "Save General Settings"}
                  </button>
                </div>
              </form>
            </div>

            {/* Sensor Settings Form */}
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
                        {Object.keys(sensorSettings[0] || {}).map((key) => (
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
                        <tr key={index}>
                          {Object.entries(sensor).map(([key, value]) => (
                            <td key={key} className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="text"
                                value={value}
                                onChange={(e) => {
                                  const newSensorSettings = [...sensorSettings]
                                  newSensorSettings[index] = { ...newSensorSettings[index], [key]: e.target.value }
                                  setSensorSettings(newSensorSettings)
                                }}
                                className="block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 min-w-[150px]"
                              />
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
                    disabled={isSaving.sensor}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm disabled:opacity-50"
                  >
                    {isSaving.sensor ? "Saving..." : "Save Sensor Settings"}
                  </button>
                </div>
              </form>
            </div>

            {/* Alert Recipients Form */}
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                          Name
                        </th>
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
                        <tr key={alert.id}>
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
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  checked={alert.alert_type.includes("sms")}
                                  onChange={() => handleAlertTypeChange(index, "sms")}
                                  className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-500 bg-gray-700 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-gray-200">SMS</span>
                              </label>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  checked={alert.alert_type.includes("email")}
                                  onChange={() => handleAlertTypeChange(index, "email")}
                                  className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-500 bg-gray-700 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-gray-200">Email</span>
                              </label>
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
                    disabled={isSaving.alert}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm disabled:opacity-50"
                  >
                    {isSaving.alert ? "Saving..." : "Save Alert Settings"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Confirm Save</h3>
            <p className="text-gray-300 mb-6">Do you want to save the current parameters?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmation(showConfirmation)}
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

export default App



