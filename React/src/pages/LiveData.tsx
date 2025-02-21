// import Navbar from '../component/Navbar';
// import React, { useEffect, useState } from 'react';
// import SensorGraph from '../component/SensorGraph';
// import { SensorDataPoint } from '../component/SensorGraph';
// import DigitalClock from '../component/clock';

// interface SensorData {
//   [sensorId: number]: SensorDataPoint[];
// }

// interface Sensor {
//   id: number;
//   text: string;
//   unit:string;
//   lower_threshold:number;
//   upper_threshold:number;
// }

// const App: React.FC = () => {
//   const [sensorData, setSensorData] = useState<SensorData>({});
//   const [sensors, setSensors] = useState<Sensor[]>([]);
//   const [oncondition,setoncondition ] = useState<Boolean>(false);

//   // Fetch the sensor data (measurements)
//   const fetchSensorData = async () => {
//     try {
//       const token = localStorage.getItem('accessToken');
//       const response = await fetch('http://localhost:8000/sensor-data', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       const data: SensorData = await response.json();
//       console.log(data)
//       setSensorData(data);
//     } catch (error) {
//       console.error('Error fetching sensor data:', error);
//     }
//   };

//   // Fetch the sensor definitions (id and text)
//   const fetchSensors = async () => {
//     try {
//       const token = localStorage.getItem('accessToken');
//       const response = await fetch('http://localhost:8000/sensorsidtext', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       const data: Sensor[] = await response.json();
//       setSensors(data);
//       console.log(data);
//     } catch (error) {
//       console.error('Error fetching sensors:', error);
//     }
//   };

//   useEffect(() => {
//     // Fetch sensor definitions once on component mount
//     fetchSensors();
//     // Fetch sensor data and update it every second
//     fetchSensorData();
//     const intervalId = setInterval(fetchSensorData, 1000);
//     return () => clearInterval(intervalId);
//   }, []);


//   const fetchonoffstatus=async()=>{
//     try {
//       const token = localStorage.getItem('accessToken');
//       const response = await fetch('http://localhost:8000/getonoff', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       setoncondition(data);
//       console.log(data);
//     } catch (error) {
//       console.error('Error fetching on off conditin:', error);
//     }
//   }


//   useEffect(() => {
//     fetchonoffstatus();

//   }, []);

//   const handleClick = async () => {
//     // Toggle state
//     setoncondition(!oncondition);
    
//     // Determine the on/off value (using the current state)
//     const onoffvar = oncondition ? true : false;
  
//     try {
//       const token = localStorage.getItem('accessToken');
//       const response = await fetch('http://localhost:8000/updateonoff', {
//         method: 'POST', // specify POST request
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json', // set header for JSON body
//         },
//         body: JSON.stringify({ on: onoffvar }), // send data as JSON
//       });
  
//       // Optionally, process the response if needed:
//       // const result = await response.json();
//       // console.log('Server response:', result);
//     } catch (error) {
//       console.error('Error posting the data:', error);
//     }
//   };
  


//   // Dynamic grid columns based on number of sensors
//   const getGridCols = (sensorCount: number) => {
//     if (sensorCount === 1) return 'grid-cols-1';
//     if (sensorCount <= 2) return 'grid-cols-1 sm:grid-cols-2';
//     if (sensorCount <= 4) return 'grid-cols-2';
//     if (sensorCount <= 6) return 'grid-cols-2 lg:grid-cols-3';
//     if (sensorCount <= 9) return 'grid-cols-3';
//     return 'grid-cols-3 xl:grid-cols-4';
//   };

//   // Calculate the number of rows based on sensors and columns
//   const getGridRows = (sensorCount: number) => {
//     if (sensorCount === 1) return 'grid-rows-1';
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
//         <div className='flex px-2 items-center justify-between'>
//           <p className='text-white mt-2'>Lower Solu Hydropower Project</p>
//           <DigitalClock />

//           <div className='flex items-center space-x-2'>
//             <p className='text-white'>Operation Start</p>
//           <button
//             onClick={handleClick}
//             className={`relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-900 ${
//               oncondition ? 'bg-green-600' : 'bg-gray-600'
//             }`}
//           >
//             <span className="sr-only">Toggle Online Data Hosting</span>
//             <span
//               className={`absolute left-0.5 inline-block w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out ${
//                 oncondition ? 'translate-x-4' : 'translate-x-0'
//               }`}
//             />
//           </button>
//           </div>

//         </div>

//         <div className={`grid ${getGridCols(sensors.length)} ${getGridRows(sensors.length)} gap-4 flex-1`}>
//           {sensors.map((sensor) => (
//             <div key={sensor.id} className="relative w-full h-full">
//               <div className="absolute inset-0">
//                 <SensorGraph
//                   sensorId={sensor.id}
//                   data={sensorData[sensor.id] || []}
//                   text={sensor.text}
//                   lowThreshold={sensor.lower_threshold}
//                   highThreshold={sensor.upper_threshold}
//                   unit={sensor.unit}
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
  unit: string;
  lower_threshold: number;
  upper_threshold: number;
}

const App: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData>({});
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [oncondition, setoncondition] = useState<boolean>(false);

  // Fetch the sensor data (measurements)
  const fetchSensorData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/sensor-data', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      // Fallback to empty object if response is empty or null
      const data: SensorData = (await response.json()) || {};
      console.log(data);
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
      // Fallback to empty array if response is empty or null
      const data: Sensor[] = (await response.json()) || [];
      console.log(data);
      setSensors(data);
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

  const fetchonoffstatus = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/getonoff', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data)
      setoncondition(data.on);
    } catch (error) {
      console.error('Error fetching on off condition:', error);
    }
  };

  useEffect(() => {
    fetchonoffstatus();
  }, []);

  const handleClick = async () => {
    // Compute the new condition before updating the state
    const newCondition = !oncondition;
    setoncondition(newCondition);

    try {
      const token = localStorage.getItem('accessToken');
      await fetch('http://localhost:8000/updateonoff', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ on: newCondition }),
      });
    } catch (error) {
      console.error('Error posting the data:', error);
    }
  };


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
        <div className="flex px-2 items-center justify-between">
          <p className="text-white mt-2">Lower Solu Hydropower Project</p>
          <DigitalClock />
          <div className="flex items-center space-x-2">
            <p className="text-white">Operation Start</p>
            <button
              onClick={handleClick}
              className={`relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-900 ${
                oncondition ? 'bg-green-600' : 'bg-gray-600'
              }`}
            >
              <span className="sr-only">Toggle Online Data Hosting</span>
              <span
                className={`absolute left-0.5 inline-block w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                  oncondition ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
        {sensors.length > 0 ? (
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
                    unit={sensor.unit}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white text-center mt-4">
            No sensor data available.
          </div>
        )}
      </div>
    </div>
  );
};

export default App;


