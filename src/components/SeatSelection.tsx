import { useState, useEffect } from 'react';
import { Movie, Showtime, Seat } from '@/types/movie';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, CreditCard, MapPin, Ticket } from 'lucide-react';

interface SeatSelectionProps {
  movie: Movie | null;
  showtime: Showtime | null;
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onProceedToPayment: (selectedSeats: Seat[], totalPrice: number) => void;
}

// Generate seat layout
const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  
  rows.forEach((row, rowIndex) => {
    for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
      const isOccupied = Math.random() < 0.3; // 30% chance of being occupied
      const seatType = rowIndex < 2 ? 'premium' : rowIndex > 5 ? 'vip' : 'regular';
      const basePrice = 12.50;
      const priceMultiplier = seatType === 'vip' ? 1.5 : seatType === 'premium' ? 1.2 : 1;
      
      seats.push({
        id: `${row}${seatNum}`,
        row,
        number: seatNum,
        isOccupied,
        isSelected: false,
        type: seatType,
        price: basePrice * priceMultiplier
      });
    }
  });
  
  return seats;
};

const SeatSelection = ({ movie, showtime, isOpen, onClose, onBack, onProceedToPayment }: SeatSelectionProps) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSeats(generateSeats());
      setSelectedSeats([]);
    }
  }, [isOpen]);

  if (!movie || !showtime) return null;

  const handleSeatClick = (seatId: string) => {
    setSeats(prevSeats => 
      prevSeats.map(seat => {
        if (seat.id === seatId && !seat.isOccupied) {
          const updatedSeat = { ...seat, isSelected: !seat.isSelected };
          
          // Update selected seats array
          if (updatedSeat.isSelected) {
            setSelectedSeats(prev => [...prev, updatedSeat]);
          } else {
            setSelectedSeats(prev => prev.filter(s => s.id !== seatId));
          }
          
          return updatedSeat;
        }
        return seat;
      })
    );
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const formatTime = (time: string) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getSeatClass = (seat: Seat) => {
    if (seat.isOccupied) return 'seat seat-occupied';
    if (seat.isSelected) return 'seat seat-selected';
    return 'seat seat-available';
  };

  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-card border-border">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Select Your Seats
            </DialogTitle>
          </div>
        </DialogHeader>
        
        {/* Movie Info Header */}
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{movie.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(showtime.date).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatTime(showtime.time)}
                </span>
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {showtime.theater}
                </span>
              </div>
            </div>
            <Badge className="bg-primary text-primary-foreground">
              {movie.rating}
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="seat seat-available"></div>
              <span className="text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="seat seat-selected"></div>
              <span className="text-muted-foreground">Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="seat seat-occupied"></div>
              <span className="text-muted-foreground">Occupied</span>
            </div>
          </div>

          {/* Screen */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-lg py-2 px-8 inline-block">
              <span className="text-sm font-medium text-foreground">SCREEN</span>
            </div>
          </div>

          {/* Seating Chart */}
          <div className="space-y-2">
            {Object.entries(seatsByRow).map(([row, rowSeats]) => (
              <div key={row} className="flex items-center justify-center space-x-1">
                <div className="w-6 text-center text-sm font-medium text-muted-foreground">
                  {row}
                </div>
                <div className="flex space-x-1">
                  {rowSeats.slice(0, 6).map(seat => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat.id)}
                      disabled={seat.isOccupied}
                      className={getSeatClass(seat)}
                      title={`Seat ${seat.row}${seat.number} - $${seat.price.toFixed(2)}`}
                    />
                  ))}
                </div>
                <div className="w-8"></div> {/* Aisle */}
                <div className="flex space-x-1">
                  {rowSeats.slice(6).map(seat => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat.id)}
                      disabled={seat.isOccupied}
                      className={getSeatClass(seat)}
                      title={`Seat ${seat.row}${seat.number} - $${seat.price.toFixed(2)}`}
                    />
                  ))}
                </div>
                <div className="w-6 text-center text-sm font-medium text-muted-foreground">
                  {row}
                </div>
              </div>
            ))}
          </div>

          {/* Seat Type Legend */}
          <div className="flex items-center justify-center space-x-8 text-xs text-muted-foreground">
            <div>Rows A-B: Premium (+20%)</div>
            <div>Rows C-F: Regular</div>
            <div>Rows G-H: VIP (+50%)</div>
          </div>
        </div>

        {/* Footer with selection summary */}
        {selectedSeats.length > 0 && (
          <div className="bg-muted/50 rounded-lg p-4 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground">Selected Seats</h4>
                <div className="flex items-center space-x-2 mt-1">
                  {selectedSeats.map(seat => (
                    <Badge key={seat.id} variant="secondary">
                      {seat.row}{seat.number}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">
                  ${totalPrice.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <Button variant="outline" onClick={() => {
                setSeats(prev => prev.map(seat => ({ ...seat, isSelected: false })));
                setSelectedSeats([]);
              }}>
                Clear Selection
              </Button>
              <Button 
                onClick={() => onProceedToPayment(selectedSeats, totalPrice)}
                className="btn-cinema flex-1"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SeatSelection;