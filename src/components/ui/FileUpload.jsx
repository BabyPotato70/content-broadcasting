import { useCallback, useState } from "react";
import { UploadCloud, X } from "lucide-react";

export const FileUpload = ({ onChange, error }) => {
  const [preview, setPreview] = useState(null);
  const [fileData, setFileData] = useState(null);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, []);

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (!file) return;
    setFileData(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
    onChange(file);
  };

  const removeFile = () => {
    setPreview(null);
    setFileData(null);
    onChange(null);
  };

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer
          ${error ? "border-red-400" : "border-gray-300 hover:border-primary-500"} transition-colors`}
        onClick={() => document.getElementById("file-input").click()}
      >
        {preview ? (
          <div className="relative w-full max-w-xs">
            <img
              src={preview}
              alt="Preview"
              className="rounded-md object-cover h-40 w-full"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>
            <p className="mt-2 text-sm text-gray-600 text-center truncate">
              {fileData?.name}
            </p>
          </div>
        ) : (
          <>
            <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              Drag & drop or click to select
            </p>
            <p className="text-xs text-gray-400 mt-1">
              JPG, PNG, GIF up to 10MB
            </p>
          </>
        )}
      </div>
      <input
        id="file-input"
        type="file"
        accept="image/jpeg,image/png,image/gif"
        onChange={handleChange}
        className="hidden"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
