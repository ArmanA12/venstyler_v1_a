import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  User,
  MapPin,
  CreditCard,
  BaggageClaim,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/navbar/Header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { checkUserAuth } from "../lib/getCurrentUserDetails";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// -------------------- VALIDATION --------------------
const shippingSchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(2, "Please select a country"),
  specialInstructions: z.string().optional(),
  saveAddress: z.boolean().optional(),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

interface CheckoutProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  designer: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const designId = parseInt(id);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [products, setProducts] = useState<CheckoutProduct[]>([]);
  console.log(id, "product ID");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const { data } = await axios.get(
          `https://venstyler.armanshekh.com/api/design/getProductBasicInfo/${designId}`,
          { withCredentials: true }
        );
        if (data.success && data.product) {
          const product = data.product;
          setProducts([
            {
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image || "/api/placeholder/200/200",
              quantity: 1,
              designer: product.designer.name,
            },
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };

    fetchProduct();
  }, [id]);

  const form = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      saveAddress: true,
    },
  });

  const countries = [
    "India",
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Japan",
  ];

  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  // Fetch user contact info from API/local storage
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 1️⃣ Fetch user info (name, email, phone)
        const result = await checkUserAuth();
        const userData = {
          name: result.user.name,
          email: result.user.email,
          phone: result.user.phone,
        };
        setUserInfo(userData);

        // 2️⃣ Fetch latest shipping address
        const { data: addressData } = await axios.get(
          "https://venstyler.armanshekh.com/api/order/current-user-shipping-address",
          { withCredentials: true }
        );

        if (addressData.success && addressData.shippingAddress) {
          const addr = addressData.shippingAddress;
          // Populate the form fields
          form.reset({
            address: addr.shippingAddress || "",
            city: addr.shippingCity || "",
            state: addr.shippingState || "",
            zipCode: addr.shippingPincode || "",
            country: addr.shippingCountry || "",
            specialInstructions: "", // Optional
            saveAddress: true,
          });
        }
      } catch (error) {
        console.error("Failed to fetch user/shipping info", error);
      }
    };

    fetchUserInfo();
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onSubmit = async (data: ShippingFormData) => {
    setIsProcessing(true);
    try {
      // 1️⃣ Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast({
          title: "Error",
          description: "Razorpay SDK failed to load",
          variant: "destructive",
        });
        return;
      }

      // 2️⃣ Create order on backend
      const { data: orderData } = await axios.post(
        "https://venstyler.armanshekh.com/api/order/create",
        {
          items: products.map((p) => ({
            designId: p.id,
            quantity: p.quantity,
          })),
          shippingDetails: {
            name: userInfo.name,
            phone: userInfo.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            pincode: data.zipCode,
            country: data.country,
          },
        },
        { withCredentials: true }
      );

      console.log(orderData, "After Creating the order");

      if (!orderData.success) {
        toast({
          title: "Order Failed",
          description: orderData.message,
          variant: "destructive",
        });
        return;
      }

      // 3️⃣ Open Razorpay payment modal
      const options = {
        key: orderData.razorpayKey,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: "VenStyler",
        description: "Purchase from VenStyler",
        order_id: orderData.razorpayOrderId,
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: userInfo.phone,
        },
        handler: async function (response: any) {
          // 4️⃣ Verify payment with backend
          const { data: verifyData } = await axios.post(
            "https://venstyler.armanshekh.com/api/order/verifyInitialPayment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderData.orderId,
            },
            { withCredentials: true }
          );

          console.log(verifyData, "Verifying data after payment");

          if (verifyData.success) {
            toast({
              title: "Payment Successful",
              description: "Your order has been placed!",
            });
            navigate("/order-confirmation", {
              state: {
                orderDatas: {
                  ...data,
                  products,
                  totals: { subtotal, tax, total },
                  orderId: orderData.orderId,
                },
              },
            });
          } else {
            toast({
              title: "Payment Failed",
              description: "Verification failed",
              variant: "destructive",
            });
          }
        },
        theme: { color: "#3399cc" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center  gap-4 mb-8">
          <div className="mt-5">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Feed
            </Link>
          </div>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input value={userInfo.name} readOnly />
                <Input value={userInfo.email} readOnly />
                <Input value={userInfo.phone} readOnly />
              </CardContent>
            </Card>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter street address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter city" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter state" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP/Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter ZIP code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {countries.map((c) => (
                                  <SelectItem key={c} value={c}>
                                    {c}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="specialInstructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Instructions</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any special instructions..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="saveAddress"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Save this address for future orders
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BaggageClaim className="h-5 w-5" />
                  Order Summary
                </CardTitle>
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
                      <h4 className="font-medium text-lg text-primary">
                        {product.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        by {product.designer}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm">Qty: {product.quantity}</span>
                        <span className="font-semibold">${product.price}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
