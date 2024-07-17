import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UploadData = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    // TODO: Implement file parsing and preview generation
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
          <Button>Choose File</Button>
        </CardContent>
      </Card>
      {preview && (
        <Card>
          <CardHeader>
            <CardTitle>Data Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Implement data preview */}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UploadData;