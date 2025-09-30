import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface UserTypeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  primary?: boolean;
  onClick: () => void;
}

export function UserTypeCard({ 
  title, 
  description, 
  icon: Icon, 
  features, 
  primary = false,
  onClick 
}: UserTypeCardProps) {
  return (
    <Card className={`p-6 hover-lift cursor-pointer transition-all duration-300 ${
      primary ? 'ring-2 ring-primary ring-opacity-50 shadow-colored' : 'shadow-soft hover:shadow-medium'
    }`}>
      <div className="text-center space-y-4">
        <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${
          primary ? 'gradient-primary' : 'bg-muted'
        }`}>
          <Icon className={`w-8 h-8 ${primary ? 'text-white' : 'text-foreground'}`} />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
        <ul className="space-y-2 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>  
        
        <Button 
          variant={primary ? "hero" : "outline"}
          size="lg"
          className="w-full"
          onClick={onClick}
        >
          
          Join as {title}
        </Button>
      </div>
    </Card>
  );
}
