import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trophy, Users, Clock, Target, MapPin, Crown, Zap, ArrowLeft } from "lucide-react";
import { Tournament, tournamentApi } from "@/services/api";
import RegistrationForm from "@/components/RegistrationForm";

const TournamentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [registrationOpen, setRegistrationOpen] = useState(false);

  useEffect(() => {
    const loadTournament = async () => {
      if (!id) return;
      
      try {
        const data = await tournamentApi.getTournament(id);
        setTournament(data);
      } catch (error) {
        console.error('Failed to load tournament:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTournament();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-card animate-pulse">
            <CardHeader>
              <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
                <div className="h-32 bg-muted rounded"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-card border-border">
            <CardContent className="text-center py-16">
              <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tournament not found</h3>
              <p className="text-muted-foreground mb-6">
                The tournament you're looking for doesn't exist or has been removed.
              </p>
              <Button variant="gaming" asChild>
                <Link to="/tournaments">Browse Tournaments</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getSlotsLeft = () => {
    return tournament.max_teams - tournament.registered_teams;
  };

  const getTimeLeft = () => {
    const now = new Date().getTime();
    const start = new Date(tournament.start_date).getTime();
    const diff = start - now;

    if (diff <= 0) return "Tournament Started";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/tournaments">
            <ArrowLeft className="mr-2" />
            Back to Tournaments
          </Link>
        </Button>

        {/* Tournament Header */}
        <Card className="mb-8 bg-gradient-hero border-electric-blue/30 glow-primary">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-4">
                    {tournament.status.toUpperCase()}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    {tournament.title}
                  </h1>
                  <p className="text-white/80 text-lg">
                    {tournament.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/20 backdrop-blur p-4 rounded-lg border border-white/10">
                    <Trophy className="h-8 w-8 text-neon-green mb-2" />
                    <p className="text-sm text-white/70">Prize Pool</p>
                    <p className="text-2xl font-bold text-neon-green">
                      {formatCurrency(tournament.prize_pool)}
                    </p>
                  </div>
                  <div className="bg-black/20 backdrop-blur p-4 rounded-lg border border-white/10">
                    <Clock className="h-8 w-8 text-electric-blue mb-2" />
                    <p className="text-sm text-white/70">Starts In</p>
                    <p className="text-xl font-bold text-electric-blue">
                      {getTimeLeft()}
                    </p>
                  </div>
                </div>

                {tournament.status === 'upcoming' && getSlotsLeft() > 0 && (
                  <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
                    <DialogTrigger asChild>
                      <Button variant="neon" size="lg" className="w-full">
                        <Users className="mr-2" />
                        Register Now • {formatCurrency(tournament.entry_fee)}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-darker-surface border-border">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                          Register for {tournament.title}
                        </DialogTitle>
                      </DialogHeader>
                      <RegistrationForm 
                        tournament={tournament}
                        onClose={() => setRegistrationOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <div className="relative">
                <div className="aspect-video bg-black/20 backdrop-blur rounded-lg flex items-center justify-center border border-white/10">
                  <div className="text-center space-y-4">
                    <Trophy className="h-20 w-20 text-electric-blue mx-auto animate-float" />
                    <p className="text-white/70">Tournament Banner</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tournament Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 text-electric-blue" />
                  Tournament Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <Users className="h-6 w-6 text-electric-blue mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Registered</p>
                    <p className="text-xl font-bold">{tournament.registered_teams}</p>
                  </div>
                  <div className="text-center">
                    <Target className="h-6 w-6 text-neon-green mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Slots Left</p>
                    <p className={`text-xl font-bold ${getSlotsLeft() < 10 ? 'text-destructive' : 'text-neon-green'}`}>
                      {getSlotsLeft()}
                    </p>
                  </div>
                  <div className="text-center">
                    <MapPin className="h-6 w-6 text-gaming-purple mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Map</p>
                    <p className="text-lg font-semibold">{tournament.map}</p>
                  </div>
                  <div className="text-center">
                    <Zap className="h-6 w-6 text-electric-blue mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Mode</p>
                    <p className="text-lg font-semibold">{tournament.mode}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rules */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="mr-2 text-neon-green" />
                  Tournament Rules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tournament.rules.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 bg-electric-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Prize Distribution */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 text-neon-green" />
                  Prize Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tournament.prize_distribution.map((prize, index) => (
                    <div key={index} className="flex justify-between items-center py-2 px-4 bg-darker-surface rounded-lg">
                      <span className="font-medium">{prize.position}</span>
                      <span className="text-neon-green font-bold">
                        {formatCurrency(prize.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tournament Schedule */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 text-electric-blue" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Registration Deadline</p>
                  <p className="font-semibold">
                    {formatDate(tournament.start_date)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tournament Start</p>
                  <p className="font-semibold text-electric-blue">
                    {formatDate(tournament.start_date)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tournament End</p>
                  <p className="font-semibold">
                    {formatDate(tournament.end_date)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Entry Fee */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="mr-2 text-neon-green" />
                  Entry Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Entry Fee</p>
                  <p className="text-3xl font-bold text-electric-blue">
                    {formatCurrency(tournament.entry_fee)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Total Prize Pool</p>
                  <p className="text-2xl font-bold text-neon-green">
                    {formatCurrency(tournament.prize_pool)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Share Tournament */}
            <Card className="bg-gradient-card border-border">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Share this tournament with your squad!
                </p>
                <Button variant="gamingOutline" className="w-full">
                  Share Tournament
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetail;