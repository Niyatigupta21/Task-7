import { useState } from 'react';
import { Movie, Showtime, Seat } from '@/types/movie';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, CreditCard, Mail, MapPin, Phone, Ticket, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookingConfirmationProps {
  movie: Movie | null;
  showtime: Showtime | null;
  selectedSeats: Seat[];
  totalPrice: number;
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

const BookingConfirmation = ({ 
  movie, 
  showtime, 
  selectedSeats, 
  totalPrice, 
  isOpen, 
  onClose, 
  onBack 
}: BookingConfirmationProps) => {
  const { toast } = useToast();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!movie || !showtime) return null;

  const formatTime = (time: string) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirmBooking = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Booking Confirmed! 🎉",
        description: `Your tickets for ${movie.title} have been booked successfully. Confirmation details sent to ${customerInfo.email}`,
      });
      
      setIsProcessing(false);
      onClose();
      
      // Reset form
      setCustomerInfo({ name: '', email: '', phone: '' });
    }, 2000);
  };

  const isFormValid = customerInfo.name && customerInfo.email && customerInfo.phone;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto bg-card border-border">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Confirm Booking
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Booking Summary */}
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Booking Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Movie:</span>
                <span className="font-medium text-foreground">{movie.title}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date & Time:</span>
                <div className="text-right">
                  <div className="font-medium text-foreground">
                    {new Date(showtime.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatTime(showtime.time)}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Theater:</span>
                <span className="font-medium text-foreground">{showtime.theater}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Seats:</span>
                <div className="flex space-x-1">
                  {selectedSeats.map(seat => (
                    <Badge key={seat.id} variant="secondary">
                      {seat.row}{seat.number}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground text-right">
                  {selectedSeats.length} ticket{selectedSeats.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Customer Information</h3>
            
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={customerInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-foreground">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Payment Method</span>
            </div>
            <p className="text-sm text-muted-foreground">
              This is a demo booking system. No actual payment will be processed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onBack} className="flex-1">
              Back to Seats
            </Button>
            <Button 
              onClick={handleConfirmBooking}
              disabled={!isFormValid || isProcessing}
              className="btn-cinema flex-1"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Ticket className="h-4 w-4 mr-2" />
                  Confirm Booking
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingConfirmation;