
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Wrench, Bell, Settings, LogOut, User, Heart, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock data for dashboard activity
const activityData = [
  {
    id: 1,
    type: 'lost',
    title: 'Blue Water Bottle',
    status: 'pending',
    date: '2023-06-15T10:30:00',
    icon: <Search className="text-blue-500" />
  },
  {
    id: 2,
    type: 'marketplace',
    title: 'Physics Textbook',
    status: 'active',
    date: '2023-06-14T15:45:00',
    icon: <ShoppingBag className="text-green-500" />
  },
  {
    id: 3,
    type: 'service',
    title: 'AC Repair',
    status: 'completed',
    date: '2023-06-10T09:15:00',
    icon: <Wrench className="text-primary" />
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'student',
    roomNumber: 'A-101',
    greenPoints: 25,
    joinDate: '2023-05-01T00:00:00'
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <section className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome, {user.name}</h1>
              <p className="text-muted-foreground">
                Manage your lost items, marketplace listings, and service bookings all in one place.
              </p>
            </motion.div>
          </section>
          
          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <GlassMorphicCard>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                      <span className="font-bold text-white text-xl">{user.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold">{user.name}</h2>
                      <p className="text-muted-foreground text-sm">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mt-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Role:</span>
                      <span className="font-medium">{user.role === 'student' ? 'Student' : 'Staff'}</span>
                    </div>
                    {user.role === 'student' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-sm">Room Number:</span>
                          <span className="font-medium">{user.roomNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-sm">Green Points:</span>
                          <span className="font-medium text-green-500">{user.greenPoints} points</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Joined:</span>
                      <span className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center"
                    >
                      <Settings size={16} className="mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </GlassMorphicCard>
              
              {/* Navigation */}
              <GlassMorphicCard>
                <div className="p-2">
                  <button
                    className={`w-full flex items-center p-3 rounded-lg text-sm font-medium mb-1 ${
                      activeTab === 'overview' 
                        ? 'bg-primary text-white' 
                        : 'text-foreground hover:bg-muted/50'
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    <Activity size={18} className="mr-3" />
                    Overview
                  </button>
                  <button
                    className={`w-full flex items-center p-3 rounded-lg text-sm font-medium mb-1 ${
                      activeTab === 'lost-found' 
                        ? 'bg-primary text-white' 
                        : 'text-foreground hover:bg-muted/50'
                    }`}
                    onClick={() => setActiveTab('lost-found')}
                  >
                    <Search size={18} className="mr-3" />
                    My Lost Items
                  </button>
                  <button
                    className={`w-full flex items-center p-3 rounded-lg text-sm font-medium mb-1 ${
                      activeTab === 'marketplace' 
                        ? 'bg-primary text-white' 
                        : 'text-foreground hover:bg-muted/50'
                    }`}
                    onClick={() => setActiveTab('marketplace')}
                  >
                    <ShoppingBag size={18} className="mr-3" />
                    My Listings
                  </button>
                  <button
                    className={`w-full flex items-center p-3 rounded-lg text-sm font-medium mb-1 ${
                      activeTab === 'services' 
                        ? 'bg-primary text-white' 
                        : 'text-foreground hover:bg-muted/50'
                    }`}
                    onClick={() => setActiveTab('services')}
                  >
                    <Tool size={18} className="mr-3" />
                    My Service Bookings
                  </button>
                  <button
                    className={`w-full flex items-center p-3 rounded-lg text-sm font-medium mb-1 ${
                      activeTab === 'notifications' 
                        ? 'bg-primary text-white' 
                        : 'text-foreground hover:bg-muted/50'
                    }`}
                    onClick={() => setActiveTab('notifications')}
                  >
                    <Bell size={18} className="mr-3" />
                    Notifications
                  </button>
                  <button
                    className={`w-full flex items-center p-3 rounded-lg text-sm font-medium ${
                      activeTab === 'profile' 
                        ? 'bg-primary text-white' 
                        : 'text-foreground hover:bg-muted/50'
                    }`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User size={18} className="mr-3" />
                    Profile Settings
                  </button>
                </div>
              </GlassMorphicCard>
              
              {/* Logout */}
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Activity Overview */}
              <GlassMorphicCard>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Recent Activity</h2>
                    <Button variant="ghost" size="sm">View All</Button>
                  </div>
                  
                  <div className="space-y-4">
                    {activityData.map(activity => (
                      <div 
                        key={activity.id}
                        className="flex items-start p-3 rounded-lg hover:bg-muted/30 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shadow-sm">
                          {activity.icon}
                        </div>
                        <div className="ml-4 flex-grow">
                          <div className="flex justify-between">
                            <h3 className="text-base font-medium">{activity.title}</h3>
                            <span className="text-xs text-muted-foreground">
                              {new Date(activity.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {activity.type === 'lost' && 'You reported this item as lost.'}
                            {activity.type === 'marketplace' && 'Your listing is active in the marketplace.'}
                            {activity.type === 'service' && 'Your service booking has been completed.'}
                          </p>
                          <div className="flex mt-1">
                            <span 
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                activity.status === 'pending' 
                                  ? 'bg-orange-100 text-orange-600'
                                  : activity.status === 'active'
                                    ? 'bg-blue-100 text-blue-600' 
                                    : 'bg-green-100 text-green-600'
                              }`}
                            >
                              {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassMorphicCard>
              
              {/* Green Points Card */}
              {user.role === 'student' && (
                <GlassMorphicCard>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Green Points</h2>
                      <div className="flex items-center">
                        <Heart size={18} className="text-green-500 mr-1" />
                        <span className="font-bold text-green-500">{user.greenPoints} points</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress to next reward</span>
                        <span>{user.greenPoints}/50 points</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" 
                          style={{ width: `${Math.min(user.greenPoints / 50 * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      You're {50 - user.greenPoints} points away from earning a free laundry service voucher!
                    </p>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                      <h3 className="font-medium text-green-600 dark:text-green-400 mb-2">
                        How to earn more points
                      </h3>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Donate or exchange items in the marketplace (+10 points)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Return found items to their owners (+15 points)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Leave helpful reviews for service providers (+5 points)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </GlassMorphicCard>
              )}
              
              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button 
                  className="py-8 h-auto bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none"
                >
                  <div className="flex flex-col items-center">
                    <Search size={24} className="mb-2" />
                    <span>Report Lost Item</span>
                  </div>
                </Button>
                <Button 
                  className="py-8 h-auto bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-none"
                >
                  <div className="flex flex-col items-center">
                    <ShoppingBag size={24} className="mb-2" />
                    <span>List an Item</span>
                  </div>
                </Button>
                <Button 
                  className="py-8 h-auto bg-gradient-to-br from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 border-none"
                >
                  <div className="flex flex-col items-center">
                    <Tool size={24} className="mb-2" />
                    <span>Book a Service</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
