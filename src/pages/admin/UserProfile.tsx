import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Mail, Calendar, ShoppingBag, Edit, UserX } from "lucide-react";
import { Header } from "@/components/Header";

export default function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user] = useState({
    id: userId,
    name: "John Doe",
    email: "john@example.com",
    role: "Customer",
    joined: "2024-01-15",
    orders: 5,
    avatar: "",
    status: "Active",
    phone: "+1 234 567 8900",
    address: "123 Main St, New York, NY 10001"
  });

  const handleSuspendUser = () => {
    // Implement suspend user logic
    alert("User suspended successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate("/userDashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">User Profile</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Personal details and account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <Badge variant={user.role === "Designer" ? "default" : "secondary"}>
                    {user.role}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {user.joined}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  <span>{user.orders} orders</span>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Status:</strong> <Badge variant="outline">{user.status}</Badge></p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Manage user account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full" 
                onClick={() => navigate(`/admin/users/${userId}/edit`)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit User
              </Button>
              
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleSuspendUser}
              >
                <UserX className="h-4 w-4 mr-2" />
                Suspend User
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}