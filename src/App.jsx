import React, { useState, useEffect, useRef } from "react";
import {
  Home as HomeIcon,
  User as UserIcon,
  Briefcase as ProjectIcon,
  Code as SkillIcon,
  Send as ContactIcon,
  ArrowUpRight,
  Github,
  Linkedin,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useInView,
  useAnimation,
} from "framer-motion";


const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, () => ({
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.2,
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-cyan-300/20 blur-sm"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            animation: `float ${particle.speed * 10}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

const Navigation = ({ setActiveSection, activeSection }) => {
  const navItems = [
    { icon: HomeIcon, label: "home" },
    { icon: UserIcon, label: "about" },
    { icon: ProjectIcon, label: "projects" },
    { icon: SkillIcon, label: "skills" },
    { icon: ContactIcon, label: "contact" },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex space-x-4 bg-white/10 backdrop-blur-lg rounded-full p-2 border border-white/10 shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveSection(item.label)}
            className={`
              group relative p-3 rounded-full transition-all duration-300
              ${
                activeSection === item.label
                  ? "bg-white/20 text-cyan-300"
                  : "text-white/60 hover:text-white/80"
              }
            `}
          >
            <div className="relative">
              <item.icon />
              {activeSection === item.label && (
                <span
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 
                    w-1 h-1 bg-cyan-300 rounded-full"
                ></span>
              )}
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
};

const HomeSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative">
      <div
        className={`
          max-w-2xl text-white transition-all duration-1000 transform
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }
        `}
      >
        <div
          className="w-32 h-32 mx-auto mb-6 rounded-full border-2 border-cyan-300/50 
          bg-white/5 flex items-center justify-center overflow-hidden"
        >
          <div
            className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 
          animate-pulse"
          ></div>
        </div>

        <h1 className="text-5xl font-extralight mb-4 tracking-tight">
          <span className="text-cyan-300">Oumaima Takrour</span>
        </h1>

        <p className="text-xl text-white/70 mb-8 font-light tracking-wide">
          Full Stack Developer | Creating Digital Experiences
        </p>

        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/OUMAIMAtakrour"
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-6 py-2 rounded-full border border-white/20 
              bg-white/5 text-white/80 
              hover:bg-white/10 hover:text-cyan-300
              transition-all duration-300
              backdrop-blur-sm
              flex items-center space-x-2
            "
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/oumaima-takrour/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-6 py-2 rounded-full border border-white/20 
              bg-white/5 text-white/80 
              hover:bg-white/10 hover:text-cyan-300
              transition-all duration-300
              backdrop-blur-sm
              flex items-center space-x-2
            "
          >
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const controls = useAnimation();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = -(x - centerX) / 20;

    controls.start({
      rotateX,
      rotateY,
      transition: { duration: 0.1 },
    });
  };

  const handleMouseLeave = () => {
    controls.start({
      rotateX: 0,
      rotateY: 0,
      transition: { duration: 0.5 },
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000"
    >
      <motion.div
        animate={controls}
        className="
          bg-white/5 border border-white/10 rounded-2xl p-6 
          transform transition-all duration-300 
          hover:border-cyan-300/30
          backdrop-blur-sm
          preserve-3d
        "
      >
        <motion.h3
          className="text-2xl font-light text-white mb-3 tracking-tight flex items-center"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {project.name}
          <ArrowUpRight className="ml-2 w-5 h-5 text-cyan-300" />
        </motion.h3>

        <motion.p
          className="text-white/70 mb-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {project.description}
        </motion.p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + techIndex * 0.1 }}
              className="
                px-2 py-1 rounded-full text-xs 
                bg-white/10 text-white/80
              "
            >
              {tech}
            </motion.span>
          ))}
        </div>

        <motion.a
          href={project.link}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="
            inline-block px-4 py-2 rounded-full 
            border border-white/20 text-white/80
            hover:bg-cyan-300/10 hover:text-cyan-300
            transition-all duration-300
          "
        >
          View Project
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

const SkillsSphere = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const sphereRef = useRef(null);
  const isInView = useInView(sphereRef);

  const skillCategories = [
    {
      name: "Frontend",
      skills: ["React", "Next.js", "Tailwind", "Bootstrap"],
      color: "text-cyan-300",
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express", "Docker", "Microservices"],
      color: "text-blue-300",
    },
    {
      name: "Tools & Cloud",
      skills: ["AWS", "Git", "CI/CD", "Github"],
      color: "text-purple-300",
    },
  ];

  const calculatePosition = (index, total) => {
    const radius = 200;
    const angle = (index / total) * Math.PI * 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <div
      ref={sphereRef}
      className="relative w-full h-[600px] flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={
          isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }
        }
        transition={{ duration: 0.5 }}
        className="relative w-[50px] h-[200px]"
      >
        {skillCategories.flatMap((category, categoryIndex) =>
          category.skills.map((skill, skillIndex) => {
            const total = skillCategories.reduce(
              (sum, cat) => sum + cat.skills.length,
              0
            );
            const position = calculatePosition(
              categoryIndex * category.skills.length + skillIndex,
              total
            );

            return (
              <motion.div
                key={`${category.name}-${skill}`}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0.5,
                  opacity: 0,
                }}
                animate={
                  isInView
                    ? {
                        x: position.x,
                        y: position.y,
                        scale: activeSkill === skill ? 1.2 : 1,
                        opacity: 1,
                      }
                    : { x: 0, y: 0, scale: 0.5, opacity: 0 }
                }
                transition={{
                  duration: 0.5,
                  delay:
                    (categoryIndex * category.skills.length + skillIndex) * 0.1,
                }}
                onMouseEnter={() => setActiveSkill(skill)}
                onMouseLeave={() => setActiveSkill(null)}
                className="
                  absolute w-20 h-20 rounded-full 
                  bg-white/10 border border-white/20
                  flex items-center justify-center
                  cursor-pointer hover:bg-white/20
                  transition-all duration-300
                "
              >
                <span className="text-white text-sm">{skill}</span>
              </motion.div>
            );
          })
        )}

        {activeSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="
              absolute bottom-[-200px] left-1/2 transform -translate-x-1/2
              bg-white/10 border border-white/20 rounded-xl
              px-6 py-4 text-center
            "
          >
            <p className="text-white text-lg">{activeSkill}</p>
            {/* <p className="text-white/70 text-sm">Hover to explore skills</p> */}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState("home");

  const projects = [
    {
      name: "Placeholder",
      description:
        "Innovative React component library  design system",
      technologies: ["React", "Tailwind", "TypeScript", "docker"],
      link: "#",
    },
    {
      name: "Decentralized Task Manager",
      description:
        " collaborative project management platform",
      technologies: ["Next.js", "nestjs", "Solid", "Pgsql"],
      link: "#",
    },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection />;
      case "projects":
        return (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        );
      case "skills":
        return (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
              <h2 className="text-4xl font-light text-center text-white mb-12 tracking-tight">
                Tech <span className="text-cyan-300">Arsenal</span>
              </h2>
              <SkillsSphere />
            </div>
          </div>
        );
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <AnimatePresence mode="wait">{renderSection()}</AnimatePresence>
      <Navigation
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
    </div>
  );
}

export default App;
