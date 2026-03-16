import { motion } from "framer-motion";
import { Brain, Layers, Dna, CloudSun, Zap, Atom, Beaker, HeartPulse } from "lucide-react";

const fields = [
  { icon: Brain, name: "Artificial Intelligence", desc: "Advance machine learning architectures and neural reasoning systems." },
  { icon: Layers, name: "Materials Science", desc: "Discover novel materials and simulate molecular interactions." },
  { icon: Dna, name: "Biotechnology", desc: "Explore protein structures, gene editing insights, and biological systems." },
  { icon: CloudSun, name: "Climate Science", desc: "Model climate systems and discover environmental solutions." },
  { icon: Zap, name: "Energy Systems", desc: "Design next-generation battery chemistries and energy materials." },
  { icon: Atom, name: "Physics", desc: "Simulate quantum systems and explore fundamental forces." },
  { icon: Beaker, name: "Chemistry", desc: "Predict reaction pathways and synthesize new compounds." },
  { icon: HeartPulse, name: "Medicine", desc: "Discover drug targets and predict molecular interactions." },
];

const ResearchFields = () => (
  <section className="section-padding aurora-bg">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-body">Research Domains</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">Built for Researchers</h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm font-body">
          ApeironAI is designed to assist scientists, engineers, and innovators in accelerating scientific discovery across disciplines.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {fields.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="glass-hover rounded-2xl p-5 group cursor-default text-center"
          >
            <div className="w-10 h-10 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.4)] transition-all duration-500">
              <f.icon size={18} className="text-primary" />
            </div>
            <h3 className="font-heading text-sm font-semibold mb-1">{f.name}</h3>
            <p className="text-muted-foreground text-xs leading-relaxed font-body">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ResearchFields;
