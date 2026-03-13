import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Plus, Search, Tag, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Paper { id: string; title: string; authors: string; summary: string; link: string; tags: string[]; created_at: string; }

const PaperLibrary = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", authors: "", summary: "", link: "", tags: "" });
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchPapers = async () => {
    if (!user) return;
    const { data } = await supabase.from("papers" as any).select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    if (data) setPapers(data as any);
  };

  useEffect(() => { fetchPapers(); }, [user]);

  const filtered = papers.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.tags || []).some((t) => t.includes(search.toLowerCase()))
  );

  const addPaper = async () => {
    if (!user || !form.title.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("papers" as any).insert({
      user_id: user.id,
      title: form.title,
      authors: form.authors,
      summary: form.summary,
      link: form.link,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
    } as any);
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setForm({ title: "", authors: "", summary: "", link: "", tags: "" });
      setOpen(false);
      fetchPapers();
      toast({ title: "Paper added!" });
    }
  };

  const deletePaper = async (id: string) => {
    await supabase.from("papers" as any).delete().eq("id", id);
    fetchPapers();
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading text-foreground">Paper Library</h1>
          <p className="text-muted-foreground text-sm">Manage and explore research papers</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="glow-button gap-2"><Plus className="h-4 w-4" /> Add Paper</Button>
          </DialogTrigger>
          <DialogContent className="glass">
            <DialogHeader><DialogTitle className="font-heading">Add Paper</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Title" value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} className="bg-card-elevated border-border" />
              <Input placeholder="Authors" value={form.authors} onChange={(e) => setForm(f => ({ ...f, authors: e.target.value }))} className="bg-card-elevated border-border" />
              <Textarea placeholder="Summary" value={form.summary} onChange={(e) => setForm(f => ({ ...f, summary: e.target.value }))} className="bg-card-elevated border-border" />
              <Input placeholder="Link (optional)" value={form.link} onChange={(e) => setForm(f => ({ ...f, link: e.target.value }))} className="bg-card-elevated border-border" />
              <Input placeholder="Tags (comma-separated)" value={form.tags} onChange={(e) => setForm(f => ({ ...f, tags: e.target.value }))} className="bg-card-elevated border-border" />
              <Button onClick={addPaper} disabled={saving} className="glow-button w-full">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Paper"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search papers by title or tag..." className="pl-10 bg-card-elevated border-border" />
      </div>

      {filtered.length === 0 ? (
        <Card className="glass"><CardContent className="p-8 text-center"><BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" /><p className="text-muted-foreground">{papers.length === 0 ? "No papers yet. Add your first paper." : "No matching papers."}</p></CardContent></Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((paper, i) => (
            <motion.div key={paper.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="glass-hover">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="h-4 w-4 text-primary shrink-0" />
                        <h3 className="font-semibold text-foreground text-sm truncate">{paper.title}</h3>
                      </div>
                      {paper.authors && <p className="text-xs text-muted-foreground mb-2">{paper.authors}</p>}
                      {paper.summary && <p className="text-sm text-muted-foreground mb-3">{paper.summary}</p>}
                      {paper.tags?.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                          {paper.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                              <Tag className="h-3 w-3 mr-1" /> {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-destructive" onClick={() => deletePaper(paper.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

export default PaperLibrary;
