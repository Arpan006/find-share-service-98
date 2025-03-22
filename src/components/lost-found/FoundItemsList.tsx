import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Layers, Filter, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import FingerprintVerification from './FingerprintVerification';

// Mock data for found items
const mockFoundItems = [
  {
    id: '1',
    name: 'Blue Notebook',
    description: 'A blue spiral notebook with "Organic Chemistry" written on the cover.',
    location: 'Library',
    dateFound: '2023-06-15',
    image: 'https://images.unsplash.com/photo-1600095077943-9059ad6fde2a?q=80&w=200',
    status: 'available'
  },
  {
    id: '2',
    name: 'Silver Watch',
    description: 'A silver analog watch with a leather strap. Brand appears to be Fossil.',
    location: 'Dining Hall',
    dateFound: '2023-06-10',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=200',
    status: 'available'
  },
  {
    id: '3',
    name: 'USB Drive',
    description: '32GB SanDisk USB drive, black and red in color.',
    location: 'Study Room',
    dateFound: '2023-06-05',
    image: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?q=80&w=200',
    status: 'available'
  },
  {
    id: '4',
    name: 'Water Bottle',
    description: 'Blue hydroflask water bottle with a few stickers on it.',
    location: 'Sports Complex',
    dateFound: '2023-06-01',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=200',
    status: 'available'
  }
];

const locations = [
  'All Locations',
  'Dining Hall',
  'Study Room',
  'Library',
  'Sports Complex',
  'Hostel Block A',
  'Hostel Block B',
  'Cafeteria',
  'Lecture Hall',
  'Lab Complex'
];

const FoundItemsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [showFilters, setShowFilters] = useState(false);
  const [verifyingItemId, setVerifyingItemId] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Filter items based on search term and location
  const filteredItems = mockFoundItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'All Locations' || item.location === selectedLocation;
    
    return matchesSearch && matchesLocation;
  });

  const handleClaimItem = (itemId: string) => {
    setVerifyingItemId(itemId);
  };

  const handleVerificationSuccess = () => {
    toast({
      title: 'Item claimed successfully',
      description: 'Please collect your item from the lost and found desk.',
    });
    setVerifyingItemId(null);
  };

  const handleVerificationCancel = () => {
    setVerifyingItemId(null);
  };

  return (
    <div className="space-y-6">
      {verifyingItemId ? (
        <FingerprintVerification
          itemId={verifyingItemId}
          onSuccess={handleVerificationSuccess}
          onCancel={handleVerificationCancel}
        />
      ) : (
        <>
          <GlassMorphicCard className="mb-8">
            <div className="flex flex-col md:flex-row items-stretch space-y-4 md:space-y-0 md:space-x-4">
              {/* Search bar */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="input-field pl-10 h-full"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Mobile filter toggle */}
              <div className="md:hidden">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={18} className="mr-2" />
                  Filters
                </Button>
              </div>
              
              {/* Desktop filters */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={18} className="text-muted-foreground" />
                  </div>
                  <select
                    className="input-field pl-10 h-full appearance-none pr-8"
                    value={selectedLocation}
                    onChange={e => setSelectedLocation(e.target.value)}
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Mobile filters expandable section */}
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-border md:hidden"
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="mobileLocation" className="block text-sm font-medium text-foreground mb-1">
                      Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin size={18} className="text-muted-foreground" />
                      </div>
                      <select
                        id="mobileLocation"
                        className="input-field pl-10 appearance-none"
                        value={selectedLocation}
                        onChange={e => setSelectedLocation(e.target.value)}
                      >
                        {locations.map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </GlassMorphicCard>
          
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <GlassMorphicCard>
                    <div className="flex flex-col h-full">
                      <div className="relative mb-4 rounded-lg overflow-hidden bg-muted h-48">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute bottom-0 right-0 px-2 py-1 bg-primary text-white text-xs font-medium rounded-tl-lg">
                          Item #{item.id}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                      
                      <div className="mt-auto space-y-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin size={16} className="mr-1 flex-shrink-0" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar size={16} className="mr-1 flex-shrink-0" />
                          <span>Found on {new Date(item.dateFound).toLocaleDateString()}</span>
                        </div>
                        
                        <Button 
                          variant="default" 
                          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 border-none flex items-center justify-center"
                          onClick={() => handleClaimItem(item.id)}
                        >
                          <Fingerprint size={18} className="mr-2" />
                          Claim Item with Fingerprint
                        </Button>
                      </div>
                    </div>
                  </GlassMorphicCard>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Layers size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No items found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FoundItemsList;
