
// "use client"

// import { useState, useEffect } from "react"
// import { Settings, AlertCircle, Database, Mail, Phone } from "lucide-react"

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

// interface SensorSetting {
//   sensor_id: string
//   slave_id: string
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

// const baudRateOptions = [9600, 19200, 38400, 57600, 115200]
// const parityOptions = ["None", "Even", "Odd"]
// const loggingIntervalOptions = ["0.5", "1", "5", "10", "30", "60"]
// const comPortOptions = ["COM1", "COM2", "COM3", "COM4", "COM5", "COM6"]
// const stopBitOptions = [1, 1.5, 2]
// const byteSizeOptions = [5, 6, 7, 8]

// export default function SettingsPage() {
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
//   })

//   const [sensorSettings, setSensorSettings] = useState<SensorSetting[]>([])
//   const [alertSettings, setAlertSettings] = useState<AlertSetting[]>([])
//   const [showConfirmation, setShowConfirmation] = useState<string | null>(null)
//   const [generalError, setGeneralError] = useState<string | null>(null)
//   const [sensorError, setSensorError] = useState<string | null>(null)
//   const [alertError, setAlertError] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [isSaving, setIsSaving] = useState({
//     general: false,
//     sensor: false,
//     alert: false,
//   })

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true)
//       try {
//         const token = localStorage.getItem('accessToken')
//         if (!token) throw new Error("No authentication token found")

//         const [generalRes, sensorRes, alertRes] = await Promise.all([
//           fetch('http://127.0.0.1:8000/api/generalsettings', {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//           fetch('http://127.0.0.1:8000/api/sensorsettings', {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//           fetch('http://127.0.0.1:8000/api/alertsettings', {
//             headers: { Authorization: `Bearer ${token}` }
//           })
//         ])

//         if (!generalRes.ok || !sensorRes.ok || !alertRes.ok) {
//           throw new Error('Failed to fetch settings')
//         }

//         setGeneralSettings(await generalRes.json())
//         setSensorSettings(await sensorRes.json())
//         setAlertSettings(await alertRes.json())

//       } catch (error) {
//         console.error("Error fetching data:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

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

//   const handleConfirmation = async (type: string) => {
//     setShowConfirmation(null)
//     setIsSaving(prev => ({ ...prev, [type]: true }))
    
//     try {
//       const token = localStorage.getItem('accessToken')
//       if (!token) throw new Error("Authentication required")

//       let endpoint = ""
//       let body: any

//       switch (type) {
//         case "general":
//           endpoint = "http://127.0.0.1:8000/api/generalsettings"
//           body = {
//             ...generalSettings,
//             installed_date: generalSettings.installed_date || new Date().toISOString().split('T')[0]
//           }
//           break

//         case "sensor":
//           endpoint = "http://127.0.0.1:8000/api/sensorsettings"
//           body = sensorSettings.map(sensor => ({
//             ...sensor,
//             slave_id: Number(sensor.slave_id),
//             register_address: Number(sensor.register_address),
//             register_count: Number(sensor.register_count),
//             multiplier: Number(sensor.multiplier),
//             offset: Number(sensor.offset),
//             upper_threshold: Number(sensor.upper_threshold),
//             lower_threshold: Number(sensor.lower_threshold)
//           }))
//           break

//         case "alert":
//           endpoint = "http://127.0.0.1:8000/api/alertsettings"
//           body = alertSettings
//           break
//       }

//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify(body),
//       })

//       if (response.status === 403) {
//         throw new Error("Permission denied. Admin access required.")
//       }

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.detail || "Failed to save settings")
//       }

//       // Refresh data after successful save
//       const newData = await response.json()
//       switch (type) {
//         case "general":
//           setGeneralSettings(newData)
//           break
//         case "sensor":
//           setSensorSettings(newData)
//           break
//         case "alert":
//           setAlertSettings(newData)
//           break
//       }

//     } catch (error) {
//       console.error(`Error saving ${type} settings:`, error)
//       const message = error instanceof Error ? error.message : "Unknown error"
//       switch (type) {
//         case "general":
//           setGeneralError(message)
//           break
//         case "sensor":
//           setSensorError(message)
//           break
//         case "alert":
//           setAlertError(message)
//           break
//       }
//     } finally {
//       setIsSaving(prev => ({ ...prev, [type]: false }))
//     }
//   }

//   const handleAlertTypeChange = (index: number, type: string) => {
//     setAlertSettings(prev => prev.map((alert, i) => 
//       i === index ? {
//         ...alert,
//         alert_type: alert.alert_type.includes(type)
//           ? alert.alert_type.filter(t => t !== type)
//           : [...alert.alert_type, type]
//       } : alert
//     ))
//   }

//   const addSensorRow = () => {
//     setSensorSettings(prev => [...prev, {
//       sensor_id: "",
//       slave_id: "",
//       function_code: "",
//       register_address: "",
//       register_count: "",
//       variable: "",
//       multiplier: "",
//       offset: "",
//       parameter_name: "",
//       unit: "",
//       upper_threshold: "",
//       lower_threshold: ""
//     }])
//   }

//   const addAlertRow = () => {
//     setAlertSettings(prev => [...prev, {
//       id: Date.now().toString(),
//       name: "",
//       designation: "",
//       mobile_number: "",
//       email: "",
//       alert_type: []
//     }])
//   }

//   const updateAlertSetting = (index: number, field: keyof AlertSetting, value: string) => {
//     setAlertSettings(prev => prev.map((alert, i) => 
//       i === index ? { ...alert, [field]: value } : alert
//     ))
//   }

//   const handleDownloadGeneralSettings = () => {
//     const data = JSON.stringify(generalSettings, null, 2)
//     const blob = new Blob([data], { type: "application/json" })
//     const url = URL.createObjectURL(blob)
//     const link = document.createElement("a")
//     link.href = url
//     link.download = "general_settings.json"
//     link.click()
//     URL.revokeObjectURL(url)
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
//       <div className="max-w-7xl mx-auto space-y-8">
//         <h1 className="text-3xl font-bold">System Configuration</h1>

//         {isLoading ? (
//           <div className="text-center">Loading settings...</div>
//         ) : (
//           <>
//             {/* General Settings Form */}
//             <section className="bg-gray-800 p-6 rounded-lg">
//               <div className="flex items-center gap-2 mb-6">
//                 <Settings className="w-6 h-6 text-blue-400" />
//                 <h2 className="text-xl font-semibold">General Settings</h2>
//               </div>
              
//               {generalError && (
//                 <div className="bg-red-600 p-3 rounded mb-4">{generalError}</div>
//               )}

//               <form onSubmit={handleGeneralSubmit} className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {Object.entries(generalSettings).map(([key, value]) => (
//                     <div key={key}>
//                       <label className="block text-sm mb-1">
//                         {key.replace(/_/g, ' ').toUpperCase()}
//                       </label>
//                       {key === 'baud_rate' ? (
//                         <select
//                           value={value}
//                           onChange={e => setGeneralSettings(prev => ({
//                             ...prev,
//                             [key]: Number(e.target.value)
//                           }))}
//                           className="w-full bg-gray-700 rounded p-2"
//                         >
//                           {baudRateOptions.map(opt => (
//                             <option key={opt} value={opt}>{opt}</option>
//                           ))}
//                         </select>
//                       ) : key === 'parity' ? (
//                         <select
//                           value={value}
//                           onChange={e => setGeneralSettings(prev => ({
//                             ...prev,
//                             [key]: e.target.value
//                           }))}
//                           className="w-full bg-gray-700 rounded p-2"
//                         >
//                           {parityOptions.map(opt => (
//                             <option key={opt} value={opt}>{opt}</option>
//                           ))}
//                         </select>
//                       ) : key === 'log_interval' ? (
//                         <select
//                           value={value}
//                           onChange={e => setGeneralSettings(prev => ({
//                             ...prev,
//                             [key]: Number(e.target.value)
//                           }))}
//                           className="w-full bg-gray-700 rounded p-2"
//                         >
//                           {loggingIntervalOptions.map(opt => (
//                             <option key={opt} value={opt}>{opt} mins</option>
//                           ))}
//                         </select>
//                       ) : (
//                         <input
//                           type={typeof value === 'number' ? 'number' : 'text'}
//                           value={value?.toString() ?? ''}
//                           onChange={e => setGeneralSettings(prev => ({
//                             ...prev,
//                             [key]: key === 'station_id' 
//                               ? Number(e.target.value)
//                               : e.target.value
//                           }))}
//                           className="w-full bg-gray-700 rounded p-2"
//                         />
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex gap-4">
//                   <button
//                     type="submit"
//                     disabled={isSaving.general}
//                     className="bg-blue-600 px-4 py-2 rounded disabled:opacity-50"
//                   >
//                     {isSaving.general ? 'Saving...' : 'Save Settings'}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleDownloadGeneralSettings}
//                     className="bg-green-600 px-4 py-2 rounded"
//                   >
//                     Download Config
//                   </button>
//                 </div>
//               </form>
//             </section>

//             {/* Sensor Settings Table */}
//             <section className="bg-gray-800 p-6 rounded-lg">
//               <div className="flex justify-between items-center mb-6">
//                 <div className="flex items-center gap-2">
//                   <Database className="w-6 h-6 text-blue-400" />
//                   <h2 className="text-xl font-semibold">Sensor Configuration</h2>
//                 </div>
//                 <button
//                   onClick={addSensorRow}
//                   className="bg-green-600 px-4 py-2 rounded"
//                 >
//                   Add Sensor
//                 </button>
//               </div>

//               {sensorError && (
//                 <div className="bg-red-600 p-3 rounded mb-4">{sensorError}</div>
//               )}

//               <form onSubmit={handleSensorSubmit}>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-700">
//                       <tr>
//                         {Object.keys(sensorSettings[0] || {}).map(key => (
//                           <th key={key} className="px-4 py-2 text-left">
//                             {key.replace(/_/g, ' ')}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {sensorSettings.map((sensor, index) => (
//                         <tr key={index} className="border-b border-gray-700">
//                           {Object.entries(sensor).map(([key, value]) => (
//                             <td key={key} className="px-4 py-2">
//                               <input
//                                 type="text"
//                                 value={value}
//                                 onChange={e => {
//                                   const newSettings = [...sensorSettings]
//                                   newSettings[index][key as keyof SensorSetting] = e.target.value
//                                   setSensorSettings(newSettings)
//                                 }}
//                                 className="w-full bg-gray-700 rounded p-1"
//                               />
//                             </td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={isSaving.sensor}
//                   className="mt-4 bg-blue-600 px-4 py-2 rounded disabled:opacity-50"
//                 >
//                   {isSaving.sensor ? 'Saving...' : 'Save Sensor Config'}
//                 </button>
//               </form>
//             </section>

//             {/* Alert Settings Section */}
//             <section className="bg-gray-800 p-6 rounded-lg">
//               <div className="flex justify-between items-center mb-6">
//                 <div className="flex items-center gap-2">
//                   <AlertCircle className="w-6 h-6 text-blue-400" />
//                   <h2 className="text-xl font-semibold">Alert Configuration</h2>
//                 </div>
//                 <button
//                   onClick={addAlertRow}
//                   className="bg-green-600 px-4 py-2 rounded"
//                 >
//                   Add Recipient
//                 </button>
//               </div>

//               {alertError && (
//                 <div className="bg-red-600 p-3 rounded mb-4">{alertError}</div>
//               )}

//               <form onSubmit={handleAlertSubmit} className="space-y-4">
//                 {alertSettings.map((alert, index) => (
//                   <div key={alert.id} className="bg-gray-700 p-4 rounded">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block mb-1">Name</label>
//                         <input
//                           value={alert.name}
//                           onChange={e => updateAlertSetting(index, 'name', e.target.value)}
//                           className="w-full bg-gray-600 rounded p-2"
//                         />
//                       </div>
//                       <div>
//                         <label className="block mb-1">Designation</label>
//                         <input
//                           value={alert.designation}
//                           onChange={e => updateAlertSetting(index, 'designation', e.target.value)}
//                           className="w-full bg-gray-600 rounded p-2"
//                         />
//                       </div>
//                       <div>
//                         <label className="block mb-1">Notification Methods</label>
//                         <div className="flex gap-4">
//                           <label className="flex items-center gap-2">
//                             <input
//                               type="checkbox"
//                               checked={alert.alert_type.includes('sms')}
//                               onChange={() => handleAlertTypeChange(index, 'sms')}
//                             />
//                             SMS
//                           </label>
//                           <label className="flex items-center gap-2">
//                             <input
//                               type="checkbox"
//                               checked={alert.alert_type.includes('email')}
//                               onChange={() => handleAlertTypeChange(index, 'email')}
//                             />
//                             Email
//                           </label>
//                         </div>
//                       </div>
//                       <div>
//                         <label className="block mb-1">Mobile Number</label>
//                         <div className="flex items-center gap-2">
//                           <Phone className="w-5 h-5" />
//                           <input
//                             value={alert.mobile_number}
//                             onChange={e => updateAlertSetting(index, 'mobile_number', e.target.value)}
//                             className="w-full bg-gray-600 rounded p-2"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <label className="block mb-1">Email Address</label>
//                         <div className="flex items-center gap-2">
//                           <Mail className="w-5 h-5" />
//                           <input
//                             type="email"
//                             value={alert.email}
//                             onChange={e => updateAlertSetting(index, 'email', e.target.value)}
//                             className="w-full bg-gray-600 rounded p-2"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   type="submit"
//                   disabled={isSaving.alert}
//                   className="mt-4 bg-blue-600 px-4 py-2 rounded disabled:opacity-50"
//                 >
//                   {isSaving.alert ? 'Saving...' : 'Save Alert Config'}
//                 </button>
//               </form>
//             </section>
//           </>
//         )}

//         {/* Confirmation Modal */}
//         {showConfirmation && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
//               <h3 className="text-xl font-bold mb-4">Confirm Changes</h3>
//               <p className="mb-6">Are you sure you want to save these changes?</p>
//               <div className="flex justify-end gap-4">
//                 <button
//                   onClick={() => setShowConfirmation(null)}
//                   className="px-4 py-2 bg-gray-600 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => handleConfirmation(showConfirmation)}
//                   className="px-4 py-2 bg-blue-600 rounded"
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }



"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Settings, AlertCircle, Database, Mail, Phone } from "lucide-react"

// Types for our forms
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

