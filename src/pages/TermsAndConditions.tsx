import { Header } from "@/components/navbar/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms and Conditions</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              By accessing and using venStyler platform, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. Use License</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on venStyler's platform 
              for personal, non-commercial transitory viewing only.
            </p>
            <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on venStyler's platform</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. Designer Responsibilities</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              Designers using the venStyler platform agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information about their designs</li>
              <li>Deliver products or services as described and within the agreed timeframe</li>
              <li>Maintain professional communication with customers</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Upload only original designs or designs they have the rights to sell</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>4. Customer Responsibilities</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              Customers using the venStyler platform agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate information for orders and communications</li>
              <li>Make timely payments for purchased designs</li>
              <li>Respect intellectual property rights of designers</li>
              <li>Provide feedback and reviews in good faith</li>
              <li>Not misuse the platform for fraudulent activities</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>5. Payment Terms</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              All payments are processed securely through our payment partners. venStyler charges a commission fee 
              on all transactions completed through the platform. Payment terms and commission rates are subject to change 
              with prior notice to users.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>6. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              All designs uploaded to venStyler remain the intellectual property of the respective designers. 
              Customers purchasing designs receive usage rights as specified in individual product listings. 
              venStyler does not claim ownership of user-generated content but reserves the right to display 
              designs on the platform for promotional purposes.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>7. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              venStyler acts as a platform connecting designers with customers. We are not responsible for the quality, 
              accuracy, or legality of designs listed on the platform. Any disputes between designers and customers 
              should be resolved directly between the parties involved.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>8. Modifications</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              venStyler reserves the right to revise these terms at any time without notice. By using this platform, 
              you are agreeing to be bound by the then current version of these Terms and Conditions.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>9. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              For any questions regarding these Terms and Conditions, please contact us at: support@venstyler.com
            </p>
          </CardContent>
        </Card>

        <p className="text-sm text-muted-foreground text-center mt-8">
          Last Updated: January 2024
        </p>
      </div>
    </div>
  );
}
