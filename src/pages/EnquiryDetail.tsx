import { Header } from "@/components/navbar/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { ArrowLeft, Mail, Calendar, Package } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import PremiumLoader from "@/components/PremiumLoader";

export default function EnquiryDetail() {
  const { enquiryId } = useParams<{ enquiryId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [response, setResponse] = useState("");

  // Fetch enquiry details
  const { data, isLoading } = useQuery({
    queryKey: ["enquiry", enquiryId],
    queryFn: async () => {
      const { data } = await api.get(`/api/enquiry/getEnquiry/${enquiryId}`);
      return data.data;
    },
    enabled: !!enquiryId,
  });

  const enquiry = data;

  // Update enquiry status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ status }: { status: string }) => {
      const { data } = await api.patch(`/api/enquiry/sendEnquiryResponsebuyer/${enquiryId}`, {
        responseMessage: response,
        status,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Response sent and status updated successfully");
      setResponse(""); // clear textarea
      queryClient.invalidateQueries({ queryKey: ["enquiry", enquiryId] });
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },
    onError: () => toast.error("Failed to send response"),
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; color: string }> = {
      PENDING: { variant: "secondary", color: "text-yellow-600" },
      IN_PROGRESS: { variant: "default", color: "text-blue-600" },
      RESPONDED: { variant: "outline", color: "text-green-600" },
      CLOSED: { variant: "destructive", color: "text-gray-600" },
    };
    const config = variants[status] || variants.PENDING;
    return <Badge variant={config.variant} className={config.color}>{status}</Badge>;
  };

  const handleSendResponse = () => {
    if (!response.trim()) return toast.error("Please type a response first");
    // Keep status as RESPONDED by default when sending response
    updateStatusMutation.mutate({ status: "RESPONDED" });
  };

  if (isLoading) return <PremiumLoader onLoadingComplete={() => {}} />;
  if (!enquiry) return <div className="min-h-screen"><Header /><div className="text-center py-12">Enquiry not found</div></div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="border-b bg-card">
        <div className="flex h-16 items-center px-6 gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Enquiry Details</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enquiry message */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Enquiry Message</CardTitle>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {new Date(enquiry.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{enquiry.message}</p>
              </CardContent>
            </Card>

            {/* Product details */}
            {enquiry.design && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Product Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {enquiry.design.images?.[0] && (
                      <img src={enquiry.design.images[0].url} alt={enquiry.design.title} className="h-32 w-32 rounded-lg object-cover" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{enquiry.design.title}</h3>
                      {enquiry.design.description && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{enquiry.design.description}</p>}
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="text-2xl font-bold">₹{enquiry.design.price}</span>
                          {enquiry.design.discount > 0 && <Badge variant="secondary" className="ml-2">{enquiry.design.discount}% OFF</Badge>}
                        </div>
                      </div>
                      <Button variant="outline" className="mt-4" onClick={() => navigate(`/product/${enquiry.design.id}`)}>View Product</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Response */}
            <Card>
              <CardHeader>
                <CardTitle>Send Response</CardTitle>
                <CardDescription>Respond to the customer's enquiry</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea placeholder="Type your response here..." value={response} onChange={(e) => setResponse(e.target.value)} rows={6} />
                <Button onClick={handleSendResponse} disabled={!response.trim()}>Send Response</Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Current Status</label>
                  <Select value={enquiry.status} onValueChange={(newStatus) => updateStatusMutation.mutate({ status: newStatus })}>
                    <SelectTrigger>{getStatusBadge(enquiry.status)}</SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="RESPONDED">Responded</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Customer */}
            {enquiry.user && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12"><AvatarFallback>{enquiry.user.name.charAt(0)}</AvatarFallback></Avatar>
                    <div>
                      <div className="font-semibold">{enquiry.user.name}</div>
                      <div className="text-sm text-muted-foreground">Customer</div>
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{enquiry.user.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
