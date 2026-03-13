import { useState, useEffect } from "react";
import { User, Mail, Building, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles" as any).select("*").eq("id", user.id).single().then(({ data }) => {
      if (data) {
        setFullName((data as any).full_name || "");
        setOrganization((data as any).organization || "");
      }
    });
  }, [user]);

  const save = async () => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase.from("profiles" as any).update({ full_name: fullName, organization } as any).eq("id", user.id);
    setLoading(false);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Profile updated!" });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-heading text-foreground">Profile</h1>

      <Card className="glass">
        <CardHeader><CardTitle className="text-lg font-heading">Personal Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-foreground font-medium">{fullName || "Researcher"}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-card-elevated border-border" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Email</label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Input value={user?.email || ""} disabled className="bg-card-elevated border-border opacity-60" />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Organization</label>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <Input value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Your institution" className="bg-card-elevated border-border" />
              </div>
            </div>
          </div>
          <Button onClick={save} disabled={loading} className="glow-button mt-2 gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
