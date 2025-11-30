import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  FileText,
  Image,
  File,
  CheckCircle2,
  XCircle,
  Trash2,
  Eye,
  CloudUpload,
  Shield,
  Clock,
  Sparkles,
  AlertCircle,
  Home,
  Search,
  Building2,
  Heart,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

const DocumentUpload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');

  const documentCategories = [
    { id: 'general', name: 'General Documents', icon: FileText },
    { id: 'identity', name: 'Identity Documents', icon: Shield },
    { id: 'property', name: 'Property Documents', icon: Building2 },
    { id: 'legal', name: 'Legal Documents', icon: File },
  ];

  const acceptedTypes = [
    { ext: 'PDF', mime: 'application/pdf' },
    { ext: 'JPG', mime: 'image/jpeg' },
    { ext: 'PNG', mime: 'image/png' },
    { ext: 'DOC', mime: 'application/msword' },
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return Image;
    if (type.includes('pdf')) return FileText;
    return File;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    processFiles(selectedFiles);
  };

  const processFiles = (newFiles: File[]) => {
    const maxSize = 10 * 1024 * 1024; // 10MB

    newFiles.forEach((file) => {
      if (file.size > maxSize) {
        toast.error(`${file.name} is too large. Maximum size is 10MB.`);
        return;
      }

      const uploadFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        status: 'uploading',
        progress: 0,
      };

      setFiles((prev) => [...prev, uploadFile]);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id
                ? { ...f, progress: 100, status: 'success' }
                : f
            )
          );
          toast.success(`${file.name} uploaded successfully!`);
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id ? { ...f, progress: Math.min(progress, 99) } : f
            )
          );
        }
      }, 500);
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    toast.success('File removed');
  };

  const handleSubmit = () => {
    const successfulFiles = files.filter((f) => f.status === 'success');
    if (successfulFiles.length === 0) {
      toast.error('Please upload at least one document');
      return;
    }
    toast.success('Documents submitted for review!');
    navigate('/services/document-verification');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] pt-4 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#c9a961]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="font-serif text-white text-xl font-bold">Document Upload</h1>
              <p className="text-white/70 text-xs">Upload your land documents securely</p>
            </div>
          </div>

          {/* Upload Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-xl">
              <CloudUpload className="w-4 h-4 text-[#c9a961]" />
              <span className="text-white text-sm font-medium">{files.length} Files</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-white text-sm font-medium">
                {files.filter((f) => f.status === 'success').length} Ready
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Pulled up */}
      <div className="px-4 -mt-12 relative z-10 space-y-6">
        {/* Category Selection */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
          <h2 className="font-serif text-[#0a2540] font-bold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c9a961]" />
            Document Category
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {documentCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3 rounded-xl border transition-all flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] text-white border-transparent shadow-lg'
                      : 'bg-[#faf8f5] text-[#8b6947] border-[#c9a961]/20 hover:border-[#c9a961]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Upload Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`bg-white/95 backdrop-blur-xl rounded-2xl border-2 border-dashed transition-all ${
            isDragging
              ? 'border-[#0d6e5d] bg-[#0d6e5d]/5'
              : 'border-[#c9a961]/40 hover:border-[#c9a961]'
          } shadow-xl`}
        >
          <label className="block cursor-pointer p-8 text-center">
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div
              className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all ${
                isDragging
                  ? 'bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d]'
                  : 'bg-gradient-to-br from-[#c9a961]/20 to-[#8b6947]/10'
              }`}
            >
              <Upload
                className={`w-8 h-8 ${isDragging ? 'text-white' : 'text-[#c9a961]'}`}
              />
            </div>
            <h3 className="font-serif text-[#0a2540] font-bold mb-1">
              {isDragging ? 'Drop files here' : 'Upload Documents'}
            </h3>
            <p className="text-[#8b6947] text-sm mb-3">
              Drag & drop or <span className="text-[#0d6e5d] font-medium">browse</span>
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {acceptedTypes.map((type) => (
                <span
                  key={type.ext}
                  className="px-2 py-1 bg-[#faf8f5] rounded text-xs text-[#8b6947] border border-[#c9a961]/20"
                >
                  {type.ext}
                </span>
              ))}
              <span className="text-xs text-[#8b6947]">• Max 10MB</span>
            </div>
          </label>
        </div>

        {/* Info Alert */}
        <div className="bg-gradient-to-r from-[#c9a961]/10 to-[#8b6947]/5 rounded-2xl p-4 border border-[#c9a961]/20 flex gap-3">
          <AlertCircle className="w-5 h-5 text-[#c9a961] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-[#0a2540] font-medium mb-1">
              Secure Document Upload
            </p>
            <p className="text-xs text-[#8b6947]">
              Your documents are encrypted and securely stored. Only authorized government
              officials can access them for verification purposes.
            </p>
          </div>
        </div>

        {/* Uploaded Files */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-serif text-[#0a2540] font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#c9a961]" />
              Uploaded Files
            </h3>
            {files.map((file) => {
              const FileIcon = getFileIcon(file.type);
              return (
                <div
                  key={file.id}
                  className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        file.status === 'success'
                          ? 'bg-gradient-to-br from-emerald-100 to-emerald-200'
                          : file.status === 'error'
                          ? 'bg-gradient-to-br from-rose-100 to-rose-200'
                          : 'bg-gradient-to-br from-[#c9a961]/20 to-[#8b6947]/10'
                      }`}
                    >
                      <FileIcon
                        className={`w-6 h-6 ${
                          file.status === 'success'
                            ? 'text-emerald-600'
                            : file.status === 'error'
                            ? 'text-rose-600'
                            : 'text-[#c9a961]'
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0a2540] truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-[#8b6947]">{file.size}</p>
                      {file.status === 'uploading' && (
                        <div className="mt-2 h-1.5 bg-[#faf8f5] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === 'success' && (
                        <>
                          <button className="p-2 hover:bg-[#faf8f5] rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-[#8b6947]" />
                          </button>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="p-2 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-rose-500" />
                          </button>
                        </>
                      )}
                      {file.status === 'uploading' && (
                        <div className="w-8 h-8 border-2 border-[#c9a961] border-t-transparent rounded-full animate-spin" />
                      )}
                      {file.status === 'error' && (
                        <XCircle className="w-5 h-5 text-rose-500" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Processing Time */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0f3d5c]/10 to-[#0d6e5d]/10 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#0d6e5d]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#0a2540]">Processing Time</p>
              <p className="text-xs text-[#8b6947]">
                Documents are typically verified within 2-5 business days
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={files.filter((f) => f.status === 'success').length === 0}
          className="w-full py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-2xl text-white font-semibold shadow-xl shadow-[#c9a961]/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl transition-all"
        >
          <Shield className="w-5 h-5" />
          Submit for Verification
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#c9a961]/20 px-4 py-2 z-30">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {[
            { icon: Home, label: 'Home', path: '/dashboard' },
            { icon: Search, label: 'Search', path: '/search' },
            { icon: Building2, label: 'Services', path: '/services/document-verification' },
            { icon: Heart, label: 'Portfolio', path: '/portfolio' },
            { icon: User, label: 'Profile', path: '/settings' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center py-1"
            >
              <div
                className={`p-2 rounded-xl transition-all ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d]'
                    : ''
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    isActive(item.path) ? 'text-white' : 'text-[#8b6947]'
                  }`}
                />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isActive(item.path) ? 'text-[#0f3d5c]' : 'text-[#8b6947]'
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DocumentUpload;