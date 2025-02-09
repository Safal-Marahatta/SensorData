// // // import React from 'react';
// // // import { Line } from 'react-chartjs-2';
// // // import { Chart, registerables } from 'chart.js';
// // // import annotationPlugin from 'chartjs-plugin-annotation';

// // // Chart.register(...registerables, annotationPlugin);

// // // export interface SensorDataPoint {
// // //   value: number;
// // //   sensorid: number;
// // //   timestamp: string;
// // // }

// // // interface SensorGraphProps {
// // //   sensorId: number;
// // //   data: SensorDataPoint[];
// // //   lowThreshold: number;
// // //   highThreshold: number;
// // // }

// // // const SensorGraph: React.FC<SensorGraphProps> = ({
// // //   sensorId,
// // //   data,
// // //   lowThreshold,
// // //   highThreshold,
// // // }) => {
// // //   const chartData = {
// // //     labels: data.map((point) =>
// // //       new Date(point.timestamp).toLocaleTimeString()
// // //     ),
// // //     datasets: [
// // //       {
// // //         // label: `Sensor ${sensorId}`,
// // //         data: data.map((point) => point.value),
// // //         fill: true,
// // //         backgroundColor: 'rgba(59, 130, 246, 0.1)', // Light blue background
// // //         borderColor: '#3B82F6', // Solid blue line
// // //         borderWidth: 2,
// // //         tension: 0.4, // Smoother curve
// // //         pointRadius: 0,
// // //         pointBackgroundColor: '#3B82F6',
// // //         pointBorderColor: '#fff',
// // //         pointHoverRadius: 2,
// // //         pointHoverBackgroundColor: '#3B82F6',
// // //         pointHoverBorderColor: '#fff',
// // //         pointHoverBorderWidth: 2,
// // //       },
// // //     ],
// // //   };

// // //   const options = {
// // //     responsive: true,
// // //     maintainAspectRatio: false,
// // //     devicePixelRatio: 2,
// // //     plugins: {
// // //       legend: { 
// // //         display: false,
// // //         labels: {
// // //           color: '#E5E7EB',
// // //           font: {
// // //             size: 12,
// // //             weight: 'bold'
// // //           }
// // //         }
// // //       },
// // //       tooltip: {
// // //         mode: 'index',
// // //         intersect: false,
// // //         backgroundColor: 'rgba(17, 24, 39, 0.8)',
// // //         titleColor: '#fff',
// // //         bodyColor: '#fff',
// // //         borderColor: '#374151',
// // //         borderWidth: 1,
// // //         padding: 12,
// // //         displayColors: false,
// // //       },
// // //       annotation: {
// // //         annotations: {
// // //           lowThresholdLine: {
// // //             type: 'line',
// // //             yMin: lowThreshold,
// // //             yMax: lowThreshold,
// // //             borderColor: 'rgba(239, 68, 68, 0.6)', // Red with transparency
// // //             borderWidth: 2,
// // //             borderDash: [6, 4],
// // //           },
// // //           highThresholdLine: {
// // //             type: 'line',
// // //             yMin: highThreshold,
// // //             yMax: highThreshold,
// // //             borderColor: 'rgba(239, 68, 68, 0.6)',
// // //             borderWidth: 2,
// // //             borderDash: [6, 4],
// // //           },
// // //         },
// // //       },
// // //     },
// // //     scales: {
// // //       x: {
// // //         grid: {
// // //           color: 'rgba(75, 85, 99, 0.2)',
// // //           drawBorder: false,
// // //         },
// // //         ticks: {
// // //           color: '#E5E7EB',
// // //           font: {
// // //             size: 11
// // //           },
// // //           maxRotation: 45,
// // //           minRotation: 45
// // //         }
// // //       },
// // //       y: {
// // //         grid: {
// // //           color: 'rgba(75, 85, 99, 0.2)',
// // //           drawBorder: false,
// // //         },
// // //         ticks: {
// // //           color: '#E5E7EB',
// // //           font: {
// // //             size: 11
// // //           },
// // //           padding: 8
// // //         },
// // //         beginAtZero: true
// // //       }
// // //     },
// // //     interaction: {
// // //       mode: 'nearest',
// // //       axis: 'x',
// // //       intersect: false
// // //     },
// // //   };

// // //   const latestValue = data.length > 0 ? data[data.length - 1].value : null;
// // //   const lowBlink = latestValue !== null && latestValue < lowThreshold;
// // //   const highBlink = latestValue !== null && latestValue > highThreshold;

// // //   return (
// // //     <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-xl p-0 ">
// // //       <div className="flex flex-col space-y-4">
// // //         {/* Header */}
// // //         <div className="flex justify-between items-center">
// // //           <h4 className="text-l font-bold text-white">Water Level at Salm</h4>
// // //           <div className="text-sm font-medium text-gray-400">
// // //             Sensor ID: {sensorId}
// // //           </div>
// // //         </div>

// // //         {/* Chart Container with increased height */}
// // //         <div className="w-full h-64 m-0">
// // //           <Line data={chartData} options={options} />
// // //         </div>

// // //         {/* Status Indicators with Glowing Circles */}
// // //         <div className="flex justify-between items-center mt-4 px-4">
// // //           <div className="flex flex-col items-center gap-2">
// // //             <div
// // //               className={`w-4 h-4 rounded-full ${
// // //                 lowBlink
// // //                   ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-glow'
// // //                   : 'bg-gray-600'
// // //               }`}
// // //             />
// // //             <span className="text-xs text-gray-400">Low</span>
// // //           </div>
// // //           <div className="flex flex-col items-center gap-2">
// // //             <div
// // //               className={`w-4 h-4 rounded-full ${
// // //                 !lowBlink && !highBlink
// // //                   ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-glow'
// // //                   : 'bg-gray-600'
// // //               }`}
// // //             />
// // //             <span className="text-xs text-gray-400">Normal</span>
// // //           </div>
// // //           <div className="flex flex-col items-center gap-2">
// // //             <div
// // //               className={`w-4 h-4 rounded-full ${
// // //                 highBlink
// // //                   ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-glow'
// // //                   : 'bg-gray-600'
// // //               }`}
// // //             />
// // //             <span className="text-xs text-gray-400">High</span>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default SensorGraph;

// // // import React from 'react';
// // // import { Line } from 'react-chartjs-2';
// // // import { Chart, registerables } from 'chart.js';
// // // import annotationPlugin from 'chartjs-plugin-annotation';

// // // Chart.register(...registerables, annotationPlugin);

// // // export interface SensorDataPoint {
// // //   value: number;
// // //   sensorid: number;
// // //   timestamp: string;
// // // }

// // // interface SensorGraphProps {
// // //   sensorId: number;
// // //   data: SensorDataPoint[];
// // //   lowThreshold: number;
// // //   highThreshold: number;
// // // }

// // // const SensorGraph: React.FC<SensorGraphProps> = ({
// // //   sensorId,
// // //   data,
// // //   lowThreshold,
// // //   highThreshold,
// // // }) => {
// // //   const chartData = {
// // //     labels: data.map((point) =>
// // //       new Date(point.timestamp).toLocaleTimeString()
// // //     ),
// // //     datasets: [
// // //       {
// // //         data: data.map((point) => point.value),
// // //         fill: true,
// // //         backgroundColor: 'rgba(59, 130, 246, 0.1)',
// // //         borderColor: '#3B82F6',
// // //         borderWidth: 2,
// // //         tension: 0.4,
// // //         pointRadius: 0,
// // //         pointBackgroundColor: '#3B82F6',
// // //         pointBorderColor: '#fff',
// // //         pointHoverRadius: 2,
// // //         pointHoverBackgroundColor: '#3B82F6',
// // //         pointHoverBorderColor: '#fff',
// // //         pointHoverBorderWidth: 2,
// // //       },
// // //     ],
// // //   };

