export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: number; // in minutes
  rating: string;
  description: string;
  poster: string;
  trailer?: string;
  showtimes: Showtime[];
}

export interface Showtime {
  id: string;
  movieId: string;
  time: string;
  date: string;
  theater: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  isOccupied: boolean;
  isSelected: boolean;
  type: 'regular' | 'premium' | 'vip';
  price: number;
}

export interface Booking {
  id: string;
  movieId: string;
  showtimeId: string;
  seats: Seat[];
  totalPrice: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  status: 'pending' | 'confirmed' | 'cancelled';
}