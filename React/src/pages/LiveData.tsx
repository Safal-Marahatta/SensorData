// import Navbar from '../component/Navbar';
// import React, { useEffect, useState } from 'react';
// import SensorGraph from '../component/SensorGraph';
// import { SensorDataPoint } from '../component/SensorGraph';

// interface SensorData {
//   [sensorId: number]: SensorDataPoint[];
// }

// const App: React.FC = () => {
//   const [sensorData, setSensorData] = useState<SensorData>({});
//   const [currentTime, setCurrentTime] = useState(new Date());

//   const fetchSensorData = async () => {
//     try {
//       const token = localStorage.getItem('accessToken');
//       const response = await fetch('http://localhost:8000/sensor-data',
//         {headers: {
//             'Authorization': `Bearer ${token}`,
//             // Include other headers as needed
//           },
//         }
//       ); // Update URL as needed
//       // Here we expect an object where keys are sensor IDs and values are arrays of readings.
//       const data: SensorData = await response.json();
//       // Update the state with the received data
//       setSensorData(data);
//     } catch (error) {
//       console.error('Error fetching sensor data:', error);
//     }
//   };

//   // Fetch sensor data every second.
//   useEffect(() => {
//     fetchSensorData();
//     const intervalId = setInterval(fetchSensorData, 1000);
//     return () => clearInterval(intervalId);
//   }, []);

//   // Update the current time every second.
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Render sensor graphs for sensor IDs 1 through 7.
//   //I think this should also be fetched from the apis. because differnet clients have different sensors requirements
//   const sensorIds = [1, 2, 3, 4, 5, 6, 7];//this can be 1,2 ,3 4 or even 10or 11 or 12 sensors

//   return (
//     <>
//       <Navbar />
//       <div className="bg-gray-900 min-h-screen p-2">
//         {/* Current Date and Time Display */}
//         <div className="flex items-center justify-center mb-6">
//           <div className="bg-indigo-600 px-6 py-3 rounded-full shadow-lg text-white text-lg font-semibold">
//             {currentTime.toLocaleString()}
//           </div>
//         </div>

//         {/* <h1 className="text-center text-3xl text-white mb-6">
//           Live Data
//         </h1> */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
//           {sensorIds.map((sensorId) => (
//             <SensorGraph
//               key={sensorId}
//               sensorId={sensorId}
//               data={sensorData[sensorId] || []}
//               lowThreshold={20} // Adjust threshold as needed
//               highThreshold={80} // Adjust threshold as needed
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;

// import Navbar from '../component/Navbar';
// import React, { useEffect, useState } from 'react';
// import SensorGraph from '../component/SensorGraph';
// import { SensorDataPoint } from '../component/SensorGraph';

// interface SensorData {
//   [sensorId: number]: SensorDataPoint[];
// }

// const App: React.FC = () => {
//   const [sensorData, setSensorData] = useState<SensorData>({});
//   const [currentTime, setCurrentTime] = useState(new Date());

//   const fetchSensorData = async () => {
//     try {
//       const token = localStorage.getItem('accessToken');
//       const response = await fetch('http://localhost:8000/sensor-data',
//         {headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         }
//       );
//       const data: SensorData = await response.json();
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

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const sensorIds = [1,2,3,4,5];

//   // Dynamic grid columns based on number of sensors
//   const getGridCols = (sensorCount: number) => {
//     if(sensorCount==1) return 'grid-cols-1';
//     if (sensorCount <= 2) return 'grid-cols-1 sm:grid-cols-2';
//     if (sensorCount <= 4) return 'grid-cols-2';
//     if (sensorCount <= 6) return 'grid-cols-2 lg:grid-cols-3';
//     if (sensorCount <= 9) return 'grid-cols-3';
//     return 'grid-cols-3 xl:grid-cols-4';
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <Navbar />
//       <div className="flex-1 bg-gray-900 p-1 flex flex-col min-h-0">
//         <div className="flex justify-center mb-2">
//           <div className="bg-indigo-600 px-4 py-1 rounded-full shadow-lg text-white text-sm font-semibold">
//             {currentTime.toLocaleString()}
//           </div>
//         </div>

//         <div className={`grid ${getGridCols(sensorIds.length)} gap-4 flex-1 min-h-0`}>
//           {sensorIds.map((sensorId) => (
//             <div key={sensorId} className="h-full min-h-0">
//               <SensorGraph
//                 sensorId={sensorId}
//                 data={sensorData[sensorId] || []}
//                 lowThreshold={20}
//                 highThreshold={80}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;





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
          },
        }
      );
      const data: SensorData = await response.json();
      setSensorData(data);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const intervalId = setInterval(fetchSensorData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const sensorIds = [1,2,3];//get these dynamically from the database / backend

  // Dynamic grid columns based on number of sensors
  const getGridCols = (sensorCount: number) => {
    if(sensorCount === 1) return 'grid-cols-1';
    if (sensorCount <= 2) return 'grid-cols-1 sm:grid-cols-2';
    if (sensorCount <= 4) return 'grid-cols-2';
    if (sensorCount <= 6) return 'grid-cols-2 lg:grid-cols-3';
    if (sensorCount <= 9) return 'grid-cols-3';
    return 'grid-cols-3 xl:grid-cols-4';
  };

  // Calculate the number of rows based on sensors and columns
  const getGridRows = (sensorCount: number) => {
    if(sensorCount === 1) return 'grid-rows-1';
    if (sensorCount <= 2) return 'grid-rows-2 sm:grid-rows-1';
    if (sensorCount <= 4) return 'grid-rows-2';
    if (sensorCount <= 6) return 'grid-rows-3 lg:grid-rows-2';
    if (sensorCount <= 9) return 'grid-rows-3';
    return 'grid-rows-3';
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-700 p-1 flex flex-col min-h-0">
        <div className="flex justify-center mb-2">
          <div className="bg-indigo-600 px-4 py-1 rounded-full shadow-lg text-white text-sm font-semibold">
            {currentTime.toLocaleString()}
          </div>
        </div>

        <div className={`grid ${getGridCols(sensorIds.length)} ${getGridRows(sensorIds.length)} gap-4 flex-1`}>
          {sensorIds.map((sensorId) => (
            <div key={sensorId} className="relative w-full h-full">
              <div className="absolute inset-0">
                <SensorGraph
                  sensorId={sensorId}
                  data={sensorData[sensorId] || []}
                  lowThreshold={20}
                  highThreshold={80}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;