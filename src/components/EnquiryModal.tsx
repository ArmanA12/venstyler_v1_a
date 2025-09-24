// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import axios from "axios"; // ✅ add this at the top

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Send } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// interface EnquiryModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   productId: string;
//   productTitle?: string;
//   imageUrl: string; // 👈 image url from frontend
// }

// export function EnquiryModal({
//   isOpen,
//   onClose,
//   productId,
//   productTitle,
//   imageUrl,
// }: EnquiryModalProps) {
//   const { toast } = useToast();
//    console.log(imageUrl, "image URL")
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//     designId: productId,
//     imageUrl: imageUrl,
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };


// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (!formData.name || !formData.email || !formData.message) {
//     toast({
//       title: "Missing Information",
//       description: "Please fill in all required fields.",
//       variant: "destructive",
//     });
//     return;
//   }

//   setIsSubmitting(true);

//   try {
//     // ✅ Use axios instead of fetch
//     const { data } = await axios.post("https://venstyler.armanshekh.com/api/enquiry/createEnquiry", formData);

//     toast({
//       title: "Enquiry Sent Successfully",
//       description: "We'll get back to you soon!",
//     });

//     // Reset form and close modal
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       message: "",
//       designId: productId,
//       imageUrl: imageUrl,
//     });
//     onClose();
//   } catch (error) {
//     toast({
//       title: "Failed to Send Enquiry",
//       description:
//         (error as any)?.response?.data?.message ||
//         "Something went wrong. Please try again.",
//       variant: "destructive",
//     });
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-2xl">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold">Product Enquiry</DialogTitle>
//           <DialogDescription>
//             {productTitle ? (
//               <>
//                 Send us your enquiry about "<strong>{productTitle}</strong>" and
//                 we'll get back to you as soon as possible.
//               </>
//             ) : (
//               <>Send us your enquiry and we'll get back to you as soon as possible.</>
//             )}
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name *</Label>
//               <Input
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 placeholder="Enter your full name"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="email">Email Address *</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="phone">Phone Number</Label>
//             <Input
//               id="phone"
//               name="phone"
//               type="tel"
//               value={formData.phone}
//               onChange={handleInputChange}
//               placeholder="Enter your phone number"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="message">Message *</Label>
//             <Textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleInputChange}
//               placeholder="Please describe your enquiry in detail..."
//               className="min-h-[120px]"
//               required
//             />
//           </div>

//           <div className="flex gap-3 pt-4">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onClose}
//               className="flex-1"
//             >
//               Cancel
//             </Button>
//             <Button type="submit" disabled={isSubmitting} className="flex-1">
//               {isSubmitting ? (
//                 "Sending..."
//               ) : (
//                 <>
//                   <Send className="w-4 h-4 mr-2" />
//                   Send Enquiry
//                 </>
//               )}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productTitle?: string;
  imageUrl: string;
}

function EnquiryModalComponent({
  isOpen,
  onClose,
  productId,
  productTitle,
  imageUrl,
}: EnquiryModalProps) {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    designId: productId,
    imageUrl: imageUrl,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔄 Sync formData with props (avoid stale values)
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      designId: productId,
      imageUrl: imageUrl,
    }));
  }, [productId, imageUrl]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(
        "https://venstyler.armanshekh.com/api/enquiry/createEnquiry",
        formData
      );

      toast({
        title: "Enquiry Sent Successfully",
        description: "We'll get back to you soon!",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        designId: productId,
        imageUrl: imageUrl,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Failed to Send Enquiry",
        description:
          (error as any)?.response?.data?.message ||
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Product Enquiry</DialogTitle>
          <DialogDescription>
            {productTitle ? (
              <>
                Send us your enquiry about "<strong>{productTitle}</strong>" and
                we'll get back to you as soon as possible.
              </>
            ) : (
              <>Send us your enquiry and we'll get back to you as soon as possible.</>
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Please describe your enquiry in detail..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Enquiry
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export const EnquiryModal = React.memo(EnquiryModalComponent);
