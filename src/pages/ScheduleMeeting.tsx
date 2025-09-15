import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarDays, Clock, MapPin, Phone, ArrowLeft, CheckCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { toast } from "sonner";

const ScheduleMeeting = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [meetingType, setMeetingType] = useState("home");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available time slots
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
  ];

  const meetingOptions = [
    {
      value: "home",
      label: "Home Visit",
      description: "Our master will visit your home for measurement",
      icon: <MapPin className="h-5 w-5" />
    },
    {
      value: "phone",
      label: "Phone Consultation",
      description: "Get measurement guidance over phone call",
      icon: <Phone className="h-5 w-5" />
    }
  ];

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime || !meetingType) {
      toast.error("Please select date, time, and meeting type");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Mock API call - in real app, this would schedule the meeting
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Meeting scheduled successfully!");
      navigate(`/order-processing/${orderId}`);
    } catch (error) {
      toast.error("Failed to schedule meeting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Disable past dates and today
    return date < tomorrow;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/order-processing/${orderId}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Schedule Measurement</h1>
              <p className="text-muted-foreground">Order #{orderId}</p>
            </div>
          </div>

          {/* Meeting Type Selection */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Meeting Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={meetingType} onValueChange={setMeetingType}>
                {meetingOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <div className="flex items-start gap-3 flex-1">
                      <div className="text-muted-foreground mt-1">
                        {option.icon}
                      </div>
                      <div>
                        <Label htmlFor={option.value} className="font-medium cursor-pointer">
                          {option.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Date Selection */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDateDisabled}
                  className="rounded-md border"
                />
              </div>
            </CardContent>
          </Card>

          {/* Time Selection */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Select Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className="h-12"
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Additional Notes (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Any specific requirements or instructions for the measurement session..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Summary */}
          {selectedDate && selectedTime && meetingType && (
            <Card className="mb-6 bg-accent/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Meeting Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Type:</span>
                  <span>{meetingOptions.find(opt => opt.value === meetingType)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>{selectedDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Time:</span>
                  <span>{selectedTime}</span>
                </div>
                {notes && (
                  <div className="pt-2 border-t">
                    <span className="font-medium">Notes:</span>
                    <p className="text-sm text-muted-foreground mt-1">{notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate(`/order-processing/${orderId}`)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSchedule}
              disabled={!selectedDate || !selectedTime || !meetingType || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Scheduling..." : "Schedule Meeting"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeeting;