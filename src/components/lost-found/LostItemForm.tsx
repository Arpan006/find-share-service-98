
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Camera, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';

const locations = [
  'Dining Hall',
  'Study Room',
  'Library',
  'Sports Complex',
  'Hostel Block A',
  'Hostel Block B',
  'Cafeteria',
  'Lecture Hall',
  'Lab Complex',
  'Other'
];

const LostItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!itemName || !description || !location || !date) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success message
    toast({
      title: 'Item reported',
      description: 'Your lost item has been reported successfully. We\'ll notify you if we find a match.',
    });
    
    // Reset form
    setItemName('');
    setDescription('');
    setLocation('');
    setDate('');
    setImage(null);
    setPreview(null);
    setIsSubmitting(false);
  };

  return (
    <GlassMorphicCard className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">Report a Lost Item</h3>
          <p className="text-muted-foreground">
            Fill in the details below to report your lost item. The more details you provide, 
            the better chance we have of finding it.
          </p>
        </div>
        
        <div className="space-y-4">
          {/* Item Name */}
          <div>
            <label htmlFor="itemName" className="block text-sm font-medium text-foreground mb-1">
              Item Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-muted-foreground" />
              </div>
              <input
                id="itemName"
                type="text"
                placeholder="e.g. Blue Notebook"
                className="input-field pl-10"
                value={itemName}
                onChange={e => setItemName(e.target.value)}
                required
              />
            </div>
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
              Description *
            </label>
            <textarea
              id="description"
              placeholder="Describe your item in detail (color, brand, identifying marks, contents, etc.)"
              rows={3}
              className="input-field"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>
          
          {/* Location & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-foreground mb-1">
                Last Seen Location *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-muted-foreground" />
                </div>
                <select
                  id="location"
                  className="input-field pl-10 appearance-none"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a location</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-foreground mb-1">
                Date Lost *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-muted-foreground" />
                </div>
                <input
                  id="date"
                  type="date"
                  className="input-field pl-10"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Upload Image (Optional)
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <label className="relative cursor-pointer bg-background border border-input rounded-lg overflow-hidden hover:bg-muted/50 transition-colors">
                <div className="px-4 py-2 flex items-center space-x-2">
                  <Camera size={18} className="text-primary" />
                  <span className="text-sm font-medium">Upload Photo</span>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  onChange={handleImageChange}
                />
              </label>
              
              {preview && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative w-16 h-16 rounded-md overflow-hidden border border-border"
                >
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-bl-md p-0.5"
                    onClick={() => {
                      setImage(null);
                      setPreview(null);
                    }}
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Adding a photo increases the chances of finding your item.
            </p>
          </div>
        </div>
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full py-6 shadow-md bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 border-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Report Lost Item'
            )}
          </Button>
        </div>
      </form>
    </GlassMorphicCard>
  );
};

export default LostItemForm;
