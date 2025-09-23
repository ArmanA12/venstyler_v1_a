import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

export default function SplineVenStyler() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Animation variants for the container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 1.2, 
        ease: 'easeOut',
        staggerChildren: 0.2
      } 
    },
  };

  // Animation variants for each letter with 3D effects
  const letterVariants: Variants = {
    hidden: { 
      opacity: 0, 
      rotateX: 90, 
      rotateY: 45,
      scale: 0.5,
      y: 200,
      z: -100 
    },
    visible: (i: number) => ({
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      y: 0,
      z: 0,
      transition: {
        delay: i * 0.1,
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: 'spring',
        stiffness: 60,
        damping: 15,
      },
    }),
  };

  const text = 'venStyler'.split('');

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="relative px-4 max-w-[1080px] text-center flex flex-col items-center justify-center gap-2 mx-auto pb-2 pointer-events-none -mb-[11%] sm:-mb-[7%] duration-200 ease-in-out perspective-1000"
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Background Glow Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Multiple floating orbs */}
        <motion.div
          animate={{
            opacity: [0, 1, 0.8, 1],
            scale: [0, 1.2, 0.9, 1],
            x: [0, 50, -30, 20, 0],
            y: [0, -40, 30, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0, 1, 0.8, 1],
            scale: [0, 1.2, 0.9, 1],
            x: [0, -30, 40, -10, 0],
            y: [0, 30, -20, 40, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 blur-2xl"
        />
        <motion.div
          animate={{
            opacity: [0, 1, 0.6, 1],
            scale: [0, 1.1, 0.8, 1],
            x: [0, -20, 30, -15, 0],
            y: [0, -30, 20, -25, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: 4,
          }}
          className="absolute top-1/2 left-3/4 w-20 h-20 rounded-full bg-gradient-to-r from-secondary/25 to-accent/25 blur-xl"
        />
      </div>

      {/* Floating Geometric Shapes */}
      <motion.div
        className="absolute inset-0 -z-5"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="absolute top-1/3 left-1/5 w-2 h-2 bg-primary/40 rounded-full animate-pulse" />
        <div className="absolute top-2/3 right-1/5 w-1 h-1 bg-secondary/50 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-accent/40 rounded-full animate-pulse" />
      </motion.div>

      {/* Main 3D Text */}
      <div 
        className="relative z-10 flex justify-center items-center"
        style={{ 
          transformStyle: 'preserve-3d',
        }}
      >
        {text.map((letter, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={letterVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className=" text-[6rem] sm:text-[11rem] md:text-[15rem] lg:text-[15rem] leading-[1] select-none"
            style={{
              color: 'hsl(var(--foreground))',
              letterSpacing: '0.02em',
              fontWeight: 900,
              textTransform: 'lowercase',
              transformStyle: 'preserve-3d',
              filter: 'drop-shadow(0 0 30px hsl(var(--primary) / 0.3))',
              textShadow: `
                0 1px 0 hsl(var(--muted) / 0.8),
                0 2px 0 hsl(var(--muted) / 0.7),
                0 3px 0 hsl(var(--muted) / 0.6),
                0 4px 0 hsl(var(--muted) / 0.5),
                0 5px 0 hsl(var(--muted) / 0.4),
                0 6px 1px hsl(var(--background) / 0.2),
                0 0 20px hsl(var(--primary) / 0.3),
                0 1px 3px hsl(var(--primary) / 0.4),
                0 3px 5px hsl(var(--primary) / 0.2),
                0 10px 20px hsl(var(--primary) / 0.15),
                0 20px 40px hsl(var(--primary) / 0.1)
              `,
              background: `linear-gradient(135deg, 
                hsl(var(--foreground)), 
                hsl(var(--foreground) / 0.8), 
                hsl(var(--primary) / 0.6),
                hsl(var(--foreground))
              )`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            whileHover={{
              scale: 1.05,
              rotateY: 10,
              transition: { duration: 0.3 }
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Animated Underline */}
      <motion.div
        className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mt-4"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { 
          scaleX: 1, 
          opacity: [0, 1, 0.7, 1],
          transition: { 
            delay: 1,
            duration: 2,
            ease: 'easeInOut'
          }
        } : {}}
        style={{
          boxShadow: '0 0 20px hsl(var(--primary) / 0.5)',
        }}
      />

      {/* Background gradient fade */}
      <div className="bg-gradient-to-b from-transparent via-background/50 to-background h-[20%] w-full absolute bottom-0 left-0 z-20 pointer-events-none"></div>
    </motion.div>
  );
}