// // //   const options = {
// // //     responsive: true,
// // //     maintainAspectRatio: false,
// // //     devicePixelRatio: 2,
// // //     plugins: {
// // //       legend: { 
// // //         display: false,
// // //       },
// // //       tooltip: {
// // //         mode: 'index',
// // //         intersect: false,
// // //         backgroundColor: 'rgba(17, 24, 39, 0.8)',
// // //         titleColor: '#fff',
// // //         bodyColor: '#fff',
// // //         borderColor: '#374151',
// // //         borderWidth: 1,
// // //         padding: 8,
// // //         displayColors: false,
// // //       },
// // //       annotation: {
// // //         annotations: {
// // //           lowThresholdLine: {
// // //             type: 'line',
// // //             yMin: lowThreshold,
// // //             yMax: lowThreshold,
// // //             borderColor: 'rgba(239, 68, 68, 0.6)',
// // //             borderWidth: 2,
// // //             borderDash: [6, 4],
// // //           },
// // //           highThresholdLine: {
// // //             type: 'line',
// // //             yMin: highThreshold,
// // //             yMax: highThreshold,
// // //             borderColor: 'rgba(239, 68, 68, 0.6)',
// // //             borderWidth: 2,
// // //             borderDash: [6, 4],
// // //           },
// // //         },
// // //       },
// // //     },
// // //     scales: {
// // //       x: {
// // //         grid: {
// // //           color: 'rgba(75, 85, 99, 0.2)',
// // //           drawBorder: false,
// // //         },
// // //         ticks: {
// // //           color: '#E5E7EB',
// // //           font: {
// // //             size: 10
// // //           },
// // //           maxRotation: 45,
// // //           minRotation: 45,
// // //           maxTicksLimit: 8,
// // //           padding: 4
// // //         }
// // //       },
// // //       y: {
// // //         grid: {
// // //           color: 'rgba(75, 85, 99, 0.2)',
// // //           drawBorder: false,
// // //         },
// // //         ticks: {
// // //           color: '#E5E7EB',
// // //           font: {
// // //             size: 8
// // //           },
// // //           padding: 4,
// // //           maxTicksLimit: 6
// // //         },
// // //         beginAtZero: true
// // //       }
// // //     },
// // //     interaction: {
// // //       mode: 'nearest',
// // //       axis: 'x',
// // //       intersect: false
// // //     },
// // //   };

// // //   const latestValue = data.length > 0 ? data[data.length - 1].value : null;
// // //   const lowBlink = latestValue !== null && latestValue < lowThreshold;
// // //   const highBlink = latestValue !== null && latestValue > highThreshold;

// // //   return (
// // //     <div className="h-full bg-gray-900 border border-gray-700 rounded-xl shadow-xl flex flex-col p-2">
// // //       <div className="flex justify-between items-center mb-1">
// // //         <h4 className="text-sm font-bold text-white truncate">Water Level at Salm</h4>
// // //         <div className="text-xs font-medium text-gray-400">
// // //           Sensor {sensorId}
// // //         </div>
// // //       </div>

// // //       <div className="flex-1 min-h-0">
// // //         <Line data={chartData} options={options} />
// // //       </div>

// // //       <div className="flex justify-between items-center mt-1 px-2">
// // //         <div className="flex flex-col items-center gap-1">
// // //           <div
// // //             className={`w-2 h-2 rounded-full ${
// // //               lowBlink
// // //                 ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-glow'
// // //                 : 'bg-gray-600'
// // //             }`}
// // //           />
// // //           <span className="text-[10px] text-gray-400">Low</span>
// // //         </div>
// // //         <div className="flex flex-col items-center gap-1">
// // //           <div
// // //             className={`w-2 h-2 rounded-full ${
// // //               !lowBlink && !highBlink
// // //                 ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-glow'
// // //                 : 'bg-gray-600'
// // //             }`}
// // //           />
// // //           <span className="text-[10px] text-gray-400">Normal</span>
// // //         </div>
// // //         <div className="flex flex-col items-center gap-1">
// // //           <div
// // //             className={`w-2 h-2 rounded-full ${
// // //               highBlink
// // //                 ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-glow'
// // //                 : 'bg-gray-600'
// // //             }`}
// // //           />
// // //           <span className="text-[10px] text-gray-400">High</span>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default SensorGraph;

// // import React from 'react';
// // import { Line } from 'react-chartjs-2';
// // import { Chart, registerables } from 'chart.js';
// // import annotationPlugin from 'chartjs-plugin-annotation';

// // Chart.register(...registerables, annotationPlugin);

// // export interface SensorDataPoint {
// //   value: number;
// //   sensorid: number;
// //   timestamp: string;
// // }

// // interface SensorGraphProps {
// //   sensorId: number;
// //   data: SensorDataPoint[];
// //   lowThreshold: number;
// //   highThreshold: number;
// // }

