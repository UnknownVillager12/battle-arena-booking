import axios from 'axios';

// Mock API base URL - replace with real API in production
const API_BASE_URL = 'https://api.bgmipro.com/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface Tournament {
  id: string;
  title: string;
  description: string;
  prize_pool: number;
  entry_fee: number;
  max_teams: number;
  registered_teams: number;
  start_date: string;
  end_date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  map: string;
  mode: string;
  rules: string[];
  prize_distribution: { position: string; amount: number }[];
  banner_url?: string;
}

export interface Registration {
  tournament_id: string;
  team_name: string;
  captain_name: string;
  captain_email: string;
  captain_phone: string;
  captain_bgmi_id: string;
  members: {
    name: string;
    bgmi_id: string;
  }[];
  accept_terms: boolean;
}

export interface PaymentOrder {
  order_id: string;
  tournament_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface Ticket {
  ticket_id: string;
  tournament_id: string;
  team_name: string;
  qr_code: string;
  payment_status: string;
}

export interface LeaderboardEntry {
  rank: number;
  team_name: string;
  captain_bgmi_id: string;
  kills: number;
  placement_points: number;
  total_points: number;
  prize_amount: number;
}

// Mock Data
const mockTournaments: Tournament[] = [
  {
    id: '1',
    title: 'BGMI Championship Series',
    description: 'The ultimate BGMI tournament with massive prize pool',
    prize_pool: 100000,
    entry_fee: 500,
    max_teams: 100,
    registered_teams: 87,
    start_date: '2024-09-01T10:00:00Z',
    end_date: '2024-09-01T14:00:00Z',
    status: 'upcoming',
    map: 'Erangel',
    mode: 'Squad TPP',
    rules: [
      'No teaming allowed',
      'No use of cheats or hacks',
      'Follow fair play guidelines',
      'Respect other players'
    ],
    prize_distribution: [
      { position: '1st', amount: 50000 },
      { position: '2nd', amount: 25000 },
      { position: '3rd', amount: 15000 },
      { position: '4th-10th', amount: 1000 }
    ]
  },
  {
    id: '2',
    title: 'Weekend Warriors',
    description: 'Quick weekend tournament for casual players',
    prize_pool: 25000,
    entry_fee: 200,
    max_teams: 50,
    registered_teams: 32,
    start_date: '2024-08-25T16:00:00Z',
    end_date: '2024-08-25T18:00:00Z',
    status: 'ongoing',
    map: 'Sanhok',
    mode: 'Squad FPP',
    rules: [
      'No teaming allowed',
      'No use of cheats or hacks',
      'Follow fair play guidelines'
    ],
    prize_distribution: [
      { position: '1st', amount: 12500 },
      { position: '2nd', amount: 7500 },
      { position: '3rd', amount: 5000 }
    ]
  }
];

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    team_name: 'Thunder Squad',
    captain_bgmi_id: 'THUNDER123',
    kills: 28,
    placement_points: 20,
    total_points: 48,
    prize_amount: 50000
  },
  {
    rank: 2,
    team_name: 'Fire Dragons',
    captain_bgmi_id: 'FIREDRAGON',
    kills: 25,
    placement_points: 15,
    total_points: 40,
    prize_amount: 25000
  }
];

// API Functions
export const tournamentApi = {
  // Get all tournaments
  getTournaments: async (filters?: { status?: string; mode?: string }): Promise<Tournament[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = mockTournaments;
    if (filters?.status) {
      filtered = filtered.filter(t => t.status === filters.status);
    }
    if (filters?.mode) {
      filtered = filtered.filter(t => t.mode.includes(filters.mode));
    }
    
    return filtered;
  },

  // Get single tournament
  getTournament: async (id: string): Promise<Tournament | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTournaments.find(t => t.id === id) || null;
  },

  // Register for tournament
  registerForTournament: async (registration: Registration): Promise<{ success: boolean; order_id?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate registration logic
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      success: true,
      order_id: orderId
    };
  },

  // Get leaderboard
  getLeaderboard: async (tournamentId: string): Promise<LeaderboardEntry[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockLeaderboard;
  },

  // Search results
  searchResults: async (query: string): Promise<LeaderboardEntry[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockLeaderboard.filter(entry => 
      entry.team_name.toLowerCase().includes(query.toLowerCase()) ||
      entry.captain_bgmi_id.toLowerCase().includes(query.toLowerCase())
    );
  }
};

export const paymentApi = {
  // Create payment order
  createPaymentOrder: async (tournamentId: string, amount: number): Promise<PaymentOrder> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      order_id: `ORDER_${Date.now()}`,
      tournament_id: tournamentId,
      amount,
      currency: 'INR',
      status: 'pending'
    };
  },

  // Verify payment
  verifyPayment: async (orderId: string, paymentId: string): Promise<{ success: boolean; ticket_id?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      ticket_id: `TICKET_${Date.now()}`
    };
  },

  // Get ticket
  getTicket: async (ticketId: string): Promise<Ticket | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      ticket_id: ticketId,
      tournament_id: '1',
      team_name: 'Sample Team',
      qr_code: `data:image/svg+xml;base64,${btoa(`<svg>QR Code for ${ticketId}</svg>`)}`,
      payment_status: 'completed'
    };
  },

  // Lookup payment status
  lookupPayment: async (ticketId: string, email: string): Promise<{ status: string; details?: any }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      status: 'completed',
      details: {
        ticket_id: ticketId,
        tournament_name: 'BGMI Championship Series',
        amount: 500,
        payment_date: new Date().toISOString()
      }
    };
  }
};

export default api;