import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import ScatterPlot from '../components/charts/ScatterPlot';
import Heatmap from '../components/charts/Heatmap';

const Overview = () => {
  const [data, setData] = useState({
    lineData: [],
    barData: [],
    scatterData: [],
    heatmapData: [],
  });

  useEffect(() => {
    const activeDataset = localStorage.getItem('activeDataset');
    if (activeDataset) {
      // Fetch the data for the active dataset
      const datasets = JSON.parse(localStorage.getItem('datasets') || '[]');
      const selectedDataset = datasets.find(dataset => dataset.name === activeDataset);
      
      if (selectedDataset) {
        // For demonstration purposes, we'll generate random data based on the dataset's properties
        const generateRandomData = (length) => Array.from({ length }, () => Math.floor(Math.random() * 100));
        
        setData({
          lineData: generateRandomData(selectedDataset.columnCount),
          barData: generateRandomData(selectedDataset.columnCount),
          scatterData: Array.from({ length: selectedDataset.columnCount }, () => ({ x: Math.random() * 100, y: Math.random() * 100 })),
          heatmapData: Array.from({ length: 10 }, () => generateRandomData(10)),
        });
      }
    } else {
      // If no dataset is selected, clear the charts
      setData({
        lineData: [],
        barData: [],
        scatterData: [],
        heatmapData: [],
      });
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Line Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart data={data.lineData} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={data.barData} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Scatter Plot</CardTitle>
        </CardHeader>
        <CardContent>
          <ScatterPlot data={data.scatterData} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <Heatmap data={data.heatmapData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;