// // // src/App.tsx
// // import React, { useEffect, useState } from 'react';
// // import SensorGraph from '../component/SensorGraph';
// // import { SensorDataPoint } from '../component/SensorGraph';

// // interface SensorData {
// //   [sensorId: number]: SensorDataPoint[];
// // }

// // const App: React.FC = () => {
// //   const [sensorData, setSensorData] = useState<SensorData>({});

// //   // Function to fetch a new reading from the FastAPI backend
// //   const fetchSensorData = async () => {
// //     try {
// //       const response = await fetch('http://localhost:8000/sensor-data'); // Update URL as needed
// //       const newReading: SensorDataPoint = await response.json();

// //       // Update the state by appending the new reading to the appropriate sensor's array.
// //       // (Here we keep only the latest 20 readings per sensor.)
// //       console.log(newReading);
// //       const sensorId = newReading.sensorid;
// //       setSensorData((prev) => {
// //         const prevReadings = prev[sensorId] || [];
// //         return {
// //           ...prev,
// //           [sensorId]: [...prevReadings, newReading].slice(-20),
// //         };
// //       });
// //     } catch (error) {
// //       console.error('Error fetching sensor data:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     // Fetch immediately and then every 1 second
// //     fetchSensorData();
// //     const intervalId = setInterval(fetchSensorData, 1000);
// //     return () => clearInterval(intervalId);
// //   }, []);

// //   // Render sensor graphs for sensor IDs 1 through 7.
// //   const sensorIds = [1, 2, 3, 4, 5, 6, 7];

// //   return (
// //     <div className="bg-gray-900 min-h-screen p-6">
// //       <h1 className="text-center text-3xl text-white mb-6">
// //         Water level at Salm
// //       </h1>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {sensorIds.map((sensorId) => (
// //           <SensorGraph
// //             key={sensorId}
// //             sensorId={sensorId}
// //             data={sensorData[sensorId] || []}
// //             lowThreshold={20} // Adjust threshold as needed
// //             highThreshold={80} // Adjust threshold as needed
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default App;


// // src/App.tsx
// import Navbar from '../component/Navbar';
// import React, { useEffect, useState } from 'react';
// import SensorGraph from '../component/SensorGraph';
// import { SensorDataPoint } from '../component/SensorGraph';

// interface SensorData {
//   [sensorId: number]: SensorDataPoint[];
// }

// const App: React.FC = () => {
//   const [sensorData, setSensorData] = useState<SensorData>({});

//   const fetchSensorData = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/sensor-data'); // Update URL as needed
//       // Here we expect an object where keys are sensor IDs and values are arrays of readings.
//       const data: SensorData = await response.json();
//     //   console.log(data);
//       // Simply update the state with the received data
//       setSensorData(data);
//     } catch (error) {
//       console.error('Error fetching sensor data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchSensorData();
//     const intervalId = setInterval(fetchSensorData, 1000);
//     return () => clearInterval(intervalId);
//   }, []);

//   // Render sensor graphs for sensor IDs 1 through 7.
//   const sensorIds = [1, 2, 3, 4, 5, 6, 7];

//   return (
//     <>
//     <Navbar/>
//     <div className="bg-gray-900 min-h-screen">
//       <h1 className="text-center text-3xl text-white mb-6">
//         Water level at Salm
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
//         {sensorIds.map((sensorId) => (
//           <SensorGraph
//             key={sensorId}
//             sensorId={sensorId}
//             data={sensorData[sensorId] || []}
//             lowThreshold={20} // Adjust threshold as needed
//             highThreshold={80} // Adjust threshold as needed
//           />
//         ))}
//       </div>
//     </div>
//     </>
//   );
// };

// export default App;
// src/App.tsx





import Navbar from '../component/Navbar';
import React, { useEffect, useState } from 'react';
import SensorGraph from '../component/SensorGraph';
import { SensorDataPoint } from '../component/SensorGraph';

interface SensorData {
  [sensorId: number]: SensorDataPoint[];
}

const App: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData>({});
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchSensorData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/sensor-data',
        {headers: {
            'Authorization': `Bearer ${token}`,
            // Include other headers as needed
          },
        }
      ); // Update URL as needed
      // Here we expect an object where keys are sensor IDs and values are arrays of readings.
      const data: SensorData = await response.json();
      // Update the state with the received data
      setSensorData(data);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  // Fetch sensor data every second.
  useEffect(() => {
    fetchSensorData();
    const intervalId = setInterval(fetchSensorData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Update the current time every second.
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Render sensor graphs for sensor IDs 1 through 7.
  const sensorIds = [1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen p-2">
        {/* Current Date and Time Display */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-indigo-600 px-6 py-3 rounded-full shadow-lg text-white text-lg font-semibold">
            {currentTime.toLocaleString()}
          </div>
        </div>

        <h1 className="text-center text-3xl text-white mb-6">
          Live Data
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {sensorIds.map((sensorId) => (
            <SensorGraph
              key={sensorId}
              sensorId={sensorId}
              data={sensorData[sensorId] || []}
              lowThreshold={20} // Adjust threshold as needed
              highThreshold={80} // Adjust threshold as needed
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
