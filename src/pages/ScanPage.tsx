import AppLayout from "@/components/AppLayout";
import { Camera, ChevronLeft, CameraOff, SwitchCamera } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ScanPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(true);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async (facing: "environment" | "user") => {
    try {
      // Stop existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraStarted(true);
      setHasCamera(true);
    } catch {
      setHasCamera(false);
      setCameraStarted(false);
    }
  };

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleCamera = () => {
    const next = facingMode === "environment" ? "user" : "environment";
    setFacingMode(next);
    startCamera(next);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      // For now just show the captured frame — can be extended to send for AI analysis
      canvas.toBlob((blob) => {
        if (blob) {
          console.log("Captured photo:", blob.size, "bytes");
        }
      }, "image/jpeg", 0.9);
    }
  };

  return (
    <AppLayout>
      <div className="relative -mx-4 -mt-4">
        <div className="bg-foreground/90 aspect-[4/5] md:aspect-[16/10] lg:aspect-[16/9] flex items-center justify-center relative overflow-hidden">
          {cameraStarted && hasCamera ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <CameraOff size={48} />
              <p className="text-sm">ไม่สามารถเข้าถึงกล้องได้</p>
              <button
                onClick={() => startCamera(facingMode)}
                className="text-sm text-primary font-medium px-4 py-2 bg-card rounded-lg"
              >
                ลองอีกครั้ง
              </button>
            </div>
          )}

          {/* Scan guide overlay */}
          {cameraStarted && hasCamera && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[80%] max-w-sm aspect-[3/2] border-2 border-primary/60 rounded-xl relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-6 text-xs">
                  <span className="bg-foreground/60 text-primary-foreground px-3 py-1 rounded-full backdrop-blur-sm">Reference Card</span>
                  <span className="bg-foreground/60 text-primary-foreground px-3 py-1 rounded-full backdrop-blur-sm">Urine Strip</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-foreground/95 py-4 text-center">
          <p className="text-primary-foreground/70 text-sm mb-4">วางแผ่นแปะคู่กับ Reference Card ในกรอบ</p>
          <div className="flex justify-center items-center gap-6">
            <button
              onClick={toggleCamera}
              className="w-12 h-12 rounded-xl bg-muted-foreground/30 flex items-center justify-center"
            >
              <SwitchCamera size={24} className="text-primary-foreground/70" />
            </button>
            <button
              onClick={capturePhoto}
              className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center ring-4 ring-primary/30"
            >
              <Camera size={28} className="text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ScanPage;