interface SensorSetting {
  sensor_id: number
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

interface AlertSetting {
  id: string
  name: string
  designation: string
  mobile_number: string
  email: string
  alert_type: string[]
}

const baudRateOptions = [9600, 19200, 38400, 57600, 115200]
const parityOptions = ["None", "Even", "Odd"]
const loggingIntervalOptions = ["0.5", "1", "5", "10", "30", "60"]
const comPortOptions = ["COM1", "COM2", "COM3", "COM4", "COM5", "COM6"]
const stopBitOptions = [1, 1.5, 2]
const byteSizeOptions = [5, 6, 7, 8]

function App() {
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
    installed_date: new Date().toISOString().split("T")[0], // Set default to current date
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

  // useEffect(() => {
  //   const fetchAllData = async () => {
  //     setIsLoading(true)
  //     try {
  //       await Promise.all([fetchGeneralSettings(), fetchSensorSettings(), fetchAlertSettings()])
  //     } catch (error) {
  //       console.error("Error fetching data:", error)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   fetchAllData()
  // }, [])

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        await fetchGeneralSettings();
        await fetchSensorSettings();
        await fetchAlertSettings();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchAllData();
  }, []);

  // const fetchGeneralSettings = () => {
  //   // Simulated API call
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       setGeneralSettings({
  //         id: 1,
  //         station_id: 1,
  //         station_name: "Main Station",
  //         server_address: "192.168.1.100",
  //         com_port: "COM3",
  //         baud_rate: 9600,
  //         byte_size: 8,
  //         parity: "None",
  //         stopbit: 1,
  //         poll_interval: 5000,
  //         poll_delay: 1000,
  //         log_interval: 60,
  //         installed_date: "2023-01-01", // Example date
  //       })
  //       resolve(null)
  //     }, 1000)
  //   })
  // }

  // const fetchSensorSettings = () => {
  //   // Simulated API call
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       setSensorSettings([
  //         {
  //           sensor_id: 1,
  //           slave_id: 1,
  //           function_code: "03",
  //           register_address: 40001,
  //           register_count: 2,
  //           variable: "Float",
  //           multiplier: 0.1,
  //           offset: 0,
  //           parameter_name: "Ambient Temperature",
  //           unit: "°C",
  //           upper_threshold: 40,
  //           lower_threshold: 10,
  //         },
  //         {
  //           sensor_id: 2,
  //           slave_id: 2,
  //           function_code: "04",
  //           register_address: 30001,
  //           register_count: 1,
  //           variable: "Integer",
  //           multiplier: 1,
  //           offset: 0,
  //           parameter_name: "Relative Humidity",
  //           unit: "%",
  //           upper_threshold: 80,
  //           lower_threshold: 20,
  //         },
  //       ])
  //       resolve(null)
  //     }, 1000)
  //   })
  // }

  

  // const fetchAlertSettings = () => {
  //   // Simulated API call
  //   return new Promise((resolve) => {
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
  //       resolve(null)
  //     }, 1000)
  //   })
  // }
  const fetchGeneralSettings = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://127.0.0.1:8000/general-settings', {
        method: 'GET',  // Explicitly specify GET
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.length > 0) setGeneralSettings(data[0]);
    } catch (error) {
      console.error('Error fetching general settings:', error);
      setGeneralError('Failed to load general settings');
    }
  };


  const fetchSensorSettings = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://127.0.0.1:8000/sensor-settings', {
        method: 'GET',  // Explicitly specify GET
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setSensorSettings(data);
    } catch (error) {
      console.error('Error fetching sensor settings:', error);
      setSensorError('Failed to load sensor settings');
    }
  };

  
  const fetchAlertSettings = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://127.0.0.1:8000/alert-settings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setAlertSettings(data.map((a: any) => ({
        ...a,
        id: String(a.id) // Convert numeric ID to string if needed
      })));
    } catch (error) {
      console.error('Error fetching alert settings:', error);
      setAlertError('Failed to load alert settings');
    }
  };

  //////////////
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
        endpoint = "http://127.0.0.1:8000/general-settings"
        setGeneralError(null)
        break
      case "sensor":
        settingsToSave = sensorSettings
        endpoint = "http://127.0.0.1:8000/sensor-settings"
        setSensorError(null)
        break
      case "alert":
        settingsToSave = alertSettings
        endpoint = "http://127.0.0.1:8000/alert-settings"
        setAlertError(null)
        break
      default:
        setIsSaving((prev) => ({ ...prev, [type]: false }))
        return
    }

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
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
        sensor_id: 0,
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
                                [key]: key === "parity" ? e.target.value : Number(e.target.value),
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
                    disabled={isSaving.general}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm disabled:opacity-50"
                  >
                    {isSaving.general ? "Saving..." : "Save General Settings"}
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
                              {key === "variable" ? (
                                <select
                                  value={value}
                                  onChange={(e) => {
                                    const newSensorSettings = [...sensorSettings]
                                    newSensorSettings[index] = { ...newSensorSettings[index], [key]: e.target.value }
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
                                    key === "function_code" || key === "parameter_name" || key === "unit"
                                      ? "text"
                                      : "number"
                                  }
                                  value={value}
                                  onChange={(e) => {
                                    const newSensorSettings = [...sensorSettings]
                                    let newValue: string | number = e.target.value
                                    if (key !== "function_code" && key !== "parameter_name" && key !== "unit") {
                                      newValue =
                                        key === "multiplier" ||
                                        key === "offset" ||
                                        key === "upper_threshold" ||
                                        key === "lower_threshold"
                                          ? Number.parseFloat(newValue)
                                          : Number.parseInt(newValue, 10)
                                    }
                                    newSensorSettings[index] = { ...newSensorSettings[index], [key]: newValue }
                                    setSensorSettings(newSensorSettings)
                                  }}
                                  step={
                                    key === "multiplier" ||
                                    key === "offset" ||
                                    key === "upper_threshold" ||
                                    key === "lower_threshold"
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

