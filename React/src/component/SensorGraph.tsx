
// // src/components/SensorGraph.tsx
// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart, registerables } from 'chart.js';
// import annotationPlugin from 'chartjs-plugin-annotation';

// // Register the default components and the annotation plugin
// Chart.register(...registerables, annotationPlugin);

// // Define the shape of a sensor reading
// export interface SensorDataPoint {
//   value: number;
//   sensorid: number;
//   timestamp: string;
// }

// interface SensorGraphProps {
//   sensorId: number;
//   data: SensorDataPoint[];
//   lowThreshold: number;
//   highThreshold: number;
// }

// const SensorGraph: React.FC<SensorGraphProps> = ({
//   sensorId,
//   data,
//   lowThreshold,
//   highThreshold,
// }) => {
//   // Prepare the chart data using timestamps for labels and sensor values for data points
//   const chartData = {
//     labels: data.map((point) =>
//       new Date(point.timestamp).toLocaleTimeString()
//     ),
//     datasets: [
//       {
//         label: `Sensor ${sensorId}`,
//         data: data.map((point) => point.value),
//         fill: false,
//         borderColor: '#fff',
//         tension: 0.1,
//       },
//     ],
//   };

//   // Chart options with dark themed text and grid lines, and annotation lines for thresholds.
//   const options = {
//     plugins: {
//       legend: { display: false },
//       annotation: {
//         annotations: {
//           lowThresholdLine: {
//             type: 'line',
//             // Both yMin and yMax set to the lowThreshold value will draw a horizontal line.
//             yMin: lowThreshold,
//             yMax: lowThreshold,
//             borderColor: 'rgba(255, 0, 0, 0.8)',
//             borderWidth: 2,
//             // Optional: use a dashed line style.
//             borderDash: [5, 5],
//           },
//           highThresholdLine: {
//             type: 'line',
//             yMin: highThreshold,
//             yMax: highThreshold,
//             borderColor: 'rgba(255, 0, 0, 0.8)',
//             borderWidth: 2,
//             borderDash: [5, 5],
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: { color: '#fff' },
//         grid: { color: '#444' },
//       },
//       y: {
//         ticks: { color: '#fff' },
//         grid: { color: '#444' },
//       },
//     },
//   };

//   // Get the latest sensor value to determine if the Low/High indicator should blink.
//   const latestValue = data.length > 0 ? data[data.length - 1].value : null;
//   const lowBlink = latestValue !== null && latestValue < lowThreshold;
//   const highBlink = latestValue !== null && latestValue > highThreshold;

//   return (
//     <div className="bg-gray-800 border border-gray-600 p-4 rounded text-white flex flex-col items-center">
//       {/* Top Title (can be omitted if shown globally) */}
//       <div className="text-xl font-bold mb-2">Water level at Salm</div>

//       {/* Chart Container */}
//       <div className="w-full h-48">
//         <Line data={chartData} options={options} />
//       </div>

//       {/* Status Indicators */}
//       <div className="flex justify-around w-full mt-4">
//         <div
//           className={`px-2 py-1 border border-gray-600 rounded text-center ${
//             lowBlink ? 'animate-blink text-red-500' : ''
//           }`}
//         >
//           Low
//         </div>
//         <div className="px-2 py-1 border border-gray-600 rounded text-center">
//           Normal
//         </div>
//         <div
//           className={`px-2 py-1 border border-gray-600 rounded text-center ${
//             highBlink ? 'animate-blink text-red-500' : ''
//           }`}
//         >
//           High
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SensorGraph;


import React from 'react';
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
  const chartData = {
    labels: data.map((point) =>
      new Date(point.timestamp).toLocaleTimeString()
    ),
    datasets: [
      {
        label: `Sensor ${sensorId}`,
        data: data.map((point) => point.value),
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)', // Light blue background
        borderColor: '#3B82F6', // Solid blue line
        borderWidth: 2,
        tension: 0.4, // Smoother curve
        pointRadius: 1,
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
        display: true,
        labels: {
          color: '#E5E7EB',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      },
      annotation: {
        annotations: {
          lowThresholdLine: {
            type: 'line',
            yMin: lowThreshold,
            yMax: lowThreshold,
            borderColor: 'rgba(239, 68, 68, 0.6)', // Red with transparency
            borderWidth: 2,
            borderDash: [6, 4],
          },
          highThresholdLine: {
            type: 'line',
            yMin: highThreshold,
            yMax: highThreshold,
            borderColor: 'rgba(239, 68, 68, 0.6)',
            borderWidth: 2,
            borderDash: [6, 4],
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
          drawBorder: false,
        },
        ticks: {
          color: '#E5E7EB',
          font: {
            size: 11
          },
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
          drawBorder: false,
        },
        ticks: {
          color: '#E5E7EB',
          font: {
            size: 11
          },
          padding: 8
        },
        beginAtZero: true
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
  };

  const latestValue = data.length > 0 ? data[data.length - 1].value : null;
  const lowBlink = latestValue !== null && latestValue < lowThreshold;
  const highBlink = latestValue !== null && latestValue > highThreshold;

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-xl p-4">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Water Level at Salm</h2>
          <div className="text-sm font-medium text-gray-400">
            Sensor ID: {sensorId}
          </div>
        </div>

        {/* Chart Container with increased height */}
        <div className="w-full h-64 mt-4">
          <Line data={chartData} options={options} />
        </div>

        {/* Status Indicators with Glowing Circles */}
        <div className="flex justify-between items-center mt-4 px-4">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full ${
                lowBlink
                  ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-glow'
                  : 'bg-gray-600'
              }`}
            />
            <span className="text-xs text-gray-400">Low</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full ${
                !lowBlink && !highBlink
                  ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-glow'
                  : 'bg-gray-600'
              }`}
            />
            <span className="text-xs text-gray-400">Normal</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full ${
                highBlink
                  ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-glow'
                  : 'bg-gray-600'
              }`}
            />
            <span className="text-xs text-gray-400">High</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorGraph;