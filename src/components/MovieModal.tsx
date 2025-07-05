import { Movie, Showtime } from '@/types/movie';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Film, MapPin, Ticket, Users } from 'lucide-react';
import { useState } from 'react';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectShowtime: (movie: Movie, showtime: Showtime) => void;
}

const MovieModal = ({ movie, isOpen, onClose, onSelectShowtime }: MovieModalProps) => {
  const [selectedDate, setSelectedDate] = useState('2024-07-05');

  if (!movie) return null;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatTime = (time: string) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const availableDates = ['2024-07-05', '2024-07-06', '2024-07-07'];
  const showtimesForDate = movie.showtimes.filter(showtime => showtime.date === selectedDate);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {movie.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Movie Poster */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full rounded-lg shadow-lg"
              />
              <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                {movie.rating}
              </Badge>
            </div>
          </div>
          
          {/* Movie Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Film className="h-3 w-3" />
                {movie.genre}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDuration(movie.duration)}
              </Badge>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              {movie.description}
            </p>
            
            {/* Date Selection */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-foreground">Select Date</h4>
              <div className="flex gap-2">
                {availableDates.map((date) => (
                  <Button
                    key={date}
                    variant={selectedDate === date ? "default" : "outline"}
                    onClick={() => setSelectedDate(date)}
                    className={selectedDate === date ? "btn-cinema" : "btn-cinema-outline"}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Showtimes */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-foreground">Showtimes</h4>
              {showtimesForDate.length > 0 ? (
                <div className="grid gap-3">
                  {showtimesForDate.map((showtime) => (
                    <div key={showtime.id} className="bg-muted/50 rounded-lg p-4 border border-border/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-lg font-semibold text-primary">
                            {formatTime(showtime.time)}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" />
                            {showtime.theater}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            {showtime.availableSeats}/{showtime.totalSeats} available
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-lg font-bold text-foreground">
                            ${showtime.price.toFixed(2)}
                          </div>
                          <Button 
                            onClick={() => onSelectShowtime(movie, showtime)}
                            disabled={showtime.availableSeats === 0}
                            className="btn-cinema"
                          >
                            <Ticket className="h-4 w-4 mr-2" />
                            Select Seats
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No showtimes available for this date.</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieModal;