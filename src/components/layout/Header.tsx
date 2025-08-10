import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/deals", label: "Deal Tracker" },
  { href: "/support", label: "Support" }
];

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
              <span className="text-xl font-bold text-foreground">Daxa</span>
              <span className="text-sm text-muted-foreground ml-2 hidden sm:inline">
                Partner Portal
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center relative">
            <div className="flex items-center space-x-8 relative">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="relative px-3 py-2 text-foreground hover:text-primary transition-colors duration-300 z-10"
                >
                  {location.pathname === item.href && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-lg"
                      style={{
                        boxShadow: `
                          0 0 20px hsl(var(--primary) / 0.3),
                          0 0 40px hsl(var(--primary) / 0.2),
                          0 0 60px hsl(var(--primary) / 0.1)
                        `
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ))}
            </div>
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