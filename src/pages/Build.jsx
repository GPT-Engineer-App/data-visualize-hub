import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import ScatterPlot from '../components/charts/ScatterPlot';
import Heatmap from '../components/charts/Heatmap';

const Build = () => {
  const [data, setData] = useState({
    lineData: [],
    barData: [],
    scatterData: [],
    heatmapData: [],
  });
  const [headers, setHeaders] = useState([]);
  const [selectedFields, setSelectedFields] = useState({
    lineChart: { xAxis: '', yAxis: '', value: '', series: '' },
    barChart: { xAxis: '', yAxis: '', value: '', series: '' },
    scatterPlotX: '',
    scatterPlotY: '',
    heatmapX: '',
    heatmapY: '',
  });

  useEffect(() => {
    const activeDataset = localStorage.getItem('activeDataset');
    if (activeDataset) {
      const datasets = JSON.parse(localStorage.getItem('datasets') || '[]');
      const selectedDataset = datasets.find(dataset => dataset.name === activeDataset);
      
      if (selectedDataset) {
        // Fetch the actual data and headers from the dataset
        // For this example, we'll simulate it with random data
        const simulateDataFromDataset = () => {
          const rowCount = selectedDataset.rowCount;
          const columnCount = selectedDataset.columnCount;
          const simulatedHeaders = Array.from({ length: columnCount }, (_, i) => `Field ${i + 1}`);
          const simulatedData = Array.from({ length: rowCount }, () => 
            Object.fromEntries(simulatedHeaders.map(header => [header, Math.random() * 100]))
          );
          return { headers: simulatedHeaders, data: simulatedData };
        };

        const { headers, data } = simulateDataFromDataset();
        setHeaders(headers);
        setData({
          lineData: data,
          barData: data,
          scatterData: data.map(row => ({ x: row[headers[0]], y: row[headers[1]] })),
          heatmapData: data.slice(0, 10).map(row => Object.values(row).slice(0, 10)),
        });
      }
    }
  }, []);

  const handleFieldChange = (chart, field, value) => {
    setSelectedFields(prev => ({
      ...prev,
      [chart]: { ...prev[chart], [field]: value }
    }));
    // Here you would typically update the chart data based on the selected fields
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Line Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Select onValueChange={(value) => handleFieldChange('lineChart', 'xAxis', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select X-Axis" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((header, index) => (
                  <SelectItem key={index} value={header}>{header}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFieldChange('lineChart', 'yAxis', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Y-Axis" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((header, index) => (
                  <SelectItem key={index} value={header}>{header}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFieldChange('lineChart', 'value', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Value" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((header, index) => (
                  <SelectItem key={index} value={header}>{header}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFieldChange('lineChart', 'series', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Series" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((header, index) => (
                  <SelectItem key={index} value={header}>{header}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <LineChart data={data.lineData} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Select onValueChange={(value) => handleFieldChange('barChart', 'xAxis', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select X-Axis" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((header, index) => (
                  <SelectItem key={index} value={header}>{header}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFieldChange('barChart', 'yAxis', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Y-Axis" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((header, index) => (
                  <SelectItem key={index} value={header}>{header}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFieldChange('barChart', 'value', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Value" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((header, index) => (
                  <SelectItem key={index} value={header}>{header}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFieldChange('barChart', 'series', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Series" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((header, index) => (
                  <SelectItem key={index} value={header}>{header}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <BarChart data={data.barData} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Scatter Plot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Select onValueChange={(value) => handleFieldChange('scatterPlotX', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select X-axis" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((header, index) => (
                  <SelectItem key={index} value={header}>{header}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFieldChange('scatterPlotY', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Y-axis" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((header, index) => (
                  <SelectItem key={index} value={header}>{header}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ScatterPlot data={data.scatterData} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Select onValueChange={(value) => handleFieldChange('heatmapX', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select X-axis" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((header, index) => (
                  <SelectItem key={index} value={header}>{header}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFieldChange('heatmapY', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Y-axis" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((header, index) => (
                  <SelectItem key={index} value={header}>{header}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Heatmap data={data.heatmapData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Build;