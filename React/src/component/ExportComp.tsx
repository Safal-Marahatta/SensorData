// import React, { useState } from 'react';
// import { X } from 'lucide-react';

// function ExportComp() {
//   const [dateRange, setDateRange] = useState({
//     start: '2025-01-26',
//     end: '2025-02-02'
//   });
//   const [selectedSensors, setSelectedSensors] = useState(['sensor1']);
//   const [showPreview, setShowPreview] = useState(false);

//   const handleRemoveSensor = (sensor: string) => {
//     setSelectedSensors(selectedSensors.filter(s => s !== sensor));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-8">Export Sensor Data</h1>
        
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
//           <div className="space-y-6">
//             {/* Date Range Selection */}
//             <div>
//               <label className="block text-gray-700 text-lg mb-2">Select Date Range</label>
//               <div className="flex items-center gap-4">
//                 <input
//                   type="date"
//                   value={dateRange.start}
//                   onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
//                   className="border rounded-md px-3 py-2"
//                 />
//                 <span className="text-gray-500">→</span>
//                 <input
//                   type="date"
//                   value={dateRange.end}
//                   onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
//                   className="border rounded-md px-3 py-2"
//                 />
//               </div>
//             </div>

//             {/* Sensor Selection */}
//             <div>
//               <label className="block text-gray-700 text-lg mb-2">Select Sensors</label>
//               <div className="relative">
//                 <div className="border rounded-md p-2 min-h-[42px]">
//                   <div className="flex flex-wrap gap-2">
//                     {selectedSensors.map((sensor) => (
//                       <div
//                         key={sensor}
//                         className="inline-flex items-center bg-blue-50 text-blue-700 rounded px-2 py-1"
//                       >
//                         {sensor}
//                         <button
//                           onClick={() => handleRemoveSensor(sensor)}
//                           className="ml-1 hover:text-blue-800"
//                         >
//                           <X size={16} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Preview Button */}
//             {/* yesma chai api call garera backend bata request garna parxa data lai. */}
//             <button
//               onClick={() => setShowPreview(true)}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-lg transition-colors"
//             >
//               Show Graph Preview
//             </button>
//           </div>
//         </div>

//         {/* Graph Preview Section */}
//         {showPreview && (
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Graph Preview</h2>
//             <div className="border rounded-lg p-4">
//               <div className="h-[300px] flex items-center justify-center text-gray-500">
//                 Graph preview would be displayed here
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ExportComp;


// import React, { useState } from 'react';
// import { X, ChevronDown } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// interface SensorData {
//   timestamp: string;
//   [key: string]: number | string;
// }

// function ExportComp() {
//   const [dateRange, setDateRange] = useState({
//     start: '2025-01-26',
//     end: '2025-02-02'
//   });
//   const [selectedSensors, setSelectedSensors] = useState(['sensor1']);
//   const [showPreview, setShowPreview] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [sensorData, setSensorData] = useState<SensorData[]>([]);

//   // Example sensor list - replace with your actual sensor data
//   const availableSensors = [
//     'sensor1',
//     'sensor2',
//     'sensor3',
//     'sensor4',
//     'sensor5'
//   ];

//   const handleRemoveSensor = (sensor: string) => {
//     setSelectedSensors(selectedSensors.filter(s => s !== sensor));
//   };

//   const handleAddSensor = (sensor: string) => {
//     if (!selectedSensors.includes(sensor)) {
//       setSelectedSensors([...selectedSensors, sensor]);
//     }
//     setIsDropdownOpen(false);
//   };

//   const fetchSensorData = async () => {
//     setIsLoading(true);
//     try {
//       // Replace with your actual API endpoint
//       const response = await fetch('/api/sensor-data', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           dateRange,
//           sensors: selectedSensors,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch sensor data');
//       }

//       const data = await response.json();
//       setSensorData(data);
//       setShowPreview(true);
//     } catch (error) {
//       console.error('Error fetching sensor data:', error);
//       // In a production environment, you'd want to show a proper error message to the user
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Generate random data for demonstration
//   const generateDemoData = () => {
//     const data: SensorData[] = [];
//     const startDate = new Date(dateRange.start);
//     const endDate = new Date(dateRange.end);
    
