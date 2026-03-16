import { motion } from "framer-motion";
import { Database, Network, Brain, Lightbulb, Atom } from "lucide-react";

const layers = [
  { icon: Database, label: "Paper Ingestion", desc: "Parse and index scientific literature" },
  { icon: Network, label: "Knowledge Graph", desc: "Map relationships between concepts" },
  { icon: Brain, label: "Reasoning Layer", desc: "Deep analysis and pattern recognition" },
  { icon: Lightbulb, label: "Hypothesis Engine", desc: "Generate and rank hypotheses" },
  { icon: Atom, label: "Simulation Layer", desc: "Predict experimental outcomes" },
];

const Architecture = () => (
  <section id="research" className="section-padding">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-body">System Architecture</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">Discovery Engine</h2>
      </motion.div>

      <div className="space-y-3">
        {layers.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <div className="glass-hover rounded-xl px-6 py-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <s.icon size={18} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-sm font-semibold text-foreground">{s.label}</h3>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
              <span className="text-xs text-primary/60 font-body">Layer {i + 1}</span>
            </div>
            {i < layers.length - 1 && (
              <div className="flex justify-center py-0.5">
                <div className="w-px h-4 bg-gradient-to-b from-primary/30 to-transparent" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Architecture;
