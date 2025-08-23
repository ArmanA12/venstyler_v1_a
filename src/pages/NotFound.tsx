import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ArrowLeft, Search, Compass } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-300"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* 404 Number with animation */}
        <div className="mb-8">
          <h1 className="text-[12rem] font-extrabold leading-none bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-300% mb-4">
            404
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full animate-pulse"></div>
        </div>

        {/* Main content card */}
        <Card className="backdrop-blur-lg bg-card/80 border-border/50 p-8 mb-8 animate-fade-in hover:scale-105 transition-all duration-500">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                Oops! Page Not Found
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                The page you're looking for seems to have wandered off into the digital void. 
                Don't worry, it happens to the best of us!
              </p>
              <div className="text-sm text-muted-foreground/70 font-mono bg-muted/30 px-3 py-2 rounded-md inline-block">
                Route: {location.pathname}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button 
                onClick={() => navigate('/')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 group animate-fade-in"
                size="lg"
              >
                <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Back to Home
              </Button>
              
              <Button 
                onClick={() => navigate(-1)}
                variant="outline"
                className="border-border/50 hover:bg-accent/50 transition-all duration-300 hover:scale-105 group animate-fade-in delay-150"
                size="lg"
              >
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Go Back
              </Button>
            </div>

            {/* Additional navigation options */}
            <div className="pt-6 border-t border-border/30">
              <p className="text-sm text-muted-foreground mb-4">
                Or explore these popular sections:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button 
                  onClick={() => navigate('/explore')}
                  variant="ghost" 
                  className="hover:bg-accent/50 group"
                  size="sm"
                >
                  <Compass className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                  Explore
                </Button>
                <Button 
                  onClick={() => navigate('/profile')}
                  variant="ghost" 
                  className="hover:bg-accent/50 group"
                  size="sm"
                >
                  <Search className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Profile
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Fun animated element */}
        <div className="flex justify-center space-x-2 opacity-70">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
