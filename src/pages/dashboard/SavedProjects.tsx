import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FolderKanban, Plus, Clock, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Project { id: string; title: string; description: string; created_at: string; }

const SavedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchProjects = async () => {
    if (!user) return;
    const { data } = await supabase.from("projects" as any).select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    if (data) setProjects(data as any);
  };

  useEffect(() => { fetchProjects(); }, [user]);

  const createProject = async () => {
    if (!user || !title.trim()) return;
    const { error } = await supabase.from("projects" as any).insert({ user_id: user.id, title, description } as any);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setTitle(""); setDescription(""); setOpen(false);
      fetchProjects();
      toast({ title: "Project created!" });
    }
  };

  const deleteProject = async (id: string) => {
    await supabase.from("projects" as any).delete().eq("id", id);
    fetchProjects();
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading text-foreground">Saved Projects</h1>
          <p className="text-muted-foreground text-sm">Organize your research</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="glow-button gap-2"><Plus className="h-4 w-4" /> New Project</Button>
          </DialogTrigger>
          <DialogContent className="glass">
            <DialogHeader><DialogTitle className="font-heading">New Project</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Project title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-card-elevated border-border" />
              <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-card-elevated border-border" />
              <Button onClick={createProject} className="glow-button w-full">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {projects.length === 0 ? (
        <Card className="glass">
          <CardContent className="p-8 text-center">
            <FolderKanban className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No projects yet. Create one to organize your research.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-hover">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FolderKanban className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground text-sm">{p.title}</h3>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => deleteProject(p.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  {p.description && <p className="text-sm text-muted-foreground mb-3">{p.description}</p>}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {new Date(p.created_at).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedProjects;