//     for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
//       const entry: SensorData = {
//         timestamp: date.toISOString().split('T')[0],
//       };
      
//       selectedSensors.forEach(sensor => {
//         entry[sensor] = Math.floor(Math.random() * 100);
//       });
      
//       data.push(entry);
//     }
    
//     return data;
//   };

//   const handleShowPreview = () => {
//     // For demonstration, we'll use generated data
//     // In production, use fetchSensorData() instead
//     setSensorData(generateDemoData());
//     setShowPreview(true);
//   };

//   const colors = ['#2563eb', '#dc2626', '#16a34a', '#9333ea', '#ea580c'];

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-8">Export Sensor Data</h1>
        
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
//           <div className="space-y-6">
//             {/* Date Range Selection */}
//             <div>
//               <label className="block text-gray-700 text-lg mb-2">Select Date Range</label>
//               <div className="flex items-center gap-4">
//                 <input
//                   type="date"
//                   value={dateRange.start}
//                   onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
//                   className="border rounded-md px-3 py-2"
//                 />
//                 <span className="text-gray-500">→</span>
//                 <input
//                   type="date"
//                   value={dateRange.end}
//                   onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
//                   className="border rounded-md px-3 py-2"
//                 />
//               </div>
//             </div>

//             {/* Sensor Selection */}
//             <div>
//               <label className="block text-gray-700 text-lg mb-2">Select Sensors</label>
//               <div className="relative">
//                 <div className="border rounded-md p-2 min-h-[42px]">
//                   <div className="flex flex-wrap gap-2">
//                     {selectedSensors.map((sensor) => (
//                       <div
//                         key={sensor}
//                         className="inline-flex items-center bg-blue-50 text-blue-700 rounded px-2 py-1"
//                       >
//                         {sensor}
//                         <button
//                           onClick={() => handleRemoveSensor(sensor)}
//                           className="ml-1 hover:text-blue-800"
//                         >
//                           <X size={16} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
//                 >
//                   <ChevronDown size={20} />
//                 </button>
                
//                 {/* Dropdown Menu */}
//                 {isDropdownOpen && (
//                   <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
//                     <div className="py-1">
//                       {availableSensors
//                         .filter(sensor => !selectedSensors.includes(sensor))
//                         .map(sensor => (
//                           <button
//                             key={sensor}
//                             onClick={() => handleAddSensor(sensor)}
//                             className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
//                           >
//                             {sensor}
//                           </button>
//                         ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Preview Button */}
//             <button
//               onClick={handleShowPreview}
//               disabled={isLoading || selectedSensors.length === 0}
//               className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-lg transition-colors ${
//                 (isLoading || selectedSensors.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//             >
//               {isLoading ? 'Loading...' : 'Show Graph Preview'}
//             </button>
//           </div>
//         </div>

//         {/* Graph Preview Section */}
//         {showPreview && sensorData.length > 0 && (
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Graph Preview</h2>
//             <div className="h-[400px] w-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={sensorData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis 
//                     dataKey="timestamp"
//                     tick={{ fontSize: 12 }}
//                     tickFormatter={(value) => value.split('-').slice(1).join('/')}
//                   />
//                   <YAxis tick={{ fontSize: 12 }} />
//                   <Tooltip />
//                   <Legend />
//                   {selectedSensors.map((sensor, index) => (
//                     <Line
//                       key={sensor}
//                       type="monotone"
//                       dataKey={sensor}
//                       stroke={colors[index % colors.length]}
//                       strokeWidth={2}
//                       dot={false}
//                       name={`Sensor ${sensor.slice(-1)}`}
//                     />
//                   ))}
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ExportComp;


