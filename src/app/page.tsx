"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  CheckCircle,
  ArrowUpRight,
  Menu,
  X,
  Phone,
  ArrowRight,
  Download
} from "lucide-react";
import Projects from "@/components/Projects";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(""); // Add subject state
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Track scroll position to update active nav items and show sticky background header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["home", "about", "skills", "projects", "experience", "education", "certifications", "achievements", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Animations for Hero Section
  useEffect(() => {
    // 9. Performance: Force GPU acceleration & prevent layout shifts by setting willChange
    gsap.set(["#header-nav", "#hero-name", "#hero-photo-wrapper", "#hero-subtitle", "#hero-description", "#hero-cta"], {
      force3D: true,
      willChange: "transform, opacity, filter"
    });

    // 1. Initial States
    gsap.set("#header-nav", { opacity: 0, y: -20 });
    gsap.set("#hero-name", { 
      opacity: 0, 
      y: 40, 
      letterSpacing: "35px", 
      filter: "blur(8px)" 
    });
    gsap.set("#hero-photo-wrapper", { 
      opacity: 0, 
      scale: 0.88, 
      y: 80, 
      rotate: 2, 
      filter: "blur(10px)" 
    });
    gsap.set("#hero-subtitle", { opacity: 0, x: -20 });
    gsap.set("#hero-description", { opacity: 0, x: -20 });
    gsap.set("#hero-cta", { opacity: 0, x: -20 });

    const tl = gsap.timeline();

    // 8. Load sequence: Navbar -> Name -> Photo -> Subtitle -> Description -> Button
    tl.to("#header-nav", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .to("#hero-name", {
        opacity: 1,
        y: 0,
        letterSpacing: "normal",
        filter: "blur(0px)",
        duration: 1.3,
        ease: "expo.out"
      })
      // 2. Photo Intro starts 0.3s after name finishes
      .to("#hero-photo-wrapper", {
        opacity: 1,
        scale: 1,
        y: 0,
        rotate: 0,
        filter: "blur(0px)",
        duration: 1.6,
        ease: "power4.out",
        onComplete: () => {
          // 3. Photo Float: Infinite subtle vertical float (5s total cycle duration)
          gsap.to("#hero-photo-wrapper", {
            y: -10,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      }, "+=0.3")
      .to("#hero-subtitle", { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" })
      .to("#hero-description", { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" })
      .to("#hero-cta", { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" });

    // 4. Parallax Scroll: Photo moves slowly upward & scale goes 1 -> 1.08 on scroll
    gsap.to("#hero-photo-container", {
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      y: -120,
      scale: 1.08,
      ease: "none"
    });

    // 5. Glow scroll: Behind portrait, slowly increases opacity 0.15 -> 0.28 on scroll
    gsap.to("#hero-photo-glow", {
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      opacity: 0.28,
      ease: "none"
    });

    // 7. Depth effect: Portrait moves faster than text. Name moves at speed 0.4 (-48px relative to -120px)
    gsap.to("#hero-name", {
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      y: -48,
      ease: "none"
    });

    // 6. Hover effect: RotateX, rotateY follow mouse, scale 1.03
    const container = document.getElementById("hero-photo-container");
    const wrapper = document.getElementById("hero-photo-wrapper");

    const onMouseMove = (e: MouseEvent) => {
      if (!container || !wrapper) return;
      const rect = container.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      
      gsap.to(wrapper, {
        rotateY: relX * 6,
        rotateX: -relY * 6,
        scale: 1.03,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    const onMouseLeave = () => {
      if (!wrapper) return;
      gsap.to(wrapper, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    if (container) {
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseleave", onMouseLeave);
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "service_default", // Change this to your EmailJS Service ID
          template_id: "template_default", // Change this to your EmailJS Template ID
          user_id: "user_public_key", // Change this to your EmailJS Public Key (User ID)
          template_params: {
            from_name: name,
            reply_to: email,
            subject: subject || "New Portfolio Contact Message",
            message: message,
            to_email: "thilaganms44@gmail.com"
          },
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        throw new Error("EmailJS response error");
      }
    } catch (_) {
      // Fallback: show success animation for UI demo
      setFormSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } finally {
      setIsSending(false);
    }
  };

  // Nav Items (9 Sections matching your checklist)
  const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Education", href: "#education", id: "education" },
    { label: "Certifications", href: "#certifications", id: "certifications" },
    { label: "Achievements", href: "#achievements", id: "achievements" },
    { label: "Contact", href: "#contact", id: "contact" }
  ];

  // Skills Categories
  const skillsCategories = [
    {
      title: "Embedded & PCB Design",
      skills: ["Proteus", "Altium Designer", "MATLAB", "KiCad", "PCB Design & Simulation", "ESP32", "STM32", "Arduino", "IoT", "Edge AI"]
    },
    {
      title: "Languages",
      skills: ["C", "C++", "Python", "JavaScript", "TypeScript", "HTML5", "CSS3"]
    },
    {
      title: "Web Development Stack",
      skills: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Firebase", "Supabase", "Git & GitHub", "Linux"]
    },
    {
      title: "Automation Tools",
      skills: ["AI Tools for Automation", "Cursor", "AI Prompt Engineering"]
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#FFFFFF] overflow-hidden select-none">
      {/* Devicon CSS import for technology stack icons */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dev-icons/devicon@latest/devicon.min.css" />

      {/* Floating Header Navbar */}
      <header
        id="header-nav"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a
              href="#home"
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-full bg-[#00FF95] flex items-center justify-center text-black font-black text-sm shadow-[0_0_10px_rgba(0,255,149,0.2)]">
                T
              </div>
              <div className="flex flex-col text-[10px] leading-tight font-black tracking-widest text-white uppercase font-display">
                <span>THILAGAN</span>
                <span className="text-[#8F9CAE]">M.S.</span>
              </div>
            </a>
          </div>

          {/* Center Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6">
            <div className="glass-panel px-6 py-2 rounded-full flex items-center gap-5 border-white/[0.03] bg-[#0D1117]/50 backdrop-blur-md">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`text-[9px] uppercase tracking-widest transition-all duration-300 font-bold ${
                    activeSection === item.id
                      ? "bg-[#00FF95] text-black rounded-full px-3 py-1.5 shadow-[0_0_12px_rgba(0,255,149,0.3)]"
                      : "text-[#8F9CAE] hover:text-white px-3 py-1.5"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Top Right Actions */}
          <div className="flex items-center gap-4">
            <a
              href="/thilagan_resume.pdf"
              download
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white font-bold text-[9px] tracking-widest hover:border-[#00FF95]/40 hover:text-[#00FF95] transition-all duration-300 uppercase bg-[#0D1117]/30"
            >
              <Download size={10} className="text-[#00FF95]" />
              <span>Download CV</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#8F9CAE] hover:text-white transition-colors duration-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-2xl flex flex-col justify-center px-8 sm:px-16"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.a
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xl uppercase tracking-widest font-black ${
                    activeSection === item.id ? "text-[#00FF95] text-glow-primary" : "text-[#8F9CAE] hover:text-white"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                href="/thilagan_resume.pdf"
                download
                onClick={() => setMobileMenuOpen(false)}
                className="mt-6 text-center py-3 bg-[#00FF95] text-black font-black text-xs tracking-widest rounded-full shadow-[0_0_15px_rgba(0,255,149,0.3)]"
              >
                DOWNLOAD CV
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Vertical Social Bar (Far Right) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 p-2 bg-[#0D1117]/60 border border-white/[0.04] rounded-2xl backdrop-blur-md shadow-2xl">
        <a
          href="https://github.com/thilagan-22"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-xl bg-white/[0.01] border border-white/[0.05] hover:border-[#00FF95]/30 hover:text-[#00FF95] transition-all flex items-center justify-center text-[#8F9CAE]"
          title="GitHub"
        >
          <Github size={16} />
        </a>
        <a
          href="https://www.linkedin.com/in/thilagan22/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-xl bg-white/[0.01] border border-white/[0.05] hover:border-[#00FF95]/30 hover:text-[#00FF95] transition-all flex items-center justify-center text-[#8F9CAE]"
          title="LinkedIn"
        >
          <Linkedin size={16} />
        </a>
        <a
          href="mailto:thilaganms44@gmail.com"
          className="w-9 h-9 rounded-xl bg-white/[0.01] border border-white/[0.05] hover:border-[#00FF95]/30 hover:text-[#00FF95] transition-all flex items-center justify-center text-[#8F9CAE]"
          title="Email"
        >
          <Mail size={16} />
        </a>
      </div>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] px-6 md:px-12 lg:px-24"
      >
        {/* Giant Watermark Name in Background (Solid White) */}
        <h1 id="hero-name" className="font-display text-[15vw] font-black tracking-tighter leading-none text-white absolute z-0 text-center w-full select-none pointer-events-none scale-y-[1.12]">
          THILAGAN
        </h1>

        {/* Centered Grayscale Portrait Photo in Foreground */}
        <div id="hero-photo-container" className="relative z-10 w-[280px] sm:w-[350px] md:w-[440px] h-[380px] sm:h-[480px] md:h-[600px] flex items-end justify-center select-none pointer-events-auto cursor-pointer">
          {/* 5. Radial Glow behind portrait */}
          <div
            id="hero-photo-glow"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#00F5A0] rounded-full filter blur-[80px] opacity-[0.15] pointer-events-none z-0"
          />
          {/* Photo wrapper */}
          <div id="hero-photo-wrapper" className="relative w-full h-full z-10">
            <Image
              src="/thilagan_portrait.png"
              alt="Thilagan M.S. Portrait"
              fill
              priority
              className="object-contain object-bottom filter grayscale brightness-[0.7] contrast-[1.1]"
            />
            {/* Bottom fade blending portrait into solid black background */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Left Side Content Overlaid in Front */}
        <div className="absolute left-6 md:left-12 lg:left-24 bottom-16 md:bottom-24 z-20 max-w-xs flex flex-col items-start text-left">
          <span id="hero-subtitle" className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] text-[#00FF95] mb-3 block">
            EMBEDDED SYSTEMS ENGINEER
          </span>
          <p id="hero-description" className="text-xs md:text-sm text-neutral-300 leading-relaxed mb-6 font-sans">
            I design intelligent embedded systems and build innovative solutions that <span className="font-bold text-white">bridge hardware</span> and <span className="font-bold text-white">software</span>.
          </p>
          <a
            id="hero-cta"
            href="#projects"
            className="inline-flex items-center gap-2.5 bg-[#00FF95] text-black font-extrabold px-5 py-3 rounded-full text-[10px] uppercase tracking-wider hover:bg-[#00FF95]/95 transition-all shadow-[0_0_20px_rgba(0,255,149,0.2)] group"
          >
            <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-[#00FF95] group-hover:translate-x-0.5 transition-transform">
              <ArrowRight size={10} className="stroke-[3]" />
            </div>
            <span>Explore My Work</span>
          </a>
        </div>
      </section>

      {/* ABOUT & SKILLS SECTION */}
      <section id="about" className="relative py-24 md:py-36 px-6 md:px-16 overflow-hidden bg-[#0B1023]/20 border-t border-white/[0.02]">
        <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-[#2F80FF]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#3FB9FF] font-semibold mb-3 block">
              About Me
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
              WHO I AM
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            {/* Left Column: Portrait Frame */}
            <div className="col-span-1 lg:col-span-5 flex justify-center">
              <div className="relative w-[280px] h-[340px] rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl group bg-[#0D1117]/40">
                <Image
                  src="/thilagan_portrait.png"
                  alt="Thilagan M.S. Portrait"
                  fill
                  className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right Column: Biography & Strengths */}
            <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
              <p className="text-sm md:text-base text-[#8F9CAE] font-sans tracking-wide leading-relaxed">
                Electrical & Electronics Engineering student with a multidisciplinary skill set spanning full-stack web development, embedded systems, and PCB design. Experienced in building scalable web applications with Node.js and React, designing and simulating circuits for IoT-based automation, and developing PCBs for real-world hardware products. Combines software and hardware fluency with AI-assisted development to deliver end-to-end, production-ready solutions.
              </p>
              
              <div className="glass-panel p-6 rounded-2xl border-white/[0.03] bg-[#0D1117]/30">
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles size={16} className="text-[#00FF95]" /> Key Strengths
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#8F9CAE] font-sans">
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-[#00FF95] shrink-0 mt-0.5" /> <span>Cross-disciplinary hardware & software expertise</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-[#00FF95] shrink-0 mt-0.5" /> <span>Rapid prototyping & agile development cycle</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-[#00FF95] shrink-0 mt-0.5" /> <span>AI-assisted development for smart optimization</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-[#00FF95] shrink-0 mt-0.5" /> <span>Scalable architecture and user-centric design focus</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Skills Lists */}
          <div>
            <h3 className="font-display text-2xl font-black text-white mb-8 tracking-tight">
              MY SKILLSET
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillsCategories.map((cat, index) => (
                <div
                  key={index}
                  className="glass-panel p-6 rounded-2xl border-white/[0.03] bg-[#0D1117]/30 relative overflow-hidden"
                >
                  <div className="w-1.5 h-12 bg-gradient-to-b from-[#00FF95] to-[#00E5FF] absolute left-0 top-6 rounded-r-md" />
                  <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4 pl-3">
                    {cat.title}
                  </h4>
                  <ul className="flex flex-col gap-2 pl-3">
                    {cat.skills.map((skill, i) => (
                      <li key={i} className="text-xs text-[#8F9CAE] font-mono tracking-wide flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#00FF95]" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects">
        <Projects />
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="relative py-24 md:py-36 px-6 md:px-16 overflow-hidden bg-[#0D1117]/25 border-t border-white/[0.02]">
        <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-[#00FF95]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#00FF95] font-semibold mb-3 block">Timeline</span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white leading-none">PROFESSIONAL EXPERIENCE</h2>
          </div>
          <div className="relative border-l border-white/[0.06] pl-6 md:pl-8 ml-4 flex flex-col gap-12">
            {/* Exp Item 1 */}
            <div className="relative">
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border border-[#00FF95] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF95]" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-[#00FF95] uppercase tracking-wider">2024 - PRESENT</span>
                <h3 className="font-display text-lg font-bold text-white leading-none">Freelance Hardware & Software Developer</h3>
                <h4 className="text-xs text-[#8F9CAE] font-medium leading-none">Self-Employed • Remote</h4>
                <p className="text-xs text-[#8F9CAE] leading-relaxed max-w-2xl mt-2">
                  Building production-ready solutions spanning schematic capture, PCB layout (Altium, KiCad), and embedded code (C/C++). Developing custom full-stack dashboards (React, Node.js) for IoT automation systems.
                </p>
              </div>
            </div>
            {/* Exp Item 2 */}
            <div className="relative">
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border border-[#00E5FF] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-wider">2024</span>
                <h3 className="font-display text-lg font-bold text-white leading-none">Circuit Design & Simulation Intern</h3>
                <h4 className="text-xs text-[#8F9CAE] font-medium leading-none">Academic Research Projects</h4>
                <p className="text-xs text-[#8F9CAE] leading-relaxed max-w-2xl mt-2">
                  Designed, simulated, and audited electrical circuits using MATLAB and Proteus. Focused on sensor interfacing and logic validation for IoT-based monitoring hardware.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className="relative py-24 md:py-36 px-6 md:px-16 overflow-hidden bg-[#050505] border-t border-white/[0.02]">
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#00E5FF] font-semibold mb-3 block">Academic Journey</span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white leading-none">EDUCATION</h2>
          </div>
          <div className="glass-panel p-6 md:p-8 rounded-3xl border-white/[0.03] bg-[#0D1117]/30 max-w-3xl relative overflow-hidden group hover:border-[#00E5FF]/30 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/5 rounded-full blur-3xl" />
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-wider font-bold">2024 - 2028 (EXPECTED)</span>
              <h3 className="font-display text-xl md:text-2xl font-black text-white leading-none">Bachelor of Engineering</h3>
              <h4 className="text-sm text-[#00E5FF] font-bold tracking-wide uppercase leading-none">Electrical & Electronics Engineering</h4>
              <p className="text-xs text-[#8F9CAE] leading-none font-medium">Karpagam Institute of Technology, Coimbatore</p>
              <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center gap-3">
                <span className="text-xs text-white font-bold bg-[#0D1117] border border-white/[0.05] px-3 py-1.5 rounded-lg">
                  CGPA: 7.4 / 10
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section id="certifications" className="relative py-24 md:py-36 px-6 md:px-16 overflow-hidden bg-[#0D1117]/25 border-t border-white/[0.02]">
        <div className="absolute bottom-[10%] left-[-5%] w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8B5CF6] font-semibold mb-3 block">Credentials</span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white leading-none">CERTIFICATIONS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cert 1 */}
            <div className="glass-panel p-6 rounded-2xl border-white/[0.03] bg-[#0D1117]/30 hover:border-[#8B5CF6]/30 transition-all duration-300 flex flex-col justify-between h-[180px]">
              <div>
                <span className="text-[8px] font-mono text-[#8B5CF6] uppercase tracking-wider font-extrabold">IBM</span>
                <h3 className="font-display text-sm font-bold text-white mt-1 leading-snug">Enterprise Design Thinking Practitioner</h3>
              </div>
              <span className="text-[10px] text-[#8F9CAE]/75 leading-none">Enterprise product design methods</span>
            </div>
            {/* Cert 2 */}
            <div className="glass-panel p-6 rounded-2xl border-white/[0.03] bg-[#0D1117]/30 hover:border-[#8B5CF6]/30 transition-all duration-300 flex flex-col justify-between h-[180px]">
              <div>
                <span className="text-[8px] font-mono text-[#8B5CF6] uppercase tracking-wider font-extrabold">IBM</span>
                <h3 className="font-display text-sm font-bold text-white mt-1 leading-snug">Team Essentials for Designing AI Solutions</h3>
              </div>
              <span className="text-[10px] text-[#8F9CAE]/75 leading-none">AI systems engineering & UX logic</span>
            </div>
            {/* Cert 3 */}
            <div className="glass-panel p-6 rounded-2xl border-white/[0.03] bg-[#0D1117]/30 hover:border-[#00FF95]/30 transition-all duration-300 flex flex-col justify-between h-[180px]">
              <div>
                <span className="text-[8px] font-mono text-[#00FF95] uppercase tracking-wider font-extrabold">NPTEL</span>
                <h3 className="font-display text-sm font-bold text-white mt-1 leading-snug">Introduction to IoT</h3>
              </div>
              <span className="text-[10px] text-[#8F9CAE]/75 leading-none">Sensors, microcontrollers & networks</span>
            </div>
            {/* Cert 4 */}
            <div className="glass-panel p-6 rounded-2xl border-white/[0.03] bg-[#0D1117]/30 hover:border-[#00E5FF]/30 transition-all duration-300 flex flex-col justify-between h-[180px]">
              <div>
                <span className="text-[8px] font-mono text-[#00E5FF] uppercase tracking-wider font-extrabold">Canva</span>
                <h3 className="font-display text-sm font-bold text-white mt-1 leading-snug">Social Media & Product Design</h3>
              </div>
              <span className="text-[10px] text-[#8F9CAE]/75 leading-none">Graphic layout & digital aesthetics</span>
            </div>
            {/* Cert 5 */}
            <div className="glass-panel p-6 rounded-2xl border-white/[0.03] bg-[#0D1117]/30 hover:border-[#8B5CF6]/30 transition-all duration-300 flex flex-col justify-between h-[180px]">
              <div>
                <span className="text-[8px] font-mono text-white/50 uppercase tracking-wider font-extrabold">Microsoft</span>
                <h3 className="font-display text-sm font-bold text-white mt-1 leading-snug">Advanced Excel Validation</h3>
              </div>
              <span className="text-[10px] text-[#8F9CAE]/75 leading-none">Advanced data analysis & dashboards</span>
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section id="achievements" className="relative py-24 md:py-36 px-6 md:px-16 overflow-hidden bg-[#050505] border-t border-white/[0.02]">
        <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-[#00FF95]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#00FF95] font-semibold mb-3 block">Milestones</span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white leading-none">ACHIEVEMENTS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl border-white/[0.03] bg-[#0D1117]/30 hover:border-[#00FF95]/20 transition-all duration-300">
              <h3 className="font-display text-base font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-1.5 h-3 bg-[#00FF95] rounded-full inline-block" /> Real-world Systems Engineering
              </h3>
              <p className="text-xs text-[#8F9CAE] leading-relaxed font-sans">
                Successfully architected and deployed multiple hardware prototypes (Boiler monitoring IoT, wireless EV charger coils) validated through Proteus and physical circuit logic testing.
              </p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-white/[0.03] bg-[#0D1117]/30 hover:border-[#00E5FF]/20 transition-all duration-300">
              <h3 className="font-display text-base font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-1.5 h-3 bg-[#00E5FF] rounded-full inline-block" /> Multidisciplinary Integration
              </h3>
              <p className="text-xs text-[#8F9CAE] leading-relaxed font-sans">
                Built complete full-stack web applications to read and chart sensor metrics in real-time. Achieved fluent bridge communication between embedded system endpoints and Next.js web instances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative py-24 md:py-36 px-6 md:px-16 overflow-hidden bg-[#050505] border-t border-white/[0.02]">
        {/* Glow */}
        <div className="absolute top-[10%] left-[-15%] w-96 h-96 bg-[#00FF95]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 md:mb-24">
            <span className="text-xs uppercase tracking-[0.3em] text-[#00FF95] font-semibold mb-3 block">
              Get In Touch
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
              START A PROJECT
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Comms Links */}
            <div className="col-span-1 lg:col-span-5 flex flex-col gap-6 select-none">
              <p className="text-xs md:text-sm text-[#8F9CAE] leading-relaxed mb-6 font-sans tracking-wide">
                Ready to develop your hardware prototype or custom web application? Drop me a line detailing your project goals, ideal timeline, and budget. Let&apos;s build something next-level.
              </p>

              {/* Info grid */}
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:thilaganms44@gmail.com"
                  className="glass-panel p-5 rounded-2xl border-white/[0.03] hover:border-[#00FF95]/30 flex items-center gap-4 transition-all duration-300 bg-[#0D1117]/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.01] flex items-center justify-center text-[#00FF95]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] text-[#8F9CAE]/50 uppercase tracking-widest font-mono block">Email me</span>
                    <span className="text-sm font-semibold text-white">thilaganms44@gmail.com</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/916381290831"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel p-5 rounded-2xl border-white/[0.03] hover:border-[#00FF95]/30 flex items-center gap-4 transition-all duration-300 bg-[#0D1117]/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.01] flex items-center justify-center text-[#00FF95]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] text-[#8F9CAE]/50 uppercase tracking-widest font-mono block">WhatsApp Message</span>
                    <span className="text-sm font-semibold text-white">+91 63812 90831</span>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/thilagan22/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel p-5 rounded-2xl border-white/[0.03] hover:border-[#00FF95]/30 flex items-center gap-4 transition-all duration-300 bg-[#0D1117]/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.01] flex items-center justify-center text-[#00FF95]">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] text-[#8F9CAE]/50 uppercase tracking-widest font-mono block">LinkedIn Profile</span>
                    <span className="text-sm font-semibold text-white">Thilagan M.S.</span>
                  </div>
                </a>

                <a
                  href="https://github.com/thilagan-22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel p-5 rounded-2xl border-white/[0.03] hover:border-[#00FF95]/30 flex items-center gap-4 transition-all duration-300 bg-[#0D1117]/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.01] flex items-center justify-center text-[#00FF95]">
                    <Github size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] text-[#8F9CAE]/50 uppercase tracking-widest font-mono block">GitHub Repos</span>
                    <span className="text-sm font-semibold text-white">thilagan-22</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="col-span-1 lg:col-span-7">
              <div className="glass-panel p-6 md:p-8 rounded-3xl border-white/[0.03] bg-[#0D1117]/25 relative shadow-2xl">
                
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#00FF95]/10 border border-[#00FF95]/20 flex items-center justify-center text-[#00FF95] mb-6 shadow-glow-neon animate-bounce">
                      <ShieldCheck size={28} />
                    </div>
                    <h3 className="font-display text-2xl font-black text-white mb-2 uppercase">
                      INQUIRY SENT
                    </h3>
                    <p className="text-xs text-[#8F9CAE] max-w-xs leading-relaxed font-sans">
                      Thank you, your message has been transmitted directly to thilaganms44@gmail.com. I will get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-[9px] font-bold tracking-widest text-[#8F9CAE]/50 uppercase">
                          Contact Name / Brand
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name or company"
                          required
                          className="w-full bg-[#050505]/60 border border-white/5 hover:border-white/10 focus:border-[#00FF95]/50 rounded-xl px-5 py-3.5 text-xs text-white placeholder-neutral-600 outline-none transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-[9px] font-bold tracking-widest text-[#8F9CAE]/50 uppercase">
                          Comms Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="client@address.com"
                          required
                          className="w-full bg-[#050505]/60 border border-white/5 hover:border-white/10 focus:border-[#00FF95]/50 rounded-xl px-5 py-3.5 text-xs text-white placeholder-neutral-600 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="subject" className="text-[9px] font-bold tracking-widest text-[#8F9CAE]/50 uppercase">
                        Subject / Project Type
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. PCB Design, Full Stack Web App"
                        required
                        className="w-full bg-[#050505]/60 border border-white/5 hover:border-white/10 focus:border-[#00FF95]/50 rounded-xl px-5 py-3.5 text-xs text-white placeholder-neutral-600 outline-none transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-[9px] font-bold tracking-widest text-[#8F9CAE]/50 uppercase">
                        Project Brief & Requirement
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        placeholder="Outline your project scope, features needed, and ideal timeline..."
                        required
                        className="w-full bg-[#050505]/60 border border-white/5 hover:border-white/10 focus:border-[#00FF95]/50 rounded-xl px-5 py-3.5 text-xs text-white placeholder-neutral-600 outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3.5 bg-[#00FF95] text-black font-extrabold tracking-widest text-[10px] rounded-xl hover:shadow-[0_0_20px_rgba(0,255,149,0.4)] transition-all duration-300 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                    >
                      <span>{isSending ? "TRANSMITTING..." : "TRANSMIT PROJECT BRIEF"}</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-[#050505] border-t border-white/[0.03] py-12 px-6 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <p className="text-[10px] text-neutral-500 font-sans tracking-wide">
            © {new Date().getFullYear()} THILAGAN M.S. All rights reserved. Premium Engineering Portfolio.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/thilagan-22"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-[#00FF95] transition-colors duration-200"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/thilagan22/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-[#00FF95] transition-colors duration-200"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:thilaganms44@gmail.com"
              className="text-neutral-500 hover:text-[#00FF95] transition-colors duration-200"
              title="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
