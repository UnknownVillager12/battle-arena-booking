import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, CreditCard, CheckCircle, XCircle, Clock } from "lucide-react";
import { paymentApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const PaymentLookup = () => {
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [email, setEmail] = useState("");
  const [paymentResult, setPaymentResult] = useState<any>(null);
  const { toast } = useToast();

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ticketId.trim() || !email.trim()) {
      toast({
        title: "Error",
        description: "Please enter both ticket ID and email",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const result = await paymentApi.lookupPayment(ticketId, email);
      setPaymentResult(result);
      
      if (result.status === 'completed') {
        toast({
          title: "Payment Found",
          description: "Your payment details have been retrieved successfully"
        });
      }
    } catch (error) {
      toast({
        title: "Lookup Failed",
        description: "Unable to find payment details. Please check your information.",
        variant: "destructive"
      });
      setPaymentResult(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-8 w-8 text-neon-green" />;
      case 'pending': return <Clock className="h-8 w-8 text-electric-blue" />;
      case 'failed': return <XCircle className="h-8 w-8 text-destructive" />;
      default: return <CreditCard className="h-8 w-8 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-neon-green';
      case 'pending': return 'text-electric-blue';
      case 'failed': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Payment <span className="text-electric-blue">Lookup</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Enter your ticket ID and email to check your payment status and tournament details
          </p>
        </div>

        {/* Lookup Form */}
        <Card className="mb-8 bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 text-electric-blue" />
              Search Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLookup} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ticketId" className="text-foreground">
                    Ticket ID *
                  </Label>
                  <Input
                    id="ticketId"
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                    placeholder="Enter your ticket ID"
                    className="bg-darker-surface border-border"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-darker-surface border-border"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                variant="gaming" 
                size="lg" 
                disabled={loading}
                className="w-full md:w-auto"
              >
                {loading ? "Searching..." : "Lookup Payment"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Payment Result */}
        {paymentResult && (
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 text-neon-green" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-center p-6 bg-darker-surface rounded-lg">
                <div className="text-center space-y-2">
                  {getStatusIcon(paymentResult.status)}
                  <h3 className={`text-2xl font-bold ${getStatusColor(paymentResult.status)}`}>
                    {paymentResult.status.charAt(0).toUpperCase() + paymentResult.status.slice(1)}
                  </h3>
                  <p className="text-muted-foreground">Payment Status</p>
                </div>
              </div>

              {/* Payment Information */}
              {paymentResult.details && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-electric-blue">
                      Transaction Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ticket ID:</span>
                        <span className="font-medium">{paymentResult.details.ticket_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-bold text-neon-green">
                          {formatCurrency(paymentResult.details.amount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Date:</span>
                        <span className="font-medium">
                          {formatDate(paymentResult.details.payment_date)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gaming-purple">
                      Tournament Details
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-muted-foreground text-sm">Tournament:</p>
                        <p className="font-semibold">{paymentResult.details.tournament_name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
                {paymentResult.status === 'completed' && (
                  <>
                    <Button variant="gaming" className="flex-1">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Download Receipt
                    </Button>
                    <Button variant="gamingOutline" className="flex-1">
                      View Tournament Details
                    </Button>
                  </>
                )}
                
                {paymentResult.status === 'pending' && (
                  <div className="bg-electric-blue/10 border border-electric-blue/30 rounded-lg p-4">
                    <p className="text-sm text-electric-blue">
                      Your payment is being processed. You will receive a confirmation email once it's complete.
                    </p>
                  </div>
                )}

                {paymentResult.status === 'failed' && (
                  <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                    <p className="text-sm text-destructive mb-3">
                      Your payment failed. Please contact support for assistance or try registering again.
                    </p>
                    <Button variant="destructive" size="sm">
                      Contact Support
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-gradient-card border-border">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-neon-green">
              Need Help?
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <p className="mb-2">
                  <strong>Can't find your ticket ID?</strong><br />
                  Check your email for the confirmation message after registration.
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <strong>Payment not showing?</strong><br />
                  Contact support at support@bgmipro.com with your details.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentLookup;