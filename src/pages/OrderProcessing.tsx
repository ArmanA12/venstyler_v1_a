import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock, Package, Ruler, Truck, Home } from "lucide-react";
import { Header } from "@/components/Header";

interface OrderStatus {
  step: number;
  label: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  active: boolean;
}

const OrderProcessing = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  // Mock data - in real app, this would come from API based on order status
  const [currentStep, setCurrentStep] = useState(2); // Current step (1-4)
  
  const steps: OrderStatus[] = [
    {
      step: 1,
      label: "Order Confirmed",
      description: "Your order has been received and confirmed",
      icon: <CheckCircle className="h-6 w-6" />,
      completed: currentStep > 1,
      active: currentStep === 1
    },
    {
      step: 2,
      label: "Measurement Collection",
      description: "Our master will collect your measurements for perfect fitting",
      icon: <Ruler className="h-6 w-6" />,
      completed: currentStep > 2,
      active: currentStep === 2
    },
    {
      step: 3,
      label: "Product Preparation",
      description: "Your custom product is being prepared by our expert tailors",
      icon: <Package className="h-6 w-6" />,
      completed: currentStep > 3,
      active: currentStep === 3
    },
    {
      step: 4,
      label: "Ready for Delivery",
      description: "Your order is ready and will be shipped soon",
      icon: <Truck className="h-6 w-6" />,
      completed: currentStep > 4,
      active: currentStep === 4
    }
  ];

  const getStepStatus = (step: OrderStatus) => {
    if (step.completed) return "completed";
    if (step.active) return "active";
    return "pending";
  };

  const getStepColors = (status: string) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-green-100 dark:bg-green-900/30",
          border: "border-green-500",
          icon: "text-green-600 dark:text-green-400",
          text: "text-green-800 dark:text-green-200"
        };
      case "active":
        return {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          border: "border-blue-500",
          icon: "text-blue-600 dark:text-blue-400",
          text: "text-blue-800 dark:text-blue-200"
        };
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-800",
          border: "border-gray-300 dark:border-gray-600",
          icon: "text-gray-400 dark:text-gray-500",
          text: "text-gray-600 dark:text-gray-400"
        };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Order Processing</h1>
            <p className="text-muted-foreground">
              Track the progress of your custom order #{orderId}
            </p>
          </div>

          {/* Progress Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {steps.map((step, index) => {
                  const status = getStepStatus(step);
                  const colors = getStepColors(status);
                  
                  return (
                    <div key={step.step} className="flex items-start gap-4">
                      {/* Step Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 ${colors.bg} ${colors.border} flex items-center justify-center`}>
                        {status === "completed" ? (
                          <CheckCircle className={`h-6 w-6 ${colors.icon}`} />
                        ) : status === "active" ? (
                          <Clock className={`h-6 w-6 ${colors.icon}`} />
                        ) : (
                          <Circle className={`h-6 w-6 ${colors.icon}`} />
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${colors.text}`}>
                            {step.label}
                          </h3>
                          {status === "completed" && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          )}
                          {status === "active" && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              In Progress
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                        
                        {step.step === 2 && status === "active" && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-3"
                            onClick={() => navigate(`/schedule-meeting/${orderId}`)}
                          >
                            <Ruler className="h-4 w-4 mr-2" />
                            Schedule Measurement
                          </Button>
                        )}
                      </div>

                      {/* Connection Line */}
                      {index < steps.length - 1 && (
                        <div className="absolute left-6 mt-12 w-0.5 h-6 bg-gray-300 dark:bg-gray-600" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Estimated Timeline */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Estimated Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="font-medium">Expected Completion</p>
                  <p className="text-2xl font-bold text-primary">7-10 Days</p>
                  <p className="text-sm text-muted-foreground">
                    From measurement collection date
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Current Status</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {steps[currentStep - 1]?.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Step {currentStep} of 4
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate("/")} variant="outline">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <Button onClick={() => navigate("/profile")}>
              View All Orders
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProcessing;