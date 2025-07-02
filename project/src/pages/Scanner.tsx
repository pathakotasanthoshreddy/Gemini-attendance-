import React, { useState, useEffect, useRef } from 'react';
import { QrCode, CheckCircle, XCircle, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { markAttendance } from '../api/attendance';
import { BrowserQRCodeReader } from '@zxing/browser';

const Scanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [location, setLocation] = useState<string>('Main Campus');
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<BrowserQRCodeReader | null>(null);

  useEffect(() => {
    codeReader.current = new BrowserQRCodeReader();

    return () => {
      codeReader.current?.reset();
    };
  }, []);

  const handleScan = async (data: string) => {
    if (!data) return;

    try {
      const qrData = JSON.parse(data);
      const studentId = qrData.studentId;

      if (!studentId) {
        throw new Error('Invalid QR code format');
      }

      const response = await markAttendance(studentId, location);
      setScanResult(response);
      toast.success(response.message);
      setError('');
      setIsScanning(false);
      codeReader.current?.reset();
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || err.message || 'Failed to mark attendance';
      setError(errorMessage);
      toast.error(errorMessage);
      setIsScanning(false);
      codeReader.current?.reset();
    }
  };

  const startScanning = async () => {
    setIsScanning(true);
    setScanResult(null);
    setError('');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      if (!stream || !videoRef.current || !codeReader.current) {
        throw new Error('Unable to initialize scanner');
      }

      videoRef.current.srcObject = stream;
      videoRef.current.play();

      await codeReader.current.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        (result, error) => {
          if (result) {
            handleScan(result.getText());
          }
          if (error && error.name !== 'NotFoundException') {
            console.error('QR Scanner error:', error);
          }
        }
      );
    } catch (err) {
      setError('Camera access denied or not supported on this device.');
      setIsScanning(false);
      toast.error('Camera access required');
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    codeReader.current?.reset();
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code Scanner</h1>
          <p className="text-gray-600">Scan student QR codes to mark attendance</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="h-4 w-4 inline mr-1" /> Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="Main Campus">Main Campus</option>
            <option value="Library">Library</option>
            <option value="Laboratory">Laboratory</option>
            <option value="Auditorium">Auditorium</option>
            <option value="Cafeteria">Cafeteria</option>
          </select>
        </div>

        {isScanning ? (
          <div className="mb-6">
            <video
              ref={videoRef}
              className="w-full rounded-lg border border-gray-300"
              autoPlay
              playsInline
              muted
            />
            <button
              onClick={stopScanning}
              className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Stop Scanning
            </button>
          </div>
        ) : (
          <button
            onClick={startScanning}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Start Scanning
          </button>
        )}

        {scanResult && (
          <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <CheckCircle className="inline w-5 h-5 mr-2" />
            {scanResult.message}
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <XCircle className="inline w-5 h-5 mr-2" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;
