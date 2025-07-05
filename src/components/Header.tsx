import { Film, Ticket, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary to-primary-glow p-2 rounded-lg">
              <Film className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Reel Deal</h1>
              <p className="text-xs text-muted-foreground">Cinema Booking</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Movies
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Cinemas
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Events
            </a>
          </nav>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search movies..."
                className="pl-10 w-64 bg-muted/50 border-border/50"
              />
            </div>
            
            <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground">
              <Ticket className="h-4 w-4 mr-2" />
              My Tickets
            </Button>
            
            <Button size="sm" className="btn-cinema">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;