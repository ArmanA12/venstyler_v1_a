import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, X, Video, Image } from "lucide-react";

const productUploadSchema = z.object({
  title: z.string().min(1, "Product title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.string().min(1, "Price is required"),
  discount: z.string().min(0, "Discount must be 0 or greater"),
  completionTime: z.string().min(1, "Completion time is required"),
});

type ProductUploadForm = z.infer<typeof productUploadSchema>;

const categories = [
  "Women's Fashion",
  "Men's Fashion",
  "Accessories",
  "Shoes",
  "Bags",
  "Jewelry",
  "Home Decor",
  "Kids Fashion"
];

const ProductUpload = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ProductUploadForm>({
    resolver: zodResolver(productUploadSchema),
  });

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length + selectedImages.length > 10) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 10 images.",
        variant: "destructive",
      });
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB.`,
          variant: "destructive",
        });
        return false;
      }
      return file.type.startsWith('image/');
    });

    setSelectedImages(prev => [...prev, ...validFiles]);
    
    const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
    setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const handleVideoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: "Video too large",
          description: "Video must be smaller than 100MB.",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith('video/')) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid video file.",
          variant: "destructive",
        });
        return;
      }

      setSelectedVideo(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = () => {
    setSelectedVideo(null);
    setVideoPreviewUrl(null);
  };

  const onSubmit = async (data: ProductUploadForm) => {
    if (selectedImages.length === 0) {
      toast({
        title: "Images required",
        description: "Please upload at least one product image.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Product uploaded successfully!",
      });
      navigate("/");
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <Header />
      
      <div className="w-full lg:w-4/5 mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Feed
          </Link>
          <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Upload Product
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="fashion-card p-6">
              <h3 className="text-xl font-playfair font-semibold mb-6">Product Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="title">Product Title *</Label>
                  <Input 
                    id="title"
                    {...register("title")}
                    className="fashion-input"
                    placeholder="Enter product title"
                  />
                  {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description"
                    {...register("description")}
                    rows={4}
                    className="fashion-input resize-none"
                    placeholder="Describe your product"
                  />
                  {errors.description && <p className="text-destructive text-sm">{errors.description.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select onValueChange={(value) => setValue("category", value)}>
                    <SelectTrigger className="fashion-input">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-destructive text-sm">{errors.category.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input 
                    id="price"
                    type="number"
                    {...register("price")}
                    className="fashion-input"
                    placeholder="0.00"
                  />
                  {errors.price && <p className="text-destructive text-sm">{errors.price.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input 
                    id="discount"
                    type="number"
                    {...register("discount")}
                    className="fashion-input"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                  {errors.discount && <p className="text-destructive text-sm">{errors.discount.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="completionTime">Completion Time *</Label>
                  <Input 
                    id="completionTime"
                    {...register("completionTime")}
                    className="fashion-input"
                    placeholder="e.g., 5-7 business days"
                  />
                  {errors.completionTime && <p className="text-destructive text-sm">{errors.completionTime.message}</p>}
                </div>
              </div>
            </div>

            <div className="fashion-card p-6">
              <h3 className="text-xl font-playfair font-semibold mb-6">Product Images *</h3>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center">
                  <Image className="w-12 h-12 text-primary mx-auto mb-4" />
                  <Label htmlFor="images" className="cursor-pointer">
                    <div className="text-sm text-muted-foreground mb-2">
                      Click to select images or drag and drop
                    </div>
                    <div className="text-xs text-muted-foreground">
                      PNG, JPG, GIF up to 10MB each (Max 10 images)
                    </div>
                  </Label>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>

                {imagePreviewUrls.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-destructive rounded-full flex items-center justify-center text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="fashion-card p-6">
              <h3 className="text-xl font-playfair font-semibold mb-6">Product Video (Optional)</h3>
              
              <div className="space-y-4">
                {!videoPreviewUrl ? (
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center">
                    <Video className="w-12 h-12 text-primary mx-auto mb-4" />
                    <Label htmlFor="video" className="cursor-pointer">
                      <div className="text-sm text-muted-foreground mb-2">
                        Click to select a video or drag and drop
                      </div>
                      <div className="text-xs text-muted-foreground">
                        MP4, MOV, AVI up to 100MB
                      </div>
                    </Label>
                    <Input
                      id="video"
                      type="file"
                      accept="video/*"
                      onChange={handleVideoSelect}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <video
                      src={videoPreviewUrl}
                      controls
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="absolute top-2 right-2 w-8 h-8 bg-destructive rounded-full flex items-center justify-center text-destructive-foreground hover:bg-destructive/90 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 fashion-button"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Product
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;