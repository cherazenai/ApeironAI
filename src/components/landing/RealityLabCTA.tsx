import { motion } from "framer-motion";
import { Atom, ArrowRight } from "lucide-react";

const RealityLabCTA = () => (
  <section className="section-padding">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass glow-border rounded-3xl p-8 md:p-14 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 aurora-bg pointer-events-none" />
        <div className="relative z-10">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6 animate-pulse-glow">
            <Atom size={24} className="text-primary" />
          </div>
          <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-3">
            Explore ApeironAI Reality Lab
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-8 font-body">
            Access experimental AI research tools and future discovery systems developed by Cherazen.
          </p>
          <a
            href="https://labs.cherazen.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl glow-button transition-all duration-300 text-sm hover:brightness-110 group"
          >
            <Atom size={16} />
            Explore Reality Lab
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default RealityLabCTA;
