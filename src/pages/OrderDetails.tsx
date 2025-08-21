import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, MapPin, Calendar, CreditCard, User, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data based on your API structure
const mockOrderData = {
  products: [
    {
      id: 1,
      title: "Premium Fashion Design Template",
      designer: "Sarah Johnson",
      quantity: 1,
      price: 299,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Modern UI Kit Bundle",
      designer: "John Doe",
      quantity: 2,
      price: 149,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    }
  ],
  totals: {
    subtotal: 597,
    shippingCost: 25,
    tax: 47.76,
    total: 669.76,
  },
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@example.com",
  address: "123 Design Street, Creative District",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  country: "United States",
  status: "delivered",
  createdAt: "2024-01-15T10:30:00Z",
};

const OrderDetails = () => {
  const { orderId, type } = useParams();
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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
        </div>

        <div className="grid gap-6">
          {/* Order Header */}
          <Card className="shadow-lg border-0 bg-gradient-to-r from-card via-card to-primary/5">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <Package className="h-6 w-6 text-primary" />
                    Order #{orderId}
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">
                    {type === 'purchase' ? 'Your Purchase' : 'Your Sale'}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={`${getStatusColor(mockOrderData.status)} font-medium px-3 py-1`}>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {mockOrderData.status.charAt(0).toUpperCase() + mockOrderData.status.slice(1)}
                  </Badge>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(mockOrderData.createdAt)}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Order Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Order Items ({mockOrderData.products.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockOrderData.products.map((product, index) => (
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
                      {index < mockOrderData.products.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Customer Details */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {type === 'purchase' ? (
                      <>
                        <MapPin className="h-5 w-5 text-primary" />
                        Shipping Details
                      </>
                    ) : (
                      <>
                        <User className="h-5 w-5 text-primary" />
                        Customer Details
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Name</p>
                      <p className="font-semibold">{mockOrderData.firstName} {mockOrderData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="font-semibold">{mockOrderData.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                    <p className="font-semibold">{mockOrderData.address}</p>
                    <p className="text-muted-foreground">
                      {mockOrderData.city}, {mockOrderData.state} {mockOrderData.zipCode}
                    </p>
                    <p className="text-muted-foreground">{mockOrderData.country}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-primary/5 to-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${mockOrderData.totals.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">${mockOrderData.totals.shippingCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-semibold">${mockOrderData.totals.tax}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary">${mockOrderData.totals.total}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card className="shadow-lg border-0">
                <CardContent className="pt-6 space-y-3">
                  <Button className="w-full" variant="outline">
                    Download Invoice
                  </Button>
                  {type === 'purchase' && (
                    <Button className="w-full" variant="outline">
                      Track Order
                    </Button>
                  )}
                  <Button className="w-full" variant="outline">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;