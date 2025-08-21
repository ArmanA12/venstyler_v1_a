import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, MapPin, Calendar, CreditCard, User, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useOrderDetails } from "@/hooks/useOrderDetails";
import { Alert, AlertDescription } from "@/components/ui/alert";


const OrderDetails = () => {
  const { orderId, type } = useParams();
  const navigate = useNavigate();
  
  const { data: orderResponse, isLoading, error } = useOrderDetails(parseInt(orderId || "0"));
  const orderData = orderResponse?.orderData;

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
          <Alert variant="destructive">
            <AlertDescription>
              Order not found or you don't have permission to view this order.
            </AlertDescription>
          </Alert>
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
                  <Badge className={`${getStatusColor(orderData.status)} font-medium px-3 py-1`}>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
                  </Badge>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(orderData.createdAt)}
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
                      <p className="font-semibold">{orderData.firstName} {orderData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="font-semibold">{orderData.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                    <p className="font-semibold">{orderData.address}</p>
                    <p className="text-muted-foreground">
                      {orderData.city}, {orderData.state} {orderData.zipCode}
                    </p>
                    <p className="text-muted-foreground">{orderData.country}</p>
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
                    <span className="font-semibold">${orderData.totals.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">${orderData.totals.shippingCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-semibold">${orderData.totals.tax}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary">${orderData.totals.total}</span>
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