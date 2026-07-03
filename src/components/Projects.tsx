"use client";
 
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Terminal, Activity, Disc, Layers } from "lucide-react";
 
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
    id: "boiler-iot",
    title: "Boiler Monitoring IoT & ML System",
    category: "IoT & ML Automation",
    description: "Architected and simulated a real-time boiler monitoring solution using embedded controller telemetry and predictive machine learning models to detect critical pressure/temperature anomalies and optimize fuel efficiency.",
    tags: ["ESP32", "Machine Learning", "WebSockets", "Next.js", "Node.js"],
    githubUrl: "https://github.com/thilagan-22",
    liveUrl: "#contact",
    colSpan: "md:col-span-6",
    gradient: "from-[#00FF95]/15 via-[#00E5FF]/5 to-transparent",
    icon: Terminal,
    logoText: "BOILER.IOT"
  },
  {
    id: "wireless-charging",
    title: "Resonant Wireless Charging System",
    category: "Hardware & Embedded",
    description: "Designed a high-efficiency resonant inductive wireless power transfer system. Formulated custom transmission and reception coil geometry with automated overvoltage safety cutoffs and load tracking mechanisms.",
    tags: ["Altium Designer", "PCB Design", "Power Electronics", "Simulations"],
    githubUrl: "https://github.com/thilagan-22",
    liveUrl: "#contact",
    colSpan: "md:col-span-6",
    gradient: "from-[#00E5FF]/15 via-[#00FF95]/5 to-transparent",
    icon: Activity,
    logoText: "WIRELESS.CHG"
  },
  {
    id: "rfid-access",
    title: "RFID Smart Access Control Gate",
    category: "Security Systems",
    description: "Developed an autonomous RFID-based access control gates system integrated with secure log databases. Features encrypted key verification, quick lockout triggers, and local LCD status indicators.",
    tags: ["Arduino", "Proteus Simulation", "RFID Logic", "C++", "Supabase"],
    githubUrl: "https://github.com/thilagan-22",
    liveUrl: "#contact",
    colSpan: "md:col-span-6",
    gradient: "from-[#00FF95]/15 via-[#00E5FF]/5 to-transparent",
    icon: Layers,
    logoText: "RFID.GATE"
  },
  {
    id: "solar-dewatering",
    title: "Solar Powered Dewatering in Mining Operations",
    category: "Power Systems & Control",
    description: "Simulated a grid-tied solar hybrid power system tailored for high-volume dewatering pumps in open-cast mines. Engineered maximum power point tracking (MPPT) algorithms and automated load shedding controllers.",
    tags: ["MATLAB", "KiCad", "MPPT Control", "Solar Hybrid", "Power Grids"],
    githubUrl: "https://github.com/thilagan-22",
    liveUrl: "#contact",
    colSpan: "md:col-span-6",
    gradient: "from-[#00E5FF]/15 via-[#00FF95]/5 to-transparent",
    icon: Disc,
    logoText: "SOLAR.PUMP"
  }
];
 
export default function Projects() {
  return (
    <section id="projects" className="relative bg-[#050505] py-24 md:py-36 px-6 md:px-16 overflow-hidden">
      {/* Background glow node */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF95]/5 rounded-full blur-[150px] pointer-events-none" />
 
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#00FF95] font-semibold mb-3 block">
              Featured Work
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
              SELECTED PROJECTS
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#8F9CAE] max-w-sm font-sans tracking-wide leading-relaxed">
            A curated showcase of engineering developments combining hardware schematic validation, PCB layout layouts, firmware design, and web UI dashboards.
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
                className={`group glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col h-[400px] relative ${project.colSpan} border-white/[0.03] bg-[#0D1117]/30`}
              >
                {/* Brand Typographic Banner */}
                <div className={`w-full h-[40%] relative overflow-hidden bg-[#0D1117] border-b border-white/5 flex items-center justify-between px-8 bg-gradient-to-br ${project.gradient}`}>
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#00FF95]/60 mb-1">
                      {project.category}
                    </span>
                    <span className="font-display text-2xl font-black tracking-widest text-white/90">
                      {project.logoText}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-white/40 group-hover:text-[#00FF95] group-hover:border-[#00FF95]/30 transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  {/* Subtle matrix-like grid accent line */}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF95]/20 to-transparent" />
                </div>
 
                {/* Text Details Container */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative z-10">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h3 className="font-display text-lg md:text-xl font-extrabold tracking-tight text-white group-hover:text-[#00FF95] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8F9CAE] hover:text-white transition-colors duration-200"
                          title="GitHub Repository"
                        >
                          <Github size={18} />
                        </a>
                      </div>
                    </div>
                    
                    <p className="text-xs md:text-sm text-[#8F9CAE] font-sans tracking-wide leading-relaxed line-clamp-3 mb-4">
                      {project.description}
                    </p>
                  </div>
 
                  {/* Tech Tags & CTA */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono tracking-wider text-[#8F9CAE]/60 border border-white/[0.05] rounded px-2 py-0.5 bg-[#050505]/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
 
                    <a
                      href={project.liveUrl}
                      className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#00FF95] transition-colors duration-300"
                    >
                      <span>DETAILS</span>
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
