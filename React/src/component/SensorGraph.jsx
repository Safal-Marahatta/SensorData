// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart, registerables } from 'chart.js';
// import annotationPlugin from 'chartjs-plugin-annotation';

// Chart.register(...registerables, annotationPlugin);

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
//   text: string;
//   unit:string;
// }

// const SensorGraph: React.FC<SensorGraphProps> = ({
//   text,
//   // sensorId,
//   data,
//   lowThreshold,
//   highThreshold,
//   unit
// }) => {
//   const [showAlarms] = useState(true);
//   const [emailAlert, setEmailAlert] = useState(true);
//   const [smsAlert, setSmsAlert] = useState(true);
//   const [sirenAlert, setSirenAlert] = useState(true);
//   // New state for Online Data Hosting toggle
//   const [onlineDataHosting, setOnlineDataHosting] = useState(true);


//   const chartData = {
//     labels: data.map((point) =>
//       new Date(point.timestamp).toLocaleTimeString()
//     ),
//     datasets: [
//       {
//         data: data.map((point) => point.value),
//         fill: false,
//         backgroundColor: 'rgba(59, 130, 246, 0.1)',
//         borderColor: '#00FF00',
//         borderWidth: 2,
//         tension: 0.4,
//         pointRadius: 0,
//         pointBackgroundColor: '#3B82F6',
//         pointBorderColor: '#fff',
//         pointHoverRadius: 2,
//         pointHoverBackgroundColor: '#3B82F6',
//         pointHoverBorderColor: '#fff',
//         pointHoverBorderWidth: 2,
//       },
//     ],
//   };

//   const options= {
//     responsive: true,
//     maintainAspectRatio: false,
//     devicePixelRatio: 3,
//     animation: {
//       duration: 0, // Disable animation
//     },
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         mode: 'index',
//         intersect: false,
//         backgroundColor: 'rgba(17, 24, 39, 0.8)',
//         titleColor: '#fff',
//         bodyColor: '#fff',
//         borderColor: '#374151',
//         borderWidth: 1,
//         padding: 8,
//         displayColors: false,
//       },
//       annotation: {
//         annotations: showAlarms
//           ? {
//               lowThresholdLine: {
//                 type: 'line',
//                 yMin: lowThreshold,
//                 yMax: lowThreshold,
//                 borderColor: 'rgba(255, 0, 0, 1)',
//                 borderWidth: 2,
//                 borderDash: [6, 4],
//               },
//               highThresholdLine: {
//                 type: 'line',
//                 yMin: highThreshold,
//                 yMax: highThreshold,
//                 borderColor: 'rgba(255, 0, 0, 1)',
//                 borderWidth: 2,
//                 borderDash: [6, 4],
//               },
//                  highvandahigh: {
//                  type: 'line',
//                  yMin: (highThreshold-lowThreshold)*0.1+highThreshold,
//                  yMax: (highThreshold-lowThreshold)*0.1+highThreshold,
//                  borderColor: '#0000',
//                  borderWidth: 2,
//                  borderDash: [6, 4],
//               },
//               lowvandalow: {
//                 type: 'line',
//                 yMin: lowThreshold-(highThreshold-lowThreshold)*0.1,
//                 yMax: lowThreshold-(highThreshold-lowThreshold)*0.1,
//                 borderColor: '#0000',
//                 borderWidth: 2,
//                 borderDash: [6, 4],
//              },
//             }
//           : {},
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           color: '#818589',
//           drawBorder: false,
//         },
//         ticks: {
//           color: '#fff',
//           font: { size: 10 },
//           maxRotation: 45,
//           minRotation: 0,
//           maxTicksLimit: 5,
//           padding: 4,
//         },
//       },
//       y: {
//         grid: {
//           color: '#818589',
//           drawBorder: false,
//         },
//         ticks: {
//           color: '#fff',
//           font: { size: 10 },
//           padding: 10,
//           maxTicksLimit: 8,
//         },
//          beginAtZero: false,
//         // min: lowThreshold-(highThreshold-lowThreshold)*0.1,
//         // max: (highThreshold-lowThreshold)*0.1+highThreshold,
//       },
//     },
//     interaction: {
//       mode: 'nearest',
//       axis: 'x',
//       intersect: false,
//     },
//   };

//   // Get the latest sensor value from the data array.
//   const latestValue = data.length > 0 ? data[data.length - 1].value : null;
//   const lowBlink = latestValue !== null && latestValue < lowThreshold;
//   const highBlink = latestValue !== null && latestValue > highThreshold;

