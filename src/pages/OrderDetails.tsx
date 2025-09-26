import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, MapPin, Calendar, CreditCard, User, Ruler, CheckCircle, Loader2, Clock, Truck, Scissors, Home, Phone, AlertCircle, IndianRupee, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { toast } from "sonner";


const OrderDetails = () => {
  const { orderId, type } = useParams();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(
          `https://venstyler.armanshekh.com/api/order/orderDetailsForBuyerAndSeller/${orderId}`,
          {
            withCredentials: true, // sends cookies/session automatically
          }
        );
        console.log(data, "order details Data");
        setOrderData(data.orderData);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Something went wrong");
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'design_in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'measurement_scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'ready_for_delivery': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProcessingSteps = (currentStatus: string) => {
    const steps = [
      { key: 'PENDING', label: 'Pending', icon: Clock, description: 'Order placed and awaiting confirmation' },
      { key: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle, description: 'Order has been confirmed' },
      { key: 'DESIGN_IN_PROGRESS', label: 'Design In Progress', icon: Scissors, description: 'Design work has started' },
      { key: 'DESIGN_COMPLETED', label: 'Design Completed', icon: Package, description: 'Design is finalized' },
      { key: 'MEASUREMENT_COMPLETED', label: 'Measurement Completed', icon: Ruler, description: 'Measurements taken successfully' },
      { key: 'FINAL_PAYMENT_PENDING', label: 'Final Payment Pending', icon: IndianRupee, description: 'Awaiting final payment from customer' },
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


  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdatingStatus(true);
    try {
      await axios.put(
        `https://venstyler.armanshekh.com/api/order/${orderId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      setOrderData(prev => ({ ...prev, status: newStatus }));
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error("Failed to update order status");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const getStatusUpdateOptions = () => {
    if (type === 'purchase') {
      return [
        { value: 'DELIVERED', label: 'Mark as Delivered' },
        { value: 'CANCELLED', label: 'Cancel Order' }
      ];
    } else {
      return [
        { value: 'DESIGN_IN_PROGRESS', label: 'Design In Progress' },
        { value: 'DESIGN_COMPLETED', label: 'Design Completed' },
        { value: 'MEASUREMENT_COMPLETED', label: 'Measurement Completed' },
        { value: 'FINAL_PAYMENT_PENDING', label: 'Final Payment Pending' },
        { value: 'COMPLETED', label: 'Production Completed' },
        { value: 'SHIPPED', label: 'Shipped' },
        { value: 'DELIVERED', label: 'Delivered' }
      ];
    }
  };

  // const handlePayment = async () => {
  //   setIsProcessingPayment(true);
  //   try {
  //     // Mock payment process - replace with actual payment integration
  //     await new Promise(resolve => setTimeout(resolve, 2000));

  //     setOrderData(prev => ({
  //       ...prev,
  //       payments: {
  //         ...prev.payments,
  //         final: { ...prev.payments.final, paid: true }
  //       }
  //     }));
  //     toast.success("Payment processed successfully!");
  //   } catch (error) {
  //     toast.error("Payment processing failed");
  //   } finally {
  //     setIsProcessingPayment(false);
  //   }
  // };
  // const formatDate = (dateString: string) => {
  //   return new Date(dateString).toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   });
  // };


  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };



  const handlePayment = async (orderId) => {
    try {
      // Step 1: Create Razorpay Order
      const { data } = await axios.post(
        "https://venstyler.armanshekh.com/api/payment/createFinalPayment",
        { orderId },
        { withCredentials: true } // ✅ Send cookies/session
      );

      if (!data.success) {
        alert(data.message);
        return;
      }

      const options = {
        key: data.razorpayKey,
        amount: data.amount * 100, // Razorpay expects paise
        currency: data.currency,
        name: "VenStyler",
        description: "Final Payment",
        order_id: data.razorpayOrderId,
        handler: async function (response) {
          try {
            // Step 2: Verify Payment
            const verifyRes = await axios.post(
              "https://venstyler.armanshekh.com/api/payment/verifyFinalPayment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: data.orderId,
              },
              { withCredentials: true } // ✅ Important here too
            );

            if (verifyRes.data.success) {
              alert("✅ Final Payment successful! Order Completed.");
              // Refresh page or update order status
            } else {
              alert("❌ Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Something went wrong while verifying payment.");
          }
        },
        prefill: {
          name: orderData.buyer.name || "",
          email: orderData.buyer.email || "",

        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong while creating final payment order.");
    }
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
          <Card className=" border border-border-50 bg-gradient-to-r from-card via-card to-primary/5">
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
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(orderData.status)} font-medium px-3 py-1`}>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {orderData.status.replace('_', ' ').charAt(0).toUpperCase() + orderData.status.replace('_', ' ').slice(1)}
                    </Badge>
                    <Select onValueChange={handleStatusUpdate} disabled={isUpdatingStatus}>
                      <SelectTrigger className="w-[180px] bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 hover:from-primary/20 hover:to-primary/10 transition-all">
                        <Settings className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {getStatusUpdateOptions().map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(orderData.createdAt)}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Processing Steps */}
          <Card className=" border border-border-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Order Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getProcessingSteps(orderData.status).map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.key} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.completed ? 'bg-primary text-primary-foreground' :
                        step.active ? 'bg-primary/20 text-primary border-2 border-primary' :
                          'bg-muted text-muted-foreground'
                        }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.label}
                        </h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      {step.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Order Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card className=" border border-border-50">
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
                            <span className="font-semibold text-primary">₹{product.price}</span>
                          </div>
                        </div>
                      </div>
                      {index < orderData.products.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Customer Details */}
              <Card className=" border border-border-50">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Name</p>
                      <p className="font-semibold break-words">{orderData.buyer.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="font-semibold break-words">{orderData.buyer.email}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                    <p className="font-semibold">{orderData.shipping.address}</p>
                    <p className="text-muted-foreground">
                      {orderData.shipping.city}, {orderData.shipping.state} {orderData.shipping.zipCode}
                    </p>
                    <p className="text-muted-foreground">{orderData.shipping.country}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <Card className=" border border-border-50 bg-gradient-to-br from-primary/5 to-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">₹{orderData.totals.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">₹{orderData.totals.shippingCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-semibold">₹{orderData.totals.tax}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary">₹{orderData.totals.total}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              {orderData.payments && (
                <Card className="border border-border-50 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/20 dark:via-yellow-950/20 dark:to-orange-950/20 shadow-lg shadow-amber-500/10">
                  <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <IndianRupee className="h-5 w-5" />
                      </div>
                      Payment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-3">
                    <div className="space-y-4">

                      <div className="border border-green-200 dark:from-green-950/30 rounded-xl dark:to-emerald-950/30 dark:border-green-800">
                        <div className="flex justify-between items-center p-4 rounded-lg relative overflow-clip ">

                          <div className="absolute blur-2xl -top-4 -left-4 w-full h-10 bg-green-500"></div>
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-medium text-green-800 dark:text-green-200">Initial Payment</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-700 dark:text-green-300">₹{orderData.payments.initial.amount}</span>
                            <Badge className="bg-green-500 text-white border-0 animate-pulse">
                              {orderData.payments.initial.paid ? "Paid" : "Pending"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className={`flex justify-between items-center p-4 rounded-lg border ${orderData.payments.final.paid
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:from-green-950/30 dark:to-emerald-950/30 dark:border-green-800'
                        : 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 dark:from-yellow-950/30 dark:to-amber-950/30 dark:border-yellow-800'
                        }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${orderData.payments.final.paid ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'
                            }`}>
                            {orderData.payments.final.paid ?
                              <CheckCircle className="h-4 w-4 text-white" /> :
                              <Clock className="h-4 w-4 text-white" />
                            }
                          </div>
                          <span className={`font-medium ${orderData.payments.final.paid
                            ? 'text-green-800 dark:text-green-200'
                            : 'text-yellow-800 dark:text-yellow-200'
                            }`}>Final Payment</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-bold ${orderData.payments.final.paid
                            ? 'text-green-700 dark:text-green-300'
                            : 'text-yellow-700 dark:text-yellow-300'
                            }`}>₹{orderData.payments.final.amount}</span>
                          <Badge className={orderData.payments.final.paid ? "bg-green-500 text-white border-0" : "bg-yellow-500 text-white border-0 animate-pulse"}>
                            {orderData.payments.final.paid ? "Paid" : "Pending"}
                          </Badge>
                        </div>
                      </div>

                      {!orderData.payments.final.paid && orderData.payments.final.dueDate && (
                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200 dark:from-red-950/30 dark:to-pink-950/30 dark:border-red-800 animate-fade-in">
                          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                            <AlertCircle className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <span className="font-medium text-red-800 dark:text-red-200 block">Payment Due</span>
                            <span className="text-sm text-red-600 dark:text-red-400">
                              {formatDate(orderData.payments.final.dueDate)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <Card className=" border border-border-50">
                <CardContent className="pt-6 space-y-3">
                  {/* Payment Button for Remaining Amount */}
                  {orderData.payments && !orderData.payments.final.paid && type === 'purchase' && (
                    <Button
                      className="w-full"
                      onClick={() => handlePayment(orderId)}
                      disabled={isProcessingPayment}
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay Remaining ₹{orderData.payments.final.amount}
                        </>
                      )}
                    </Button>
                  )}

                  {/* Schedule Meeting Button */}
                  {orderData.status === 'DESIGN_IN_PROGRESS' && (
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => navigate(`/schedule-meeting/${orderId}`)}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      {type === 'purchase' ? 'Schedule Measurement' : 'View Meeting Details'}
                    </Button>
                  )}

                  <Button className="w-full" variant="outline">
                    Download Invoice
                  </Button>

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
