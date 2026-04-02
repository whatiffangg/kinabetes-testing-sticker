import AppLayout from "@/components/AppLayout";
import { Camera, CameraOff, SwitchCamera, RotateCcw, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ScanResult = {
  status: "normal" | "warning" | "danger";
  title: string;
  description: string;
  details: { label: string; refColor: string; stickerColor: string; result: string }[];
};

const mockAnalyze = (): Promise<ScanResult> =>
  new Promise((resolve) => {
    // Randomly pick one of 3 scenarios
    const scenario = Math.floor(Math.random() * 3);
    setTimeout(() => {
      if (scenario === 0) {
        // Normal
        resolve({
          status: "normal",
          title: "ปกติ — Healthy Kidney",
          description: "ไม่พบสัญญาณผิดปกติ",
          details: [
            { label: "Glucose (ช่องบน)", refColor: "bg-blue-400", stickerColor: "bg-blue-400", result: "Negative" },
            { label: "Microalbumin (ช่องล่าง)", refColor: "bg-yellow-400", stickerColor: "bg-yellow-400", result: "Negative" },
          ],
        });
      } else if (scenario === 1) {
        // Warning - Glucose found
        resolve({
          status: "warning",
          title: "พบ Glucose",
          description: "แนะนำตรวจซ้ำ",
          details: [
            { label: "Glucose (ช่องบน)", refColor: "bg-blue-400", stickerColor: "bg-amber-700", result: "Positive" },
            { label: "Microalbumin (ช่องล่าง)", refColor: "bg-yellow-400", stickerColor: "bg-yellow-400", result: "Negative" },
          ],
        });
      } else {
        // Danger - Both found
        resolve({
          status: "danger",
          title: "พบทั้ง Glucose และ Microalbumin",
          description: "แนะนำให้ปรึกษาเภสัชกร",
          details: [
            { label: "Glucose (ช่องบน)", refColor: "bg-blue-400", stickerColor: "bg-amber-700", result: "Positive" },
            { label: "Microalbumin (ช่องล่าง)", refColor: "bg-yellow-400", stickerColor: "bg-emerald-500", result: "Positive" },
          ],
        });
      }
    }, 2500);
  });

const statusConfig = {
  normal: { bg: "bg-primary/10", text: "text-primary", icon: CheckCircle2, label: "ปกติ" },
  warning: { bg: "bg-accent/20", text: "text-accent-foreground", icon: AlertTriangle, label: "เฝ้าระวัง" },
  danger: { bg: "bg-destructive/10", text: "text-destructive", icon: AlertTriangle, label: "ผิดปกติ" },
};

const ScanPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(true);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const streamRef = useRef<MediaStream | null>(null);

  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<ScanResult | null>(null);

  const startCamera = async (facing: "environment" | "user") => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }

      let stream: MediaStream | null = null;

      // Try exact facingMode first, then fallback to ideal, then fallback to any camera
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { exact: facing }, width: { ideal: 1280 }, height: { ideal: 960 } },
          audio: false,
        });
      } catch {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 960 } },
            audio: false,
          });
        } catch {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 960 } },
            audio: false,
          });
        }
      }

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
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
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      setCapturedImage(dataUrl);
      setAnalyzing(true);
      setResults(null);

      // Stop camera while viewing results
      streamRef.current?.getTracks().forEach((t) => t.stop());
      setCameraStarted(false);

      // Mock AI analysis
      mockAnalyze().then((res) => {
        setResults(res);
        setAnalyzing(false);
      });
    }
  };

  const retake = () => {
    setCapturedImage(null);
    setResults(null);
    setAnalyzing(false);
    startCamera(facingMode);
  };

  // --- Results view ---
  if (capturedImage) {
    return (
      <AppLayout>
        <div className="relative -mx-4 -mt-4">
          {/* Captured image preview */}
          <div className="bg-foreground/90 aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9] relative overflow-hidden">
            <img src={capturedImage} alt="Captured" className="absolute inset-0 w-full h-full object-cover" />
            {analyzing && (
              <div className="absolute inset-0 bg-foreground/60 flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                <Loader2 size={48} className="text-primary animate-spin" />
                <p className="text-primary-foreground text-sm font-medium">กำลังวิเคราะห์ผล...</p>
              </div>
            )}
          </div>

          {/* Results section */}
          <div className="p-4 space-y-4">
            {analyzing ? (
              <div className="bg-card rounded-xl p-6 text-center">
                <p className="text-muted-foreground text-sm">กรุณารอสักครู่ ระบบกำลังประมวลผลภาพ</p>
              </div>
            ) : results ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">ผลการวิเคราะห์</h2>
                  <span className="text-xs text-muted-foreground">
                    {new Date().toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>

                {/* Status badge */}
                <div className="flex gap-2">
                  <span className={`${statusConfig[results.status].bg} ${statusConfig[results.status].text} text-xs font-medium px-3 py-1.5 rounded-full`}>
                    {statusConfig[results.status].label}
                  </span>
                </div>

                {/* Result summary card */}
                <div className={`${statusConfig[results.status].bg} rounded-xl p-4 space-y-2`}>
                  <div className="flex items-center gap-2">
                    {(() => { const Icon = statusConfig[results.status].icon; return <Icon size={20} className={statusConfig[results.status].text} />; })()}
                    <h3 className={`font-semibold ${statusConfig[results.status].text}`}>{results.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{results.description}</p>
                </div>

                {/* Color comparison */}
                <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">เปรียบเทียบสี</h3>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
                    <div></div>
                    <div className="font-medium">Reference Card</div>
                    <div className="font-medium">Sticker</div>
                  </div>
                  {results.details.map((d) => (
                    <div key={d.label} className="grid grid-cols-3 gap-2 items-center">
                      <span className="text-xs text-foreground">{d.label}</span>
                      <div className={`${d.refColor} h-8 rounded-lg`} />
                      <div className={`${d.stickerColor} h-8 rounded-lg`} />
                    </div>
                  ))}
                </div>

                {/* Retake button */}
                <button
                  onClick={retake}
                  className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-medium flex items-center justify-center gap-2"
                >
                  <RotateCcw size={18} />
                  สแกนอีกครั้ง
                </button>
              </>
            ) : null}
          </div>
        </div>
      </AppLayout>
    );
  }

  // --- Camera view ---
  return (
    <AppLayout>
      <div className="relative -mx-4 -mt-4">
        <div className="bg-foreground/90 aspect-[4/5] md:aspect-[16/10] lg:aspect-[16/9] flex items-center justify-center relative overflow-hidden">
          <video ref={videoRef} autoPlay playsInline muted className={`absolute inset-0 w-full h-full object-cover ${cameraStarted && hasCamera ? '' : 'hidden'}`} />
          {!cameraStarted || !hasCamera ? (
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
          ) : null}

          {cameraStarted && hasCamera && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[80%] max-w-sm aspect-[3/2] border-2 border-primary/60 rounded-xl relative">
                <div className="absolute -top-8 left-0">
                  <span className="bg-foreground/60 text-primary-foreground px-3 py-1 rounded-full backdrop-blur-sm text-xs">Reference Card</span>
                </div>
                <div className="absolute -top-8 right-0">
                  <span className="bg-foreground/60 text-primary-foreground px-3 py-1 rounded-full backdrop-blur-sm text-xs">Kinabetes Testing Sticker</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-foreground/95 py-4 text-center">
          <p className="text-primary-foreground/70 text-sm mb-4">วางแผ่นแปะคู่กับ Reference Card ในกรอบ</p>
          <div className="flex justify-center items-center gap-6">
            <button onClick={toggleCamera} className="w-12 h-12 rounded-xl bg-muted-foreground/30 flex items-center justify-center">
              <SwitchCamera size={24} className="text-primary-foreground/70" />
            </button>
            <button
              onClick={capturePhoto}
              className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center ring-4 ring-primary/30 active:scale-95 transition-transform"
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
