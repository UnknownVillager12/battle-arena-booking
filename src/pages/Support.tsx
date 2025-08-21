import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Mail, FileText, Users, Clock, Trophy } from "lucide-react";

const Support = () => {
  const faqs = [
    {
      question: "How do I register for a tournament?",
      answer: "Click on any tournament card, then click 'Register Now'. Fill in your team details including captain information and team members. Complete the payment to confirm your registration."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major payment methods including UPI, debit/credit cards, net banking, and digital wallets through our secure payment gateway."
    },
    {
      question: "Can I change my team members after registration?",
      answer: "Team changes are allowed up to 24 hours before the tournament starts. Contact support with your ticket ID to make changes."
    },
    {
      question: "What happens if I can't attend the tournament?",
      answer: "Refunds are available if you cancel at least 48 hours before the tournament. Partial refunds may apply for cancellations within 24-48 hours."
    },
    {
      question: "How do I get room details for the match?",
      answer: "Room ID and password will be shared via email and available on your dashboard 30 minutes before the tournament starts."
    },
    {
      question: "When will results be announced?",
      answer: "Results are typically published within 2-4 hours after tournament completion. Winners will be notified via email and phone."
    },
    {
      question: "How are prizes distributed?",
      answer: "Prize money is transferred directly to the captain's registered bank account within 7-10 business days after result announcement."
    },
    {
      question: "What if I face technical issues during the tournament?",
      answer: "Contact our live support team immediately. We have dedicated staff monitoring tournaments for quick resolution of technical issues."
    }
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Discord Support",
      description: "Join our Discord server for instant help",
      action: "Join Discord",
      variant: "gaming" as const
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@bgmipro.com",
      action: "Send Email",
      variant: "gamingOutline" as const
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      description: "+91 9876543210",
      action: "Chat on WhatsApp",
      variant: "neon" as const
    }
  ];

  const supportStats = [
    {
      icon: Clock,
      label: "Response Time",
      value: "< 30 mins",
      color: "text-electric-blue"
    },
    {
      icon: Users,
      label: "Support Agents",
      value: "24/7",
      color: "text-neon-green"
    },
    {
      icon: Trophy,
      label: "Issues Resolved",
      value: "99.9%",
      color: "text-gaming-purple"
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-electric-blue">Support</span> Center
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get help with your tournaments, payments, and account. Our team is here to ensure you have the best gaming experience.
          </p>
        </div>

        {/* Support Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {supportStats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-border text-center">
              <CardContent className="p-6">
                <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                <h3 className={`text-3xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Get <span className="text-neon-green">Instant Help</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Choose your preferred way to reach our support team. We're available 24/7 to help you with any questions or issues.
              </p>
            </div>

            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <Card key={index} className="bg-gradient-card border-border hover:border-electric-blue/50 transition-gaming">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <method.icon className="h-8 w-8 text-electric-blue" />
                        <div>
                          <h3 className="text-lg font-semibold">{method.title}</h3>
                          <p className="text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                      <Button variant={method.variant}>
                        {method.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Emergency Contact */}
            <Card className="bg-gradient-gaming border-neon-green/30 glow-secondary">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  Tournament Emergency?
                </h3>
                <p className="text-white/80 mb-4">
                  For urgent issues during live tournaments
                </p>
                <Button variant="neon" size="lg">
                  Emergency Contact: +91 9876543210
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Frequently Asked <span className="text-electric-blue">Questions</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Find quick answers to the most common questions about tournaments, payments, and gameplay.
              </p>
            </div>

            <Card className="bg-gradient-card border-border">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="border-border"
                    >
                      <AccordionTrigger className="text-left hover:text-electric-blue transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 text-neon-green" />
                Tournament Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Read comprehensive tournament rules, fair play guidelines, and code of conduct.
              </p>
              <Button variant="gamingOutline" className="w-full">
                View Tournament Rules
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 text-gaming-purple" />
                Prize Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn about prize distribution, payment timelines, and tax information.
              </p>
              <Button variant="gamingOutline" className="w-full">
                Prize Information
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-darker-surface border-electric-blue/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Still Need Help?
              </h3>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our support team is ready to assist you personally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gaming" size="lg">
                  <MessageCircle className="mr-2" />
                  Start Live Chat
                </Button>
                <Button variant="gamingOutline" size="lg">
                  <Mail className="mr-2" />
                  Email Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;