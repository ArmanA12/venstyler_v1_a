import { Header } from "@/components/navbar/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              venStyler collects information to provide better services to our users. We collect information in the following ways:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Information you give us:</strong> Name, email address, phone number, payment information, and profile details</li>
              <li><strong>Information we get from your use:</strong> Design views, likes, shares, search queries, and interaction patterns</li>
              <li><strong>Device information:</strong> Device type, operating system, browser type, and IP address</li>
              <li><strong>Cookies and similar technologies:</strong> We use cookies to maintain your session and preferences</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. How We Use Information</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, maintain, and improve our services</li>
              <li>To process transactions and send related information</li>
              <li>To send you technical notices, updates, and support messages</li>
              <li>To respond to your comments, questions, and customer service requests</li>
              <li>To personalize your experience and deliver relevant content</li>
              <li>To monitor and analyze trends, usage, and activities</li>
              <li>To detect, prevent, and address technical issues and fraudulent activities</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. Information Sharing</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>With designers:</strong> When you make a purchase, we share necessary information to fulfill your order</li>
              <li><strong>With service providers:</strong> We share information with third-party service providers who perform services on our behalf</li>
              <li><strong>For legal reasons:</strong> We may disclose information if required by law or in response to legal requests</li>
              <li><strong>Business transfers:</strong> In connection with any merger, sale of company assets, or acquisition</li>
              <li><strong>With your consent:</strong> We may share information with your explicit consent</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>4. Data Security</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              We take reasonable measures to help protect your personal information from loss, theft, misuse, 
              unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable, 
              and we cannot guarantee the absolute security of our systems.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>5. Your Rights and Choices</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> You can request access to your personal information</li>
              <li><strong>Correction:</strong> You can update or correct your information through your account settings</li>
              <li><strong>Deletion:</strong> You can request deletion of your account and personal information</li>
              <li><strong>Opt-out:</strong> You can opt-out of marketing communications at any time</li>
              <li><strong>Data portability:</strong> You can request a copy of your data in a portable format</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>6. Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              We use cookies and similar tracking technologies to track activity on our platform and hold certain information. 
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, 
              if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>7. Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              Our service is not intended for use by children under the age of 18. We do not knowingly collect 
              personal information from children under 18. If you become aware that a child has provided us with 
              personal information, please contact us.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>8. Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review 
              this Privacy Policy periodically for any changes.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>9. Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              If you have any questions about this Privacy Policy, please contact us at: privacy@venstyler.com
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
