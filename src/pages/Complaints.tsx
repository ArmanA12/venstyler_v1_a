import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, AlertCircle, MessageSquare, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Complaints = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    description: "",
    email: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    toast({
      title: "Complaint Submitted Successfully",
      description: "We'll review your complaint and get back to you within 24-48 hours.",
    });
    // Reset form
    setFormData({
      title: "",
      category: "",
      priority: "",
      description: "",
      email: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={() => navigate(-1)}
            variant="ghost" 
            size="sm"
            className="hover:bg-accent/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Submit a Complaint</h1>
            <p className="text-muted-foreground">We're here to help resolve your concerns</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="p-6 shadow-lg shadow-primary/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Complaint Details</h2>
                <p className="text-sm text-muted-foreground">Please provide detailed information about your concern</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Complaint Title *</Label>
                  <Input
                    id="title"
                    placeholder="Brief description of your issue"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select complaint category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product-quality">Product Quality</SelectItem>
                      <SelectItem value="delivery">Delivery Issues</SelectItem>
                      <SelectItem value="customer-service">Customer Service</SelectItem>
                      <SelectItem value="billing">Billing & Payment</SelectItem>
                      <SelectItem value="technical">Technical Issues</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe your complaint in detail. Include any relevant order numbers, dates, or other information that might help us resolve your issue..."
                  className="min-h-[120px] resize-none"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 flex-1"
                  disabled={!formData.title || !formData.email || !formData.description}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Complaint
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setFormData({ title: "", category: "", priority: "", description: "", email: "" })}
                >
                  Clear
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Help Info */}
          <Card className="p-6 shadow-lg shadow-primary/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <AlertCircle className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-semibold">Need Help?</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Our support team typically responds within 24-48 hours.</p>
              <p>For urgent matters, please contact us directly at:</p>
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="font-medium text-foreground">support@company.com</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </Card>

          {/* Common Issues */}
          <Card className="p-6 shadow-lg shadow-primary/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <FileText className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="font-semibold">Common Issues</h3>
            </div>
            <div className="space-y-2">
              {[
                "Order delivery delays",
                "Product quality concerns",
                "Billing discrepancies",
                "Account access issues",
                "Refund requests"
              ].map((issue, index) => (
                <div key={index} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer p-2 hover:bg-accent/20 rounded">
                  • {issue}
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Complaints Link */}
          <Card className="p-6 shadow-lg shadow-primary/5">
            <h3 className="font-semibold mb-3">Track Your Complaints</h3>
            <p className="text-sm text-muted-foreground mb-4">
              View the status of your previous complaints and our responses.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/profile')}
            >
              View My Complaints
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Complaints;