import React, { useState, useRef } from 'react';
import { X, ChevronDown, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SensorData {
  timestamp: string;
  [key: string]: number | string;
}

function ExportComp() {
  const [dateRange, setDateRange] = useState({
    start: '2025-01-26',
    end: '2025-02-02'
  });
  const [selectedSensors, setSelectedSensors] = useState(['sensor1']);
  const [showPreview, setShowPreview] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  // Example sensor list - replace with your actual sensor data
  const availableSensors = [
    'sensor1',
    'sensor2',
    'sensor3',
    'sensor4',
    'sensor5'
  ];

  const handleRemoveSensor = (sensor: string) => {
    setSelectedSensors(selectedSensors.filter(s => s !== sensor));
  };

  const handleAddSensor = (sensor: string) => {
    if (!selectedSensors.includes(sensor)) {
      setSelectedSensors([...selectedSensors, sensor]);
    }
    setIsDropdownOpen(false);
  };

  const fetchSensorData = async () => {
    setIsLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/sensor-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRange,
          sensors: selectedSensors,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch sensor data');
      }

      const data = await response.json();
      setSensorData(data);
      setShowPreview(true);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      // In a production environment, you'd want to show a proper error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  // Generate random data for demonstration
  const generateDemoData = () => {
    const data: SensorData[] = [];
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      const entry: SensorData = {
        timestamp: date.toISOString().split('T')[0],
      };
      
      selectedSensors.forEach(sensor => {
        entry[sensor] = Math.floor(Math.random() * 100);
      });
      
      data.push(entry);
    }
    
    return data;
  };

  const handleShowPreview = () => {
    // For demonstration, we'll use generated data
    // In production, use fetchSensorData() instead
    setSensorData(generateDemoData());
    setShowPreview(true);
  };

  const downloadCSV = () => {
    // Create CSV header
    const headers = ['timestamp', ...selectedSensors];
    const csvContent = [
      headers.join(','),
      ...sensorData.map(row => 
        headers.map(header => row[header]).join(',')
      )
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `sensor_data_${dateRange.start}_to_${dateRange.end}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadImage = () => {
    if (!chartRef.current) return;

    // Use html2canvas to capture the chart
    import('html2canvas').then(({ default: html2canvas }) => {
      html2canvas(chartRef.current!).then(canvas => {
        const link = document.createElement('a');
        link.download = `sensor_graph_${dateRange.start}_to_${dateRange.end}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    });
  };

  const colors = ['#2563eb', '#dc2626', '#16a34a', '#9333ea', '#ea580c'];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">Export Sensor Data</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-6">
            {/* Date Range Selection */}
            <div>
              <label className="block text-gray-700 text-lg mb-2">Select Date Range</label>
              <div className="flex items-center gap-4">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="border rounded-md px-3 py-2"
                />
                <span className="text-gray-500">→</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="border rounded-md px-3 py-2"
                />
              </div>
            </div>

            {/* Sensor Selection */}
            <div>
              <label className="block text-gray-700 text-lg mb-2">Select Sensors</label>
              <div className="relative">
                <div className="border rounded-md p-2 min-h-[42px]">
                  <div className="flex flex-wrap gap-2">
                    {selectedSensors.map((sensor) => (
                      <div
                        key={sensor}
                        className="inline-flex items-center bg-blue-50 text-blue-700 rounded px-2 py-1"
                      >
                        {sensor}
                        <button
                          onClick={() => handleRemoveSensor(sensor)}
                          className="ml-1 hover:text-blue-800"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                >
                  <ChevronDown size={20} />
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                    <div className="py-1">
                      {availableSensors
                        .filter(sensor => !selectedSensors.includes(sensor))
                        .map(sensor => (
                          <button
                            key={sensor}
                            onClick={() => handleAddSensor(sensor)}
                            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                          >
                            {sensor}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Button */}
            <button
              onClick={handleShowPreview}
              disabled={isLoading || selectedSensors.length === 0}
              className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-lg transition-colors ${
                (isLoading || selectedSensors.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Loading...' : 'Show Graph Preview'}
            </button>
          </div>
        </div>

        {/* Graph Preview Section */}
        {showPreview && sensorData.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Graph Preview</h2>
              <div className="flex gap-4">
                <button
                  onClick={downloadCSV}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  <Download size={20} />
                  Download Excel
                </button>
                <button
                  onClick={downloadImage}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Download size={20} />
                  Download Image
                </button>
              </div>
            </div>
            <div ref={chartRef} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.split('-').slice(1).join('/')}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  {selectedSensors.map((sensor, index) => (
                    <Line
                      key={sensor}
                      type="monotone"
                      dataKey={sensor}
                      stroke={colors[index % colors.length]}
                      strokeWidth={2}
                      dot={false}
                      name={`Sensor ${sensor.slice(-1)}`}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExportComp;