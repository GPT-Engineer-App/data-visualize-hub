import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import ScatterPlot from '../components/charts/ScatterPlot';
import Heatmap from '../components/charts/Heatmap';

const Overview = () => {
  const [data, setData] = useState({
    lineData: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
    barData: Array.from({ length: 5 }, () => Math.floor(Math.random() * 100)),
    scatterData: Array.from({ length: 20 }, () => ({ x: Math.random() * 100, y: Math.random() * 100 })),
    heatmapData: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))),
  });

  useEffect(() => {
    const socket = io('http://localhost:3001'); // Replace with your WebSocket server URL

    socket.on('dataUpdate', (newData) => {
      setData(newData);
    });

    // Simulate real-time updates
    const interval = setInterval(() => {
      setData(prevData => ({
        lineData: [...prevData.lineData.slice(1), Math.floor(Math.random() * 100)],
        barData: prevData.barData.map(() => Math.floor(Math.random() * 100)),
        scatterData: prevData.scatterData.map(() => ({ x: Math.random() * 100, y: Math.random() * 100 })),
        heatmapData: prevData.heatmapData.map(row => row.map(() => Math.floor(Math.random() * 100))),
      }));
    }, 3000);

    return () => {
      socket.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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