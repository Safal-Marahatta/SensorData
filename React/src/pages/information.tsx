// import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow  } from "../component/ui/table"
// import { Mail, MessageSquare, Check } from 'lucide-react'
// import { motion } from "framer-motion"
// import Navbar from "../component/Navbar"
// import { useEffect,useState } from "react"

// const planFeatures = [
//   { feature: "Online Transmission", full: false, limited: true },
//   { feature: "SMS Alert", full: false, limited: true },
//   { feature: "Email Alert", full: false, limited: true },
//   { feature: "Siren", full: false, limited: true },
// ]

// // const mockAlerts = [
// //   {
// //     id: 1,
// //     name: "John Doe",
// //     designation: "Manager",
// //     mobile_number: "+1 234 567 8901",
// //     email: "john.doe@example.com",
// //     email_alert: false,
// //     sms_alert: false,
// //   },
// //   {
// //     id: 2,
// //     name: "Jane Smith",
// //     designation: "Supervisor",
// //     mobile_number: "+1 987 654 3210",
// //     email: "jane.smith@example.com",
// //     email_alert: false,
// //     sms_alert: false,
// //   },
// //   {
// //     id: 3,
// //     name: "Bob Johnson",
// //     designation: "Technician",
// //     mobile_number: "+1 555 123 4567",
// //     email: "bob.johnson@example.com",
// //     email_alert: false,
// //     sms_alert: false,
// //   },
// // ]

// const Checkbox = ({ checked }: { checked: boolean }) => (
//   <motion.div
//     initial={{ scale: 0.8, opacity: 0 }}
//     animate={{ scale: 1, opacity: 1 }}
//     transition={{ duration: 0.3 }}
//     className={`w-6 h-6 rounded-md flex items-center justify-center ${
//       checked ? "bg-emerald-500" : "bg-gray-700 border-2 border-gray-500"
//     }`}
//   >
//     {checked && <Check className="h-4 w-4 text-white" />}
//   </motion.div>
// )

// const Switch = ({ checked }: { checked: boolean }) => (
//   <motion.div
//     initial={{ backgroundColor: checked ? "#10B981" : "#374151" }}
//     animate={{ backgroundColor: checked ? "#10B981" : "#374151" }}
//     transition={{ duration: 0.3 }}
//     className="w-12 h-7 rounded-full p-1 cursor-not-allowed"
//   >
//     <motion.div
//       initial={{ x: checked ? 20 : 0 }}
//       animate={{ x: checked ? 20 : 0 }}
//       transition={{ type: "spring", stiffness: 500, damping: 30 }}
//       className="w-5 h-5 bg-white rounded-full shadow-md"
//     />
//   </motion.div>
// )

// export default function AlertsAndPlansDisplay() {

//   const [mockAlerts, setAlerts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchAlerts = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/getAlertRecipients');
//         if (!response.ok) {
//           throw new Error(`Network response was not ok: ${response.status}`);
//         }
//         const data = await response.json();
//         setAlerts(data);
//       } catch (err) {
//         console.error('Error fetching alerts:', err);

//       } finally {
//         setLoading(false);
//         console.log(loading)
//       }
//     };

//     fetchAlerts();
//   }, []);

//   console.log(mockAlerts);



//   return (<>
//   <Navbar/>
//     <div className="container mx-auto bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 min-h-screen">
//       {/* <motion.h1
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500"
//       >
//         Alert System Dashboard
//       </motion.h1> */}

//       {/* Plan Features Table */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-8 border border-gray-700"
//       >
//         <h2 className="text-2xl font-semibold p-6 bg-gray-700 text-emerald-400">Subscription Plan</h2>
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-gray-700">
//                 <TableHead className="font-semibold text-lg">Feature</TableHead>
//                 <TableHead className="font-semibold text-lg text-center">Subscribed</TableHead>
//                 <TableHead className="font-semibold text-lg text-center">Not Subscribed</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {planFeatures.map((feature, index) => (
//                 <TableRow key={index} className="hover:bg-gray-700/50 transition-colors duration-200">
//                   <TableCell className="font-medium  text-white">{feature.feature}</TableCell>
//                   <TableCell className="text-center">
//                     <div className="flex justify-center">
//                       <Checkbox checked={feature.full} />
//                     </div>
//                   </TableCell>
//                   <TableCell className="text-center">
//                     <div className="flex justify-center">
//                       <Checkbox checked={feature.limited} />
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </motion.div>

//       {/* Alerts Table */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//         className="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700"
//       >
//         <h2 className="text-2xl font-semibold p-6 bg-gray-700 text-blue-400">Alerts Recipients</h2>
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-gray-700">
//                 <TableHead className="font-semibold text-lg">Name</TableHead>
//                 <TableHead className="font-semibold text-lg">Designation</TableHead>
//                 <TableHead className="font-semibold text-lg">Mobile Number</TableHead>
//                 <TableHead className="font-semibold text-lg">Email</TableHead>
//                 <TableHead className="font-semibold text-lg text-center">Email Alert</TableHead>
//                 <TableHead className="font-semibold text-lg text-center">SMS Alert</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {mockAlerts.map((alert) => (
//                 <TableRow key={alert.id} className="hover:bg-gray-700/50 transition-colors duration-200">
//                   <TableCell className="font-medium text-white">{alert.name}</TableCell>
//                   <TableCell>{alert.designation}</TableCell>
//                   <TableCell>{alert.mobile_number}</TableCell>
//                   <TableCell className="text-emerald-400">{alert.email}</TableCell>
//                   <TableCell>
//                     <div className="flex items-center justify-center">
//                       <Switch checked={alert.email_alert} />
//                       <Mail className="ml-2 h-5 w-5 text-blue-400" />
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center justify-center">
//                       <Switch checked={alert.sms_alert} />
//                       <MessageSquare className="ml-2 h-5 w-5 text-blue-400" />
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </motion.div>
//     </div>
//     </>
//   )
// }

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../component/ui/table"
import { Mail, MessageSquare, Check } from 'lucide-react'
import { motion } from "framer-motion"
import Navbar from "../component/Navbar"
import { useEffect, useState } from "react"

