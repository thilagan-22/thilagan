"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Code, Terminal, Activity, Disc, Layers } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  colSpan: string;
  gradient: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  logoText: string;
}

const projects: Project[] = [
  {
    id: "saas-dashboard",
    title: "SaaS Dashboard",
    category: "Admin Platform",
    description: "A comprehensive administrative dashboard showcasing modular analytical widgets, live user metrics, subscription control pipelines, and multi-tenant management systems.",
    tags: ["React", "Next.js", "Recharts", "Tailwind CSS"],
    githubUrl: "https://github.com/msthilagan",
    liveUrl: "https://vercel.app",
    colSpan: "md:col-span-8",
    gradient: "from-[#2D8CFF]/20 via-[#3FB9FF]/10 to-transparent",
    icon: Terminal,
    logoText: "SaaS.DB"
  },
  {
    id: "ecommerce-store",
    title: "E-Commerce Store",
    category: "Online Commerce",
    description: "High-performance digital marketplace featuring Stripe payments, custom cart state engines, dynamic product filtering, and vendor inventory panels.",
    tags: ["Next.js", "Stripe", "MongoDB", "Redux Toolkit"],
    githubUrl: "https://github.com/msthilagan",
    liveUrl: "https://vercel.app",
    colSpan: "md:col-span-4",
    gradient: "from-[#7C4DFF]/20 via-[#7B61FF]/10 to-transparent",
    icon: Activity,
    logoText: "EC.SHOP"
  },
  {
    id: "business-landing",
    title: "Business Landing Page",
    category: "Corporate Pitch",
    description: "Ultra-fast corporate landing layout optimized for lead collection, SEO indexing, conversion tracking, and smooth interactive animations.",
    tags: ["HTML5", "Tailwind CSS", "Framer Motion", "GSAP"],
    githubUrl: "https://github.com/msthilagan",
    liveUrl: "https://vercel.app",
    colSpan: "md:col-span-4",
    gradient: "from-[#3FB9FF]/20 via-[#2D8CFF]/10 to-transparent",
    icon: Layers,
    logoText: "BIZ.LAND"
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    category: "Personal Branding",
    description: "Premium interactive portfolio layout built for web designers and creators to display services, case studies, and floating details with high-end glassmorphism.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "React"],
    githubUrl: "https://github.com/msthilagan",
    liveUrl: "https://vercel.app",
    colSpan: "md:col-span-8",
    gradient: "from-[#7B61FF]/20 via-[#7C4DFF]/10 to-transparent",
    icon: Code,
    logoText: "PF.SITE"
  },
  {
    id: "ai-chat-app",
    title: "AI Chat Application",
    category: "AI Interfaces",
    description: "Real-time chat interface connected to OpenAI models. Incorporates markdown streaming answers, speech-to-text recognition, and vector database embeddings search.",
    tags: ["Next.js", "OpenAI API", "Pinecone", "WebSockets"],
    githubUrl: "https://github.com/msthilagan",
    liveUrl: "https://vercel.app",
    colSpan: "md:col-span-6",
    gradient: "from-[#2D8CFF]/20 via-[#7C4DFF]/10 to-transparent",
    icon: Disc,
    logoText: "AI.CHAT"
  },
  {
    id: "restaurant-website",
    title: "Restaurant Website",
    category: "Local Business",
    description: "Interactive landing site for dining chains featuring digital menus, live table reservation schedulers, and integrated checkout systems for pickup orders.",
    tags: ["React", "Tailwind CSS", "Supabase", "Mapbox"],
    githubUrl: "https://github.com/msthilagan",
    liveUrl: "https://vercel.app",
    colSpan: "md:col-span-6",
    gradient: "from-[#7B61FF]/20 via-[#3FB9FF]/10 to-transparent",
    icon: Terminal,
    logoText: "REST.IO"
  },
  {
    id: "task-management",
    title: "Task Management App",
    category: "Productivity Tool",
    description: "Trello-style drag and drop task manager showcasing custom board creation, workflow pipelines, user collaboration controls, and activity logs.",
    tags: ["React Beautiful Dnd", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/msthilagan",
    liveUrl: "https://vercel.app",
    colSpan: "md:col-span-6",
    gradient: "from-[#3FB9FF]/20 via-[#7C4DFF]/10 to-transparent",
    icon: Activity,
    logoText: "TASK.HQ"
  },
  {
    id: "real-estate",
    title: "Real Estate Website",
    category: "Property Portal",
    description: "Advanced property listing engine integrating geolocation search maps, advanced filtering variables, virtual tour modals, and broker contact forms.",
    tags: ["Next.js", "Google Maps API", "Tailwind CSS", "Supabase"],
    githubUrl: "https://github.com/msthilagan",
    liveUrl: "https://vercel.app",
    colSpan: "md:col-span-6",
    gradient: "from-[#2D8CFF]/20 via-[#3FB9FF]/10 to-transparent",
    icon: Layers,
    logoText: "RE.ESTATE"
  }
];

export default function Projects() {
  return (
    <section id="portfolio" className="relative bg-[#050816] py-24 md:py-36 px-6 md:px-16 overflow-hidden">
      {/* Background glow node */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2F80FF]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#3FB9FF] font-semibold mb-3 block">
              Featured Work
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
              SELECTED PROJECTS
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#C7D2E3] max-w-sm font-sans tracking-wide leading-relaxed">
            A curated showcase of applications highlighting the synthesis of creative interactions, clean layouts, and high-performance front-end engineering.
          </p>
        </div>

        {/* Asymmetrical Typographic Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className={`group glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col h-[400px] relative ${project.colSpan} border-white/[0.03]`}
              >
                {/* Brand Typographic Banner */}
                <div className={`w-full h-[40%] relative overflow-hidden bg-[#0B1023] border-b border-white/5 flex items-center justify-between px-8 bg-gradient-to-br ${project.gradient}`}>
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#3FB9FF]/60 mb-1">
                      {project.category}
                    </span>
                    <span className="font-display text-2xl font-black tracking-widest text-white/90">
                      {project.logoText}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-white/40 group-hover:text-[#3FB9FF] group-hover:border-[#3FB9FF]/30 transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  {/* Subtle matrix-like grid accent line */}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3FB9FF]/20 to-transparent" />
                </div>

                {/* Text Details Container */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative z-10">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-tight text-white group-hover:text-[#3FB9FF] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#C7D2E3] hover:text-white transition-colors duration-200"
                          title="GitHub Repository"
                        >
                          <Github size={18} />
                        </a>
                      </div>
                    </div>
                    
                    <p className="text-xs md:text-sm text-[#C7D2E3] font-sans tracking-wide leading-relaxed line-clamp-3 mb-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags & CTA */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono tracking-wider text-[#C7D2E3]/50 border border-white/[0.05] rounded px-2 py-0.5 bg-white/[0.01]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#3FB9FF] transition-colors duration-300"
                    >
                      <span>LIVE DEMO</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
