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
    lineChart: '',
    barChart: '',
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
        // For demonstration purposes, we'll generate random data and headers
        const generateRandomData = (length) => Array.from({ length }, () => Math.floor(Math.random() * 100));
        const generatedHeaders = Array.from({ length: selectedDataset.columnCount }, (_, i) => `Column ${i + 1}`);
        
        setHeaders(generatedHeaders);
        setData({
          lineData: generateRandomData(selectedDataset.columnCount),
          barData: generateRandomData(selectedDataset.columnCount),
          scatterData: Array.from({ length: selectedDataset.columnCount }, () => ({ x: Math.random() * 100, y: Math.random() * 100 })),
          heatmapData: Array.from({ length: 10 }, () => generateRandomData(10)),
        });
      }
    }
  }, []);

  const handleFieldChange = (chart, value) => {
    setSelectedFields(prev => ({ ...prev, [chart]: value }));
    // Here you would typically update the chart data based on the selected field
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Line Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={(value) => handleFieldChange('lineChart', value)}>
            <SelectTrigger className="w-full mb-4">
              <SelectValue placeholder="Select data field" />
            </SelectTrigger>
            <SelectContent>
              {headers.map((header, index) => (
                <SelectItem key={index} value={header}>{header}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <LineChart data={data.lineData} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={(value) => handleFieldChange('barChart', value)}>
            <SelectTrigger className="w-full mb-4">
              <SelectValue placeholder="Select data field" />
            </SelectTrigger>
            <SelectContent>
              {headers.map((header, index) => (
                <SelectItem key={index} value={header}>{header}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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