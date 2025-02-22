// import { useState, useRef } from 'react';
// import { X, ChevronDown, Download } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// interface ParameterData {
//   timestamp: string;
//   [key: string]: number | string;
// }

// function ExportComp() {
//   const [dateRange, setDateRange] = useState({
//     start: '2025-01-26',
//     end: '2025-02-02'
//   });
//   const [selectedParameters, setSelectedParameters] = useState(['parameter1']);
//   const [showPreview, setShowPreview] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   // const [isLoading, setIsLoading] = useState(false);
//   const [parameterData, setParameterData] = useState<ParameterData[]>([]);
//   const chartRef = useRef<HTMLDivElement>(null);

//   // Example parameter list - replace with your actual parameter data
//   const availableParameters = [
//     'parameter1',
//     'parameter2',
//     'parameter3',
//     'parameter4',
//     'parameter5'
//   ];

//   const handleRemoveParameter = (parameter: string) => {
//     setSelectedParameters(selectedParameters.filter(p => p !== parameter));
//   };

//   const handleAddParameter = (parameter: string) => {
//     if (!selectedParameters.includes(parameter)) {
//       setSelectedParameters([...selectedParameters, parameter]);
//     }
//     setIsDropdownOpen(false);
//   };

//   // const fetchParameterData = async () => {
//   //   setIsLoading(true);
//   //   try {
//   //     // Replace with your actual API endpoint
//   //     const response = await fetch('/api/parameter-data', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({
//   //         dateRange,
//   //         parameters: selectedParameters,
//   //       }),
//   //     });
//   //
//   //     if (!response.ok) {
//   //       throw new Error('Failed to fetch parameter data');
//   //     }
//   //
//   //     const data = await response.json();
//   //     setParameterData(data);
//   //     setShowPreview(true);
//   //   } catch (error) {
//   //     console.error('Error fetching parameter data:', error);
//   //     // In a production environment, you'd want to show a proper error message to the user
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   // Generate random data for demonstration
//   const generateDemoData = () => {
//     const data: ParameterData[] = [];
//     const startDate = new Date(dateRange.start);
//     const endDate = new Date(dateRange.end);
    
//     for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
//       const entry: ParameterData = {
//         timestamp: date.toISOString().split('T')[0],
//       };
      
//       selectedParameters.forEach(parameter => {
//         entry[parameter] = Math.floor(Math.random() * 100);
//       });
      
//       data.push(entry);
//     }
    
//     return data;
//   };

//   const handleShowPreview = () => {
//     // For demonstration, we'll use generated data
//     // In production, use fetchParameterData() instead
//     setParameterData(generateDemoData());
//     setShowPreview(true);
//   };

//   const downloadCSV = () => {
//     // Create CSV header
//     const headers = ['timestamp', ...selectedParameters];
//     const csvContent = [
//       headers.join(','),
//       ...parameterData.map(row => 
//         headers.map(header => row[header]).join(',')
//       )
//     ].join('\n');

//     // Create and trigger download
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = `parameter_data_${dateRange.start}_to_${dateRange.end}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const downloadImage = () => {
//     if (!chartRef.current) return;

//     // Use html2canvas to capture the chart
//     import('html2canvas').then(({ default: html2canvas }) => {
//       html2canvas(chartRef.current!).then(canvas => {
//         const link = document.createElement('a');
//         link.download = `parameter_graph_${dateRange.start}_to_${dateRange.end}.png`;
//         link.href = canvas.toDataURL('image/png');
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       });
//     });
//   };

//   const colors = ['#2563eb', '#dc2626', '#16a34a', '#9333ea', '#ea580c'];

//   return (
//     <div className="min-h-screen bg-gray-800 p-8">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-8">Export Parameter Data</h1>
        
//         <div className="bg-gray-300 rounded-lg shadow-sm p-6 mb-8">
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

//             {/* Parameter Selection */}
//             <div>
//               <label className="block text-gray-700 text-lg mb-2">Select Parameters</label>
//               <div className="relative">
//                 <div className="border rounded-md p-2 min-h-[42px]">
//                   <div className="flex flex-wrap gap-2">
//                     {selectedParameters.map((parameter) => (
//                       <div
//                         key={parameter}
//                         className="inline-flex items-center bg-blue-50 text-blue-700 rounded px-2 py-1"
//                       >
//                         {parameter}
//                         <button
//                           onClick={() => handleRemoveParameter(parameter)}
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
//                   <div className="absolute z-10 mt-1 w-full bg-gray-50 border rounded-md shadow-lg">
//                     <div className="py-1">
//                       {availableParameters
//                         .filter(parameter => !selectedParameters.includes(parameter))
//                         .map(parameter => (
//                           <button
//                             key={parameter}
//                             onClick={() => handleAddParameter(parameter)}
//                             className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
//                           >
//                             {parameter}
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
//               // disabled={isLoading || selectedParameters.length === 0}
//               className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-lg transition-colors`}
//             >
//               {/* {isLoading ? 'Loading...' : 'Show Graph Preview'} */}
//               Show Graph Preview
//             </button>
//           </div>
//         </div>

