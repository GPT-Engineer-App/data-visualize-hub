import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';

const UploadData = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFile = localStorage.getItem('uploadedFile');
    if (savedFile) {
      setFile(JSON.parse(savedFile));
    }
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    localStorage.setItem('uploadedFile', JSON.stringify(selectedFile));
    parseFile(selectedFile);
  };

  const parseFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      let parsedData;

      if (file.name.endsWith('.csv')) {
        parsedData = Papa.parse(content, { header: true, preview: 50 }).data;
      } else if (file.name.endsWith('.json')) {
        parsedData = JSON.parse(content).slice(0, 50);
      } else if (file.name.endsWith('.xml')) {
        // For simplicity, we'll just show the raw XML content
        parsedData = [{ content: content.slice(0, 1000) + '...' }];
      }

      setPreview(parsedData);
    };
    reader.readAsText(file);
  };

  const saveDataset = () => {
    if (file) {
      const datasets = JSON.parse(localStorage.getItem('datasets') || '[]');
      datasets.push({ name: file.name, date: new Date().toISOString() });
      localStorage.setItem('datasets', JSON.stringify(datasets));
      navigate('/data');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Data</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Upload File</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="file"
            accept=".csv,.xml,.json"
            onChange={handleFileChange}
            className="mb-4"
          />
          <Button onClick={saveDataset} disabled={!file}>Save Dataset</Button>
        </CardContent>
      </Card>
      {preview && (
        <Card>
          <CardHeader>
            <CardTitle>Data Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(preview[0]).map((header, index) => (
                    <TableHead key={index}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {preview.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UploadData;