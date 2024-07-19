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
        fetchDatasetContent(selectedDataset.name);
      }
    }
  }, []);

  const fetchDatasetContent = async (datasetName) => {
    try {
      const response = await fetch(`/api/datasets/${datasetName}`);
      if (!response.ok) throw new Error('Failed to fetch dataset');
      const content = await response.json();
      
      // Assuming the API returns an object with headers and data
      setHeaders(content.headers);
      setData({
        lineData: content.data,
        barData: content.data,
        scatterData: content.data.map(row => ({ x: row[content.headers[0]], y: row[content.headers[1]] })),
        heatmapData: content.data.slice(0, 10).map(row => Object.values(row).slice(0, 10)),
      });
    } catch (error) {
      console.error('Error fetching dataset:', error);
      // Handle error (e.g., show a notification to the user)
    }
  };

  const handleFieldChange = (chart, field, value) => {
    setSelectedFields(prev => ({
      ...prev,
      [chart]: { ...prev[chart], [field]: value }
    }));
    // Here you would typically update the chart data based on the selected fields
    updateChartData(chart, field, value);
  };

  const updateChartData = (chart, field, value) => {
    // Implementation depends on how you want to update each chart type
    // This is a placeholder for the actual implementation
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