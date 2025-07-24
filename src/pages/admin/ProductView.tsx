import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Trash2, Package, DollarSign, BarChart3 } from "lucide-react";
import { Header } from "@/components/Header";

export default function ProductView() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product] = useState({
    id: productId,
    name: "Designer Dress",
    category: "Dresses",
    price: "$299",
    stock: 45,
    status: "Active",
    sales: 234,
    description: "A beautiful designer dress perfect for special occasions.",
    sku: "DD-001",
    brand: "Fashion Brand",
    material: "Silk",
    colors: ["Black", "Red", "Blue"],
    sizes: ["S", "M", "L", "XL"],
    images: ["/placeholder.svg"]
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      // Implement delete logic
      alert("Product deleted successfully");
      navigate("/admin");
    }
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
          <h1 className="text-2xl font-bold">Product Details</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>Complete product details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                  <Badge variant="outline" className="mt-2">{product.category}</Badge>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p><strong>SKU:</strong> {product.sku}</p>
                  <p><strong>Brand:</strong> {product.brand}</p>
                  <p><strong>Material:</strong> {product.material}</p>
                </div>
                <div className="space-y-2">
                  <p><strong>Colors:</strong> {product.colors.join(", ")}</p>
                  <p><strong>Sizes:</strong> {product.sizes.join(", ")}</p>
                  <p><strong>Status:</strong> <Badge>{product.status}</Badge></p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Pricing & Stock
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{product.price}</div>
                  <p className="text-sm text-muted-foreground">Current Price</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold">{product.stock}</div>
                  <p className="text-sm text-muted-foreground">Units in Stock</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold">{product.sales}</div>
                  <p className="text-sm text-muted-foreground">Total Sales</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={() => navigate(`/admin/products/${productId}/edit`)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Product
                </Button>
                
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Product
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}