//   return (
//     <div className="h-full bg-gray-900 border border-white rounded-xl shadow-xl flex flex-col p-1">
//       {/* Header arranged into three equal parts */}
//       <div className="flex items-center mb-1">
//         {/* Left: Sensor Name */}
//         <div className="w-1/3 text-left">
//           <h4 className="text-xl font-bold text-white truncate">{text}</h4>
//         </div>
//         {/* Center: Online Data Hosting Toggle */}
//         <div className="w-1/3 flex items-center justify-center">
//           <span className="text-xs text-white mr-2">Online Mode</span>
//           <button
//             onClick={() => setOnlineDataHosting(!onlineDataHosting)}
//             className={`relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-900 ${
//               onlineDataHosting ? 'bg-green-600' : 'bg-gray-600'
//             }`}
//           >
//             <span className="sr-only">Toggle Online Data Hosting</span>
//             <span
//               className={`absolute left-0.5 inline-block w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out ${
//                 onlineDataHosting ? 'translate-x-4' : 'translate-x-0'
//               }`}
//             />
//           </button>
//         </div>
//         {/* Right: Sensor Value */}
//         <div className="w-1/3 text-right">
//           <div className="text-2xl font-bold font-mono text-yellow-300 bg-gray-900 px-0 py-0 rounded-lg shadow-[0_0_10px_rgba(255,215,0,0.8)] tracking-widest">
//             {latestValue !== null ? latestValue.toFixed(3) : '--'}{' '}
//             <span className="text-sm">{unit}</span>
//           </div>
//         </div>
//       </div>

//       {/* Chart */}
//       <div className="flex-1 min-h-0">
//         <Line data={chartData} options={options} />
//       </div>

//       {/* Bottom section with status indicators and toggle switches */}
//       <div className="flex justify-between items-center mt-2 mb-2">
//         {showAlarms && (
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center gap-1">
//               <div
//                 className={`w-4 h-4 rounded-full ${
//                   lowBlink
//                     ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-glow'
//                     : 'bg-gray-600'
//                 }`}
//               />
//               <span className="text-[10px] text-white">Low</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <div
//                 className={`w-4 h-4 rounded-full ${
//                   !lowBlink && !highBlink
//                     ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-glow'
//                     : 'bg-gray-600'
//                 }`}
//               />
//               <span className="text-[10px] text-white">Normal</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <div
//                 className={`w-4 h-4 rounded-full ${
//                   highBlink
//                     ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-glow'
//                     : 'bg-gray-600'
//                 }`}
//               />
//               <span className="text-[10px] text-white">High</span>
//             </div>
//           </div>
//         )}
//         {/* Toggle Switches for Alerts */}
//         <div className="flex items-center gap-2 mt-2 mb-2">
//           <div className="flex items-center gap-2">
//             <span className="text-[10px] text-white">
//               <span className="text-green-300 font-bold">Alerts:&nbsp;&nbsp;</span>
//               Email
//             </span>
//             <button
//               onClick={() => setEmailAlert(!emailAlert)}
//               className={`relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-900 ${
//                 emailAlert ? 'bg-green-600' : 'bg-gray-600'
//               }`}
//             >
//               <span className="sr-only">Toggle Email alert</span>
//               <span
//                 className={`absolute left-0.5 inline-block w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out ${
//                   emailAlert ? 'translate-x-4' : 'translate-x-0'
//                 }`}
//               />
//             </button>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-[10px] text-white">SMS</span>
//             <button
//               onClick={() => setSmsAlert(!smsAlert)}
//               className={`relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-900 ${
//                 smsAlert ? 'bg-green-600' : 'bg-gray-600'
//               }`}
//             >
//               <span className="sr-only">Toggle SMS alert</span>
//               <span
//                 className={`absolute left-0.5 inline-block w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out ${
//                   smsAlert ? 'translate-x-4' : 'translate-x-0'
//                 }`}
//               />
//             </button>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-[10px] text-white">Siren</span>
//             <button
//               onClick={() => setSirenAlert(!sirenAlert)}
//               className={`relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-900 ${
//                 sirenAlert ? 'bg-green-600' : 'bg-gray-600'
//               }`}
//             >
//               <span className="sr-only">Toggle Siren alert</span>
//               <span
//                 className={`absolute left-0.5 inline-block w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out ${
//                   sirenAlert ? 'translate-x-4' : 'translate-x-0'
//                 }`}
//               />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SensorGraph;


import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables, annotationPlugin);

const SensorGraph = ({ text, data, lowThreshold, highThreshold, unit }) => {
  const [showAlarms] = useState(true);
  const [emailAlert, setEmailAlert] = useState(true);
  const [smsAlert, setSmsAlert] = useState(true);
  const [sirenAlert, setSirenAlert] = useState(true);
  // New state for Online Data Hosting toggle
  const [onlineDataHosting, setOnlineDataHosting] = useState(true);

  const chartData = {
    labels: data.map((point) =>
      new Date(point.timestamp).toLocaleTimeString()
    ),
    datasets: [
      {
        data: data.map((point) => point.value),
        fill: false,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: '#00FF00',
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
    devicePixelRatio: 3,
    animation: {
      duration: 0, // Disable animation
    },
    plugins: {
      legend: { display: false },
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
        annotations: showAlarms
          ? {
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
              highvandahigh: {
                type: 'line',
                yMin: (highThreshold - lowThreshold) * 0.1 + highThreshold,
                yMax: (highThreshold - lowThreshold) * 0.1 + highThreshold,
                borderColor: '#0000',
                borderWidth: 2,
                borderDash: [6, 4],
              },
              lowvandalow: {
                type: 'line',
                yMin: lowThreshold - (highThreshold - lowThreshold) * 0.1,
                yMax: lowThreshold - (highThreshold - lowThreshold) * 0.1,
                borderColor: '#0000',
                borderWidth: 2,
                borderDash: [6, 4],
              },
            }
          : {},
      },
    },
    scales: {
      x: {
        grid: {
          color: '#818589',
          drawBorder: false,
        },
        ticks: {
          color: '#fff',
          font: { size: 10 },
          maxRotation: 45,
          minRotation: 0,
          maxTicksLimit: 5,
          padding: 4,
        },
      },
      y: {
        grid: {
          color: '#818589',
          drawBorder: false,
        },
        ticks: {
          color: '#fff',
          font: { size: 10 },
          padding: 10,
          maxTicksLimit: 8,
        },
        beginAtZero: false,
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
      {/* Header arranged into three equal parts */}
      <div className="flex items-center mb-1">
        {/* Left: Sensor Name */}
        <div className="w-1/3 text-left">
          <h4 className="text-xl font-bold text-white truncate">{text}</h4>
        </div>
        {/* Center: Online Data Hosting Toggle */}
        <div className="w-1/3 flex items-center justify-center">
          <span className="text-xs text-white mr-2">Online Mode</span>
          <button
            onClick={() => setOnlineDataHosting(!onlineDataHosting)}
            className={`relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-900 ${
              onlineDataHosting ? 'bg-green-600' : 'bg-gray-600'
            }`}
          >
            <span className="sr-only">Toggle Online Data Hosting</span>
            <span
              className={`absolute left-0.5 inline-block w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                onlineDataHosting ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        {/* Right: Sensor Value */}
        <div className="w-1/3 text-right">
          <div className="text-2xl font-bold font-mono text-yellow-300 bg-gray-900 px-0 py-0 rounded-lg shadow-[0_0_10px_rgba(255,215,0,0.8)] tracking-widest">
            {latestValue !== null ? latestValue.toFixed(3) : '--'}{' '}
            <span className="text-sm">{unit}</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <Line data={chartData} options={options} />
      </div>

      {/* Bottom section with status indicators and toggle switches */}
      <div className="flex justify-between items-center mt-2 mb-2">
        {showAlarms && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-1">
              <div
                className={`w-4 h-4 rounded-full ${
                  lowBlink
                    ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-glow'
                    : 'bg-gray-600'
                }`}
              />
              <span className="text-[10px] text-white">Low</span>
            </div>
            <div className="flex items-center gap-1">
              <div
                className={`w-4 h-4 rounded-full ${
                  !lowBlink && !highBlink
                    ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-glow'
                    : 'bg-gray-600'
                }`}
              />
              <span className="text-[10px] text-white">Normal</span>
            </div>
            <div className="flex items-center gap-1">
              <div
                className={`w-4 h-4 rounded-full ${
                  highBlink
                    ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-glow'
                    : 'bg-gray-600'
                }`}
              />
              <span className="text-[10px] text-white">High</span>
            </div>
          </div>
        )}
        {/* Toggle Switches for Alerts */}
        <div className="flex items-center gap-2 mt-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white">
              <span className="text-green-300 font-bold">Alerts:&nbsp;&nbsp;</span>
              Email
            </span>
            <button
              onClick={() => setEmailAlert(!emailAlert)}
              className={`relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-900 ${
                emailAlert ? 'bg-green-600' : 'bg-gray-600'
              }`}
            >
              <span className="sr-only">Toggle Email alert</span>
              <span
                className={`absolute left-0.5 inline-block w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                  emailAlert ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white">SMS</span>
            <button
              onClick={() => setSmsAlert(!smsAlert)}
              className={`relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-900 ${
                smsAlert ? 'bg-green-600' : 'bg-gray-600'
              }`}
            >
              <span className="sr-only">Toggle SMS alert</span>
              <span
                className={`absolute left-0.5 inline-block w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                  smsAlert ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white">Siren</span>
            <button
              onClick={() => setSirenAlert(!sirenAlert)}
              className={`relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-900 ${
                sirenAlert ? 'bg-green-600' : 'bg-gray-600'
              }`}
            >
              <span className="sr-only">Toggle Siren alert</span>
              <span
                className={`absolute left-0.5 inline-block w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                  sirenAlert ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorGraph;
