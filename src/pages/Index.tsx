import { useState } from 'react';
import { Movie, Showtime, Seat } from '@/types/movie';
import { movies } from '@/data/movies';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import MovieModal from '@/components/MovieModal';
import SeatSelection from '@/components/SeatSelection';
import BookingConfirmation from '@/components/BookingConfirmation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Film, Play, Star, Ticket } from 'lucide-react';

const Index = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState<'browse' | 'movie' | 'seats' | 'booking'>('browse');

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setCurrentStep('movie');
  };

  const handleShowtimeSelect = (movie: Movie, showtime: Showtime) => {
    setSelectedMovie(movie);
    setSelectedShowtime(showtime);
    setCurrentStep('seats');
  };

  const handleSeatSelectionComplete = (seats: Seat[], price: number) => {
    setSelectedSeats(seats);
    setTotalPrice(price);
    setCurrentStep('booking');
  };

  const handleClose = () => {
    setSelectedMovie(null);
    setSelectedShowtime(null);
    setSelectedSeats([]);
    setTotalPrice(0);
    setCurrentStep('browse');
  };

  const handleBack = (step: 'browse' | 'movie' | 'seats') => {
    setCurrentStep(step);
    if (step === 'browse') {
      setSelectedMovie(null);
      setSelectedShowtime(null);
    } else if (step === 'movie') {
      setSelectedShowtime(null);
      setSelectedSeats([]);
      setTotalPrice(0);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2">
              <Film className="h-4 w-4 mr-2" />
              Now Playing
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Your Next
              <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Cinema Experience
              </span>
              Awaits
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Book your movie tickets online with ease. Choose from the latest blockbusters, 
              select your perfect seats, and enjoy the magic of cinema.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="btn-cinema text-lg px-8 py-4">
                <Ticket className="h-5 w-5 mr-2" />
                Book Tickets Now
              </Button>
              <Button size="lg" variant="outline" className="btn-cinema-outline text-lg px-8 py-4">
                <Play className="h-5 w-5 mr-2" />
                Watch Trailers
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span>Premium Experience</span>
              </div>
              <div className="flex items-center space-x-1">
                <Ticket className="h-4 w-4 text-primary" />
                <span>Easy Booking</span>
              </div>
              <div className="flex items-center space-x-1">
                <Film className="h-4 w-4 text-primary" />
                <span>Latest Movies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Now Showing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Now Showing</h2>
            <p className="text-xl text-muted-foreground">
              Discover the latest blockbusters and cinematic masterpieces
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onSelect={handleMovieSelect}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">500K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-muted-foreground">Cinema Locations</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">1M+</div>
              <div className="text-muted-foreground">Tickets Sold</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground">Online Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <MovieModal
        movie={selectedMovie}
        isOpen={currentStep === 'movie'}
        onClose={handleClose}
        onSelectShowtime={handleShowtimeSelect}
      />

      <SeatSelection
        movie={selectedMovie}
        showtime={selectedShowtime}
        isOpen={currentStep === 'seats'}
        onClose={handleClose}
        onBack={() => handleBack('movie')}
        onProceedToPayment={handleSeatSelectionComplete}
      />

      <BookingConfirmation
        movie={selectedMovie}
        showtime={selectedShowtime}
        selectedSeats={selectedSeats}
        totalPrice={totalPrice}
        isOpen={currentStep === 'booking'}
        onClose={handleClose}
        onBack={() => handleBack('seats')}
      />
    </div>
  );
};

export default Index;
