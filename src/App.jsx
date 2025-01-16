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

const SkillsShowcase = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const skillCategories = [
    {
      name: "Frontend",
      icon: "⚡",
      skills: [
        "React.js",
        "Next.js",
        "TypeScript",
        "React Native",
        "Redux",
        "Tailwind",
        "Bootstrap",
      ],
      color: "from-cyan-400/20 to-blue-400/20",
    },
    {
      name: "Backend",
      icon: "🔧",
      skills: [
        "PHP (Laravel)",
        "PHP (Symfony)",
        "Node.js",
        "Express.js",
        "NestJS",
        "Python",
      ],
      color: "from-blue-400/20 to-purple-400/20",
    },
    {
      name: "DevOps & Tools",
      icon: "🚀",
      skills: ["Docker", "CI/CD", "Git", "GitHub", "Jira"],
      color: "from-purple-400/20 to-pink-400/20",
    },
    {
      name: "Design & UI",
      icon: "🎨",
      skills: ["Figma", "Adobe", "UI/UX", "Responsive Design"],
      color: "from-pink-400/20 to-orange-400/20",
    },
    {
      name: "Databases",
      icon: "💾",
      skills: ["MongoDB", "MySQL", "PostgreSQL"],
      color: "from-orange-400/20 to-yellow-400/20",
    },
    {
      name: "Architecture & Methods",
      icon: "🏗️",
      skills: [
        "Monolithic",
        "Microservice",
        "Repository Pattern",
        "Modular Design",
        "Agile",
        "Scrum",
      ],
      color: "from-yellow-400/20 to-green-400/20",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-light text-center text-white mb-12 tracking-tight"
        >
          Technical <span className="text-cyan-300">Expertise</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setActiveCategory(category.name)}
              onHoverEnd={() => setActiveCategory(null)}
              className={`
                relative p-6 rounded-xl
                bg-gradient-to-br ${category.color}
                border border-white/10
                backdrop-blur-sm
                group
                hover:border-cyan-300/30
                transition-all duration-300
                h-full
              `}
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">{category.icon}</span>
                <h3 className="text-xl font-light text-white">
                  {category.name}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: activeCategory === category.name ? 1.05 : 1,
                    }}
                    transition={{ delay: skillIndex * 0.1 }}
                    className={`
                      p-3 rounded-lg
                      bg-white/5 
                      border border-white/10
                      hover:border-cyan-300/30
                      hover:bg-white/10
                      transition-all duration-300
                      group-hover:transform group-hover:translate-y-[-2px]
                      ${category.skills.length === 1 ? "col-span-2" : ""}
                    `}
                  >
                    <p className="text-white/80 text-sm text-center">{skill}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCategory === category.name ? 1 : 0,
                  scale: activeCategory === category.name ? 1 : 0.8,
                }}
                className="
                  absolute -bottom-2 left-1/2 transform -translate-x-1/2
                  w-8 h-1 bg-cyan-300/50 rounded-full
                  blur-sm
                "
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="
            mt-12 text-center text-white/60 text-sm
            bg-white/5 rounded-full px-6 py-2 inline-block
            backdrop-blur-sm border border-white/10
          "
        >
          Hover over categories to explore skills
        </motion.div>
      </div>
    </div>
  );
};
function App() {
  const [activeSection, setActiveSection] = useState("home");

  const projects = [
    {
      name: "Placeholder",
      description: "Innovative React component library design system",
      technologies: ["React", "Tailwind", "TypeScript", "docker"],
      link: "#",
    },
    {
      name: "Decentralized Task Manager",
      description: "collaborative project management platform",
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
        return <SkillsShowcase />;
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