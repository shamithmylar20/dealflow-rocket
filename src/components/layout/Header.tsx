import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-foreground">Daxa.ai</span>
              <span className="text-sm text-muted-foreground ml-2 hidden sm:inline">
                Partner Portal
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-muted-foreground transition-colors">
              Home
            </a>
            <a href="/dashboard" className="text-foreground hover:text-muted-foreground transition-colors">
              Dashboard
            </a>
            <a href="/deals" className="text-foreground hover:text-muted-foreground transition-colors">
              Deal Tracker
            </a>
            <a href="/support" className="text-foreground hover:text-muted-foreground transition-colors">
              Support
            </a>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center space-x-4">
            {isHomePage ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <a href="/auth">Sign In</a>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <a href="/register">Register Deal</a>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm">
                  Profile
                </Button>
                <Button variant="outline" size="sm">
                  Sign Out
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};