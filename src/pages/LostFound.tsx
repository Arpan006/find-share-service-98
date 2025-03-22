
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LostItemForm from '@/components/lost-found/LostItemForm';
import FoundItemsList from '@/components/lost-found/FoundItemsList';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Fingerprint } from 'lucide-react';

const LostFound = () => {
  const [activeTab, setActiveTab] = useState('report');
  
  // Scroll animation controls
  const headerRef = useRef(null);
  const inViewHeader = useInView(headerRef, { once: true, amount: 0.3 });
  const animationHeader = useAnimation();
  
  useEffect(() => {
    if (inViewHeader) {
      animationHeader.start('visible');
    }
  }, [inViewHeader, animationHeader]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <section className="mb-12 text-center" ref={headerRef}>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              animate={animationHeader}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Lost & Found</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Report lost items or browse found items to get reunited with your belongings.
                Our system uses AI to match lost and found items, making the recovery process easier.
              </p>
              
              {/* Fingerprint verification feature highlight */}
              <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground">
                <Fingerprint className="text-primary mr-2" size={18} />
                <span>Now with fingerprint verification for secure item claiming</span>
              </div>
            </motion.div>
          </section>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="report" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Report Lost Item
              </TabsTrigger>
              <TabsTrigger value="browse" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Browse Found Items
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="report" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <LostItemForm />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="browse" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <FoundItemsList />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LostFound;
