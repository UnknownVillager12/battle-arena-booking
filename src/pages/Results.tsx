import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy, Search, Crown, Target, Zap } from "lucide-react";
import { LeaderboardEntry, tournamentApi } from "@/services/api";

const Results = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [searchResults, setSearchResults] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await tournamentApi.getLeaderboard('1'); // Default tournament
        setLeaderboard(data);
        setSearchResults(data);
      } catch (error) {
        console.error('Failed to load leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults(leaderboard);
      return;
    }

    setSearching(true);
    try {
      const results = await tournamentApi.searchResults(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setSearching(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getRankBadgeVariant = (rank: number) => {
    if (rank === 1) return "bg-neon-green text-primary-foreground";
    if (rank === 2) return "bg-electric-blue text-primary-foreground";
    if (rank === 3) return "bg-gaming-purple text-primary-foreground";
    return "bg-muted text-muted-foreground";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-4 w-4" />;
    if (rank === 2) return <Trophy className="h-4 w-4" />;
    if (rank === 3) return <Target className="h-4 w-4" />;
    return null;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tournament <span className="text-neon-green">Results</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Check out the champions and search for your team's performance
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8 bg-gradient-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by team name or BGMI ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 bg-darker-surface border-border"
                />
              </div>
              <Button 
                variant="gaming" 
                onClick={handleSearch}
                disabled={searching}
              >
                {searching ? "Searching..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Podium */}
        {!searchQuery && leaderboard.length >= 3 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">
              <span className="text-electric-blue">Champions</span> Podium
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* 2nd Place */}
              <Card className="bg-gradient-card border-electric-blue/30 order-2 md:order-1">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <Badge className="bg-electric-blue text-primary-foreground mb-2">
                      <Trophy className="h-4 w-4 mr-1" />
                      2nd Place
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{leaderboard[1].team_name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {leaderboard[1].captain_bgmi_id}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Kills:</span>
                      <span className="font-semibold">{leaderboard[1].kills}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Points:</span>
                      <span className="font-semibold">{leaderboard[1].total_points}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-electric-blue font-bold text-lg">
                      {formatCurrency(leaderboard[1].prize_amount)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 1st Place */}
              <Card className="bg-gradient-gaming border-neon-green glow-secondary order-1 md:order-2 transform md:scale-110">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <Badge className="bg-neon-green text-primary-foreground mb-2">
                      <Crown className="h-4 w-4 mr-1" />
                      CHAMPION
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{leaderboard[0].team_name}</h3>
                  <p className="text-sm text-white/70 mb-3">
                    {leaderboard[0].captain_bgmi_id}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-white">
                      <span>Kills:</span>
                      <span className="font-semibold">{leaderboard[0].kills}</span>
                    </div>
                    <div className="flex justify-between text-sm text-white">
                      <span>Points:</span>
                      <span className="font-semibold">{leaderboard[0].total_points}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-white font-bold text-xl">
                      {formatCurrency(leaderboard[0].prize_amount)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 3rd Place */}
              <Card className="bg-gradient-card border-gaming-purple/30 order-3">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <Badge className="bg-gaming-purple text-primary-foreground mb-2">
                      <Target className="h-4 w-4 mr-1" />
                      3rd Place
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{leaderboard[2].team_name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {leaderboard[2].captain_bgmi_id}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Kills:</span>
                      <span className="font-semibold">{leaderboard[2].kills}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Points:</span>
                      <span className="font-semibold">{leaderboard[2].total_points}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-gaming-purple font-bold text-lg">
                      {formatCurrency(leaderboard[2].prize_amount)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 text-electric-blue" />
              {searchQuery ? "Search Results" : "Full Leaderboard"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-12 bg-muted rounded animate-pulse"></div>
                ))}
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? "Try a different search term or check the spelling"
                    : "No tournament results available yet"
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-foreground">Rank</TableHead>
                      <TableHead className="text-foreground">Team</TableHead>
                      <TableHead className="text-foreground">BGMI ID</TableHead>
                      <TableHead className="text-foreground text-center">Kills</TableHead>
                      <TableHead className="text-foreground text-center">Placement</TableHead>
                      <TableHead className="text-foreground text-center">Total Points</TableHead>
                      <TableHead className="text-foreground text-right">Prize</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.map((entry) => (
                      <TableRow key={entry.rank} className="border-border hover:bg-muted/50">
                        <TableCell>
                          <Badge className={getRankBadgeVariant(entry.rank)}>
                            {getRankIcon(entry.rank)}
                            <span className="ml-1">#{entry.rank}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{entry.team_name}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {entry.captain_bgmi_id}
                        </TableCell>
                        <TableCell className="text-center text-destructive font-semibold">
                          {entry.kills}
                        </TableCell>
                        <TableCell className="text-center text-electric-blue font-semibold">
                          {entry.placement_points}
                        </TableCell>
                        <TableCell className="text-center text-neon-green font-bold">
                          {entry.total_points}
                        </TableCell>
                        <TableCell className="text-right font-bold text-gaming-purple">
                          {entry.prize_amount > 0 ? formatCurrency(entry.prize_amount) : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;