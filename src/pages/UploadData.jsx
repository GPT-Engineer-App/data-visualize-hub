import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';

const UploadData = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [useHeaderRow, setUseHeaderRow] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFileData = localStorage.getItem('uploadedFileData');
    if (savedFileData) {
      const { file, preview, totalRows } = JSON.parse(savedFileData);
      setFile(file);
      setPreview(preview);
      setTotalRows(totalRows);
    }
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    parseFile(selectedFile);
  };

  const parseFile = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      let parsedData;
      let total = 0;

      if (file.name.endsWith('.csv')) {
        Papa.parse(content, {
          header: useHeaderRow,
          complete: (results) => {
            parsedData = results.data.slice(0, 50);
            total = results.data.length;
            setPreview(parsedData);
            setTotalRows(total);
            setShowPreview(true);
            saveToLocalStorage(file, parsedData, total);
          }
        });
      } else if (file.name.endsWith('.json')) {
        parsedData = JSON.parse(content);
        total = parsedData.length;
        setPreview(parsedData.slice(0, 50));
        setTotalRows(total);
        setShowPreview(true);
        saveToLocalStorage(file, parsedData.slice(0, 50), total);
      } else if (file.name.endsWith('.xml')) {
        // For simplicity, we'll just show the raw XML content
        parsedData = [{ content: content.slice(0, 1000) + '...' }];
        total = 1;
        setPreview(parsedData);
        setTotalRows(total);
        setShowPreview(true);
        saveToLocalStorage(file, parsedData, total);
      }
    };
    reader.readAsText(file);
  }, [useHeaderRow]);

  const saveToLocalStorage = (file, preview, totalRows) => {
    const fileData = {
      file: { name: file.name, size: file.size },
      preview,
      totalRows
    };
    localStorage.setItem('uploadedFileData', JSON.stringify(fileData));
  };

  useEffect(() => {
    if (file) {
      parseFile(file);
    }
  }, [file, useHeaderRow, parseFile]);

  const saveDataset = () => {
    if (file) {
      const datasets = JSON.parse(localStorage.getItem('datasets') || '[]');
      datasets.push({
        name: file.name,
        date: new Date().toISOString(),
        rowCount: totalRows,
        columnCount: preview && preview.length > 0 ? Object.keys(preview[0]).length : 0,
        fileSize: file.size
      });
      localStorage.setItem('datasets', JSON.stringify(datasets));
      setShowPreview(false);
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
        </CardContent>
      </Card>
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Data Preview</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {preview && Object.keys(preview[0]).map((header, index) => (
                    <TableHead key={index}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {preview && preview.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Switch
              id="use-header"
              checked={useHeaderRow}
              onCheckedChange={setUseHeaderRow}
            />
            <Label htmlFor="use-header">Use First Row as Header</Label>
          </div>
          <p className="mt-2">Total Rows: {totalRows}</p>
          <DialogFooter>
            <Button onClick={saveDataset}>Save Dataset</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadData;