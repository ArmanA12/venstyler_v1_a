import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, Package, Clock, X, Eye, IndianRupee } from "lucide-react";
import { Header } from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProductSellsDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with actual API call
  const productSellsData = {
    product: {
      id: productId,
      title: "Designer Silk Dress",
      imageUrl: "/placeholder.svg",
      price: 2999,
      category: "Dresses"
    },
    overview: {
      totalSells: 45,
      totalRevenue: 134955,
      confirmedOrders: 42,
      pendingOrders: 2,
      cancelledOrders: 1,
      averageOrderValue: 2999
    },
    recentOrders: [
      {
        orderId: "ORD-2024-001",
        buyerName: "Priya Sharma",
        buyerAvatar: "/placeholder.svg",
        amount: 2999,
        status: "Confirmed",
        date: "2024-01-15T10:30:00Z",
        shippingAddress: "Mumbai, Maharashtra"
      },
      {
        orderId: "ORD-2024-002", 
        buyerName: "Anita Patel",
        buyerAvatar: "/placeholder.svg",
        amount: 2999,
        status: "Pending",
        date: "2024-01-14T15:45:00Z",
        shippingAddress: "Delhi, Delhi"
      },
      {
        orderId: "ORD-2024-003",
        buyerName: "Kavya Reddy",
        buyerAvatar: "/placeholder.svg", 
        amount: 2999,
        status: "Confirmed",
        date: "2024-01-13T09:20:00Z",
        shippingAddress: "Bangalore, Karnataka"
      }
    ]
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      'Confirmed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    
    return (
      <Badge className={styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate("/user-dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Product Sales Details</h1>
        </div>

        {/* Product Info Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <img
                src={productSellsData.product.imageUrl}
                alt={productSellsData.product.title}
                className="w-20 h-20 object-cover rounded-lg border"
              />
              <div>
                <h2 className="text-xl font-semibold">{productSellsData.product.title}</h2>
                <p className="text-muted-foreground">{productSellsData.product.category}</p>
                <p className="text-lg font-medium">₹ {productSellsData.product.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productSellsData.overview.totalSells}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹ {productSellsData.overview.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹ {productSellsData.overview.averageOrderValue}</div>
              <p className="text-xs text-muted-foreground">
                Same as product price
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Order Status Summary */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed Orders</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{productSellsData.overview.confirmedOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{productSellsData.overview.pendingOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cancelled Orders</CardTitle>
              <X className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{productSellsData.overview.cancelledOrders}</div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest orders for this product
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Shipping Address</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productSellsData.recentOrders.map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell className="font-medium">{order.orderId}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={order.buyerAvatar} />
                          <AvatarFallback>
                            {order.buyerName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{order.buyerName}</span>
                      </div>
                    </TableCell>
                    <TableCell>₹ {order.amount.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{order.shippingAddress}</span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/order-details/sell/${order.orderId}`)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}