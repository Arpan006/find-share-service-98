
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, CheckCircle, XCircle, Loader2, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface FingerprintVerificationProps {
  onSuccess: () => void;
  onCancel: () => void;
  itemId: string;
}

interface FingerprintResult {
  success: boolean;
  message: string;
}

// Extend the Window interface to include our custom property
declare global {
  interface Window {
    android?: {
      authenticateFingerprint?: () => string;
    };
    webkit?: {
      messageHandlers?: {
        fingerprintAuth?: {
          postMessage: (message: string) => void;
        };
      };
    };
    handleFingerprintResult?: (resultJson: string) => void;
  }
}

const FingerprintVerification = ({ onSuccess, onCancel, itemId }: FingerprintVerificationProps) => {
  const [verificationState, setVerificationState] = useState<'idle' | 'scanning' | 'processing' | 'success' | 'failure'>('idle');
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const { isMobile, isAndroid } = useIsMobile();
  
  const isNativeFingerprintAvailable = () => {
    return (
      (isAndroid && window.android && typeof window.android.authenticateFingerprint === 'function') ||
      (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.fingerprintAuth)
    );
  };

  const startNativeFingerprint = () => {
    setVerificationState('scanning');
    
    toast({
      title: 'Accessing fingerprint scanner',
      description: 'Please wait while we access your device hardware',
    });

    if (isAndroid && window.android && window.android.authenticateFingerprint) {
      try {
        const resultJson = window.android.authenticateFingerprint();
        handleNativeFingerprintResult(JSON.parse(resultJson));
      } catch (error) {
        console.error('Native fingerprint error:', error);
        setVerificationState('failure');
        toast({
          title: 'Fingerprint verification failed',
          description: 'There was an error accessing your device fingerprint scanner. Please try again.',
          variant: 'destructive',
        });
      }
    } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.fingerprintAuth) {
      window.webkit.messageHandlers.fingerprintAuth.postMessage('authenticate');
      
      window.handleFingerprintResult = (resultJson: string) => {
        const result = JSON.parse(resultJson);
        handleNativeFingerprintResult(result);
      };
    } else {
      simulateFingerprintScan();
    }
  };

  const handleNativeFingerprintResult = (result: FingerprintResult) => {
    setProgress(100);
    setVerificationState('processing');
    
    setTimeout(() => {
      if (result.success) {
        setVerificationState('success');
        toast({
          title: 'Verification successful',
          description: 'Your fingerprint has been verified. You can claim the item.',
          variant: 'default',
        });
        setTimeout(() => onSuccess(), 1500);
      } else {
        setVerificationState('failure');
        toast({
          title: 'Verification failed',
          description: result.message || 'Your fingerprint doesn\'t match our records for this item.',
          variant: 'destructive',
        });
      }
    }, 1000);
  };

  const simulateFingerprintScan = () => {
    toast({
      title: 'Connecting to fingerprint scanner',
      description: 'Please wait while we connect to the hardware device',
    });
    
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

  const startScan = () => {
    if (isNativeFingerprintAvailable()) {
      startNativeFingerprint();
    } else {
      simulateFingerprintScan();
    }
  };

  const processFingerprint = () => {
    toast({
      title: 'Processing fingerprint',
      description: 'Our AI is analyzing your fingerprint pattern',
    });
    
    setTimeout(() => {
      const isMatch = Math.random() < 0.7;
      
      if (isMatch) {
        setVerificationState('success');
        toast({
          title: 'Verification successful',
          description: 'Your fingerprint has been verified. You can claim the item.',
          variant: 'default',
        });
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

  useEffect(() => {
    return () => {
      if (window.handleFingerprintResult) {
        delete window.handleFingerprintResult;
      }
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
              {isNativeFingerprintAvailable() ? (
                <Smartphone size={80} className="text-primary" />
              ) : (
                <Fingerprint size={80} className="text-primary" />
              )}
            </motion.div>
            <p className="text-muted-foreground mb-6">
              {isNativeFingerprintAvailable() 
                ? "Please scan your fingerprint on your device's sensor to verify your identity and claim this item."
                : "Please place your finger on the scanner to verify your identity and claim this item."}
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
