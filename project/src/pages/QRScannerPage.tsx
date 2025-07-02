import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedButton from '../components/AnimatedButton';
import Modal from '../components/Modal';
import { Camera, Play, Square, ArrowLeft, Users, Calendar, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';

let html5QrcodeScanner: Html5QrcodeScanner | null = null;

const QRScannerPage: React.FC = () => {
  const navigate = useNavigate();
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [scanType, setScanType] = useState<'class' | 'lab' | 'exam'>('class');
  const [showMarksModal, setShowMarksModal] = useState(false);
  const [examMarks, setExamMarks] = useState({ marks: '', remarks: '' });
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<HTMLDivElement>(null);

  const startScanner = () => {
    if (!scannerRef.current) return;

    if (!html5QrcodeScanner) {
      html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader",
        { 
          fps: 10, 
          qrbox: { width: 300, height: 300 }, 
          rememberLastUsedCamera: true 
        },
        false
      );
    }

    const onScanSuccess = (decodedText: string) => {
      setScannedResult(decodedText);
      setIsScanning(false);
      html5QrcodeScanner?.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner", error);
      });
      handleAttendanceRecord(decodedText);
    };

    const onScanError = () => {
      // Silently handle scan errors
    };

    setIsScanning(true);
    html5QrcodeScanner.render(onScanSuccess, onScanError);
    toast.success("QR Scanner started!", { icon: '📸' });
  };

  const stopScanner = () => {
    if (html5QrcodeScanner && isScanning) {
      html5QrcodeScanner.clear()
        .then(() => {
          setIsScanning(false);
          setScannedResult(null);
          toast("QR Scanner stopped.", { icon: '🛑' });
        })
        .catch(err => {
          console.error("Failed to stop scanner:", err);
          toast.error("Error stopping scanner.");
        });
    }
  };

  useEffect(() => {
    startScanner();

    return () => {
      if (html5QrcodeScanner) {
        html5QrcodeScanner.clear().catch(err => console.error("Failed to clear scanner on unmount:", err));
        html5QrcodeScanner = null;
      }
    };
  }, []);

  const handleAttendanceRecord = async (studentId: string) => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1000)),
      {
        loading: `Recording ${scanType} attendance for ${studentId}...`,
        success: `✅ Attendance recorded for ${studentId}!`,
        error: `❌ Failed to record attendance for ${studentId}.`,
      }
    ).then(() => {
      if (scanType === 'exam') {
        setShowMarksModal(true);
      } else {
        setScannedResult(null);
        startScanner();
      }
    });
  };

  const handleMarksSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: `Submitting marks for ${scannedResult}...`,
        success: `Marks for ${scannedResult} submitted successfully!`,
        error: `Failed to submit marks for ${scannedResult}.`,
      }
    );
    setShowMarksModal(false);
    setExamMarks({ marks: '', remarks: '' });
    setScannedResult(null);
    startScanner();
  };

  const scanTypeOptions = [
    { 
      value: 'class', 
      label: 'Class', 
      icon: Users, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-100' 
    },
    { 
      value: 'lab', 
      label: 'Lab', 
      icon: Calendar, 
      color: 'text-green-600',
      bgColor: 'bg-green-100' 
    },
    { 
      value: 'exam', 
      label: 'Exam/Mock', 
      icon: GraduationCap, 
      color: 'text-red-600',
      bgColor: 'bg-red-100' 
    }
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 bg-blue-600 rounded-full">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">QR Attendance Scanner</h1>
          <p className="text-xl text-gray-600">Scan student QR codes for quick attendance marking</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Scan Type Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Attendance Type</h3>
            <div className="grid grid-cols-3 gap-4">
              {scanTypeOptions.map((option) => (
                <motion.label
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                    ${scanType === option.value 
                      ? `border-current ${option.color} ${option.bgColor}` 
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="scanType"
                    value={option.value}
                    checked={scanType === option.value}
                    onChange={(e) => setScanType(e.target.value as 'class' | 'lab' | 'exam')}
                    className="sr-only"
                  />
                  <option.icon className={`w-8 h-8 mb-2 ${option.color}`} />
                  <span className={`font-semibold ${option.color}`}>{option.label}</span>
                </motion.label>
              ))}
            </div>
          </div>

          {/* Scanner Area */}
          <div className="mb-8">
            <div 
              id="qr-reader" 
              ref={scannerRef} 
              className="w-full h-96 bg-gray-100 border-4 border-dashed border-blue-300 rounded-2xl flex items-center justify-center overflow-hidden"
            >
              {!isScanning && (
                <div className="text-center text-gray-500">
                  <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Click "Start Scanner" to begin</p>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-4">
            <AnimatedButton
              onClick={isScanning ? stopScanner : startScanner}
              label={isScanning ? "Stop Scanner" : "Start Scanner"}
              icon={isScanning ? Square : Play}
              className={`
                px-8 py-4 text-lg font-semibold
                ${isScanning 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
                }
              `}
              animationType={isScanning ? 'default' : 'pulse'}
            />
            <AnimatedButton
              onClick={() => navigate('/dashboard-admin')}
              label="Back to Dashboard"
              icon={ArrowLeft}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 text-lg font-semibold"
            />
          </div>

          {scannedResult && scanType !== 'exam' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl text-center"
            >
              <p className="text-xl font-semibold text-green-800">
                ✅ Last Scanned: <span className="font-mono">{scannedResult}</span>
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Marks Entry Modal */}
      <Modal
        isOpen={showMarksModal}
        onClose={() => setShowMarksModal(false)}
        title={`Enter Marks for Student: ${scannedResult}`}
        size="md"
      >
        <form onSubmit={handleMarksSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-3" htmlFor="marks">
              Marks Obtained:
            </label>
            <input
              type="number"
              id="marks"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 85"
              value={examMarks.marks}
              onChange={(e) => setExamMarks({ ...examMarks, marks: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-3" htmlFor="remarks">
              Remarks (Optional):
            </label>
            <textarea
              id="remarks"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Good performance, needs improvement, etc."
              value={examMarks.remarks}
              onChange={(e) => setExamMarks({ ...examMarks, remarks: e.target.value })}
            ></textarea>
          </div>
          <AnimatedButton
            type="submit"
            label="Submit Marks"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold"
          />
        </form>
      </Modal>
    </div>
  );
};

export default QRScannerPage;