import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Package,
    ShoppingCart,
    Search,
    Plus,
    Eye,
    MoreHorizontal,
    Edit,
    Trash2,
    DollarSign
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { useMyUploadedProducts } from "@/hooks/useMyUploadedProducts";
import { useMyOrders } from "@/hooks/useMyOrders";


export default function UserDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const { data, isLoading } = useMyUploadedProducts();
    const { data: orders, isLoading: isOrdersLoading, isError } = useMyOrders();

    console.log(orders, "user uploaded products")
    const confirmedTotal = useMemo(() => {
        if (!orders || orders.length === 0) return 0;
        return orders
            .filter(order => order.status === "CONFIRMED")
            .reduce((acc, order) => acc + order.price, 0);
    }, [orders]);



    // Mock data
    const stats = [
        { title: "Total Orders", value: orders?.length, change: "+0%", icon: ShoppingCart },
        { title: "Total Products", value: data?.count, change: "+0", icon: Package },
        { title: "Total Revenue", value: confirmedTotal, change: "+0.3%", icon: DollarSign },
    ];


    const getStatusBadge = (status: string) => {
        const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
            "Active": "default",
            "Low Stock": "secondary",
            "Out of Stock": "destructive",
            "Completed": "default",
            "Processing": "secondary",
            "Shipped": "outline",
            "Pending": "secondary"
        };
        return <Badge variant={variants[status] || "default"}>{status}</Badge>;
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="border-b bg-card">
                <div className="flex h-16 items-center px-6">
                    <h1 className="text-2xl font-bold">User Dashboard</h1>
                </div>
            </div>

            <div className="p-6">
                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="p-1 border border-border/50 rounded-xl overflow-clip">
                            <div key={index} className="relative">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.6),transparent)] blur-2xl"></div>

                                <Card className="relative overflow-clip  border">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-lg font-semibold text-primary">{stat.title}</CardTitle>
                                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        <p className="text-xs text-muted-foreground">
                                            <span className="text-green-600">{stat.change}</span> from last month
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>


                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <Tabs defaultValue="products" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="products">Products</TabsTrigger>
                        <TabsTrigger value="orders"> Orders</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    </TabsList>

                    {/* Products Tab */}
                    <TabsContent value="products">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>My Products</CardTitle>
                                        <CardDescription>Manage your listed products</CardDescription>
                                    </div>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Product
                                    </Button>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Search className="h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="max-w-sm"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Orders</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Likes</TableHead>
                                            <TableHead>Shares</TableHead>
                                            <TableHead>Shaves</TableHead>
                                            <TableHead>Reviews</TableHead>
                                            <TableHead>Rating</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data?.products?.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell className="font-medium">{product.title}</TableCell>
                                                <TableCell>{product.category}</TableCell>
                                                <TableCell>₹ {product.price}</TableCell>
                                                <TableCell>{product.meta.orderCount}</TableCell>
                                                <TableCell>{getStatusBadge('Active')}</TableCell>
                                                <TableCell>{product.meta.likeCount}</TableCell>
                                                <TableCell>{product.meta.shareCount}</TableCell>
                                                <TableCell>{product.meta.saveCount}</TableCell>
                                                <TableCell>{product.meta.reviewCount}</TableCell>
                                                <TableCell>{product.meta.averageRating}</TableCell>

                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => navigate(`/user/products/${product.id}`)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => navigate(`/user/products/${product.id}/edit`)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-destructive">
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Orders Tab */}
                    <TabsContent value="orders">
                        <Card>
                            <CardHeader>
                                <CardTitle>My Orders</CardTitle>
                                <CardDescription>Track and manage your orders</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Order ID</TableHead>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders?.map((order) => (
                                            <TableRow key={order.orderId}>
                                                <TableCell className="font-medium">{order.orderId}</TableCell>
                                                <TableCell>{order.title}</TableCell>
                                                <TableCell>₹ {order.price}</TableCell>
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
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => navigate(`/user/orders/${order.id}`)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View Order
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => navigate(`/user/orders/${order.id}/update`)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Update Status
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => navigate(`/user/orders/${order.id}/track`)}>
                                                                <Package className="mr-2 h-4 w-4" />
                                                                Track Shipment
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Spending Trend</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">$1,320</div>
                                    <p className="text-xs text-muted-foreground">
                                        <span className="text-green-600">+8.3%</span> from last month
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Top Categories</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Dresses</span>
                                            <span>45%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Suits</span>
                                            <span>30%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Accessories</span>
                                            <span>25%</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Growth</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">25 Orders</div>
                                    <p className="text-xs text-muted-foreground">
                                        <span className="text-green-600">+5%</span> more than last month
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
