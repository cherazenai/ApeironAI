import { motion } from "framer-motion";
import { HeartPulse, Battery, CloudSun, Beaker } from "lucide-react";

const cases = [
  { icon: HeartPulse, field: "Medicine", desc: "Discover novel drug targets and predict molecular interactions." },
  { icon: Battery, field: "Energy", desc: "Design next-generation battery materials with higher energy density." },
  { icon: CloudSun, field: "Climate", desc: "Find breakthrough carbon capture materials and processes." },
  { icon: Beaker, field: "Chemistry", desc: "Predict chemical reaction pathways and synthesis routes." },
];

const UseCases = () => (
  <section id="usecases" className="section-padding">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-body">Use Cases</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
          Across Every Frontier of Science
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cases.map((c, i) => (
          <motion.div
            key={c.field}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="glass-hover rounded-2xl p-6 text-center group cursor-default"
          >
            <div className="w-12 h-12 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.3)] transition-all duration-500">
              <c.icon size={20} className="text-primary" />
            </div>
            <h3 className="font-heading text-base font-semibold mb-1.5">{c.field}</h3>
            <p className="text-muted-foreground text-xs font-body leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCases;
