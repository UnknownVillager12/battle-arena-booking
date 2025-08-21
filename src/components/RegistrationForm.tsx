import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Users, Mail, Phone, Gamepad2 } from "lucide-react";
import { Tournament, Registration, tournamentApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface RegistrationFormProps {
  tournament: Tournament;
  onClose: () => void;
}

const RegistrationForm = ({ tournament, onClose }: RegistrationFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Registration>({
    tournament_id: tournament.id,
    team_name: "",
    captain_name: "",
    captain_email: "",
    captain_phone: "",
    captain_bgmi_id: "",
    members: [
      { name: "", bgmi_id: "" },
      { name: "", bgmi_id: "" },
      { name: "", bgmi_id: "" }
    ],
    accept_terms: false
  });

  const handleInputChange = (field: keyof Registration, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMemberChange = (index: number, field: 'name' | 'bgmi_id', value: string) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormData(prev => ({ ...prev, members: updatedMembers }));
  };

  const addMember = () => {
    if (formData.members.length < 10) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, { name: "", bgmi_id: "" }]
      }));
    }
  };

  const removeMember = (index: number) => {
    if (formData.members.length > 1) {
      const updatedMembers = formData.members.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, members: updatedMembers }));
    }
  };

  const validateForm = () => {
    if (!formData.team_name.trim()) {
      toast({ title: "Error", description: "Team name is required", variant: "destructive" });
      return false;
    }
    if (!formData.captain_name.trim()) {
      toast({ title: "Error", description: "Captain name is required", variant: "destructive" });
      return false;
    }
    if (!formData.captain_email.trim() || !/\S+@\S+\.\S+/.test(formData.captain_email)) {
      toast({ title: "Error", description: "Valid email is required", variant: "destructive" });
      return false;
    }
    if (!formData.captain_phone.trim() || !/^\d{10}$/.test(formData.captain_phone)) {
      toast({ title: "Error", description: "Valid 10-digit phone number is required", variant: "destructive" });
      return false;
    }
    if (!formData.captain_bgmi_id.trim()) {
      toast({ title: "Error", description: "Captain BGMI ID is required", variant: "destructive" });
      return false;
    }
    if (!formData.accept_terms) {
      toast({ title: "Error", description: "Please accept the terms and conditions", variant: "destructive" });
      return false;
    }
    
    // Validate that at least 3 members (including captain) are provided
    const validMembers = formData.members.filter(member => 
      member.name.trim() && member.bgmi_id.trim()
    );
    if (validMembers.length < 3) {
      toast({ title: "Error", description: "At least 4 players (captain + 3 members) are required", variant: "destructive" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await tournamentApi.registerForTournament(formData);
      
      if (result.success && result.order_id) {
        toast({
          title: "Registration Successful!",
          description: "Redirecting to payment...",
        });
        
        // Redirect to payment page with order ID
        navigate(`/payment/${result.order_id}`);
        onClose();
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Team Information */}
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="mr-2 text-electric-blue" />
              Team Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="teamName" className="text-foreground">Team Name *</Label>
                <Input
                  id="teamName"
                  value={formData.team_name}
                  onChange={(e) => handleInputChange('team_name', e.target.value)}
                  placeholder="Enter your team name"
                  className="bg-darker-surface border-border"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Captain Information */}
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Gamepad2 className="mr-2 text-neon-green" />
              Captain Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="captainName" className="text-foreground">Captain Name *</Label>
                <Input
                  id="captainName"
                  value={formData.captain_name}
                  onChange={(e) => handleInputChange('captain_name', e.target.value)}
                  placeholder="Captain's full name"
                  className="bg-darker-surface border-border"
                  required
                />
              </div>
              <div>
                <Label htmlFor="captainBgmi" className="text-foreground">Captain BGMI ID *</Label>
                <Input
                  id="captainBgmi"
                  value={formData.captain_bgmi_id}
                  onChange={(e) => handleInputChange('captain_bgmi_id', e.target.value)}
                  placeholder="BGMI Player ID"
                  className="bg-darker-surface border-border"
                  required
                />
              </div>
              <div>
                <Label htmlFor="captainEmail" className="text-foreground flex items-center">
                  <Mail className="mr-1 h-4 w-4" />
                  Email Address *
                </Label>
                <Input
                  id="captainEmail"
                  type="email"
                  value={formData.captain_email}
                  onChange={(e) => handleInputChange('captain_email', e.target.value)}
                  placeholder="captain@email.com"
                  className="bg-darker-surface border-border"
                  required
                />
              </div>
              <div>
                <Label htmlFor="captainPhone" className="text-foreground flex items-center">
                  <Phone className="mr-1 h-4 w-4" />
                  Phone Number *
                </Label>
                <Input
                  id="captainPhone"
                  value={formData.captain_phone}
                  onChange={(e) => handleInputChange('captain_phone', e.target.value)}
                  placeholder="10-digit mobile number"
                  className="bg-darker-surface border-border"
                  maxLength={10}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Users className="mr-2 text-gaming-purple" />
                Team Members (Minimum 3 required)
              </h3>
              <Button
                type="button"
                variant="gamingOutline"
                size="sm"
                onClick={addMember}
                disabled={formData.members.length >= 10}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Member
              </Button>
            </div>
            
            <div className="space-y-4">
              {formData.members.map((member, index) => (
                <div key={index} className="p-4 bg-darker-surface rounded-lg border border-border">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-muted-foreground">
                      Member {index + 1}
                    </span>
                    {formData.members.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMember(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground">Player Name</Label>
                      <Input
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                        placeholder="Player's name"
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground">BGMI ID</Label>
                      <Input
                        value={member.bgmi_id}
                        onChange={(e) => handleMemberChange(index, 'bgmi_id', e.target.value)}
                        placeholder="BGMI Player ID"
                        className="bg-background border-border"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Terms and Payment */}
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-6">
            <div className="space-y-4">
              <Separator />
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Entry Fee:</span>
                <span className="font-bold text-electric-blue text-xl">
                  {formatCurrency(tournament.entry_fee)}
                </span>
              </div>
              <Separator />
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.accept_terms}
                  onCheckedChange={(checked) => handleInputChange('accept_terms', !!checked)}
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  I accept the{" "}
                  <span className="text-electric-blue hover:underline cursor-pointer">
                    tournament rules and terms of service
                  </span>
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="gaming"
            className="flex-1"
            disabled={loading || !formData.accept_terms}
          >
            {loading ? "Processing..." : `Pay ${formatCurrency(tournament.entry_fee)}`}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;