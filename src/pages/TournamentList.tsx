import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Users, Clock, Search, Filter, Zap } from "lucide-react";
import { Tournament, tournamentApi } from "@/services/api";

const TournamentList = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [filteredTournaments, setFilteredTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        const data = await tournamentApi.getTournaments();
        setTournaments(data);
        setFilteredTournaments(data);
      } catch (error) {
        console.error('Failed to load tournaments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTournaments();
  }, []);

  useEffect(() => {
    let filtered = tournaments;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(tournament =>
        tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tournament.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(tournament => tournament.status === statusFilter);
    }

    // Mode filter
    if (modeFilter !== "all") {
      filtered = filtered.filter(tournament => tournament.mode.includes(modeFilter));
    }

    setFilteredTournaments(filtered);
  }, [tournaments, searchQuery, statusFilter, modeFilter]);

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

  const getSlotsLeft = (tournament: Tournament) => {
    return tournament.max_teams - tournament.registered_teams;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-neon-green text-primary-foreground';
      case 'ongoing': return 'bg-electric-blue text-primary-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-electric-blue">Tournament</span> Arena
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join competitive BGMI tournaments, showcase your skills, and win amazing prizes
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-gradient-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search tournaments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-darker-surface border-border"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-darker-surface border-border">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={modeFilter} onValueChange={setModeFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-darker-surface border-border">
                    <SelectValue placeholder="Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modes</SelectItem>
                    <SelectItem value="TPP">TPP</SelectItem>
                    <SelectItem value="FPP">FPP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tournament Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <Card key={i} className="bg-gradient-card animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-muted rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                    <div className="h-10 bg-muted rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredTournaments.length === 0 ? (
          <Card className="bg-gradient-card border-border">
            <CardContent className="text-center py-16">
              <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tournaments found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or check back later for new tournaments.
              </p>
              <Button variant="gaming" onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setModeFilter("all");
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.map((tournament) => (
              <Card key={tournament.id} className="bg-gradient-card border-border hover:border-electric-blue/50 transition-gaming group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getStatusColor(tournament.status)}>
                      {tournament.status.toUpperCase()}
                    </Badge>
                    <Zap className="h-5 w-5 text-electric-blue group-hover:animate-pulse" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-electric-blue transition-gaming">
                    {tournament.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {tournament.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Prize Pool & Entry Fee */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-darker-surface p-3 rounded-lg">
                      <Trophy className="h-5 w-5 text-neon-green mb-1" />
                      <p className="text-xs text-muted-foreground">Prize Pool</p>
                      <p className="text-sm font-bold text-neon-green">
                        {formatCurrency(tournament.prize_pool)}
                      </p>
                    </div>
                    <div className="bg-darker-surface p-3 rounded-lg">
                      <Users className="h-5 w-5 text-electric-blue mb-1" />
                      <p className="text-xs text-muted-foreground">Entry Fee</p>
                      <p className="text-sm font-bold text-electric-blue">
                        {formatCurrency(tournament.entry_fee)}
                      </p>
                    </div>
                  </div>

                  {/* Tournament Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Teams:</span>
                      <span className="font-medium">
                        {tournament.registered_teams}/{tournament.max_teams}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Slots Left:</span>
                      <span className={`font-medium ${getSlotsLeft(tournament) < 10 ? 'text-destructive' : 'text-neon-green'}`}>
                        {getSlotsLeft(tournament)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Map:</span>
                      <span className="font-medium">{tournament.map}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mode:</span>
                      <span className="font-medium">{tournament.mode}</span>
                    </div>
                  </div>

                  {/* Start Time */}
                  <div className="flex items-center text-sm text-muted-foreground bg-darker-surface p-2 rounded">
                    <Clock className="h-4 w-4 mr-2" />
                    {formatDate(tournament.start_date)}
                  </div>

                  {/* Action Button */}
                  <Button 
                    variant="tournament" 
                    size="sm" 
                    className="w-full" 
                    asChild
                    disabled={tournament.status === 'completed' || getSlotsLeft(tournament) === 0}
                  >
                    <Link to={`/tournament/${tournament.id}`}>
                      {tournament.status === 'completed' 
                        ? 'Tournament Ended' 
                        : getSlotsLeft(tournament) === 0 
                        ? 'Full' 
                        : 'View Details'
                      }
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button (for pagination in future) */}
        {filteredTournaments.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="gamingOutline" size="lg">
              Load More Tournaments
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentList;