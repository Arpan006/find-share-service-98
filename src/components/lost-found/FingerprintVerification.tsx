
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';

interface FingerprintVerificationProps {
  onSuccess: () => void;
  onCancel: () => void;
  itemId: string;
}

const FingerprintVerification = ({ onSuccess, onCancel, itemId }: FingerprintVerificationProps) => {
  const [verificationState, setVerificationState] = useState<'idle' | 'scanning' | 'processing' | 'success' | 'failure'>('idle');
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  
  const startScan = () => {
    setVerificationState('scanning');
    
    // Simulate connecting to fingerprint hardware
    toast({
      title: 'Connecting to fingerprint scanner',
      description: 'Please wait while we connect to the hardware device',
    });
    
    // Simulate scanning progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setVerificationState('processing');
        processFingerprint();
      }
    }, 150);
  };
  
  const processFingerprint = () => {
    // Simulate fingerprint AI processing
    toast({
      title: 'Processing fingerprint',
      description: 'Our AI is analyzing your fingerprint pattern',
    });
    
    setTimeout(() => {
      // Simulate a match with 70% probability of success
      const isMatch = Math.random() < 0.7;
      
      if (isMatch) {
        setVerificationState('success');
        toast({
          title: 'Verification successful',
          description: 'Your fingerprint has been verified. You can claim the item.',
          variant: 'default',
        });
        // Wait a moment before calling onSuccess to show the success state
        setTimeout(() => onSuccess(), 1500);
      } else {
        setVerificationState('failure');
        toast({
          title: 'Verification failed',
          description: 'Your fingerprint doesn\'t match our records for this item.',
          variant: 'destructive',
        });
      }
    }, 2000);
  };
  
  // Cleanup function when component unmounts
  useEffect(() => {
    return () => {
      // Code to disconnect from hardware device would go here
    };
  }, []);
  
  return (
    <GlassMorphicCard className="max-w-sm mx-auto">
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <h3 className="text-xl font-bold mb-4">Fingerprint Verification</h3>
        
        {verificationState === 'idle' && (
          <>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-muted rounded-full p-8 mb-6"
            >
              <Fingerprint size={80} className="text-primary" />
            </motion.div>
            <p className="text-muted-foreground mb-6">
              Please place your finger on the scanner to verify your identity and claim this item.
            </p>
            <div className="flex space-x-4 w-full">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 border-none"
                onClick={startScan}
              >
                Start Scan
              </Button>
            </div>
          </>
        )}
        
        {verificationState === 'scanning' && (
          <>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="bg-muted/50 rounded-full p-8 mb-6 relative"
            >
              <Fingerprint size={80} className="text-primary" />
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            </motion.div>
            <div className="w-full h-2 bg-muted rounded-full mb-6 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-muted-foreground">
              Scanning your fingerprint... Please keep your finger on the scanner.
            </p>
          </>
        )}
        
        {verificationState === 'processing' && (
          <>
            <motion.div
              className="bg-muted/50 rounded-full p-8 mb-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              >
                <Loader2 size={80} className="text-primary" />
              </motion.div>
            </motion.div>
            <p className="text-muted-foreground">
              Processing your fingerprint data...
            </p>
          </>
        )}
        
        {verificationState === 'success' && (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-100 dark:bg-green-900/20 rounded-full p-8 mb-6"
            >
              <CheckCircle size={80} className="text-green-500" />
            </motion.div>
            <p className="text-muted-foreground">
              Verification successful! You can claim this item.
            </p>
          </>
        )}
        
        {verificationState === 'failure' && (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-red-100 dark:bg-red-900/20 rounded-full p-8 mb-6"
            >
              <XCircle size={80} className="text-red-500" />
            </motion.div>
            <p className="text-muted-foreground mb-6">
              Verification failed. Your fingerprint doesn't match our records for this item.
            </p>
            <div className="flex space-x-4 w-full">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={startScan}
              >
                Try Again
              </Button>
            </div>
          </>
        )}
      </div>
    </GlassMorphicCard>
  );
};

export default FingerprintVerification;
