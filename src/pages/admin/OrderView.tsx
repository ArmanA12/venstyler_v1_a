import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Package, Truck, MapPin, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

export default function OrderView() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [order, setOrder] = useState({
    id: orderId,
    customer: "John Doe",
    customerEmail: "john@example.com",
    product: "Designer Dress",
    amount: "$299",
    status: "Processing",
    date: "2024-01-21",
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "TRK123456789",
    notes: "Customer requested express delivery"
  });

  const handleStatusUpdate = (newStatus: string) => {
    setOrder(prev => ({ ...prev, status: newStatus }));
    toast({
      title: "Status Updated",
      description: `Order status changed to ${newStatus}`,
    });
  };

  const handleTrackShipment = () => {
    // Implement track shipment logic
    toast({
      title: "Tracking Information",
      description: `Tracking number: ${order.trackingNumber}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate("/admin")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Order Details</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
              <CardDescription>Complete order details and history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Customer:</strong> {order.customer}</p>
                  <p><strong>Email:</strong> {order.customerEmail}</p>
                  <p><strong>Order Date:</strong> {order.date}</p>
                </div>
                <div className="space-y-2">
                  <p><strong>Product:</strong> {order.product}</p>
                  <p><strong>Amount:</strong> {order.amount}</p>
                  <p><strong>Status:</strong> <Badge>{order.status}</Badge></p>
                  <p><strong>Tracking:</strong> {order.trackingNumber}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p><strong>Shipping Address:</strong></p>
                <p className="text-muted-foreground">{order.shippingAddress}</p>
              </div>

              <div className="space-y-2">
                <p><strong>Notes:</strong></p>
                <p className="text-muted-foreground">{order.notes}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Update Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={order.status} onValueChange={handleStatusUpdate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={handleTrackShipment}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Track Shipment
                </Button>
                
                <div className="text-sm text-muted-foreground">
                  <p><strong>Tracking:</strong> {order.trackingNumber}</p>
                  <p><strong>Status:</strong> In Transit</p>
                  <p><strong>ETA:</strong> 2-3 business days</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <p className="font-medium">Order Placed</p>
                  <p className="text-muted-foreground">{order.date}</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Payment Confirmed</p>
                  <p className="text-muted-foreground">{order.date}</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Processing</p>
                  <p className="text-muted-foreground">Current Status</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}