import { motion } from "framer-motion";
import { Brain, Lightbulb, Atom, FlaskConical, MessageSquare, Network, BookOpen, Clock, Settings2, Compass } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Knowledge Engine", desc: "Reads and connects knowledge across thousands of scientific papers in real-time." },
  { icon: Lightbulb, title: "Hypothesis Generator", desc: "Generates novel hypotheses with confidence scores and supporting evidence." },
  { icon: Atom, title: "Reality Simulation Engine", desc: "Predicts experimental outcomes before you step into the lab." },
  { icon: FlaskConical, title: "Experiment Planner", desc: "AI-designed step-by-step protocols to test your hypotheses efficiently." },
  { icon: MessageSquare, title: "Research Copilot", desc: "Ask scientific questions and get research-backed answers instantly." },
  { icon: Network, title: "Scientific Knowledge Graph", desc: "Map relationships between concepts, papers, and discoveries visually." },
  { icon: BookOpen, title: "AI Paper Reader", desc: "Upload papers and extract key insights, methods, and implications." },
  { icon: Clock, title: "Discovery Timeline", desc: "Track the evolution of scientific ideas and breakthroughs over time." },
  { icon: Settings2, title: "Experiment Optimization", desc: "Optimize experimental parameters using AI-driven analysis." },
  { icon: Compass, title: "Discovery Recommendations", desc: "Get AI-suggested research directions based on your work." },
];

const Features = () => (
  <section id="features" className="section-padding aurora-bg">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-body">
          Platform Capabilities
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
          Tools for the Future of Research
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="glass-hover rounded-2xl p-6 group cursor-default"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)] transition-all duration-500">
              <f.icon size={18} className="text-primary" />
            </div>
            <h3 className="font-heading text-sm font-semibold mb-1.5">{f.title}</h3>
            <p className="text-muted-foreground text-xs leading-relaxed font-body">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
