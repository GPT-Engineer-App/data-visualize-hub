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
    lineChart: { xAxis: '', yAxis: '' },
    barChart: { xAxis: '', yAxis: '' },
    scatterPlotX: '',
    scatterPlotY: '',
    heatmapX: '',
    heatmapY: '',
  });

  useEffect(() => {
    const activeDataset = localStorage.getItem('activeDataset');
    if (activeDataset) {
      fetchDatasetContent(activeDataset);
    }
  }, []);

  const fetchDatasetContent = async (datasetName) => {
    try {
      // Simulating API call with local storage
      const datasets = JSON.parse(localStorage.getItem('datasets') || '[]');
      const selectedDataset = datasets.find(dataset => dataset.name === datasetName);
      
      if (selectedDataset) {
        // For demonstration, we'll generate sample data and headers
        const sampleHeaders = Array.from({ length: selectedDataset.columnCount }, (_, i) => `Column ${i + 1}`);
        const sampleData = Array.from({ length: selectedDataset.rowCount }, () => 
          sampleHeaders.reduce((acc, header) => ({ ...acc, [header]: Math.random() * 100 }), {})
        );
        
        setHeaders(sampleHeaders);
        setData({
          lineData: sampleData,
          barData: sampleData,
          scatterData: sampleData.map(row => ({ x: row[sampleHeaders[0]], y: row[sampleHeaders[1]] })),
          heatmapData: sampleData.slice(0, 10).map(row => Object.values(row).slice(0, 10)),
        });
      }
    } catch (error) {
      console.error('Error fetching dataset:', error);
    }
  };

  const handleFieldChange = (chart, field, value) => {
    setSelectedFields(prev => ({
      ...prev,
      [chart]: { ...prev[chart], [field]: value }
    }));
    updateChartData(chart, field, value);
  };

  const updateChartData = (chart, field, value) => {
    // Implementation for updating chart data based on selected fields
    console.log(`Updating ${chart} with ${field} set to ${value}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card className="w-full h-[400px]">
        <CardHeader>
          <CardTitle>Line Chart</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-4rem)]">
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
          </div>
          <div className="h-[calc(100%-3rem)]">
            <LineChart data={data.lineData} />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-[400px]">
        <CardHeader>
          <CardTitle>Bar Chart</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-4rem)]">
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
          </div>
          <div className="h-[calc(100%-3rem)]">
            <BarChart data={data.barData} />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-[400px]">
        <CardHeader>
          <CardTitle>Scatter Plot</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-4rem)]">
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
          <div className="h-[calc(100%-3rem)]">
            <ScatterPlot data={data.scatterData} />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-[400px]">
        <CardHeader>
          <CardTitle>Heatmap</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-4rem)]">
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
          <div className="h-[calc(100%-3rem)]">
            <Heatmap data={data.heatmapData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Build;