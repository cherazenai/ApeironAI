import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";

const demoResponses = [
  `## Hypothesis: Lithium-Sulfur Hybrid Cathode\n\n**Confidence:** 87%\n\nA lithium-sulfur cathode doped with MXene (Ti₃C₂Tₓ) nanosheets could increase energy density by ~40% compared to conventional Li-ion cells.\n\n### Supporting Evidence\n- Wang et al. (2024) — MXene interlayers suppress polysulfide shuttling\n- Chen et al. (2023) — Ti₃C₂Tₓ improves conductivity in sulfur cathodes\n- Park et al. (2024) — Hybrid architectures achieve 500 Wh/kg\n\n### Suggested Experiments\n1. Synthesize Ti₃C₂Tₓ/S composite via vacuum filtration\n2. Characterize via XRD and SEM\n3. Electrochemical cycling at 0.1C–2C rates`,
  `## Hypothesis: Graphene-Silicon Anode Architecture\n\n**Confidence:** 82%\n\nA crumpled graphene–silicon nanoparticle composite anode could achieve 2x the capacity of graphite anodes while maintaining 90% capacity retention over 500 cycles.\n\n### Supporting Evidence\n- Zhang et al. (2024) — Crumpled graphene accommodates Si expansion\n- Liu et al. (2023) — Si nanoparticles reduce pulverization\n- Kim et al. (2024) — Composite anodes show 1800 mAh/g capacity\n\n### Suggested Experiments\n1. Spray-dry graphene oxide with Si nanoparticles\n2. Thermal reduction at 800°C under Ar\n3. Half-cell testing vs lithium metal`,
  `## Hypothesis: Solid-State Electrolyte with Garnet Framework\n\n**Confidence:** 91%\n\nLi₇La₃Zr₂O₁₂ (LLZO) garnet electrolytes with Al-doping could enable dendrite-free lithium metal batteries with ionic conductivity >1 mS/cm at room temperature.\n\n### Supporting Evidence\n- Murugan et al. (2023) — LLZO shows high Li-ion conductivity\n- Sharafi et al. (2024) — Al-doping stabilizes cubic phase\n- Han et al. (2024) — Garnet SSE suppresses dendrite growth\n\n### Suggested Experiments\n1. Sol-gel synthesis of Al-doped LLZO\n2. Impedance spectroscopy characterization\n3. Symmetric Li|LLZO|Li cell cycling`,
];

const Demo = () => {
  const [submitted, setSubmitted] = useState(false);
  const response = useMemo(() => demoResponses[Math.floor(Math.random() * demoResponses.length)], []);

  return (
    <section id="demo" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-body">Live Preview</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">See ApeironAI in Action</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl glow-border overflow-hidden"
        >
          <div className="flex items-center gap-2 px-5 py-3 border-b border-border/50">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
            <span className="ml-3 text-xs text-muted-foreground font-body">ApeironAI Research Copilot</span>
          </div>

          <div className="p-5 md:p-8">
            <div className="flex items-center gap-3 glass rounded-xl px-4 py-3 mb-6">
              <Sparkles size={16} className="text-primary flex-shrink-0" />
              <span className="text-sm text-foreground font-body flex-1">
                Suggest new battery chemistry to improve energy density.
              </span>
              <button
                onClick={() => setSubmitted(true)}
                className="bg-primary text-primary-foreground rounded-lg p-2 glow-button transition-all hover:brightness-110"
              >
                <Send size={14} />
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card-elevated rounded-xl p-6 max-h-[400px] overflow-y-auto"
              >
                <div className="prose prose-invert prose-sm max-w-none font-body">
                  <ReactMarkdown>{response}</ReactMarkdown>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground/50 text-sm font-body">Click send to see a demo response</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Demo;
