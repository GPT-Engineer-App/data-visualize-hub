import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Data = () => {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    const savedDatasets = JSON.parse(localStorage.getItem('datasets') || '[]');
    setDatasets(savedDatasets);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Datasets</h1>
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Datasets</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Upload Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datasets.map((dataset, index) => (
                <TableRow key={index}>
                  <TableCell>{dataset.name}</TableCell>
                  <TableCell>{new Date(dataset.date).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Data;