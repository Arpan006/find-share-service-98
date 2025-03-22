
import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const AmbientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create particles
    const particleCount = 50;
    const particles: {x: number; y: number; radius: number; color: string; xSpeed: number; ySpeed: number}[] = [];
    
    // Determine color palette based on theme
    const colorPalette = theme === 'dark' 
      ? ['rgba(0, 119, 182, 0.15)', 'rgba(42, 157, 143, 0.15)', 'rgba(233, 196, 106, 0.15)']
      : ['rgba(0, 119, 182, 0.08)', 'rgba(42, 157, 143, 0.08)', 'rgba(233, 196, 106, 0.08)'];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 50 + 20,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        xSpeed: Math.random() * 0.2 - 0.1,
        ySpeed: Math.random() * 0.2 - 0.1
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.xSpeed;
        particle.y += particle.ySpeed;
        
        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.xSpeed *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.ySpeed *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 -z-10 w-full h-full pointer-events-none"
    />
  );
};

export default AmbientBackground;
