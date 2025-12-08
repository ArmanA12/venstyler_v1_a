

import React, { useState, useEffect, useRef, memo } from 'react';

import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  useVelocity,
  animate,
  AnimatePresence,
  Variants,
  useInView
} from 'framer-motion';
import {
  Menu, X, Search, Bell, User,
  Play, ArrowRight, Activity, Cpu, Layers,
  UserPlus, Calendar, Scissors, Palette, CheckCircle,
  PenTool, Star, Zap, Droplet, MessageSquare, Share2, Clock, CheckCircle2, Globe, FileText, ShieldCheck,
  Heart, Bookmark, Phone,
  Shield, Lock, Scan,
  Eye,
  MessageCircle,
  ArrowUpRight
} from 'lucide-react';

// --- UTILITIES & UI COMPONENTS ---

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const icons = [Heart, Share2, Bookmark, Eye];
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest('button, a, input, [role="button"], .cursor-hover');
      setIsHovering(isInteractive);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.5 : 1,
          backgroundColor: isHovering ? 'white' : 'transparent',
        }}
        transition={{ scale: { duration: 0.2 } }}
      />
    </>
  );
};

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 100) setTimeout(onComplete, 1000);
  }, [count, onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] bg-[#000] flex flex-col items-center justify-center text-white overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[12vw] md:text-[8rem] font-bold leading-none tracking-tighter mix-blend-difference">
          VENSTYLER
        </motion.div>
        <div className="mt-8 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-gray-500">
          <span>System Initialization</span>
          <div className="w-32 h-px bg-gray-800 overflow-hidden relative">
            <motion.div className="h-full bg-pink-500 absolute top-0 left-0" style={{ width: `${count}%` }} />
          </div>
          <span className="text-white w-8 text-right">{count}%</span>
        </div>
      </div>
    </motion.div>
  );
};

const MagneticButton = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.button>
  );
};

// --- SECTIONS ---

const navLinks = [
  { label: 'Designers', path: '/find-designers' },
  { label: 'Designs', path: '/designs' },
  { label: 'Explore', path: '/explore' },
];

const Navbar: React.FC = memo(() => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY;
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
    setLastScrollY(latest);
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/5 ${isScrolled ? 'bg-black/80 backdrop-blur-lg py-4 shadow-lg' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 z-50 cursor-pointer group">
          <div className="w-8 h-8 bg-pink-600 flex items-center justify-center font-bold text-black text-xl group-hover:rotate-180 transition-transform duration-500">V</div>
          <span className="text-2xl font-bold tracking-tighter uppercase group-hover:tracking-widest transition-all duration-300">Venstyler</span>
        </Link>
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map(item => (
            <Link key={item.label} to={item.path} className="text-sm font-bold uppercase tracking-widest hover:text-pink-500 transition-colors">{item.label}</Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/explore" className="relative group">
            <input type="text" placeholder="SEARCH" className="bg-transparent border-b border-white/20 px-2 py-1 w-32 text-[10px] uppercase focus:border-pink-500 focus:outline-none transition-all placeholder:text-gray-600 focus:w-48 font-mono cursor-pointer" readOnly />
            <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 group-hover:text-pink-500 transition-colors" />
          </Link>
          <Link to="/profile" className="hover:text-pink-500 transition-colors relative group"><Bell className="w-5 h-5" /><span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full scale-0 group-hover:scale-100 transition-transform" /></Link>
          <Link to="/profile" className="hover:text-pink-500 transition-colors"><User className="w-5 h-5" /></Link>
          <Link to="/signup" className="relative px-6 py-2 overflow-hidden group border border-white/20">
            <span className="relative z-10 text-xs uppercase tracking-widest font-bold group-hover:text-black transition-colors duration-300">Start Creating</span>
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
          </Link>
        </div>
        <button className="md:hidden z-50" onClick={() => setIsMobileOpen(!isMobileOpen)}>{isMobileOpen ? <X /> : <Menu />}</button>
      </div>
    </motion.nav>
  );
});

const ParticleRing: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vs = `attribute vec3 position; attribute float size; uniform float u_time; uniform vec2 u_mouse; uniform vec2 u_resolution; varying float v_depth; void main() { vec3 pos = position; float ax = u_mouse.y * 2.0; float ay = u_mouse.x * 2.0; float t = u_time * 0.2; ay += t; mat3 rotX = mat3(1.0, 0.0, 0.0, 0.0, cos(ax), -sin(ax), 0.0, sin(ax), cos(ax)); mat3 rotY = mat3(cos(ay), 0.0, sin(ay), 0.0, 1.0, 0.0, -sin(ay), 0.0, cos(ay)); pos = rotY * rotX * pos; float fov = 1.5; float scale = fov / (fov + pos.z * 0.5); vec2 projected = pos.xy * scale; float aspect = u_resolution.x / u_resolution.y; projected.x /= aspect; gl_Position = vec4(projected, pos.z * 0.1, 1.0); gl_PointSize = size * scale * (u_resolution.y * 0.002); v_depth = scale; }`;
    const fs = `precision mediump float; varying float v_depth; void main() { vec2 coord = gl_PointCoord - vec2(0.5); float dist = length(coord); if (dist > 0.5) discard; float alpha = 1.0 - smoothstep(0.3, 0.5, dist); vec3 colorA = vec3(1.0, 0.2, 0.6); vec3 colorB = vec3(0.4, 0.6, 1.0); vec3 color = mix(colorB, colorA, v_depth * 0.8); gl_FragColor = vec4(color, alpha * v_depth * 0.8); }`;

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
      return shader;
    };
    const program = gl.createProgram();
    const vShader = createShader(gl, gl.VERTEX_SHADER, vs);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, fs);
    if (!program || !vShader || !fShader) return;
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const count = 4000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.3 + Math.random() * 0.7;
      const spiralOffset = radius * 3.0;
      positions[i * 3] = radius * Math.cos(angle + spiralOffset);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
      positions[i * 3 + 2] = radius * Math.sin(angle + spiralOffset);
      sizes[i] = 2.0 + Math.random() * 10.0;
    }
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
    const sizeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
    const sizeLoc = gl.getAttribLocation(program, 'size');
    gl.enableVertexAttribArray(sizeLoc);
    gl.vertexAttribPointer(sizeLoc, 1, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');

    let frameId: number;
    let targetMouseX = 0, targetMouseY = 0, currentMouseX = 0, currentMouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1; targetMouseX *= 0.5;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1; targetMouseY *= 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    const start = performance.now();
    const render = () => {
      currentMouseX += (targetMouseX - currentMouseX) * 0.02;
      currentMouseY += (targetMouseY - currentMouseY) * 0.02;
      gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.clearColor(0.0, 0.0, 0.0, 0.0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timeLoc, (performance.now() - start) * 0.001);
      gl.uniform2f(mouseLoc, currentMouseX, currentMouseY);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.POINTS, 0, count);
      frameId = requestAnimationFrame(render);
    };
    const resize = () => {
      canvas.width = window.innerWidth * Math.min(window.devicePixelRatio, 2);
      canvas.height = window.innerHeight * Math.min(window.devicePixelRatio, 2);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize(); render();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

const Hero: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  useEffect(() => {
    const handleMove = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  const background = useTransform([mouseX, mouseY], ([x, y]) => `radial-gradient(600px at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`);
  const letterContainer: Variants = { hidden: { opacity: 0 }, visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 * i } }) };
  const letterChild: Variants = { visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", damping: 12, stiffness: 200 } }, hidden: { opacity: 0, y: 20, filter: "blur(5px)" } };

  return (
    <section className="relative h-screen bg-[#030303] overflow-hidden flex flex-col justify-center">
      <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ background }} />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-black z-0 pointer-events-none" />
      <div className="absolute inset-0 z-10"><ParticleRing /></div>
      <div className="absolute inset-0 z-20 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="container mx-auto px-6 relative z-30 h-full flex flex-col justify-between py-24 md:py-12">
        <div className="mt-12 md:mt-24">
          <div className="relative">
            <div className="flex items-center gap-3 mb-4"><span className="h-px w-12 bg-pink-500"></span><span className="text-pink-500 font-mono text-xs uppercase tracking-widest">System Online</span></div>
            <motion.div className="flex overflow-hidden text-[12vw] md:text-[8rem] leading-[0.8] font-bold tracking-tighter text-white pb-2" variants={letterContainer} initial="hidden" animate="visible">
              {Array.from("DIGITAL").map((char, index) => (<motion.span key={index} variants={letterChild}>{char}</motion.span>))}
            </motion.div>
            <p className="ml-2 text-gray-400 font-mono text-xs md:text-sm max-w-xs mt-4 leading-relaxed border-l border-gray-800 pl-4">Redefining the boundaries of fashion management through advanced algorithms and artisanal connection.</p>
          </div>
        </div>
        <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden md:flex flex-col gap-4 items-end pointer-events-none">
          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono uppercase tracking-widest"><Activity className="w-3 h-3 text-pink-500" /> Neural Link</div>
          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono uppercase tracking-widest"><Cpu className="w-3 h-3 text-blue-500" /> Processing</div>
          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono uppercase tracking-widest"><Layers className="w-3 h-3 text-purple-500" /> 3D Spatial</div>
        </div>
        <div className="flex flex-col items-end text-right mb-12">
          <div>
            <motion.div className="flex justify-end overflow-hidden text-[10vw] md:text-[7rem] leading-[0.8] font-serif italic text-white tracking-tight" variants={letterContainer} initial="hidden" animate="visible" custom={2}>
              {Array.from("CRAFTSMANSHIP").map((char, index) => (<motion.span key={index} variants={letterChild}>{char}</motion.span>))}
            </motion.div>
            <div className="flex flex-row-reverse items-center gap-6 mt-8">
              <MagneticButton className="group relative bg-white text-black px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold overflow-hidden transition-all hover:bg-pink-500 hover:text-white"><span className="relative z-10 flex items-center gap-2">Enter Atelier <ArrowRight className="w-4 h-4" /></span></MagneticButton>
              <MagneticButton className="flex items-center gap-3 text-white px-6 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:text-pink-400 transition-colors group border border-white/10 hover:border-pink-500/50 bg-transparent"><span className="flex items-center gap-2"><Play className="w-3 h-3 fill-current" /> Showreel</span></MagneticButton>
            </div>
          </div>
        </div>
      </div>
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30">
        <span className="text-[9px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
        <div className="w-[1px] h-12 bg-white/10 overflow-hidden"><motion.div animate={{ y: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-full h-1/2 bg-pink-500" /></div>
      </motion.div>
    </section>
  );
};

const ScrambleCounter = ({ value, className }: { value: string, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const [display, setDisplay] = useState("0");
  const chars = "0123456789ABCDEF!@#$%&";
  useEffect(() => {
    if (!isInView) return;
    const duration = 2000; const steps = 30; const intervalTime = duration / steps; let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++; const progress = currentStep / steps;
      if (progress >= 1) { setDisplay(value); clearInterval(timer); }
      else {
        const revealIndex = Math.floor(progress * value.length);
        let result = "";
        for (let i = 0; i < value.length; i++) { if (i <= revealIndex) result += value[i]; else result += chars[Math.floor(Math.random() * chars.length)]; }
        setDisplay(result);
      }
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isInView, value]);
  return <span ref={ref} className={`${className} font-mono`}>{display}</span>;
};

const Stats: React.FC = () => {
  const stats = [{ value: "1.2K+", label: "Elite Designers", sub: "Curated Talent" }, { value: "5.0K+", label: "Satisfied Clients", sub: "Global Reach" }, { value: "10K+", label: "Designs Crafted", sub: "Unique Pieces" }, { value: "99.9%", label: "Success Rate", sub: "Quality Assured" }];
  return (
    <div className="border-y border-white/10 bg-black relative z-20 overflow-hidden">
      <div className="absolute inset-0 z-[1] opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }} className="py-16 px-6 text-center group hover:bg-white/5 transition-colors cursor-default relative">
              <div className="relative inline-block">
                <h3 className="text-4xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 group-hover:to-pink-400 transition-all font-sans tracking-tight"><ScrambleCounter value={stat.value} /></h3>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-500 ease-out"></div>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-white mb-2 mt-2">{stat.label}</p>
              <p className="text-[10px] text-gray-500 font-mono uppercase">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Process: React.FC = () => {
  const steps = [{ id: '01', title: 'Place Order', desc: 'Connect with elite designers & pay 40% upfront', icon: UserPlus }, { id: '02', title: 'Schedule Meeting', desc: 'Book exclusive consultation with your designer', icon: Calendar }, { id: '03', title: 'Precision', desc: 'Perfect fitting with expert measurements', icon: Scissors }, { id: '04', title: 'Design Progress', desc: 'Watch your dream design come to life', icon: Palette }, { id: '05', title: 'Delivery', desc: 'Receive masterpiece & pay remaining 60%', icon: CheckCircle }];
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [activeStep, setActiveStep] = useState(-1);
  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => { const interval = setInterval(() => { setActiveStep((prev) => { if (prev >= steps.length - 1) { clearInterval(interval); return prev; } return prev + 1; }); }, 800); return () => clearInterval(interval); }, 500); return () => clearTimeout(timeout);
    }
  }, [isInView]);
  return (
    <section ref={containerRef} className="py-32 relative bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-xs font-mono text-pink-500 uppercase tracking-widest mb-4 block">Engineered Excellence</motion.span>
          <h2 className="text-5xl md:text-7xl serif italic mb-6">Seamless Order Experience</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">A meticulously crafted journey from initial concept to final masterpiece.</p>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="hidden md:block absolute top-[64px] left-[10%] right-[10%] h-px bg-white/5 z-0" />
          <div className="hidden md:block absolute top-[64px] left-[10%] h-px bg-gradient-to-r from-pink-900 via-pink-500 to-pink-400 z-0 shadow-[0_0_15px_#ec4899] transition-all duration-700 ease-in-out" style={{ width: `${Math.max(0, Math.min((activeStep / (steps.length - 1)) * 80, 80))}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_#fff,0_0_30px_#ec4899] z-20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step, idx) => {
              const isActive = idx <= activeStep;
              return (
                <div key={idx} className="relative z-10 flex flex-col items-center group">
                  <div className="relative w-32 h-32 mb-8 flex flex-col items-center justify-center bg-[#050505]">
                    <div className="absolute inset-0 border border-white/10 opacity-30" />
                    <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                      <motion.path d="M 0 64 L 0 4 Q 0 0 4 0 L 124 0 Q 128 0 128 4 L 128 124 Q 128 128 124 128 L 4 128 Q 0 128 0 124 L 0 64" fill="none" stroke="#ec4899" strokeWidth="2" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0 }} style={{ filter: "drop-shadow(0 0 4px #ec4899)" }} />
                    </svg>
                    <step.icon className={`w-8 h-8 mb-3 transition-all duration-700 relative z-10 ${isActive ? 'text-pink-500 scale-110 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'text-gray-600 scale-100'}`} />
                    <span className={`text-[10px] font-mono border px-2 py-0.5 transition-colors duration-700 relative z-10 ${isActive ? 'border-pink-500 text-pink-500 bg-pink-500/10' : 'border-white/10 text-gray-600'}`}>{step.id}</span>
                    <div className={`md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 translate-y-full transition-colors duration-700 ${isActive ? 'bg-pink-500' : 'bg-white/10'}`} />
                  </div>
                  <div className={`text-center transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2'}`}>
                    <h3 className={`text-lg font-bold uppercase tracking-wide mb-3 transition-colors ${isActive ? 'text-white' : 'text-gray-500'}`}>{step.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const Showcase: React.FC = () => {
  const images = [
    "https://i.pinimg.com/1200x/83/3f/6a/833f6afcff34c6bacb5637dead11bb06.jpg",
    "https://i.pinimg.com/1200x/24/fc/66/24fc667f93ec1cc3fdb49e069790b9a8.jpg",
    "https://i.pinimg.com/1200x/21/d3/d5/21d3d5fe5f53d4280e7590c9f7cf79d4.jpg",
    "https://i.pinimg.com/1200x/ca/87/e3/ca87e33af6f384499b2b9d2c93963cd1.jpg",
    "https://i.pinimg.com/1200x/27/53/0f/27530f8ea31f28f58fa3a34d0fa46701.jpg",
    "https://i.pinimg.com/1200x/b4/7f/ae/b47fae93801b46971ab8b77a40c34d32.jpg",
    "https://i.pinimg.com/1200x/20/b5/d4/20b5d48ffa33bfebd7b7e33b9a4b5d22.jpg",
    "https://i.pinimg.com/1200x/f7/67/4f/f7674f6f3f232b3b01765f81cebbe706.jpg",
    "https://i.pinimg.com/1200x/e0/e3/cb/e0e3cbecd18fe0c8884bd6b796a6f5ad.jpg",
    "https://i.pinimg.com/1200x/ab/3f/3f/ab3f3f66410d7b2301ddcb4396280e2f.jpg",
    "https://i.pinimg.com/1200x/b1/08/85/b108854cb720c565fc1e8d7c76e74256.jpg",
    "https://i.pinimg.com/1200x/75/f5/80/75f580f90ad4d8e3261e043a34248951.jpg",
    "https://i.pinimg.com/1200x/07/d1/a5/07d1a57ec8231eff589181c1f7f0f7b9.jpg",
    "https://i.pinimg.com/1200x/1e/ce/23/1ece232f6fadeec6109262133e06e96c.jpg",
    "https://i.pinimg.com/1200x/ce/08/00/ce0800d60cfe8f0b3f26cd50aa5b4198.jpg",
    "https://i.pinimg.com/1200x/4d/4f/0e/4d4f0e9ad8a9a195a018071be4101925.jpg",
    "https://i.pinimg.com/1200x/56/43/fd/5643fd8114815d97900916ec3362e0b3.jpg",
    "https://i.pinimg.com/1200x/92/f2/d2/92f2d254933808a59149478ddf776f4d.jpg",
    "https://i.pinimg.com/1200x/f1/48/d6/f148d6b8d66c0934514508e2e8d253d6.jpg",
    "https://i.pinimg.com/1200x/f1/48/d6/f148d6b8d66c0934514508e2e8d253d6.jpg"
  ];

  // const images = ["https://picsum.photos/id/435/600/800", "https://picsum.photos/id/338/600/800", "https://picsum.photos/id/449/600/800", "https://picsum.photos/id/656/600/800", "https://picsum.photos/id/823/600/800", "https://picsum.photos/id/64/600/800", "https://picsum.photos/id/103/600/800"];
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-60%"]);
  const scrollVelocity = useVelocity(scrollYProgress);
  const skewVelocity = useSpring(scrollVelocity, { stiffness: 100, damping: 30 });
  const skewX = useTransform(skewVelocity, [-1, 1], [30, -30]);

  return (
    <section ref={targetRef} className="bg-[#030303] relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        <div className="container mx-auto px-6 mb-12 text-center z-10 pt-8 h-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-pink-500 font-mono text-[10px] uppercase tracking-[0.3em] border border-pink-500/20 px-4 py-2 rounded-full">Curated Excellence</span>
            <h2 className="text-6xl md:text-8xl serif italic mt-6 mb-4 text-white tracking-tighter mix-blend-difference">Showcase</h2>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-500 to-transparent mx-auto" />
          </motion.div>
        </div>
        <motion.div style={{ x }} className="flex gap-8 pl-[5vw] z-20 items-center mt-24">
          {images.map((src, i) => (
            <motion.div key={i} style={{ skewX }}>
              <div className="relative w-[300px] h-[450px] md:w-[450px] md:h-[600px] flex-shrink-0 group overflow-hidden border border-white/10 bg-[#050505]">
                <div className="absolute inset-0 bg-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                <motion.img src={src} alt={`Fashion ${i}`} loading="lazy" decoding="async" className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform" whileHover={{ scale: 1.1 }} />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent -z-10" />
                  <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-2"><span className="text-3xl font-serif italic text-white">No. {i + 1}</span><span className="text-[10px] font-mono text-pink-500 uppercase tracking-widest">Collection 2025</span></div>
                  <p className="text-gray-400 text-xs font-light tracking-wide">Hand-embroidered silk details with modern cuts.</p>
                </div>
                <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Features: React.FC = () => {
  const tabs = [{ id: 'network', label: 'The Network', sub: '10k+ Artisans', desc: 'Access a curated ecosystem of elite talent.', icon: Globe }, { id: 'studio', label: 'Live Studio', sub: 'Real-time Collab', desc: 'Seamless communication and file sharing tools.', icon: MessageSquare }, { id: 'workflow', label: 'Workflow', sub: 'Automated Sync', desc: 'Track milestones and secure payments.', icon: Zap }];
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => { const interval = setInterval(() => { setActiveTab(prev => (prev + 1) % tabs.length); }, 6000); return () => clearInterval(interval); }, []);

  const Scanline = memo(() => (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden"><div className="w-full h-[2px] bg-pink-500/20 blur-[1px] absolute top-0 animate-scanline will-change-transform" /><div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] pointer-events-none" /><style>{`@keyframes scanline { 0% { transform: translateY(-100%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(1000%); opacity: 0; } } .animate-scanline { animation: scanline 4s linear infinite; }`}</style></div>
  ));

  const NetworkView = memo(() => (<div className="grid grid-cols-2 gap-4 h-full p-8 relative"><Scanline />{[{ icon: PenTool, count: "1100+", label: "Designers", color: "text-pink-500", border: "border-pink-500/20" }, { icon: Star, count: "900+", label: "Specialists", color: "text-purple-500", border: "border-purple-500/20" }, { icon: Zap, count: "800+", label: "Technicians", color: "text-blue-500", border: "border-blue-500/20" }, { icon: Droplet, count: "200+", label: "Masters", color: "text-green-500", border: "border-green-500/20" }].map((stat, idx) => (<motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05, duration: 0.4 }} className={`bg-white/[0.02] border ${stat.border} p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:bg-white/[0.05] transition-colors will-change-transform`}><div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" /><stat.icon className={`w-8 h-8 mb-4 ${stat.color} opacity-80 group-hover:scale-110 transition-transform`} /><h3 className="text-3xl md:text-4xl font-mono font-bold text-white mb-2">{stat.count}</h3><p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">{stat.label}</p></motion.div>))}</div>));
  const StudioView = memo(() => (<div className="h-full relative p-8 flex flex-col justify-center"><Scanline /><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-[#0a0a0a] border border-white/10 relative overflow-hidden shadow-2xl backdrop-blur-sm"><div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center"><div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" /><span className="text-[10px] font-mono uppercase text-gray-400">Secure Channel_01</span></div><div className="flex gap-2"><Share2 className="w-4 h-4 text-gray-500" /><Activity className="w-4 h-4 text-pink-500" /></div></div><div className="p-6 space-y-6"><div className="flex gap-4 opacity-70"><div className="w-8 h-8 rounded-full bg-white/10 border border-white/20" /><div className="space-y-2"><div className="h-2 w-24 bg-white/10 rounded" /><div className="h-2 w-48 bg-white/10 rounded" /></div></div><div className="flex gap-4 justify-end"><div className="bg-pink-500/10 border border-pink-500/20 p-4 max-w-[80%] relative rounded-tl-xl rounded-bl-xl rounded-br-xl"><div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_8px_#ec4899]" /><div className="flex items-center gap-2 mb-2"><CheckCircle2 className="w-3 h-3 text-pink-500" /><span className="text-[9px] text-pink-300 font-mono uppercase">Fabric Approved</span></div><p className="text-xs text-pink-100 font-light">Proceeding with the silk blend for the final prototype.</p></div></div></div><div className="p-4 bg-white/5 border-t border-white/10"><div className="h-8 bg-black/50 border border-white/10 flex items-center px-4 justify-between"><span className="text-[10px] text-gray-600">Typing...</span><div className="w-1.5 h-1.5 bg-pink-500/50 rounded-full" /></div></div></motion.div></div>));
  const WorkflowView = memo(() => (<div className="h-full p-8 flex flex-col justify-center gap-6 relative"><Scanline />{[{ label: "Design Upload", status: "Complete", progress: 100, icon: FileText }, { label: "Material Sourcing", status: "In Progress", progress: 65, icon: Globe }, { label: "Quality Check", status: "Pending", progress: 0, icon: ShieldCheck }].map((item, i) => (<motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, duration: 0.4 }} className="bg-white/[0.02] border border-white/5 p-4 flex items-center gap-4 group hover:bg-white/[0.05] transition-colors"><div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-pink-500/30 transition-colors"><item.icon className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" /></div><div className="flex-1"><div className="flex justify-between mb-2"><span className="text-xs font-bold uppercase tracking-wider text-white">{item.label}</span><span className="text-[10px] font-mono text-pink-500 bg-pink-500/10 px-2 py-0.5 rounded">{item.status}</span></div><div className="h-1 w-full bg-white/10 overflow-hidden rounded-full"><motion.div initial={{ width: 0 }} animate={{ width: `${item.progress}%` }} transition={{ duration: 1.0, delay: 0.1 + (i * 0.1), ease: "easeOut" }} className="h-full bg-gradient-to-r from-pink-600 to-purple-600 relative will-change-transform"><div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]" /></motion.div></div></div></motion.div>))}</div>));

  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-screen bg-repeat" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-16"><span className="text-pink-500 font-mono text-xs uppercase tracking-widest border border-pink-500/30 px-3 py-1 bg-pink-500/5">System Capabilities</span><h2 className="text-5xl md:text-7xl serif italic text-white mt-6">The <span className="not-italic font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Ecosystem</span></h2></div>
        <div className="flex flex-col lg:flex-row h-[700px] border border-white/10 bg-[#030303] shadow-2xl">
          <div className="w-full lg:w-1/3 flex flex-col border-r border-white/10 bg-[#020202]">
            {tabs.map((tab, idx) => (
              <button key={tab.id} onMouseEnter={() => setActiveTab(idx)} onClick={() => setActiveTab(idx)} className={`group flex-1 flex flex-col justify-center px-8 border-b border-white/10 last:border-0 transition-colors duration-200 relative overflow-hidden text-left ${activeTab === idx ? 'bg-white text-black' : 'hover:bg-white/5 text-gray-400'}`}>
                {activeTab === idx && (<motion.div layoutId="activeTab" className="absolute left-0 top-0 bottom-0 w-1.5 bg-pink-500" transition={{ duration: 0.2 }} />)}
                <div className="relative z-10 flex items-center justify-between mb-2"><span className={`text-[10px] font-mono uppercase tracking-widest ${activeTab === idx ? 'text-pink-600' : 'text-gray-600'}`}>0{idx + 1}</span><tab.icon className={`w-5 h-5 ${activeTab === idx ? 'text-black' : 'text-gray-600'} transition-colors duration-200`} /></div>
                <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${activeTab === idx ? 'text-black' : 'text-white'} transition-colors duration-200`}>{tab.label}</h3><p className={`text-xs ${activeTab === idx ? 'text-gray-600' : 'text-gray-500'} transition-colors duration-200`}>{tab.desc}</p>
              </button>
            ))}
          </div>
          <div className="w-full lg:w-2/3 relative bg-black p-6 md:p-12 overflow-hidden flex items-center justify-center">
            <div className="relative w-full h-full border border-white/10 bg-[#050505] shadow-2xl overflow-hidden rounded-sm ring-1 ring-white/5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-pink-500/50 blur-[20px] z-20" />
              <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
              <div className="absolute inset-0 z-10">
                <AnimatePresence mode="wait">
                  {activeTab === 0 && (<motion.div key="network" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="h-full w-full"><NetworkView /></motion.div>)}
                  {activeTab === 1 && (<motion.div key="studio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="h-full w-full"><StudioView /></motion.div>)}
                  {activeTab === 2 && (<motion.div key="workflow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="h-full w-full"><WorkflowView /></motion.div>)}
                </AnimatePresence>
              </div>
              <div className="absolute top-4 left-4 z-30 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-pink-500 animate-pulse" /><span className="text-[9px] font-mono text-pink-500 uppercase tracking-widest">System Active</span></div>
              <div className="absolute bottom-4 right-4 z-30 flex items-center gap-4"><span className="text-[9px] font-mono text-gray-600 uppercase">Latency: 12ms</span><span className="text-[9px] font-mono text-gray-600 uppercase">View_Mode: Optimized</span></div>
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/20" /><div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/20" /><div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white/20" /><div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const x = useMotionValue(0); const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 }); const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]); const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5; const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct); y.set(yPct);
  };
  return (
    <motion.div onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className={`perspective-1000 ${className}`}>
      {children}
    </motion.div>
  );
};

const Collections: React.FC = () => {
  const products = [
    {
      title: "Silver Sequined Ruffle Lehenga",
      designer: "Ikra Hand & Embroidery Work",
      price: 9000,
      oldPrice: 12000,
      image: "https://i.pinimg.com/1200x/83/3f/6a/833f6afcff34c6bacb5637dead11bb06.jpg",
      likes: 24
    },
    {
      title: "Emerald Green Floral Anarkali",
      designer: "Ikra Hand & Embroidery Work",
      price: 2790,
      oldPrice: 3500,
      image: "https://i.pinimg.com/1200x/24/fc/66/24fc667f93ec1cc3fdb49e069790b9a8.jpg",
      likes: 42
    },
    {
      title: "Ivory Floral Hand-Embroidered",
      designer: "Ikra Hand & Embroidery Work",
      price: 380,
      oldPrice: 480,
      image: "https://i.pinimg.com/1200x/21/d3/d5/21d3d5fe5f53d4280e7590c9f7cf79d4.jpg",
      likes: 18
    },

    // ----- 3 NEW PRODUCTS USING NEXT IMAGES MANUALLY -----

    {
      title: "Royal Silk Festive Lehenga",
      designer: "Ikra Hand & Embroidery Work",
      price: 7200,
      oldPrice: 9200,
      image: "https://i.pinimg.com/1200x/ca/87/e3/ca87e33af6f384499b2b9d2c93963cd1.jpg",
      likes: 51
    },
    {
      title: "Golden Embellished Party Wear",
      designer: "Ikra Hand & Embroidery Work",
      price: 5600,
      oldPrice: 7500,
      image: "https://i.pinimg.com/1200x/27/53/0f/27530f8ea31f28f58fa3a34d0fa46701.jpg",
      likes: 34
    },
    {
      title: "Handcrafted Designer Couture",
      designer: "Ikra Hand & Embroidery Work",
      price: 6400,
      oldPrice: 8100,
      image: "https://i.pinimg.com/1200x/b4/7f/ae/b47fae93801b46971ab8b77a40c34d32.jpg",
      likes: 47
    }
  ];
  return (
    <section className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-purple-500 uppercase tracking-widest mb-4 block">Featured Collections</span>
          <h2 className="text-5xl md:text-6xl serif italic text-white mb-6">Explore Premium Designs</h2>
          <button className="mt-8 border border-white/20 px-8 py-3 uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {products.map((product, idx) => (
            <TiltCard key={idx} className="h-full">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }} className="group border border-white/10 bg-[#050505] hover:border-pink-500/50 transition-colors duration-500 h-full relative" style={{ transformStyle: "preserve-3d" }}>
                <div className="relative overflow-hidden aspect-[4/5] z-10" style={{ transform: "translateZ(20px)" }}>
                  <img src={product.image} alt={product.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0" />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-full py-3 px-4 flex items-center justify-between translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 shadow-2xl">
                    <button className="text-white hover:text-pink-500 transition-colors p-1" title="Like"><Heart className="w-5 h-5" /></button>
                    <button className="text-white hover:text-blue-400 transition-colors p-1" title="Comment"><MessageCircle className="w-5 h-5" /></button>
                    <div className="w-px h-4 bg-white/20" />
                    <button className="text-white hover:text-green-400 transition-colors p-1" title="Share"><Share2 className="w-5 h-5" /></button>
                    <button className="text-white hover:text-yellow-400 transition-colors p-1" title="Save"><Bookmark className="w-5 h-5" /></button>
                    <button className="text-white hover:text-purple-500 transition-colors p-1" title="Call Designer"><Phone className="w-5 h-5" /></button>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 text-xs font-mono border border-white/20 z-20">-{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%</div>
                </div>
                <div className="p-6 relative z-0" style={{ transform: "translateZ(10px)" }}>
                  <div className="flex items-start justify-between mb-2"><h3 className="text-lg font-serif leading-tight pr-4">{product.title}</h3></div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-4">{product.designer}</p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-4"><div className="flex items-center gap-3"><span className="text-lg font-bold text-pink-400">₹{product.price.toLocaleString()}</span><span className="text-sm text-gray-600 line-through decoration-pink-500/50">₹{product.oldPrice.toLocaleString()}</span></div><button className="text-xs uppercase tracking-widest flex items-center gap-2 hover:text-pink-500 transition-colors group/btn">Details <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" /></button></div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const EncryptionViz = () => {
  const [codes, setCodes] = useState<string[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCodes(prev => {
        const newCode = Math.random().toString(16).substr(2, 8).toUpperCase();
        const newArr = [newCode, ...prev];
        if (newArr.length > 10) newArr.pop();
        return newArr;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="font-mono text-[10px] leading-relaxed text-cyan-400 overflow-hidden h-full flex flex-col w-full px-4">{codes.map((code, i) => (<div key={i} className="flex justify-between opacity-0 animate-fade-in border-b border-cyan-500/20 py-1" style={{ animationDelay: `${i * 0.05}s`, opacity: 1 - (i * 0.1) }}><span className="opacity-50">0x{i}</span><span className="font-bold text-cyan-300 shadow-cyan-500/50 drop-shadow-sm">{code}</span><span className="hidden sm:inline opacity-70">::ENCRYPT</span></div>))}</div>
  );
};
const QualityViz = () => (<div className="relative h-full w-full flex items-center justify-center overflow-hidden bg-green-900/5"><div className="absolute w-48 h-48 rounded-full border border-green-500/30 opacity-100"><div className="w-full h-full rounded-full border-t-2 border-green-400 shadow-[0_0_15px_#4ade80] animate-spin" style={{ animationDuration: '3s' }} /></div><div className="absolute w-32 h-32 rounded-full border border-green-500/40 opacity-60" /><div className="absolute w-64 h-64 rounded-full border border-dashed border-green-500/20 opacity-40 animate-spin-slow" /><div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/20 to-transparent animate-scan" style={{ height: '40%' }} /><div className="absolute inset-0 flex items-center justify-center"><div className="w-3 h-3 bg-green-400 rounded-full animate-ping shadow-[0_0_10px_#4ade80]" /><div className="w-1.5 h-1.5 bg-green-500 rounded-full absolute" /></div><div className="absolute bottom-8 right-8 text-[9px] font-mono text-green-400 bg-green-900/40 px-3 py-1 border border-green-500/30 backdrop-blur-sm">SCANNING_LAYERS</div></div>);
const SupportViz = () => (<div className="h-full w-full flex items-end justify-center gap-2 pb-12 px-8">{[...Array(20)].map((_, i) => (<motion.div key={i} className="w-full bg-pink-500 rounded-t-sm shadow-[0_0_10px_#ec4899]" animate={{ height: ["15%", `${Math.random() * 60 + 25}%`, "15%"], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.02 }} />))}</div>);

const Security: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);
  const modules = [{ id: 0, title: "Encryption", subtitle: "Zero-Knowledge Architecture", desc: "All design assets are tokenized and encrypted with military-grade AES-256 protocols before they touch our servers.", icon: Lock, color: "cyan", viz: <EncryptionViz /> }, { id: 1, title: "Quality Ops", subtitle: "AI-Powered Verification", desc: "Automated optical inspection combined with expert manual review ensures 100% fidelity to your technical pack.", icon: Scan, color: "green", viz: <QualityViz /> }, { id: 2, title: "24/7 Uplink", subtitle: "Global Support Grid", desc: "Direct, encrypted communication channels with floor managers across 12 time zones for instant resolution.", icon: Activity, color: "pink", viz: <SupportViz /> }];
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-cyan-900/10 via-green-900/10 to-pink-900/10 blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10 h-full">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6"><div><span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2 block">Infrastructure</span><h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">Security <span className="font-serif italic text-gray-500">&</span> Trust</h2></div><div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-white/50"><Shield className="w-3 h-3" /><span>PROTECTION_LEVEL_MAX</span></div></div>
        <div className="flex flex-col lg:flex-row h-[600px] w-full shadow-2xl">
          {modules.map((mod) => {
            const isActive = activeId === mod.id;
            const colorClass = mod.color === 'cyan' ? 'text-cyan-400' : mod.color === 'green' ? 'text-green-400' : 'text-pink-400';
            const bgClass = mod.color === 'cyan' ? 'bg-cyan-500' : mod.color === 'green' ? 'bg-green-500' : 'bg-pink-500';
            return (
              <motion.div key={mod.id} layout onClick={() => setActiveId(mod.id)} onHoverStart={() => setActiveId(mod.id)} className={`relative overflow-hidden cursor-pointer bg-[#050505] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'lg:flex-[2.5]' : 'lg:flex-[1] opacity-50 hover:opacity-80'}`}>
                <div className="absolute inset-0 opacity-100 pointer-events-none">{mod.viz}</div>
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent ${isActive ? 'opacity-90' : 'opacity-70'}`} />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className={`absolute top-8 left-8 flex items-center gap-3 transition-all duration-500 ${isActive ? 'translate-y-0' : '-translate-y-2'}`}><div className={`w-10 h-10 bg-white/5 flex items-center justify-center ${isActive ? colorClass : 'text-gray-500'}`}><mod.icon className="w-5 h-5" /></div>{isActive && (<motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={`text-xs font-mono uppercase tracking-widest ${colorClass}`}>System_Active</motion.span>)}</div>
                  <div className="relative z-10">
                    <motion.h3 layout="position" className={`text-3xl md:text-4xl font-bold text-white mb-2 ${isActive ? '' : 'lg:hidden'}`}>{mod.title}</motion.h3>
                    {!isActive && (<div className="hidden lg:block absolute bottom-0 left-0 w-full"><h3 className="text-3xl font-bold text-white whitespace-nowrap origin-bottom-left -rotate-90 translate-x-8 -translate-y-0 opacity-50">{mod.title}</h3></div>)}
                    <AnimatePresence>{isActive && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}><p className={`text-sm font-mono uppercase mb-4 ${colorClass} opacity-80`}>{mod.subtitle}</p><p className="text-gray-400 text-sm leading-relaxed max-w-md border-l-2 border-white/10 pl-4">{mod.desc}</p><div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group">Explore Protocol <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></div></motion.div>)}</AnimatePresence>
                  </div>
                </div>
                {isActive && (<motion.div layoutId="activeGlow" className={`absolute top-0 left-0 w-full h-[2px] ${bgClass} shadow-[0_0_20px_currentColor]`} />)}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const WarpTunnel: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(0.5);
  useEffect(() => {
    const targetSpeed = isHovered ? 5.0 : 0.5;
    const controls = animate(speedRef.current, targetSpeed, { duration: 0.8, onUpdate: (v) => (speedRef.current = v), ease: "circOut" });
    return () => controls.stop();
  }, [isHovered]);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const gl = canvas.getContext('webgl'); if (!gl) return;
    const vs = `attribute vec3 position; void main() { gl_Position = vec4(position, 1.0); }`;
    const fs = `precision mediump float; uniform float u_time; uniform vec2 u_resolution; uniform float u_speed; float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); } void main() { vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y; float rot = u_time * 0.1; mat2 rotation = mat2(cos(rot), -sin(rot), sin(rot), cos(rot)); if(u_speed > 2.0) { uv = rotation * uv; } float t = u_time * u_speed; vec3 color = vec3(0.0); for(float i=0.0; i<1.0; i+=1.0/5.0) { float depth = fract(i + t); float scale = mix(10.0, 0.1, depth); float fade = depth * smoothstep(1.0, 0.8, depth); vec2 st = uv * scale + vec2(i * 43.0); vec2 id = floor(st); vec2 f = fract(st) - 0.5; float rnd = random(id); if(rnd > 0.92) { float twinkle = 0.5 + 0.5 * sin(u_time * 3.0 + rnd * 10.0); float d = length(f); float star = 1.0 - smoothstep(0.0, 0.4 + (0.1 * twinkle), d); star += 0.5 * (1.0 - smoothstep(0.0, 0.1, d)); vec3 starColor = mix(vec3(0.2, 0.2, 1.0), vec3(1.0, 0.0, 0.5), rnd); starColor = mix(vec3(1.0), starColor, 0.3); if(u_speed > 3.0) { star *= 1.0 + smoothstep(0.0, 1.0, length(uv)) * 2.0; } color += starColor * star * fade * (0.8 + 0.5 * twinkle); } } float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv)); color *= vignette; color += vec3(0.005, 0.0, 0.01); gl_FragColor = vec4(color, 1.0); }`;
    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => { const shader = gl.createShader(type); if (!shader) return null; gl.shaderSource(shader, source); gl.compileShader(shader); if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null; return shader; };
    const program = gl.createProgram(); const vShader = createShader(gl, gl.VERTEX_SHADER, vs); const fShader = createShader(gl, gl.FRAGMENT_SHADER, fs); if (!program || !vShader || !fShader) return;
    gl.attachShader(program, vShader); gl.attachShader(program, fShader); gl.linkProgram(program); gl.useProgram(program);
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]); const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, 'position'); gl.enableVertexAttribArray(posLoc); gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    const timeLoc = gl.getUniformLocation(program, 'u_time'); const resLoc = gl.getUniformLocation(program, 'u_resolution'); const speedLoc = gl.getUniformLocation(program, 'u_speed');
    let frameId: number; const start = performance.now();
    const render = () => { const time = (performance.now() - start) * 0.001; gl.uniform1f(timeLoc, time); gl.uniform2f(resLoc, canvas.width, canvas.height); gl.uniform1f(speedLoc, speedRef.current * 0.2); gl.drawArrays(gl.TRIANGLES, 0, 6); frameId = requestAnimationFrame(render); };
    const resize = () => { const dpr = Math.min(window.devicePixelRatio, 2); canvas.width = window.innerWidth * dpr; canvas.height = window.innerHeight * dpr; gl.viewport(0, 0, canvas.width, canvas.height); };
    window.addEventListener('resize', resize); resize(); render();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(frameId); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen" />;
};

const CTA: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);
  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => { const { left, top } = currentTarget.getBoundingClientRect(); mouseX.set(clientX - left); mouseY.set(clientY - top); };
  return (
    <section className="h-screen bg-black relative overflow-hidden flex items-center justify-center border-t border-white/10 py-18">
      <WarpTunnel isHovered={isHovered} />
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="container mx-auto px-6 py-10 relative z-20 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/50 bg-pink-500/10 text-pink-500 text-xs font-mono uppercase tracking-[0.2em] mb-12 backdrop-blur-md"><Star className="w-3 h-3 fill-current" /><span>The Final Step</span></div>
          <h2 className="text-[10vw] md:text-[7rem] leading-[0.85] font-bold tracking-tighter text-white mb-8 mix-blend-difference select-none">CREATE <br /><span className="font-serif italic bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-500 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">LEGACY</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light mb-16 text-lg tracking-wide border-l-2 border-pink-500 pl-6 text-left md:text-center md:border-l-0 md:pl-0">Join the elite network of designers defining the next century of fashion. Your canvas awaits.</p>
          <div className="relative group inline-block" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onMouseMove={handleMouseMove}>
            <button className="relative overflow-hidden bg-white text-black text-xl md:text-2xl font-bold uppercase tracking-[0.2em] px-16 py-5 md:px-24 md:py-7 transition-all duration-500 group-hover:scale-105">
              <span className="relative z-10 flex items-center gap-4">Start Now <ArrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.83, 0, 0.17, 1)]" />
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">Start Now <ArrowRight className="w-6 h-6" /></span>
            </button>
            <div className="absolute inset-0 bg-pink-500 blur-[50px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
          </div>
          <div className="mt-12 flex justify-center gap-8 text-[10px] uppercase tracking-widest text-gray-600 font-mono"><span>Free Consultation</span><span>•</span><span>No Credit Card</span><span>•</span><span>Cancel Anytime</span></div>
        </motion.div>
      </div>
    </section>
  );
};

const platformLinks = [
  { label: 'Browse Designs', path: '/designs' },
  { label: 'Find Designers', path: '/find-designers' },
  { label: 'Meet Artisans', path: '/meet-artisans' },
  { label: 'Pricing', path: '/pricing' },
];

const companyLinks = [
  { label: 'Support', path: '/support' },
  { label: 'Explore', path: '/explore' },
];

const legalLinks = [
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Return Policy', path: '/return-policy' },
  { label: 'Privacy Policy', path: '/privacy' },
];

const Footer: React.FC = memo(() => {

  const icons = [Heart, Share2, Bookmark, Eye];

  return (
    <footer className="bg-black border-t border-white/10 pt-24 pb-0 relative overflow-hidden flex flex-col justify-between min-h-[80vh]">
      <div className="container mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6"><div className="w-8 h-8 bg-pink-600 flex items-center justify-center font-bold text-black text-xl">V</div><span className="text-2xl font-bold tracking-tighter uppercase text-white">Venstyler</span></Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">Orchestrating the future of fashion production through technology and artisanal craftsmanship.</p>
<div className="flex gap-4">
  {icons.map((Icon, i) => (
    <a
      key={i}
      href="#"
      className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center 
      text-gray-400 hover:text-white hover:border-pink-500 hover:bg-pink-500/10 transition-all"
    >
      <Icon size={18} />
    </a>
  ))}
</div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4">
              {platformLinks.map(item => (
                <li key={item.label}>
                  <Link to={item.path} className="text-gray-400 text-sm hover:text-pink-500 transition-colors flex items-center gap-2 group">
                    {item.label} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              {companyLinks.map(item => (
                <li key={item.label}>
                  <Link to={item.path} className="text-gray-400 text-sm hover:text-pink-500 transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4">
              {legalLinks.map(item => (
                <li key={item.label}>
                  <Link to={item.path} className="text-gray-400 text-sm hover:text-pink-500 transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-4"><p className="text-[10px] text-gray-600 uppercase tracking-widest">© 2024 VenStyler. All rights reserved.</p></div>
      </div>
      <div className="w-full relative -mb-6 z-0 pointer-events-none select-none opacity-80">
        <svg viewBox="0 0 1350 200" className="w-full h-auto">
          <defs><linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#db2777" /><stop offset="100%" stopColor="#db2777" /></linearGradient></defs>
          <text x="50%" y="85%" textAnchor="middle" className="font-sans font-black tracking-tighter" style={{ fontSize: '180px', fill: 'url(#cyanGradient)', transform: 'translate(1px, 1px)' }}>VENSTYLER</text>
          <text x="50%" y="85%" textAnchor="middle" className="font-sans font-black tracking-tighter" style={{ fontSize: '180px', fill: '#000000', stroke: '#db2777', strokeWidth: '0.5px' }}>VENSTYLER</text>
        </svg>
      </div>
    </footer>
  );
});

// --- APP COMPONENT ---

const SecondIndex: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-[#030303] text-white min-h-screen selection:bg-pink-500 selection:text-white cursor-none overflow-x-hidden font-sans">
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-600 to-purple-600 origin-left z-[100]" style={{ scaleX }} />
          <Navbar />
          <main>
            <Hero />
            <Stats />
            <Process />
            <Showcase />
            <Features />
            <Collections />
            <Security />
            <CTA />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
};

export default SecondIndex;
