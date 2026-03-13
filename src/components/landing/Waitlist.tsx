import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const { toast } = useToast();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);

    const { error } = await supabase.from("waitlist" as any).insert({ email: email.trim(), name: name.trim() } as any);
    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast({ title: "Already on the waitlist!", description: "This email is already registered." });
        setJoined(true);
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    } else {
      setJoined(true);
      toast({ title: "You're on the list! 🎉", description: "We'll notify you when access opens." });
    }
  };

  return (
    <section id="waitlist" className="section-padding">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm uppercase tracking-[0.25em] text-primary mb-3 font-body">Early Access</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">Join the Waitlist</h2>
          <p className="text-muted-foreground mb-8 font-body">Be the first to access ApeironAI when we launch publicly.</p>

          {joined ? (
            <div className="glass glow-border rounded-2xl p-8 flex flex-col items-center gap-3">
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <p className="font-heading text-lg">You're on the list!</p>
              <p className="text-sm text-muted-foreground">We'll reach out when your access is ready.</p>
            </div>
          ) : (
            <form onSubmit={handleJoin} className="glass rounded-2xl p-6 space-y-3">
              <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="bg-card-elevated border-border" />
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 bg-card-elevated border-border" required />
                </div>
                <Button type="submit" disabled={loading} className="glow-button">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Waitlist;
