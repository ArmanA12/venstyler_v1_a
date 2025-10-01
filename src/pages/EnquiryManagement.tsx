import { useState } from "react";
import { Header } from "@/components/navbar/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Mail, MessageSquare } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type Enquiry = {
  id: number;
  message: string;
  status: "PENDING" | "IN_PROGRESS" | "RESPONDED" | "CLOSED";
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  design: {
    id: number;
    title: string;
    description: string | null;
    images: Array<{ url: string }>;
    price: number;
    discount: number;
  };
};

export default function EnquiryManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: enquiries, isLoading } = useQuery<Enquiry[]>({
    queryKey: ["enquiries"],
    queryFn: async () => {
      const { data } = await api.get("https://venstyler.armanshekh.com/api/enquiry/getEnquiriesForSellerProducts");
      console.log(data, "enquiry data")

  return (data.data || []).map((e: any) => ({
    id: e.id,
    message: e.message,
    status: e.status,
    createdAt: e.createdAt,
    user: {
      id: e.userId || 0,        // fallback since API doesn’t send id
      name: e.name,
      email: e.email,
    },
    design: e.design,
  }));
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ enquiryId, status }: { enquiryId: number; status: string }) => {
      const { data } = await api.patch(`/api/enquiry/updateStatus/${enquiryId}`, { status });
      return data;
    },
    onSuccess: () => {
      toast.success("Enquiry status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },
    onError: () => {
      toast.error("Failed to update enquiry status");
    },
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

  const filteredEnquiries = enquiries?.filter((enquiry) => {
    const matchesSearch =
      enquiry.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || enquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (enquiryId: number, newStatus: string) => {
    updateStatusMutation.mutate({ enquiryId, status: newStatus });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <h1 className="text-2xl font-bold">Enquiry Management</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Product Enquiries</CardTitle>
                <CardDescription>Manage and respond to customer enquiries</CardDescription>
              </div>
              <Badge variant="outline" className="w-fit">
                <MessageSquare className="h-4 w-4 mr-2" />
                {filteredEnquiries?.length || 0} Total
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by customer, product, or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="RESPONDED">Responded</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">Loading enquiries...</div>
            ) : filteredEnquiries && filteredEnquiries.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEnquiries.map((enquiry) => (
                    <TableRow key={enquiry.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-muted-foreground/10">
                            <AvatarFallback>{enquiry.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{enquiry.user.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {enquiry.user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {enquiry.design.images[0] && (
                            <img
                              src={enquiry.design.images[0].url}
                              alt={enquiry.design.title}
                              className="h-10 w-10 rounded object-cover"
                            />
                          )}
                          <div>
                            <div className="font-medium">{enquiry.design.title}</div>
                            <div className="text-xs text-muted-foreground">
                              ₹{enquiry.design.price}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="line-clamp-2 text-sm">{enquiry.message}</p>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={enquiry.status}
                          onValueChange={(value) => handleStatusChange(enquiry.id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            {getStatusBadge(enquiry.status)}
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                            <SelectItem value="RESPONDED">Responded</SelectItem>
                            <SelectItem value="CLOSED">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {new Date(enquiry.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/enquiry/${enquiry.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No enquiries found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
