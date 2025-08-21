import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Clock, Zap, Crown, Target } from "lucide-react";
import { Tournament, tournamentApi } from "@/services/api";

const Home = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredTournament, setFeaturedTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        const data = await tournamentApi.getTournaments();
        setTournaments(data);
        // Set the first upcoming tournament as featured
        const featured = data.find(t => t.status === 'upcoming') || data[0];
        setFeaturedTournament(featured);
      } catch (error) {
        console.error('Failed to load tournaments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTournaments();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                <span className="block">Battle for</span>
                <span className="block bg-gradient-gaming bg-clip-text text-transparent animate-glow-pulse">
                  Victory
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
                Join the ultimate BGMI tournaments. Compete with the best, win incredible prizes, 
                and claim your place among champions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gaming" size="xl" asChild>
                <Link to="/tournaments">
                  <Trophy className="mr-2" />
                  Join Tournament
                </Link>
              </Button>
              <Button variant="gamingOutline" size="xl" asChild>
                <Link to="/results">
                  <Crown className="mr-2" />
                  View Results
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tournament */}
      {featuredTournament && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-electric-blue">Featured</span> Tournament
              </h2>
              <p className="text-muted-foreground text-lg">
                Don't miss out on our biggest tournament of the season
              </p>
            </div>

            <Card className="bg-gradient-card border-electric-blue/30 hover:border-electric-blue transition-gaming glow-primary">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div>
                      <Badge variant="secondary" className="mb-4">
                        {featuredTournament.status.toUpperCase()}
                      </Badge>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        {featuredTournament.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {featuredTournament.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-darker-surface p-4 rounded-lg">
                        <Trophy className="h-8 w-8 text-neon-green mb-2" />
                        <p className="text-sm text-muted-foreground">Prize Pool</p>
                        <p className="text-xl font-bold text-neon-green">
                          {formatCurrency(featuredTournament.prize_pool)}
                        </p>
                      </div>
                      <div className="bg-darker-surface p-4 rounded-lg">
                        <Users className="h-8 w-8 text-electric-blue mb-2" />
                        <p className="text-sm text-muted-foreground">Teams</p>
                        <p className="text-xl font-bold text-electric-blue">
                          {featuredTournament.registered_teams}/{featuredTournament.max_teams}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        Starts: {formatDate(featuredTournament.start_date)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Target className="h-4 w-4 mr-2" />
                        Map: {featuredTournament.map} • Mode: {featuredTournament.mode}
                      </div>
                    </div>

                    <Button variant="gaming" size="lg" asChild>
                      <Link to={`/tournament/${featuredTournament.id}`}>
                        Register Now • {formatCurrency(featuredTournament.entry_fee)}
                      </Link>
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="aspect-video bg-darker-surface rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <Trophy className="h-16 w-16 text-electric-blue mx-auto animate-float" />
                        <p className="text-muted-foreground">Tournament Banner</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Upcoming Tournaments */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-darker-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upcoming <span className="text-neon-green">Battles</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              More exciting tournaments waiting for champions like you
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-gradient-card animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-muted rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tournaments.slice(0, 6).map((tournament) => (
                <Card key={tournament.id} className="bg-gradient-card border-border hover:border-electric-blue/50 transition-gaming group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={tournament.status === 'upcoming' ? 'default' : 'secondary'}
                        className={tournament.status === 'upcoming' ? 'bg-neon-green text-primary-foreground' : ''}
                      >
                        {tournament.status.toUpperCase()}
                      </Badge>
                      <Zap className="h-5 w-5 text-electric-blue group-hover:animate-pulse" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-electric-blue transition-gaming">
                      {tournament.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Prize Pool</p>
                        <p className="text-lg font-bold text-neon-green">
                          {formatCurrency(tournament.prize_pool)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Entry Fee</p>
                        <p className="text-lg font-bold text-electric-blue">
                          {formatCurrency(tournament.entry_fee)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{tournament.map}</span>
                      <span>{tournament.mode}</span>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {formatDate(tournament.start_date)}
                    </div>

                    <Button variant="tournament" size="sm" className="w-full" asChild>
                      <Link to={`/tournament/${tournament.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button variant="gamingOutline" size="lg" asChild>
              <Link to="/tournaments">
                View All Tournaments
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <Trophy className="h-12 w-12 text-neon-green mx-auto" />
              <h3 className="text-3xl font-bold text-neon-green">500+</h3>
              <p className="text-muted-foreground">Tournaments Hosted</p>
            </div>
            <div className="space-y-4">
              <Users className="h-12 w-12 text-electric-blue mx-auto" />
              <h3 className="text-3xl font-bold text-electric-blue">10K+</h3>
              <p className="text-muted-foreground">Players Registered</p>
            </div>
            <div className="space-y-4">
              <Crown className="h-12 w-12 text-gaming-purple mx-auto" />
              <h3 className="text-3xl font-bold text-gaming-purple">₹50L+</h3>
              <p className="text-muted-foreground">Prize Money Distributed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;