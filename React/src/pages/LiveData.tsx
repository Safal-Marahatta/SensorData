// import Navbar from '../component/Navbar';
// import React, { useEffect, useState } from 'react';
// import SensorGraph from '../component/SensorGraph';
// import { SensorDataPoint } from '../component/SensorGraph';
// import DigitalClock from '../component/clock';

// interface SensorData {
//   [sensorId: number]: SensorDataPoint[];
// }

// const App: React.FC = () => {
//   const [sensorData, setSensorData] = useState<SensorData>({});

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


//   //get these dynamically from the database / backend

//   const sensors=[{
//     id:1,
//     text:"Water level at Intake"

//   },{
//     id:2,
//     text:"Water level at Desander"
//   },{
//     id:3,
//     text:"Water level at Headpond"
//   },{
//     id:4,
//     text:"Water level at Tailrace"
//   },{
//     id:5,
//     text:"Water level at Tailrace"
//   },
//   {
//     id:6,
//     text:"Water level at Tailrace"
//   }
  

//   ]

//   // Dynamic grid columns based on number of sensors
//   const getGridCols = (sensorCount: number) => {
//     if(sensorCount === 1) return 'grid-cols-1';
//     if (sensorCount <= 2) return 'grid-cols-1 sm:grid-cols-2';
//     if (sensorCount <= 4) return 'grid-cols-2';
//     if (sensorCount <= 6) return 'grid-cols-2 lg:grid-cols-3';
//     if (sensorCount <= 9) return 'grid-cols-3';
//     return 'grid-cols-3 xl:grid-cols-4';
//   };

//   // Calculate the number of rows based on sensors and columns
//   const getGridRows = (sensorCount: number) => {
//     if(sensorCount === 1) return 'grid-rows-1';
//     if (sensorCount <= 2) return 'grid-rows-2 sm:grid-rows-1';
//     if (sensorCount <= 4) return 'grid-rows-2';
//     if (sensorCount <= 6) return 'grid-rows-3 lg:grid-rows-2';
//     if (sensorCount <= 9) return 'grid-rows-3';
//     return 'grid-rows-3';
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <Navbar />
//       <div className="flex-1 bg-gray-700 p-1 flex flex-col min-h-0">
//       <DigitalClock/>
//         <div className={`grid ${getGridCols(sensors.length)} ${getGridRows(sensors.length)} gap-4 flex-1`}>
//           {sensors.map((sensor) => (
//             <div key={sensor.id} className="relative w-full h-full">
//               <div className="absolute inset-0">
//                 <SensorGraph
//                   sensorId={sensor.id}
//                   data={sensorData[sensor.id] || []}
//                   text={sensor.text}
//                   lowThreshold={20}
//                   highThreshold={80}
//                 />
//               </div>
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
import DigitalClock from '../component/clock';

interface SensorData {
  [sensorId: number]: SensorDataPoint[];
}

interface Sensor {
  id: number;
  text: string;
}

const App: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData>({});
  const [sensors, setSensors] = useState<Sensor[]>([]);

  // Fetch the sensor data (measurements)
  const fetchSensorData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/sensor-data', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data: SensorData = await response.json();
      setSensorData(data);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  // Fetch the sensor definitions (id and text)
  const fetchSensors = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/sensorsidtext', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data: Sensor[] = await response.json();
      setSensors(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching sensors:', error);
    }
  };

  useEffect(() => {
    // Fetch sensor definitions once on component mount
    fetchSensors();
    // Fetch sensor data and update it every second
    fetchSensorData();
    const intervalId = setInterval(fetchSensorData, 1000);
    return () => clearInterval(intervalId);
  }, []);


  // Dynamic grid columns based on number of sensors
  const getGridCols = (sensorCount: number) => {
    if (sensorCount === 1) return 'grid-cols-1';
    if (sensorCount <= 2) return 'grid-cols-1 sm:grid-cols-2';
    if (sensorCount <= 4) return 'grid-cols-2';
    if (sensorCount <= 6) return 'grid-cols-2 lg:grid-cols-3';
    if (sensorCount <= 9) return 'grid-cols-3';
    return 'grid-cols-3 xl:grid-cols-4';
  };

  // Calculate the number of rows based on sensors and columns
  const getGridRows = (sensorCount: number) => {
    if (sensorCount === 1) return 'grid-rows-1';
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
        <DigitalClock />
        <div className={`grid ${getGridCols(sensors.length)} ${getGridRows(sensors.length)} gap-4 flex-1`}>
          {sensors.map((sensor) => (
            <div key={sensor.id} className="relative w-full h-full">
              <div className="absolute inset-0">
                <SensorGraph
                  sensorId={sensor.id}
                  data={sensorData[sensor.id] || []}
                  text={sensor.text}
                  lowThreshold={sensor.lower_threshold}
                  highThreshold={sensor.upper_threshold}
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
