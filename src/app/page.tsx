"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Layout,
  Sparkles,
  Database,
  LineChart,
  Monitor,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  CheckCircle,
  ArrowUpRight,
  Menu,
  X,
  Phone,
  Rocket,
  ArrowRight,
  Layers,
  Search,
  ThumbsUp
} from "lucide-react";
import PopoutPortrait from "@/components/PopoutPortrait";
import Projects from "@/components/Projects";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Track scroll position to update active nav items and show sticky background header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["home", "about", "services", "portfolio", "process", "testimonials", "contact"];
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setName("");
        setEmail("");
        setMessage("");
      }, 5000);
    }
  };

  // Nav Items (7 Sections from Mockup Template)
  const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Portfolio", href: "#portfolio", id: "portfolio" },
    { label: "Process", href: "#process", id: "process" },
    { label: "Testimonials", href: "#testimonials", id: "testimonials" },
    { label: "Contact", href: "#contact", id: "contact" }
  ];

  // 12 Services list
  const services = [
    {
      title: "Business Websites",
      description: "Premium, responsive corporate sites tailored to boost brand trust and acquire leads.",
      icon: Layout,
      features: ["Custom branding", "Lead integration", "SEO structure"]
    },
    {
      title: "Portfolio Websites",
      description: "Eye-catching personal sites designed for professionals, creatives, and developers to showcase work.",
      icon: Sparkles,
      features: ["Interactivity", "Modern layout", "Contact portals"]
    },
    {
      title: "Landing Pages",
      description: "High-conversion single pages built specifically for targeted ad campaigns and product launches.",
      icon: Rocket,
      features: ["Ultra-fast load speeds", "Focused CTA patterns", "A/B testing ready"]
    },
    {
      title: "E-Commerce Development",
      description: "Robust online stores with smooth checkouts, product filters, and vendor inventory setups.",
      icon: Database,
      features: ["Stripe/PayPal", "Inventory control", "Analytics dash"]
    },
    {
      title: "Custom Web Applications",
      description: "Dynamic full stack applications constructed from scratch to solve your specific workflow issues.",
      icon: Code,
      features: ["Secure DB schemas", "REST / GraphQL APIs", "Cloud orchestration"]
    },
    {
      title: "Admin Dashboards",
      description: "Interactive backend dashboard platforms containing complex graphs, user management, and metrics.",
      icon: LineChart,
      features: ["Real-time socket data", "Custom UI themes", "Role authorization"]
    },
    {
      title: "API Integration",
      description: "Connecting third-party services (payment, CRM, mailing, maps) to extend website functionality.",
      icon: Layers,
      features: ["Secure endpoints", "Error handling", "Data mapping"]
    },
    {
      title: "Website Redesign",
      description: "Modernizing legacy structures to improve loading speed, UX, visual appeal, and conversion rates.",
      icon: Monitor,
      features: ["Codebase cleanup", "Responsive audit", "Core Web Vitals uplift"]
    },
    {
      title: "Performance Optimization",
      description: "Drastically speed up slow websites to improve user engagement, retention, and search index rankings.",
      icon: Rocket,
      features: ["Code splitting", "Asset compression", "Caching protocols"]
    },
    {
      title: "SEO-Friendly Development",
      description: "Optimizing website code structure, meta variables, schema tags, and headers to rank high on search engines.",
      icon: Search,
      features: ["Semantic markup", "Schema validation", "Sitemaps generation"]
    },
    {
      title: "Responsive Web Design",
      description: "Ensuring your website adapts flawlessly to mobile, tablet, and widescreen desktop layouts.",
      icon: Monitor,
      features: ["Flexbox / Grid systems", "Fluid typography", "Cross-device testing"]
    },
    {
      title: "Website Maintenance",
      description: "Continuous security updates, database cleanups, feature extensions, and debugging support.",
      icon: ShieldCheck,
      features: ["Weekly backups", "Uptime monitoring", "Bug resolution"]
    }
  ];

  // Tech stack row item badges
  const heroTechStack = [
    { name: "React", icon: "devicon-react-original text-[#61DAFB]" },
    { name: "Next.js", icon: "devicon-nextjs-plain text-white" },
    { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain text-[#38B2AC]" },
    { name: "Node.js", icon: "devicon-nodejs-plain text-[#68A063]" },
    { name: "MongoDB", icon: "devicon-mongodb-plain text-[#4DB33D]" }
  ];

  // Skills Categories
  const skillsCategories = [
    {
      title: "Frontend",
      skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js", "REST API", "GraphQL API", "Serverless Functions"]
    },
    {
      title: "Database",
      skills: ["MongoDB", "Firebase", "Supabase", "PostgreSQL", "SQL"]
    },
    {
      title: "Tools",
      skills: ["Git", "GitHub", "Vercel", "Figma", "VS Code", "Postman"]
    }
  ];

  // Why Choose Me
  const whyChooseMe = [
    { title: "Modern UI/UX", desc: "Aesthetic, user-centric interfaces." },
    { title: "Responsive Design", desc: "Pixel-perfect across all mobile & desktop viewports." },
    { title: "Fast Performance", desc: "Highly optimized codebase for lightning-fast loads." },
    { title: "Clean & Maintainable Code", desc: "Strict coding patterns easy to update." },
    { title: "SEO Optimized", desc: "Targeted markup structure to help you rank higher." },
    { title: "Scalable Architecture", desc: "Modular framework designed for business growth." },
    { title: "Reliable Communication", desc: "Fast status updates and clear transparency." },
    { title: "On-Time Delivery", desc: "Milestones strictly respected and met." },
    { title: "Ongoing Support", desc: "Proactive website maintenance and code updates." }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "StartUp CEO",
      review: "Thilagan developed our custom SaaS platform on time and with incredible attention to detail. Our page load speed improved by 250%!"
    },
    {
      name: "Marcus Aurelius",
      role: "E-Commerce Manager",
      review: "Thilagan redesigned our checkout flow and integrated Stripe. Our conversion rate increased by 20% within the first month. Excellent communication!"
    },
    {
      name: "Jessica Chen",
      role: "Marketing Director",
      review: "The custom landing page Thilagan built for our campaign looks spectacular and is completely responsive. He is our go-to React and Next.js developer."
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#050816] text-[#FFFFFF] overflow-hidden select-none">
      {/* Devicon CSS import for technology stack icons */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dev-icons/devicon@latest/devicon.min.css" />

      {/* Floating Header Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-[#050816]/80 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a
              href="#home"
              className="font-display font-black tracking-widest text-lg text-white hover:opacity-90 transition-opacity"
            >
              Thilagan <span className="text-[#3FB9FF]">M.S.</span>
            </a>
          </div>

          {/* Center Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6">
            <div className="glass-panel px-8 py-2.5 rounded-full flex items-center gap-6 border-white/[0.03] bg-[#11182E]/30">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`text-[10px] uppercase tracking-widest transition-all duration-300 font-semibold relative py-1 ${
                    activeSection === item.id
                      ? "text-[#3FB9FF] nav-active-line"
                      : "text-[#C7D2E3] hover:text-white"
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
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#2D8CFF] to-[#7C4DFF] text-black font-black text-[10px] tracking-widest hover:opacity-95 hover:shadow-[0_0_20px_rgba(63,185,255,0.35)] transition-all duration-300"
            >
              <span>Hire Me</span>
              <ArrowRight size={12} />
            </a>

            {/* Dark Mode Icon Indicator */}
            <div className="w-8 h-8 rounded-full bg-[#11182E]/40 border border-white/[0.04] flex items-center justify-center text-[#3FB9FF]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M6.343 6.364l.707-.707M24 12a10 10 0 11-10-10 10 10 0 0110 10z" />
              </svg>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#C7D2E3] hover:text-white transition-colors duration-200"
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
            className="fixed inset-0 z-40 bg-[#050816]/98 backdrop-blur-2xl flex flex-col justify-center px-8 sm:px-16"
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
                  className={`text-2xl uppercase tracking-widest font-black ${
                    activeSection === item.id ? "text-[#3FB9FF] text-glow-primary" : "text-[#C7D2E3] hover:text-white"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-6 text-center py-3.5 bg-gradient-to-r from-[#2D8CFF] to-[#7C4DFF] text-black font-black text-xs tracking-widest rounded-full"
              >
                HIRE ME NOW
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Vertical Social Bar (Far Right) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 p-2 bg-[#11182E]/50 border border-white/[0.04] rounded-2xl backdrop-blur-md shadow-2xl">
        <a
          href="https://github.com/msthilagan"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-xl bg-white/[0.01] border border-white/[0.05] hover:border-[#3FB9FF]/30 hover:text-[#3FB9FF] transition-all flex items-center justify-center text-[#C7D2E3]"
          title="GitHub"
        >
          <Github size={16} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-xl bg-white/[0.01] border border-white/[0.05] hover:border-[#3FB9FF]/30 hover:text-[#3FB9FF] transition-all flex items-center justify-center text-[#C7D2E3]"
          title="LinkedIn"
        >
          <Linkedin size={16} />
        </a>
        <a
          href="mailto:thilaganms44@gmail.com"
          className="w-9 h-9 rounded-xl bg-white/[0.01] border border-white/[0.05] hover:border-[#3FB9FF]/30 hover:text-[#3FB9FF] transition-all flex items-center justify-center text-[#C7D2E3]"
          title="Email"
        >
          <Mail size={16} />
        </a>
      </div>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative min-h-screen pt-28 pb-12 md:pt-36 px-6 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden"
      >
        {/* Futuristic Background Ambient Glows & Neon Waves */}
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-[#7B61FF]/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-[#3FB9FF]/10 rounded-full blur-[120px] pointer-events-none" />
      
        {/* Neon Cyber Waves */}
        <div className="absolute bottom-0 left-0 w-[450px] h-[350px] pointer-events-none opacity-40 select-none hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 450 350" fill="none">
            <path d="M-50,300 Q120,180 280,280 T600,180" stroke="#3FB9FF" strokeWidth="1.2" strokeDasharray="6 6" opacity="0.25" />
            <path d="M-10,270 Q140,150 300,240" stroke="#3FB9FF" strokeWidth="2" opacity="0.3" style={{ filter: "drop-shadow(0 0 8px #3FB9FF)" }} />
            <path d="M30,240 Q160,120 320,200" stroke="#7B61FF" strokeWidth="1" opacity="0.15" />
          </svg>
        </div>

        {/* Core Layout Grid */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* LEFT: 3D Pop-out Portrait Portal */}
          <div className="col-span-1 lg:col-span-6 flex items-center justify-center order-2 lg:order-1">
            <PopoutPortrait />
          </div>

          {/* RIGHT: Typography Intro & Tech Badges */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-start text-left order-1 lg:order-2">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] px-3 py-1 rounded-full bg-[#2D8CFF]/10 text-[#3FB9FF] border border-[#2D8CFF]/20 font-bold mb-5 block">
              Hello, I&apos;m
            </span>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none text-white mb-3">
              Thilagan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D8CFF] to-[#7C4DFF] shadow-glow-purple">M.S.</span>
            </h1>
            <h2 className="text-lg sm:text-xl font-bold text-[#3FB9FF] tracking-widest mb-6 uppercase">
              Freelance Full Stack Web Developer
            </h2>
            <p className="text-xs md:text-sm text-[#C7D2E3] max-w-xl leading-relaxed mb-8 font-sans tracking-wide">
              I build fast, modern, responsive, and scalable websites and web applications for startups, businesses, and creators.
            </p>

            {/* Tech stack badge row */}
            <div className="flex flex-wrap gap-2 mb-8">
              {heroTechStack.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#11182E] border border-white/[0.03] text-[9px] font-mono font-semibold tracking-wider text-[#C7D2E3]"
                >
                  <i className={tech.icon} />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>

            {/* Main Action Callouts */}
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#contact"
                className="px-6 py-3 bg-gradient-to-r from-[#2D8CFF] to-[#7C4DFF] text-black font-black tracking-widest text-[10px] rounded-xl hover:shadow-[0_0_25px_rgba(47,128,255,0.4)] transition-all duration-300 flex items-center gap-1.5"
              >
                <span>Hire Me</span>
                <ArrowRight size={12} />
              </a>
              <a
                href="#portfolio"
                className="px-6 py-3 bg-transparent text-white border border-white/10 hover:border-[#3FB9FF]/30 font-black tracking-widest text-[10px] rounded-xl hover:bg-white/[0.02] transition-all duration-300 flex items-center gap-1.5"
              >
                <span>View My Work</span>
                <ArrowRight size={12} className="text-[#3FB9FF]" />
              </a>
            </div>
          </div>

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
            {/* Bio text */}
            <div className="col-span-1 lg:col-span-6">
              <p className="text-sm md:text-base text-[#C7D2E3] font-sans tracking-wide leading-relaxed">
                I&apos;m a passionate Freelance Full Stack Web Developer specializing in creating modern websites and custom web applications. I focus on clean code, responsive design, performance optimization, and exceptional user experiences that help businesses grow online.
              </p>
            </div>
            {/* Short highlight */}
            <div className="col-span-1 lg:col-span-6 glass-panel p-6 rounded-2xl border-white/[0.03]">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-3">
                Focus Areas
              </h3>
              <ul className="grid grid-cols-2 gap-3 text-xs text-[#C7D2E3] font-mono">
                <li className="flex items-center gap-2"><CheckCircle size={12} className="text-[#3FB9FF]" /> Clean Architecture</li>
                <li className="flex items-center gap-2"><CheckCircle size={12} className="text-[#3FB9FF]" /> Responsive Layouts</li>
                <li className="flex items-center gap-2"><CheckCircle size={12} className="text-[#7B61FF]" /> Fast Performance</li>
                <li className="flex items-center gap-2"><CheckCircle size={12} className="text-[#7B61FF]" /> SEO Strategy</li>
              </ul>
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
                  className="glass-panel p-6 rounded-2xl border-white/[0.03] bg-[#11182E]/30 relative overflow-hidden"
                >
                  <div className="w-1.5 h-12 bg-gradient-to-b from-[#2D8CFF] to-[#7C4DFF] absolute left-0 top-6 rounded-r-md" />
                  <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4 pl-3">
                    {cat.title}
                  </h4>
                  <ul className="flex flex-col gap-2 pl-3">
                    {cat.skills.map((skill, i) => (
                      <li key={i} className="text-xs text-[#C7D2E3] font-mono tracking-wide flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#3FB9FF]" />
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

      {/* SERVICES SECTION */}
      <section id="services" className="relative py-24 md:py-36 px-6 md:px-16 overflow-hidden bg-[#050816] border-t border-b border-white/[0.02]">
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-[#7B61FF]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#3FB9FF] font-semibold mb-3 block">
                Expertise
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
                SERVICES
              </h2>
            </div>
            <p className="text-sm md:text-base text-[#C7D2E3] max-w-sm font-sans tracking-wide leading-relaxed">
              Premium digital design and robust code solutions mapped out to scale and solve client business goals.
            </p>
          </div>

          {/* Services Grid (12 Items) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="group glass-panel glass-panel-hover p-6 md:p-8 rounded-3xl flex flex-col justify-between h-[280px] relative overflow-hidden border-white/[0.03] bg-[#11182E]/30"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#3FB9FF]/5 rounded-full blur-3xl group-hover:bg-[#3FB9FF]/10 transition-all duration-500" />
                  
                  <div>
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-2xl bg-white/[0.01] border border-white/[0.05] flex items-center justify-center mb-6 group-hover:border-[#3FB9FF]/30 group-hover:bg-[#3FB9FF]/5 transition-all duration-300">
                      <IconComponent className="w-5 h-5 text-[#C7D2E3] group-hover:text-[#3FB9FF] transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#3FB9FF] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-[11px] md:text-[12px] text-[#C7D2E3]/80 font-sans tracking-wide leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Bullet features */}
                  <div className="mt-4 pt-4 border-t border-white/[0.04] flex flex-wrap gap-x-3 gap-y-1">
                    {service.features.map((feat, i) => (
                      <span key={i} className="text-[9px] font-mono text-[#C7D2E3]/55 tracking-wide flex items-center gap-1">
                        <CheckCircle size={8} className="text-[#3FB9FF]" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <Projects />

      {/* WHY CHOOSE ME SECTION */}
      <section id="why-choose-me" className="relative py-24 md:py-36 px-6 md:px-16 overflow-hidden bg-[#0B1023]/20 border-t border-white/[0.02]">
        <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-[#2F80FF]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 md:mb-24">
            <span className="text-xs uppercase tracking-[0.3em] text-[#3FB9FF] font-semibold mb-3 block">
              Value Proposition
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
              WHY CHOOSE ME
            </h2>
          </div>

          {/* Grid of values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseMe.map((item, index) => (
              <div
                key={index}
                className="glass-panel p-6 rounded-2xl border-white/[0.03] bg-[#11182E]/25 relative"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-[#2D8CFF]/10 flex items-center justify-center text-[#3FB9FF] border border-[#2D8CFF]/20 mt-1 shrink-0">
                    <ThumbsUp size={14} />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#C7D2E3]/80 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT PROCESS SECTION */}
      <section id="process" className="relative py-24 md:py-36 px-6 md:px-16 overflow-hidden bg-[#050816] border-t border-white/[0.02]">
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-[#7B61FF]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 md:mb-24">
            <span className="text-xs uppercase tracking-[0.3em] text-[#3FB9FF] font-semibold mb-3 block">
              Workflow
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
              CLIENT PROCESS
            </h2>
          </div>

          {/* Timeline Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6 relative">
            
            {/* Step 1 */}
            <div className="glass-panel p-5 rounded-2xl border-white/[0.03] bg-[#11182E]/30 relative flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2D8CFF] to-[#7C4DFF] text-black font-black flex items-center justify-center text-xs mb-4 shadow-glow-neon">
                1
              </div>
              <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-2">Discovery</h3>
              <p className="text-[10px] text-[#C7D2E3]/70 font-sans">Learning project goals and constraints.</p>
            </div>

            {/* Step 2 */}
            <div className="glass-panel p-5 rounded-2xl border-white/[0.03] bg-[#11182E]/30 relative flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#11182E] border border-[#3FB9FF]/30 text-[#3FB9FF] font-black flex items-center justify-center text-xs mb-4">
                2
              </div>
              <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-2">Planning</h3>
              <p className="text-[10px] text-[#C7D2E3]/70 font-sans">Mapping features and site wireframes.</p>
            </div>

            {/* Step 3 */}
            <div className="glass-panel p-5 rounded-2xl border-white/[0.03] bg-[#11182E]/30 relative flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#11182E] border border-[#3FB9FF]/30 text-[#3FB9FF] font-black flex items-center justify-center text-xs mb-4">
                3
              </div>
              <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-2">Design</h3>
              <p className="text-[10px] text-[#C7D2E3]/70 font-sans">Designing modern custom UI/UX.</p>
            </div>

            {/* Step 4 */}
            <div className="glass-panel p-5 rounded-2xl border-white/[0.03] bg-[#11182E]/30 relative flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#11182E] border border-[#7C4DFF]/30 text-[#7B61FF] font-black flex items-center justify-center text-xs mb-4">
                4
              </div>
              <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-2">Development</h3>
              <p className="text-[10px] text-[#C7D2E3]/70 font-sans">Writing clean, responsive code.</p>
            </div>

            {/* Step 5 */}
            <div className="glass-panel p-5 rounded-2xl border-white/[0.03] bg-[#11182E]/30 relative flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#11182E] border border-[#7C4DFF]/30 text-[#7B61FF] font-black flex items-center justify-center text-xs mb-4">
                5
              </div>
              <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-2">Testing</h3>
              <p className="text-[10px] text-[#C7D2E3]/70 font-sans">Validating functionality & speed audits.</p>
            </div>

            {/* Step 6 */}
            <div className="glass-panel p-5 rounded-2xl border-white/[0.03] bg-[#11182E]/30 relative flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2D8CFF] to-[#7C4DFF] text-black font-black flex items-center justify-center text-xs mb-4 shadow-glow-neon">
                6
              </div>
              <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-2">Deployment</h3>
              <p className="text-[10px] text-[#C7D2E3]/70 font-sans">Launching to production servers.</p>
            </div>

            {/* Step 7 */}
            <div className="glass-panel p-5 rounded-2xl border-white/[0.03] bg-[#11182E]/30 relative flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#11182E] border border-[#3FB9FF]/30 text-[#3FB9FF] font-black flex items-center justify-center text-xs mb-4">
                7
              </div>
              <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-2">Support</h3>
              <p className="text-[10px] text-[#C7D2E3]/70 font-sans">Continuous upgrades & debug logs.</p>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="relative py-24 md:py-36 px-6 md:px-16 overflow-hidden bg-[#0B1023]/20 border-t border-white/[0.02]">
        <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-[#2F80FF]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 md:mb-24">
            <span className="text-xs uppercase tracking-[0.3em] text-[#3FB9FF] font-semibold mb-3 block">
              Reviews
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
              TESTIMONIALS
            </h2>
          </div>

          {/* Grid of reviews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="glass-panel p-6 md:p-8 rounded-3xl border-white/[0.03] bg-[#11182E]/30 flex flex-col justify-between min-h-[220px]"
              >
                <p className="text-xs md:text-sm text-[#C7D2E3]/90 italic font-sans leading-relaxed mb-6">
                  &ldquo;{item.review}&rdquo;
                </p>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white tracking-wide">{item.name}</span>
                  <span className="text-[10px] text-[#3FB9FF] font-mono mt-0.5">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative py-24 md:py-36 px-6 md:px-16 overflow-hidden bg-[#050816] border-t border-white/[0.02]">
        {/* Glow */}
        <div className="absolute top-[10%] left-[-15%] w-96 h-96 bg-[#2F80FF]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 md:mb-24">
            <span className="text-xs uppercase tracking-[0.3em] text-[#3FB9FF] font-semibold mb-3 block">
              Get In Touch
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
              START A PROJECT
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Comms Links */}
            <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
              <p className="text-xs md:text-sm text-[#C7D2E3] leading-relaxed mb-6 font-sans tracking-wide">
                Ready to elevate your online presence? Drop me a line detailing your project goals, ideal timeline, and budget. Let&apos;s build something next-level.
              </p>

              {/* Info grid */}
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:thilaganms44@gmail.com"
                  className="glass-panel p-5 rounded-2xl border-white/[0.03] hover:border-[#3FB9FF]/30 flex items-center gap-4 transition-all duration-300 bg-[#11182E]/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.01] flex items-center justify-center text-[#3FB9FF]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] text-[#C7D2E3]/50 uppercase tracking-widest font-mono block">Email me</span>
                    <span className="text-sm font-semibold text-white">thilaganms44@gmail.com</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/916381290831"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel p-5 rounded-2xl border-white/[0.03] hover:border-[#3FB9FF]/30 flex items-center gap-4 transition-all duration-300 bg-[#11182E]/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.01] flex items-center justify-center text-[#3FB9FF]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] text-[#C7D2E3]/50 uppercase tracking-widest font-mono block">WhatsApp Message</span>
                    <span className="text-sm font-semibold text-white">+91 63812 90831</span>
                  </div>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel p-5 rounded-2xl border-white/[0.03] hover:border-[#3FB9FF]/30 flex items-center gap-4 transition-all duration-300 bg-[#11182E]/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.01] flex items-center justify-center text-[#3FB9FF]">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] text-[#C7D2E3]/50 uppercase tracking-widest font-mono block">LinkedIn Profile</span>
                    <span className="text-sm font-semibold text-white">Thilagan M.S.</span>
                  </div>
                </a>

                <a
                  href="https://github.com/msthilagan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel p-5 rounded-2xl border-white/[0.03] hover:border-[#3FB9FF]/30 flex items-center gap-4 transition-all duration-300 bg-[#11182E]/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.01] flex items-center justify-center text-[#3FB9FF]">
                    <Github size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] text-[#C7D2E3]/50 uppercase tracking-widest font-mono block">GitHub Repos</span>
                    <span className="text-sm font-semibold text-white">msthilagan</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="col-span-1 lg:col-span-7">
              <div className="glass-panel p-6 md:p-8 rounded-3xl border-white/[0.03] bg-[#11182E]/25 relative shadow-2xl">
                
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#3FB9FF]/10 border border-[#3FB9FF]/20 flex items-center justify-center text-[#3FB9FF] mb-6 shadow-glow-neon animate-bounce">
                      <ShieldCheck size={28} />
                    </div>
                    <h3 className="font-display text-2xl font-black text-white mb-2">
                      INQUIRY SENT
                    </h3>
                    <p className="text-xs text-[#C7D2E3] max-w-xs leading-relaxed font-sans">
                      Thank you, your message has been transmitted. I will review it and get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-[9px] font-bold tracking-widest text-[#C7D2E3]/50 uppercase">
                          Contact Name / Brand
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name or company"
                          required
                          className="w-full bg-[#050816]/60 border border-white/5 hover:border-white/10 focus:border-[#3FB9FF]/50 rounded-xl px-5 py-3.5 text-xs text-white placeholder-neutral-600 outline-none transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-[9px] font-bold tracking-widest text-[#C7D2E3]/50 uppercase">
                          Comms Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="client@address.com"
                          required
                          className="w-full bg-[#050816]/60 border border-white/5 hover:border-white/10 focus:border-[#3FB9FF]/50 rounded-xl px-5 py-3.5 text-xs text-white placeholder-neutral-600 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-[9px] font-bold tracking-widest text-[#C7D2E3]/50 uppercase">
                        Project Brief & Requirement
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        placeholder="Outline your project scope, features needed, and ideal timeline..."
                        required
                        className="w-full bg-[#050816]/60 border border-white/5 hover:border-white/10 focus:border-[#3FB9FF]/50 rounded-xl px-5 py-3.5 text-xs text-white placeholder-neutral-600 outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-[#2D8CFF] to-[#7C4DFF] text-black font-black tracking-widest text-[10px] rounded-xl hover:shadow-[0_0_20px_rgba(47,128,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2 mt-2"
                    >
                      <span>TRANSMIT PROJECT BRIEF</span>
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
      <footer className="relative bg-[#050816] border-t border-white/[0.03] py-12 px-6 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <p className="text-[10px] text-neutral-500 font-sans tracking-wide">
            © {new Date().getFullYear()} THILAGAN M.S. All rights reserved. Premium Freelance Portfolio.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/msthilagan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors duration-200"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors duration-200"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:thilaganms44@gmail.com"
              className="text-neutral-500 hover:text-white transition-colors duration-200"
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
