import { ChevronLeft, Camera } from 'lucide-react';
import { motion } from 'motion/react';

interface CameraScreenProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isCameraReady: boolean;
  onCapture: () => void;
  onBack: () => void;
}

export default function CameraScreen({ videoRef, canvasRef, isCameraReady, onCapture, onBack }: CameraScreenProps) {
  return (
    <div className="flex flex-col h-full bg-foreground">
      {/* Camera viewport - takes most of the screen */}
      <div className="relative flex-1">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay labels */}
        {isCameraReady && (
          <>
            {/* Scan line */}
            <div className="absolute left-8 right-8 h-0.5 bg-kina-cyan/70 animate-scan-line rounded-full" style={{ boxShadow: '0 0 12px 2px hsl(190 70% 50% / 0.5)' }} />
            
            {/* Reference Card label */}
            <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-foreground/30 backdrop-blur-sm text-primary-foreground text-xs px-3 py-1.5 rounded-full border border-primary-foreground/20">
                Reference Card
              </span>
            </div>
            {/* Urine Strip label */}
            <div className="absolute right-1/4 top-1/2 translate-x-1/2 -translate-y-1/2">
              <span className="bg-foreground/30 backdrop-blur-sm text-primary-foreground text-xs px-3 py-1.5 rounded-full border border-primary-foreground/20">
                Urine Strip
              </span>
            </div>
          </>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Instruction text */}
      <div className="bg-foreground/95 px-5 py-3 text-center">
        <p className="text-sm text-primary-foreground/70">วางแผ่นแปะคู่กับ Reference Card ในกรอบ</p>
      </div>

      {/* Bottom controls */}
      <div className="bg-foreground/95 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3 flex items-center">
        <button
          onClick={onBack}
          className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center text-primary-foreground"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 flex justify-center">
          {isCameraReady && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={onCapture}
              className="relative"
            >
              {/* Outer ring */}
              <div className="w-[72px] h-[72px] rounded-full border-[3px] border-primary/40 flex items-center justify-center">
                {/* Inner button */}
                <div className="w-14 h-14 rounded-full gradient-camera-btn flex items-center justify-center shadow-elevated">
                  <Camera size={24} className="text-primary-foreground" />
                </div>
              </div>
            </motion.button>
          )}
        </div>
        <div className="w-12" /> {/* spacer */}
      </div>
    </div>
  );
}