const planFeatures = [
  { feature: "Real time data view", full: true, limited: false },
  { feature: "Data recording and download", full: true, limited: false },
  { feature: "Online Transmission", full: false, limited: true },
  { feature: "SMS Alert", full: false, limited: true },
  { feature: "Email Alert", full: false, limited: true },
  { feature: "Siren", full: false, limited: true },
]

// const mockAlerts = [
//   {
//     id: 1,
//     name: "John Doe",
//     designation: "Manager",
//     mobile_number: "+1 234 567 8901",
//     email: "john.doe@example.com",
//     email_alert: false,
//     sms_alert: false,
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     designation: "Supervisor",
//     mobile_number: "+1 987 654 3210",
//     email: "jane.smith@example.com",
//     email_alert: false,
//     sms_alert: false,
//   },
//   {
//     id: 3,
//     name: "Bob Johnson",
//     designation: "Technician",
//     mobile_number: "+1 555 123 4567",
//     email: "bob.johnson@example.com",
//     email_alert: false,
//     sms_alert: false,
//   },
// ]

const Checkbox = ({ checked }: { checked: boolean }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3 }}
    className={`w-4 h-4 rounded-md flex items-center justify-center ${
      checked ? "bg-emerald-500" : "bg-gray-700 border-2 border-gray-500"
    }`}
  >
    {checked && <Check className="h-3 w-3 text-white" />}
  </motion.div>
)

// Modified Switch component with smaller size
const Switch = ({ checked }: { checked: boolean }) => (
  <motion.div
    initial={{ backgroundColor: checked ? "#10B981" : "#374151" }}
    animate={{ backgroundColor: checked ? "#10B981" : "#374151" }}
    transition={{ duration: 0.3 }}
    className="w-8 h-4 rounded-full p-0.5 cursor-not-allowed"
  >
    <motion.div
      initial={{ x: checked ? 16 : 0 }}
      animate={{ x: checked ? 16 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="w-3 h-3 bg-white rounded-full shadow-md"
    />
  </motion.div>
)

export default function AlertsAndPlansDisplay() {

  const [mockAlerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://localhost:8000/getAlertRecipients');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        setAlerts(data);
      } catch (err) {
        console.error('Error fetching alerts:', err);
      } finally {
        setLoading(false);
        console.log(loading)
      }
    };

    fetchAlerts();
  }, []);

  console.log(mockAlerts);

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-gradient-to-br from-gray-700 to-gray-700 text-gray-100 min-h-screen">
        {/* Plan Features Table */}
        {/* <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-8 border border-gray-700"
        > */}
          <h2 className="text-2xl font-semibold p-6 text-emerald-400">Subscription Plan</h2>
          <div className="overflow-x-auto">
            <Table className="bg-gradient-to-br from-gray-800 to-gray-900 border-y-2 border-white">
              <TableHeader>
                <TableRow className="">
                  <TableHead className="font-semibold text-lg">Feature</TableHead>
                  <TableHead className="font-semibold text-lg text-center">Standard</TableHead>
                  <TableHead className="font-semibold text-lg text-center">Extended</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {planFeatures.map((feature, index) => (
                  <TableRow key={index} className="hover:bg-gray-700/50 transition-colors duration-200">
                    <TableCell className="font-medium text-white">{feature.feature}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        {feature.full?(
                        <Checkbox checked={feature.full} />):<></>
                        }
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        {feature.limited?(
                        <Checkbox checked={!feature.limited} />):<></>
                        }
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        {/* </motion.div> */}

        {/* Alerts Table */}
        {/* <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700"
        > */}
          <h2 className="text-2xl font-semibold p-6 bg-gray-700 text-emerald-400">Alerts Recipients</h2>
          <div className="overflow-x-auto">
            <Table className="bg-gradient-to-br from-gray-800 to-gray-900 border-y-2 border-white">
              <TableHeader>
                <TableRow className="border-y">
                  <TableHead className="font-semibold text-lg">Name</TableHead>
                  <TableHead className="font-semibold text-lg">Designation</TableHead>
                  <TableHead className="font-semibold text-lg">Mobile Number</TableHead>
                  <TableHead className="font-semibold text-lg">Email</TableHead>
                  <TableHead className="font-semibold text-lg text-center">Email Alert</TableHead>
                  <TableHead className="font-semibold text-lg text-center">SMS Alert</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAlerts.map((alert) => (
                  <TableRow key={alert.id} className="hover:bg-gray-700/50 transition-colors duration-200">
                    <TableCell className="font-medium text-white">{alert.name}</TableCell>
                    <TableCell>{alert.designation}</TableCell>
                    <TableCell>{alert.mobile_number}</TableCell>
                    <TableCell className="text-emerald-400">{alert.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center space-x-2">
                        <Switch checked={alert.email_alert} />
                        <Mail className="h-5 w-5 text-blue-400" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center space-x-2">
                        <Switch checked={alert.sms_alert} />
                        <MessageSquare className="ml-2 h-5 w-5 text-blue-400" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-white pt-8 text-center">For any technical support, please contact: info@ies.com.np or +977 9851198185 </p>
        {/* </motion.div> */}
      </div>
    </>
  )
}
