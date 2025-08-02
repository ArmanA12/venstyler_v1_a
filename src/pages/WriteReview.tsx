import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Star, Upload, X, Image as ImageIcon } from "lucide-react";
import { BottomNav } from "@/components/navbar/bottomNav";

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating"),
  description: z.string().min(10, "Review must be at least 10 characters long"),
});

type ReviewForm = z.infer<typeof reviewSchema>;

const WriteReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
  });

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length + selectedImages.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 5 images.",
        variant: "destructive",
      });
      return;
    }

    const validFiles = files.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 5MB.`,
          variant: "destructive",
        });
        return false;
      }
      return file.type.startsWith("image/");
    });

    setSelectedImages((prev) => [...prev, ...validFiles]);

    const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setValue("rating", rating);
  };

  const onSubmit = async (data: ReviewForm) => {
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      // toast({
      //   title: "Review submitted!",
      //   description:
      //     "Thank you for your feedback. Your review will be published shortly.",
      // });
      navigate(`/product/${id}/reviews`);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <Header />

      <div className="w-full lg:w-4/5 mx-auto px-4 py-6">
        <div className="mb-6">
          <Link
            to={`/product/${id}/reviews`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reviews
          </Link>
          <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Write a Review
          </h1>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Product Info */}
          <div className="fashion-card p-6 mb-6">
            <div className="flex items-center gap-4">
              <img
                src="/api/placeholder/80/80"
                alt="Product"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-lg">Elegant Summer Dress</h3>
                <p className="text-sm text-muted-foreground">
                  by Sarah Johnson
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Rating */}
            <div className="fashion-card p-6">
              <h3 className="text-xl font-playfair font-semibold mb-4">
                Rate this product
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-colors"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoverRating || selectedRating)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground hover:text-primary/50"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {selectedRating > 0 && (
                      <span>
                        {selectedRating === 1 && "Poor"}
                        {selectedRating === 2 && "Fair"}
                        {selectedRating === 3 && "Good"}
                        {selectedRating === 4 && "Very Good"}
                        {selectedRating === 5 && "Excellent"}
                      </span>
                    )}
                  </span>
                </div>
                {errors.rating && (
                  <p className="text-destructive text-sm">
                    {errors.rating.message}
                  </p>
                )}
              </div>
            </div>

            {/* Review Description */}
            <div className="fashion-card p-6">
              <h3 className="text-xl font-playfair font-semibold mb-4">
                Share your experience
              </h3>

              <div className="space-y-2">
                <Label htmlFor="description">Write your review *</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  rows={5}
                  className="fashion-input resize-none"
                  placeholder="Tell others about your experience with this product..."
                />
                {errors.description && (
                  <p className="text-destructive text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Upload Images */}
            <div className="fashion-card p-6">
              <h3 className="text-xl font-playfair font-semibold mb-4">
                Add photos (optional)
              </h3>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center">
                  <ImageIcon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <Label htmlFor="review-images" className="cursor-pointer">
                    <div className="text-sm text-muted-foreground mb-2">
                      Click to upload images of the product
                    </div>
                    <div className="text-xs text-muted-foreground">
                      PNG, JPG, GIF up to 5MB each (Max 5 images)
                    </div>
                  </Label>
                  <Input
                    id="review-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>

                {imagePreviewUrls.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
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

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate(`/product/${id}/reviews`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 fashion-button mb-10"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <BottomNav />
      </div>
    </div>
  );
};

export default WriteReview;
