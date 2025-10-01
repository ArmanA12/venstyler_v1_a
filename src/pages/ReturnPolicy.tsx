import { Header } from "@/components/navbar/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Return Policy</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1. Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              At venStyler, we understand that sometimes a purchase may not meet your expectations. 
              This Return Policy outlines the terms and conditions for returns and refunds on our platform.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. Digital Products</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              For digital design files and patterns:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Returns are accepted within 7 days of purchase if the product is significantly different from the description</li>
              <li>Digital products must not have been downloaded or accessed to be eligible for return</li>
              <li>Refunds for digital products will be processed within 5-7 business days</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. Custom Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              For custom-made designs and products:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Custom orders can be cancelled within 24 hours of placement for a full refund</li>
              <li>Once production has begun, custom orders cannot be cancelled</li>
              <li>If the delivered custom product has defects or doesn't match the agreed specifications, contact us within 48 hours</li>
              <li>Refunds or replacements will be evaluated on a case-by-case basis for custom orders</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>4. Physical Products</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              For ready-made physical products:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Returns accepted within 14 days of delivery</li>
              <li>Products must be unused, unworn, and in original packaging with all tags attached</li>
              <li>Customer is responsible for return shipping costs unless the product is defective</li>
              <li>Refunds will be processed within 7-10 business days after receiving the returned item</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>5. Non-Returnable Items</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              The following items cannot be returned:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Downloaded digital products (design files, patterns, tutorials)</li>
              <li>Custom-made items after production has started</li>
              <li>Items marked as final sale or non-returnable</li>
              <li>Products damaged due to misuse or improper care</li>
              <li>Intimate apparel and undergarments (for hygiene reasons)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>6. How to Initiate a Return</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              To initiate a return:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Log into your venStyler account and go to your order history</li>
              <li>Select the order you wish to return and click "Request Return"</li>
              <li>Provide a reason for the return and upload any relevant photos</li>
              <li>Wait for approval from the designer/seller</li>
              <li>Once approved, follow the instructions provided for shipping the item back</li>
              <li>Track your return and wait for your refund to be processed</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>7. Refund Process</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              Once your return is received and inspected:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We will notify you via email about the approval or rejection of your refund</li>
              <li>If approved, your refund will be processed to your original payment method</li>
              <li>Refunds typically take 5-10 business days to appear in your account</li>
              <li>Shipping costs are non-refundable unless the item was defective or incorrect</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>8. Exchanges</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              We only replace items if they are defective or damaged. If you need to exchange a product for the same item, 
              contact the designer directly through the platform's messaging system or our customer support team.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>9. Designer Responsibilities</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              Designers on venStyler must:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to return requests within 48 hours</li>
              <li>Accept valid returns according to this policy</li>
              <li>Process refunds promptly once items are received and inspected</li>
              <li>Provide clear product descriptions to minimize returns</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>10. Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              If you have any questions about our Return Policy, please contact us at: returns@venstyler.com or 
              reach out through our customer support chat.
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
