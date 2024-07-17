import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Check } from 'lucide-react';

const DatasetBox = ({ dataset, isActive, onClick }) => {
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB';
    else return (bytes / 1073741824).toFixed(2) + ' GB';
  };

  return (
    <Card className="relative w-[250px] h-[100px] m-[10px] cursor-pointer" onClick={onClick}>
      <CardContent className="p-4">
        <h3 className="font-bold truncate">{dataset.name}</h3>
        <p className="text-sm">Rows: {dataset.rowCount}</p>
        <p className="text-sm">Columns: {dataset.columnCount}</p>
        <p className="text-sm">Size: {formatFileSize(dataset.fileSize)}</p>
      </CardContent>
      <div className="absolute top-2 right-2 w-6 h-6 border-2 border-gray-300 rounded-sm flex items-center justify-center">
        {isActive && <Check className="w-4 h-4 text-green-500" />}
      </div>
    </Card>
  );
};

const Data = () => {
  const [datasets, setDatasets] = useState([]);
  const [activeDataset, setActiveDataset] = useState(null);

  useEffect(() => {
    const savedDatasets = JSON.parse(localStorage.getItem('datasets') || '[]');
    setDatasets(savedDatasets);
  }, []);

  const handleDatasetClick = (dataset) => {
    setActiveDataset(dataset.name === activeDataset ? null : dataset.name);
    // Here you would update the visuals based on the active dataset
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Uploaded Datasets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {datasets.map((dataset, index) => (
          <DatasetBox
            key={index}
            dataset={dataset}
            isActive={dataset.name === activeDataset}
            onClick={() => handleDatasetClick(dataset)}
          />
        ))}
      </div>
    </div>
  );
};

export default Data;