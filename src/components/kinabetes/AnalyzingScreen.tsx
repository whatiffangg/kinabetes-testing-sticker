import { motion } from 'motion/react';

export default function AnalyzingScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative">
        <div className="w-24 h-24 rounded-full gradient-hero flex items-center justify-center">
          <span className="text-4xl">🔬</span>
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-primary animate-pulse-ring" />
        <div className="absolute inset-0 rounded-full border-2 border-primary animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 text-center">
        <h2 className="text-xl font-bold text-foreground">กำลังวิเคราะห์...</h2>
        <p className="text-sm text-muted-foreground mt-2">AI กำลังอ่านผลแถบตรวจปัสสาวะ</p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6 w-48 h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 3, ease: 'easeInOut' }} className="h-full gradient-primary rounded-full" />
      </motion.div>
    </div>
  );
}
