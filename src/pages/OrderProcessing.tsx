import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock, Package, Ruler, Truck, Home, ArrowLeft, Scissors, DollarSign, AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { useOrderDetails } from "@/hooks/useOrderDetails";
import { Loader2 } from "lucide-react";

const OrderProcessing = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  const { data: orderData, isLoading, error } = useOrderDetails(Number(orderId));

  const getProcessingSteps = (currentStatus: string) => {
    const steps = [
      { key: 'PENDING', label: 'Pending', icon: Clock, description: 'Order placed and awaiting confirmation' },
      { key: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle, description: 'Order has been confirmed' },
      { key: 'DESIGN_IN_PROGRESS', label: 'Design In Progress', icon: Scissors, description: 'Design work has started' },
      { key: 'DESIGN_COMPLETED', label: 'Design Completed', icon: Package, description: 'Design is finalized' },
      { key: 'MEASUREMENT_COMPLETED', label: 'Measurement Completed', icon: Ruler, description: 'Measurements taken successfully' },
      { key: 'FINAL_PAYMENT_PENDING', label: 'Final Payment Pending', icon: DollarSign, description: 'Awaiting final payment from customer' },
      { key: 'COMPLETED', label: 'Completed', icon: CheckCircle, description: 'Order production is completed' },
      { key: 'SHIPPED', label: 'Shipped', icon: Truck, description: 'Order has been shipped' },
      { key: 'DELIVERED', label: 'Delivered', icon: Home, description: 'Order delivered successfully' },
      { key: 'CANCELLED', label: 'Cancelled', icon: AlertCircle, description: 'Order has been cancelled' },
    ];

    const currentIndex = steps.findIndex(step => step.key === currentStatus);
    
    return steps.map((step, index) => ({
      ...step,
      completed: currentIndex > index,
      active: currentIndex === index
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-4 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 hover:bg-primary/10 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <Card className="border border-border bg-card">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Order not found or failed to load.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Order Processing</h1>
            <p className="text-muted-foreground">Track the progress of order #{orderId}</p>
          </div>
        </div>

        {/* Processing Steps */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Order Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getProcessingSteps(orderData.orderData.status).map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.key} className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step.completed ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 
                      step.active ? 'bg-primary/20 text-primary border-2 border-primary animate-pulse' : 
                      'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium transition-colors ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.label}
                      </h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    {step.completed && <CheckCircle className="h-5 w-5 text-green-600 animate-scale-in" />}
                    {step.active && <Clock className="h-5 w-5 text-primary animate-pulse" />}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Schedule Meeting Button */}
        {orderData.orderData.status === 'DESIGN_IN_PROGRESS' && (
          <Card className="border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-primary mb-1">Ready for Measurement?</h3>
                  <p className="text-sm text-muted-foreground">Schedule a meeting with our master for precise measurements</p>
                </div>
                <Button onClick={() => navigate(`/schedule-meeting/${orderId}`)} className="hover-scale">
                  <Ruler className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate("/")} variant="outline" className="hover-scale">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <Button onClick={() => navigate("/profile")} className="hover-scale">
            View All Orders
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderProcessing;