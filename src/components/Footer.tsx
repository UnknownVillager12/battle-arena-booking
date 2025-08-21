import { Link } from "react-router-dom";
import { Trophy, Mail, MessageCircle, FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-darker-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-electric-blue" />
              <span className="text-xl font-bold bg-gradient-gaming bg-clip-text text-transparent">
                BGMI Pro
              </span>
            </div>
            <p className="text-muted-foreground">
              The ultimate destination for competitive BGMI tournaments. 
              Join the battle, claim your victory!
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/tournaments" className="block text-muted-foreground hover:text-electric-blue transition-gaming">
                Tournaments
              </Link>
              <Link to="/results" className="block text-muted-foreground hover:text-electric-blue transition-gaming">
                Results
              </Link>
              <Link to="/payment-lookup" className="block text-muted-foreground hover:text-electric-blue transition-gaming">
                Payment Status
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@bgmipro.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <span>Discord: BGMI Pro</span>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground hover:text-electric-blue transition-gaming cursor-pointer">
                <FileText className="h-4 w-4" />
                <span>Rules & Terms</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground hover:text-electric-blue transition-gaming cursor-pointer">
                <FileText className="h-4 w-4" />
                <span>Privacy Policy</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground">
            © 2024 BGMI Pro. All rights reserved. Built for champions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;