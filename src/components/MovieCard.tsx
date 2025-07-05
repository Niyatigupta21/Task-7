import { Movie } from '@/types/movie';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Film, Play } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

const MovieCard = ({ movie, onSelect }: MovieCardProps) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="movie-card group">
      <div className="relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="lg" className="rounded-full bg-primary/80 hover:bg-primary backdrop-blur-sm">
            <Play className="h-6 w-6 ml-1" />
          </Button>
        </div>
        
        {/* Rating badge */}
        <Badge className="absolute top-3 right-3 bg-primary/90 text-primary-foreground">
          {movie.rating}
        </Badge>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {movie.title}
        </h3>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
          <span className="flex items-center">
            <Film className="h-4 w-4 mr-1" />
            {movie.genre}
          </span>
          <span>{formatDuration(movie.duration)}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {movie.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            From ${movie.showtimes[0]?.price.toFixed(2)}
          </div>
          <Button 
            onClick={() => onSelect(movie)}
            className="btn-cinema-outline text-sm px-4 py-2"
          >
            <Calendar className="h-4 w-4 mr-1" />
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;