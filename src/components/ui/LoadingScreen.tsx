
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (!isLoading) return;
    
    let interval: ReturnType<typeof setInterval> | null = null;
    
    const startProgress = () => {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (interval) clearInterval(interval);
            return 100;
          }
          return prev + Math.floor(Math.random() * 10) + 1;
        });
      }, 150);
    };
    
    startProgress();
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);
  
  if (!isLoading) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="mb-8"
        >
          <Loader2 size={64} className="text-primary" />
        </motion.div>
        
        <motion.div
          className="mb-2 text-2xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Loading Experience
        </motion.div>
        
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
        
        <motion.p 
          className="mt-2 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {progress}% Complete
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
