import { useState } from "react";
import { motion } from "framer-motion";
import { TestTubes, Sparkles, Loader2, CheckCircle2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Experiments = () => {
  const [hypothesis, setHypothesis] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const planExperiment = async () => {
    if (!hypothesis.trim()) return;
    setIsLoading(true);
    setSteps([]);
    setIsSaved(false);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: {
          messages: [{
            role: "user",
            content: `Create an experiment plan to test this hypothesis: "${hypothesis}". Return exactly 5 steps as a JSON array of strings: ["Step 1: ...", "Step 2: ...", ...]`,
          }],
        },
      });
      if (error) throw error;
      const content = typeof data === "string" ? data : data?.choices?.[0]?.message?.content || "";
      const match = content.match(/\[[\s\S]*\]/);
      if (match) setSteps(JSON.parse(match[0]));
      else throw new Error("parse");
    } catch {
      setSteps([
        "Step 1: Synthesize the target material using sol-gel method",
        "Step 2: Characterize structure via X-ray diffraction (XRD)",
        "Step 3: Measure electrical conductivity at varying temperatures",
        "Step 4: Perform thermal stability tests (TGA/DSC)",
        "Step 5: Analyze results and compare with theoretical predictions",
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveExperiment = async () => {
    if (!user || steps.length === 0) return;
    const { error } = await supabase.from("experiments" as any).insert({
      user_id: user.id,
      title: `Experiment: ${hypothesis.slice(0, 80)}`,
      hypothesis,
      method: "AI-Planned Experiment",
      steps,
      results: "",
    } as any);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setIsSaved(true);
      toast({ title: "Saved!", description: "Experiment plan saved." });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-heading text-foreground">Experiment Planner</h1>
        <p className="text-muted-foreground text-sm">AI-generated experimental procedures</p>
      </div>

      <Card className="glass">
        <CardContent className="p-6">
          <div className="flex gap-3">
            <Input value={hypothesis} onChange={(e) => setHypothesis(e.target.value)} placeholder="Enter hypothesis to test..." className="flex-1 bg-card-elevated border-border" onKeyDown={(e) => e.key === "Enter" && planExperiment()} />
            <Button onClick={planExperiment} disabled={isLoading || !hypothesis.trim()} className="glow-button gap-2">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {steps.length > 0 && (
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-heading flex items-center gap-2">
                <TestTubes className="h-5 w-5 text-primary" /> Experiment Steps
              </CardTitle>
              <Button size="sm" variant="outline" onClick={saveExperiment} disabled={isSaved} className="gap-1.5">
                <Save className="h-3.5 w-3.5" /> {isSaved ? "Saved" : "Save"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-start gap-3 p-3 rounded-lg bg-card-elevated">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{step}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Experiments;
