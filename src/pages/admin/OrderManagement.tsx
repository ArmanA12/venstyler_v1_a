import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Truck, MapPin, Calendar, User, Save, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const OrderManagement = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock order data - replace with your API call
  const [orderData] = useState({
    id: orderId,
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
    },
    products: [
      {
        id: 1,
        title: "Modern Living Room Design",
        designer: "Jane Smith",
        quantity: 1,
        price: 299,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"
      }
    ],
    shippingAddress: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    totalAmount: 329,
    createdAt: "2024-01-15T10:30:00Z",
    status: "processing"
  });

  const [formData, setFormData] = useState({
    status: orderData.status,
    trackingNumber: "",
    shippingCarrier: "",
    estimatedDelivery: "",
    internalNotes: ""
  });

  const statusOptions = [
    { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    { value: "processing", label: "Processing", color: "bg-blue-100 text-blue-800" },
    { value: "shipped", label: "Shipped", color: "bg-purple-100 text-purple-800" },
    { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-800" },
    { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" }
  ];

  const carriers = [
    "FedEx", "UPS", "DHL", "USPS", "Blue Dart", "Delhivery", "Ekart", "Other"
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <AlertTriangle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option?.color || "bg-gray-100 text-gray-800";
  };

  const handleSave = () => {
    // Add your API call here to update the order
    console.log("Updating order:", { orderId, ...formData });
    
    toast({
      title: "Order Updated",
      description: "Order status and tracking information have been updated successfully.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-card via-card to-primary/5">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-bold flex items-center gap-3">
                      <Package className="h-6 w-6 text-primary" />
                      Order #{orderId}
                    </CardTitle>
                    <p className="text-muted-foreground mt-1">
                      Created on {formatDate(orderData.createdAt)}
                    </p>
                  </div>
                  <Badge className={`${getStatusColor(orderData.status)} font-medium px-3 py-1 flex items-center gap-1`}>
                    {getStatusIcon(orderData.status)}
                    {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Order Items */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Order Items ({orderData.products.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderData.products.map((product, index) => (
                  <div key={product.id}>
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{product.title}</h4>
                        <p className="text-sm text-muted-foreground">by {product.designer}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-muted-foreground">Qty: {product.quantity}</span>
                          <span className="font-semibold text-primary">${product.price}</span>
                        </div>
                      </div>
                    </div>
                    {index < orderData.products.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Customer Details */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Name</p>
                    <p className="font-semibold">{orderData.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="font-semibold">{orderData.customer.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="font-semibold">{orderData.customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Shipping Address
                  </p>
                  <p className="font-semibold">{orderData.shippingAddress.street}</p>
                  <p className="text-muted-foreground">
                    {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zipCode}
                  </p>
                  <p className="text-muted-foreground">{orderData.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Management Panel */}
          <div className="space-y-6">
            {/* Order Status Update */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-primary/5 to-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Update Order Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Order Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(option.value)}
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Internal Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add internal notes about this status update..."
                    value={formData.internalNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, internalNotes: e.target.value }))}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipment Tracking */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Shipment Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="carrier">Shipping Carrier</Label>
                  <Select 
                    value={formData.shippingCarrier} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, shippingCarrier: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select carrier" />
                    </SelectTrigger>
                    <SelectContent>
                      {carriers.map((carrier) => (
                        <SelectItem key={carrier} value={carrier}>
                          {carrier}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tracking">Tracking Number</Label>
                  <Input
                    id="tracking"
                    placeholder="Enter tracking number"
                    value={formData.trackingNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, trackingNumber: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delivery">Estimated Delivery</Label>
                  <Input
                    id="delivery"
                    type="date"
                    value={formData.estimatedDelivery}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedDelivery: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${orderData.totalAmount - 30}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">$30</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary">${orderData.totalAmount}</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="shadow-lg border-0">
              <CardContent className="pt-6 space-y-3">
                <Button 
                  className="w-full" 
                  onClick={handleSave}
                  size="lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Update Order
                </Button>
                <Button className="w-full" variant="outline" size="lg">
                  Send Notification to Customer
                </Button>
                <Button className="w-full" variant="outline" size="lg">
                  Print Shipping Label
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;