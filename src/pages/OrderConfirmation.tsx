import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Package, Truck, Home, Mail } from "lucide-react";
import axios from "axios";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { orderDatas } = location.state;

  console.log(orderDatas, "order Data after success")
  
  const orderId = orderDatas.orderId; 
  console.log(orderId, "from backend This id is  coming")

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(
          `https://venstyler.armanshekh.com/api/order/confirmation/${orderId}`,
          {
            withCredentials: true, // sends cookies/session automatically
          }
        );
        console.log(data, "order confirmation Data")
        setOrderData(data.orderData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!orderData) return null;

  const { products, totals, firstName, lastName, email, address, city, state, zipCode, country, status, paymentInfo } = orderData;
  const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" /> Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Number:</span>
                <Badge variant="secondary">{orderNumber}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Date:</span>
                <span>{new Date(orderData.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Email:</span>
                <span>{email}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Info */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" /> Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">{firstName} {lastName}</p>
                <p className="text-muted-foreground">{address}</p>
                <p className="text-muted-foreground">{city}, {state} {zipCode}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Estimated Delivery:</span>
                <span>{estimatedDelivery.toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{product.title}</h4>
                    <p className="text-sm text-muted-foreground">by {product.designer}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm">Qty: {product.quantity}</span>
                      <span className="font-semibold">₹{product.price}</span>
                    </div>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{totals.shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{totals.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{totals.total.toFixed(2)}</span>
                </div>
                
                {paymentInfo && (
                  <>
                    <Separator />
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <h4 className="font-medium">Payment Information</h4>
                      <div className="flex justify-between text-sm">
                        <span>Initial Payment (Paid)</span>
                        <span className="text-green-600">₹{paymentInfo.initialAmount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Remaining Amount</span>
                        <span className="text-orange-600">₹{paymentInfo.remainingAmount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Due Date</span>
                        <span>{new Date(paymentInfo.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive an email confirmation with your order details
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Order Processing</p>
                  <p className="text-sm text-muted-foreground">
                    Your designer will start working on your custom order
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Shipping Updates</p>
                  <p className="text-sm text-muted-foreground">
                    We'll send you tracking information when your order ships
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Button onClick={() => navigate("/")} className="flex-1">
                <Home className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={() => navigate("/profile")} className="flex-1">
                View Orders
              </Button>
            </div>
            
            {status === "DESIGN_IN_PROGRESS" && (
              <div className="flex gap-4">
                <Button 
                  onClick={() => navigate(`/order-processing/${orderId}`)} 
                  variant="secondary"
                  className="flex-1"
                >
                  Track Order Progress
                </Button>
                <Button 
                  onClick={() => navigate(`/schedule-meeting/${orderId}`)} 
                  variant="outline"
                  className="flex-1"
                >
                  Schedule Measurement
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
