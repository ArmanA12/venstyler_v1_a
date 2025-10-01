import { Header } from "@/components/navbar/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Sparkles, Crown } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for getting started",
    icon: Star,
    features: [
      "Upload up to 10 designs",
      "Basic portfolio page",
      "Standard customer support",
      "5% platform commission",
      "Access to community forum",
      "Basic analytics",
    ],
    limitations: [
      "No featured listings",
      "Limited visibility in search",
    ],
    cta: "Get Started",
    variant: "outline" as const,
  },
  {
    name: "Professional",
    price: "₹999",
    period: "per month",
    description: "For serious designers",
    icon: Sparkles,
    popular: true,
    features: [
      "Unlimited design uploads",
      "Premium portfolio page",
      "Priority customer support",
      "3% platform commission",
      "Featured in search results",
      "Advanced analytics & insights",
      "Custom branding options",
      "Scheduled posts",
      "Bulk upload tools",
    ],
    cta: "Start Free Trial",
    variant: "default" as const,
  },
  {
    name: "Enterprise",
    price: "₹2,499",
    period: "per month",
    description: "For established brands",
    icon: Crown,
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "24/7 priority support",
      "2% platform commission",
      "Homepage featured spot",
      "Advanced SEO optimization",
      "API access",
      "White-label options",
      "Custom integrations",
      "Quarterly business reviews",
    ],
    cta: "Contact Sales",
    variant: "secondary" as const,
  },
];

const addons = [
  {
    name: "Premium Listing Boost",
    price: "₹499/month",
    description: "Get 10x more visibility with featured placements",
  },
  {
    name: "Professional Photography",
    price: "₹2,999/session",
    description: "High-quality product photography by our expert team",
  },
  {
    name: "Marketing Campaign",
    price: "From ₹5,000",
    description: "Targeted social media campaigns to reach your ideal customers",
  },
  {
    name: "Video Production",
    price: "₹9,999/video",
    description: "Professional video content to showcase your designs",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include access to our community 
            and basic features. Upgrade anytime as you grow.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={plan.name} 
                className={`relative ${plan.popular ? 'border-primary shadow-xl scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-6" variant={plan.variant}>
                    {plan.cta}
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.limitations && plan.limitations.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-muted-foreground mb-2">Not included:</p>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation) => (
                          <li key={limitation} className="text-xs text-muted-foreground">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Add-ons Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Additional Services</h2>
            <p className="text-muted-foreground">
              Boost your success with our premium add-on services
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {addons.map((addon) => (
              <Card key={addon.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{addon.name}</CardTitle>
                  <CardDescription className="text-xl font-semibold text-primary">
                    {addon.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{addon.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I switch plans anytime?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                and we'll pro-rate the charges accordingly.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                We accept all major credit/debit cards, UPI, net banking, and digital wallets. 
                All transactions are secure and encrypted.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Yes! Professional plan comes with a 14-day free trial. No credit card required. 
                You can cancel anytime during the trial period.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What is the platform commission?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                We charge a small commission on each sale made through the platform. The commission 
                varies by plan: 5% for Free, 3% for Professional, and 2% for Enterprise. This helps 
                us maintain and improve the platform.
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-12 bg-muted rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Our team is here to help you choose the right plan for your business.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Contact Sales</Button>
            <Button size="lg" variant="outline">Schedule a Demo</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