//         {/* Graph Preview Section */}
//         {showPreview && parameterData.length > 0 && (
//           <div className="bg-gray-300 rounded-lg shadow-sm p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-semibold text-gray-800">Graph Preview</h2>
//               <div className="flex gap-4">
//                 <button
//                   onClick={downloadCSV}
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
//                 >
//                   <Download size={20} />
//                   Download Excel
//                 </button>
//                 <button
//                   onClick={downloadImage}
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//                 >
//                   <Download size={20} />
//                   Download Image
//                 </button>
//               </div>
//             </div>
//             <div ref={chartRef} className="h-[400px] w-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={parameterData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis 
//                     dataKey="timestamp"
//                     tick={{ fontSize: 12 }}
//                     tickFormatter={(value) => value.split('-').slice(1).join('/')}
//                   />
//                   <YAxis tick={{ fontSize: 12 }} />
//                   <Tooltip />
//                   <Legend />
//                   {selectedParameters.map((parameter, index) => (
//                     <Line
//                       key={parameter}
//                       type="monotone"
//                       dataKey={parameter}
//                       stroke={colors[index % colors.length]}
//                       strokeWidth={2}
//                       dot={false}
//                       name={`Parameter ${parameter.slice(-1)}`}
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




import { useState, useRef } from 'react';
import { X, ChevronDown, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ParameterData {
  timestamp: string;
  [key: string]: number | string | null;
}

function ExportComp() {
  const [dateRange, setDateRange] = useState({
    start: '2025-01-26',
    end: '2025-02-02'
  });
  const [selectedParameters, setSelectedParameters] = useState(['parameter1']);
  const [showPreview, setShowPreview] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [parameterData, setParameterData] = useState<ParameterData[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  // Example parameter list - replace with your actual parameter data
  const availableParameters = [
    'parameter1',
    'parameter2',
    'parameter3',
    'parameter4',
    'parameter5'
  ];

  const handleRemoveParameter = (parameter: string) => {
    setSelectedParameters(selectedParameters.filter(p => p !== parameter));
  };

  const handleAddParameter = (parameter: string) => {
    if (!selectedParameters.includes(parameter)) {
      setSelectedParameters([...selectedParameters, parameter]);
    }
    setIsDropdownOpen(false);
  };

  // Function to fetch parameter data from the backend
  const fetchParameterData = async () => {
    // setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/parameter-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRange,
          parameters: selectedParameters,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch parameter data');
      }

      const data = await response.json();
      setParameterData(data);
      setShowPreview(true);
    } catch (error) {
      console.error('Error fetching parameter data:', error);
      // In a production environment, you'd want to show a proper error message to the user
    } finally {
      // setIsLoading(false);
    }
  };

  const handleShowPreview = () => {
    // For production, fetch parameter data from the backend
    fetchParameterData();
  };

  const downloadCSV = () => {
    // Create CSV header
    const headers = ['timestamp', ...selectedParameters];
    const csvContent = [
      headers.join(','),
      ...parameterData.map(row =>
        headers.map(header => row[header]).join(',')
      )
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `parameter_data_${dateRange.start}_to_${dateRange.end}.csv`;
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
        link.download = `parameter_graph_${dateRange.start}_to_${dateRange.end}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    });
  };

  const colors = ['#2563eb', '#dc2626', '#16a34a', '#9333ea', '#ea580c'];

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">Export Parameter Data</h1>
        
        <div className="bg-gray-300 rounded-lg shadow-sm p-6 mb-8">
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

            {/* Parameter Selection */}
            <div>
              <label className="block text-gray-700 text-lg mb-2">Select Parameters</label>
              <div className="relative">
                <div className="border rounded-md p-2 min-h-[42px]">
                  <div className="flex flex-wrap gap-2">
                    {selectedParameters.map((parameter) => (
                      <div
                        key={parameter}
                        className="inline-flex items-center bg-blue-50 text-blue-700 rounded px-2 py-1"
                      >
                        {parameter}
                        <button
                          onClick={() => handleRemoveParameter(parameter)}
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
                  <div className="absolute z-10 mt-1 w-full bg-gray-50 border rounded-md shadow-lg">
                    <div className="py-1">
                      {availableParameters
                        .filter(parameter => !selectedParameters.includes(parameter))
                        .map(parameter => (
                          <button
                            key={parameter}
                            onClick={() => handleAddParameter(parameter)}
                            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                          >
                            {parameter}
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
              // disabled={isLoading || selectedParameters.length === 0}
              className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-lg transition-colors`}
            >
              {/* {isLoading ? 'Loading...' : 'Show Graph Preview'} */}
              Show Graph Preview
            </button>
          </div>
        </div>

        {/* Graph Preview Section */}
        {showPreview && parameterData.length > 0 && (
          <div className="bg-gray-300 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Graph Preview</h2>
              <div className="flex gap-4">
                <button
                  onClick={downloadCSV}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  <Download size={20} />
                  Download CSV
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
                <LineChart data={parameterData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.split('-').slice(1).join('/')}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  {selectedParameters.map((parameter, index) => (
                    <Line
                      key={parameter}
                      type="monotone"
                      dataKey={parameter}
                      stroke={colors[index % colors.length]}
                      strokeWidth={2}
                      dot={false}
                      name={`Parameter ${parameter.slice(-1)}`}
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
