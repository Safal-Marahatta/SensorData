import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { X, ChevronDown, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ParameterData {
  timestamp: string;
  [key: string]: number | string | null;
}

interface DateRange {
  start: string;
  end: string;
}

interface ParameterInfo {
  id: number;
  text: string;
  upper_threshold: number;
  lower_threshold: number;
  unit: string;
}

function ExportComp() {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);
  const [availableParameters, setAvailableParameters] = useState<ParameterInfo[]>([]);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [parameterData, setParameterData] = useState<ParameterData[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:8000/sensorsidtext", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch sensor parameters");
        }
        const data: ParameterInfo[] = await response.json();
        setAvailableParameters(data);
      } catch (error) {
        setError("Error fetching parameters");
        console.error("Error fetching sensor parameters:", error);
      }
    };

    fetchParameters();
  }, []);

  const handleRemoveParameter = (parameter: string) => {
    setSelectedParameters(selectedParameters.filter(p => p !== parameter));
  };

  const handleAddParameter = (parameter: string) => {
    if (!selectedParameters.includes(parameter)) {
      setSelectedParameters([...selectedParameters, parameter]);
    }
    setIsDropdownOpen(false);
  };

  const fetchParameterData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/parameterdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          dateRange,
          parameters: selectedParameters,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch parameter data');
      }

      const data: ParameterData[] = await response.json();
      console.log(data);
      setParameterData(data);
      setShowPreview(true);
    } catch (error) {
      setError("Error fetching data");
      console.error('Error fetching parameter data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPreview = () => {
    if (selectedParameters.length === 0) {
      setError("Please select at least one parameter");
      return;
    }
    fetchParameterData();
  };

  const downloadCSV = () => {
    const headers = ['timestamp', ...selectedParameters];
    const csvContent = [
      headers.join(','),
      ...parameterData.map(row =>
        headers.map(header => row[header] ?? '').join(',')
      )
    ].join('\n');

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

    import('html2canvas').then(({ default: html2canvas }) => {
      html2canvas(chartRef.current as HTMLDivElement).then(canvas => {
        const link = document.createElement('a');
        link.download = `parameter_graph_${dateRange.start}_to_${dateRange.end}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    });
  };

  const getParameterInfo = (paramName: string) => {
    return availableParameters.find(p => p.text === paramName);
  };

  const colors = ['#2563eb', '#dc2626', '#16a34a', '#9333ea', '#ea580c'];

  return (
    <div className="min-h-screen bg-gray-700 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-white mb-8">Export Log Data</h1>
        
        <div className="bg-gray-300 rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-gray-700 text-lg mb-2">Select Date Range</label>
              <div className="flex items-center gap-4">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                  className="border rounded-md px-3 py-2"
                />
                <span className="text-gray-500">→</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                  className="border rounded-md px-3 py-2"
                />
              </div>
            </div>

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
                
                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-50 border rounded-md shadow-lg">
                    <div className="py-1">
                      {availableParameters
                        .filter(parameter => !selectedParameters.includes(parameter.text))
                        .map(parameter => (
                          <button
                            key={parameter.id}
                            onClick={() => handleAddParameter(parameter.text)}
                            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                          >
                            {parameter.text} ({parameter.unit})
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleShowPreview}
              disabled={isLoading || selectedParameters.length === 0}
              className={`${
                isLoading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white px-6 py-2 rounded-md text-lg transition-colors`}
            >
              {isLoading ? 'Loading...' : 'Show Graph Preview'}
            </button>
          </div>
        </div>

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
                    tickFormatter={(value: string) => {
                      // Assuming the timestamp format "YYYY-MM-DD HH:MM:SS",
                      // display only the time portion for clarity
                      return value.slice(11);
                    }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  {selectedParameters.map((parameter, index) => {
                    const paramInfo = getParameterInfo(parameter);
                    return (
                      <Line
                        key={parameter}
                        type="monotone"
                        dataKey={parameter}
                        stroke={colors[index % colors.length]}
                        strokeWidth={2}
                        dot={false}
                        name={`${parameter} (${paramInfo?.unit || ''})`}
                      />
                    );
                  })}
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
