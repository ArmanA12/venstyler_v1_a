import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";

interface ProfileProgressProps {
  profileData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
    profession?: string;
    bio?: string;
    profileImage?: string | null;
  };
}

export function ProfileProgress({ profileData }: ProfileProgressProps) {
  const requiredFields = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'address', label: 'Address' },
    { key: 'city', label: 'City' },
    { key: 'state', label: 'State' },
    { key: 'pincode', label: 'Pincode' },
    { key: 'country', label: 'Country' },
    { key: 'profession', label: 'Profession' }
  ];

  const optionalFields = [
    { key: 'bio', label: 'Bio' },
    { key: 'profileImage', label: 'Profile Photo' }
  ];

  const completedRequired = requiredFields.filter(field => 
    profileData[field.key as keyof typeof profileData]
  ).length;

  const completedOptional = optionalFields.filter(field => 
    profileData[field.key as keyof typeof profileData]
  ).length;

  const totalFields = requiredFields.length + optionalFields.length;
  const completedTotal = completedRequired + completedOptional;
  const progressPercentage = Math.round((completedTotal / totalFields) * 100);
  const requiredPercentage = Math.round((completedRequired / requiredFields.length) * 100);

  return (
    <div className="fashion-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-playfair font-semibold">Profile Completion</h3>
        <div className="text-right">
          <div className="text-2xl font-bold gradient-text">{progressPercentage}%</div>
          <div className="text-sm text-muted-foreground">Complete</div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Overall Progress</span>
            <span className="text-muted-foreground">{completedTotal}/{totalFields} fields</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-3 bg-gradient-to-r from-muted via-muted to-muted"
          />
        </div>

        {/* Required Fields Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Required Fields</span>
            <span className="text-muted-foreground">{completedRequired}/{requiredFields.length} completed</span>
          </div>
          <Progress 
            value={requiredPercentage} 
            className="h-2"
          />
        </div>

        {/* Field Status Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border">
          <div>
            <h4 className="text-sm font-medium mb-2 text-foreground">Required</h4>
            <div className="space-y-1">
              {requiredFields.map((field) => {
                const isCompleted = !!profileData[field.key as keyof typeof profileData];
                return (
                  <div key={field.key} className="flex items-center gap-2 text-xs">
                    {isCompleted ? (
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                    ) : (
                      <Circle className="w-3 h-3 text-muted-foreground" />
                    )}
                    <span className={isCompleted ? "text-foreground" : "text-muted-foreground"}>
                      {field.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2 text-foreground">Optional</h4>
            <div className="space-y-1">
              {optionalFields.map((field) => {
                const isCompleted = !!profileData[field.key as keyof typeof profileData];
                return (
                  <div key={field.key} className="flex items-center gap-2 text-xs">
                    {isCompleted ? (
                      <CheckCircle2 className="w-3 h-3 text-accent" />
                    ) : (
                      <Circle className="w-3 h-3 text-muted-foreground" />
                    )}
                    <span className={isCompleted ? "text-foreground" : "text-muted-foreground"}>
                      {field.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Completion Message */}
        {progressPercentage === 100 ? (
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-lg p-3 text-center">
            <CheckCircle2 className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-sm font-medium text-foreground">Perfect! Your profile is complete</p>
          </div>
        ) : requiredPercentage === 100 ? (
          <div className="bg-gradient-to-r from-accent/20 to-secondary/20 border border-accent/30 rounded-lg p-3 text-center">
            <p className="text-sm font-medium text-foreground">
              Great! Add optional info to reach 100%
            </p>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg p-3 text-center">
            <p className="text-sm font-medium text-foreground">
              Complete required fields to unlock all features
            </p>
          </div>
        )}
      </div>
    </div>
  );
}