// // const SensorGraph: React.FC<SensorGraphProps> = ({
// //   sensorId,
// //   data,
// //   lowThreshold,
// //   highThreshold,
// // }) => {
// //   const chartData = {
// //     labels: data.map((point) =>
// //       new Date(point.timestamp).toLocaleTimeString()
// //     ),
// //     datasets: [
// //       {
// //         data: data.map((point) => point.value),
// //         fill: true,
// //         backgroundColor: 'rgba(59, 130, 246, 0.1)',
// //         borderColor: '#3B82F6',
// //         borderWidth: 2,
// //         tension: 0.4,
// //         pointRadius: 0,
// //         pointBackgroundColor: '#3B82F6',
// //         pointBorderColor: '#fff',
// //         pointHoverRadius: 2,
// //         pointHoverBackgroundColor: '#3B82F6',
// //         pointHoverBorderColor: '#fff',
// //         pointHoverBorderWidth: 2,
// //       },
// //     ],
// //   };

// //   const options = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     devicePixelRatio: 2,
// //     plugins: {
// //       legend: { 
// //         display: false,
// //       },
// //       tooltip: {
// //         mode: 'index',
// //         intersect: false,
// //         backgroundColor: 'rgba(17, 24, 39, 0.8)',
// //         titleColor: '#fff',
// //         bodyColor: '#fff',
// //         borderColor: '#374151',
// //         borderWidth: 1,
// //         padding: 8,
// //         displayColors: false,
// //       },
// //       annotation: {
// //         annotations: {
// //           lowThresholdLine: {
// //             type: 'line',
// //             yMin: lowThreshold,
// //             yMax: lowThreshold,
// //             borderColor: 'rgba(239, 68, 68, 0.6)',
// //             borderWidth: 2,
// //             borderDash: [6, 4],
// //           },
// //           highThresholdLine: {
// //             type: 'line',
// //             yMin: highThreshold,
// //             yMax: highThreshold,
// //             borderColor: 'rgba(239, 68, 68, 0.6)',
// //             borderWidth: 2,
// //             borderDash: [6, 4],
// //           },
// //         },
// //       },
// //     },
// //     scales: {
// //       x: {
// //         grid: {
// //           color: 'rgba(75, 85, 99, 0.2)',
// //           drawBorder: false,
// //         },
// //         ticks: {
// //           color: '#E5E7EB',
// //           font: {
// //             size: 10,
// //           },
// //           maxRotation: 45,
// //           minRotation: 45,
// //           maxTicksLimit: 8,
// //           padding: 4,
// //         },
// //       },
// //       y: {
// //         grid: {
// //           color: 'rgba(75, 85, 99, 0.2)',
// //           drawBorder: false,
// //         },
// //         ticks: {
// //           color: '#E5E7EB',
// //           font: {
// //             size: 5,
// //           },
// //           padding: 4,
// //           maxTicksLimit: 6,
// //         },
// //         beginAtZero: true,
// //       },
// //     },
// //     interaction: {
// //       mode: 'nearest',
// //       axis: 'x',
// //       intersect: false,
// //     },
// //   };

// //   // Get the latest sensor value from the data array.
// //   const latestValue = data.length > 0 ? data[data.length - 1].value : null;
// //   const lowBlink = latestValue !== null && latestValue < lowThreshold;
// //   const highBlink = latestValue !== null && latestValue > highThreshold;

// //   return (
// //     <div className="h-full bg-gray-900 border border-gray-700 rounded-xl shadow-xl flex flex-col p-2">
// //       {/* Header */}
// //       <div className="flex justify-between items-center mb-1">
// //         <h4 className="text-sm font-bold text-white truncate">
// //           Water Level at Salm
// //         </h4>
// //         {/* Live sensor value with high visibility */}
// //         <div className="text-2xl font-abold text-yellow-200 px-3 py-0 rounded">
// //           {latestValue !== null ? latestValue : '--'}
// //         </div>
// //       </div>

// //       {/* Chart */}
// //       <div className="flex-1 min-h-0">
// //         <Line data={chartData} options={options} />
// //       </div>

// //       {/* Status Indicators arranged as: Low (circle), Normal (circle), High (circle) */}
// //       <div className="flex justify-center items-center mt-1 space-x-4">
// //         <div className="flex items-center gap-1">
// //           <span className="text-[10px] text-white">Low</span>
// //           <div
// //             className={`w-4 h-4 rounded-full ${
// //               lowBlink
// //                 ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-glow'
// //                 : 'bg-gray-600'
// //             }`}
// //           />
// //         </div>
// //         <div className="flex items-center gap-1">
// //           <span className="text-[10px] text-white">Normal</span>
// //           <div
// //             className={`w-4 h-4 rounded-full ${
// //               !lowBlink && !highBlink
// //                 ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-glow'
// //                 : 'bg-gray-600'
// //             }`}
// //           />
// //         </div>
// //         <div className="flex items-center gap-1">
// //           <span className="text-[10px] text-white">High</span>
// //           <div
// //             className={`w-4 h-4 rounded-full ${
// //               highBlink
// //                 ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-glow'
// //                 : 'bg-gray-600'
// //             }`}
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables, annotationPlugin);

export interface SensorDataPoint {
  value: number;
  sensorid: number;
  timestamp: string;
}

interface SensorGraphProps {
  sensorId: number;
  data: SensorDataPoint[];
  lowThreshold: number;
  highThreshold: number;
}

const SensorGraph: React.FC<SensorGraphProps> = ({
  sensorId,
  data,
  lowThreshold,
  highThreshold,
}) => {
  const [showAlarms, setShowAlarms] = useState(true);

  const chartData = {
    labels: data.map((point) =>
      new Date(point.timestamp).toLocaleTimeString()
    ),
    datasets: [
      {
        data: data.map((point) => point.value),
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: '#3B82F6',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointHoverRadius: 2,
        pointHoverBackgroundColor: '#3B82F6',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2,
    plugins: {
      legend: { 
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 8,
        displayColors: false,
      },
      annotation: {
        annotations: showAlarms ? {
          lowThresholdLine: {
            type: 'line',
            yMin: lowThreshold,
            yMax: lowThreshold,
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 2,
            borderDash: [6, 4],
          },
          highThresholdLine: {
            type: 'line',
            yMin: highThreshold,
            yMax: highThreshold,
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 2,
            borderDash: [6, 4],
          },
        } : {},
      },
    },
    scales: {
      x: {
        grid: {
          // color: 'rgba(75, 85, 99, 0.2)',
          color: '#818589',
          drawBorder: false,
        },
        ticks: {
          color: '#fff',
          font: {
            size: 10,
          },
          maxRotation: 45,
          minRotation: 0,
          maxTicksLimit: 10,
          padding: 4,
        },
      },
      y: {
        grid: {
          // color: 'rgba(75, 85, 99, 0.2)',
          color: `#818589`,
          drawBorder: false,
        },
        ticks: {
          color: '#fff',
          font: {
            size: 5,
          },
          padding: 10,
          maxTicksLimit: 8,
        },
        beginAtZero: true,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  // Get the latest sensor value from the data array.
  const latestValue = data.length > 0 ? data[data.length - 1].value : null;
  const lowBlink = latestValue !== null && latestValue < lowThreshold;
  const highBlink = latestValue !== null && latestValue > highThreshold;

  return (
    <div className="h-full bg-gray-900 border border-white rounded-xl shadow-xl flex flex-col p-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <h4 className="text-sm font-bold text-white truncate">
          Water Level at Salm
        </h4>
        {/* Live sensor value with high visibility */}
        <div className="text-2xl font-abold text-yellow-200 px-3 py-0 rounded">
          {latestValue !== null ? latestValue : '--'}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <Line data={chartData} options={options} />
      </div>

      {/* Bottom section with status indicators and toggle */}
      <div className="flex justify-between items-center mt-1">
        {/* Status Indicators arranged as: Low (circle), Normal (circle), High (circle) */}
        {showAlarms && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-white">Low</span>
              <div
                className={`w-4 h-4 rounded-full ${
                  lowBlink
                    ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-glow'
                    : 'bg-gray-600'
                }`}
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-white">Normal</span>
              <div
                className={`w-4 h-4 rounded-full ${
                  !lowBlink && !highBlink
                    ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-glow'
                    : 'bg-gray-600'
                }`}
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-white">High</span>
              <div
                className={`w-4 h-4 rounded-full ${
                  highBlink
                    ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-glow'
                    : 'bg-gray-600'
                }`}
              />
            </div>
          </div>
        )}
        {/* Toggle Switch with Alarm text */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-white">Alarm</span>
          <button
            onClick={() => setShowAlarms(!showAlarms)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500 ${
              showAlarms ? 'bg-green-600' : 'bg-gray-600'
            }`}
          >
            <span className="sr-only">Toggle alarms</span>
            <span
              className={`absolute left-[2px] inline-block w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                showAlarms ? 'translate-x-[22px]' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SensorGraph;