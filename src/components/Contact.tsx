'use client';

import { Mail, Phone, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "sofreeai@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="py-24 px-6 md:px-12 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Let's Create Something Amazing</h2>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
          {/* Email Card */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-transparent hover:border-accent/20 transition-all w-full md:w-auto">
            <div className="p-3 bg-blue-50 text-accent rounded-full">
              <Mail size={24} />
            </div>
            <div className="text-left mr-4">
              <p className="text-xs text-muted font-semibold uppercase">Email Me</p>
              <p className="text-foreground font-medium">{email}</p>
            </div>
            <button 
              onClick={handleCopy}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-muted"
              title="Copy Email"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
            </button>
          </div>

          {/* Phone Card (Optional Privacy) */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-transparent hover:border-accent/20 transition-all w-full md:w-auto">
            <div className="p-3 bg-green-50 text-green-600 rounded-full">
              <Phone size={24} />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted font-semibold uppercase">Call Me</p>
              <p className="text-foreground font-medium">+853 63939694 / +852 44136069</p>
            </div>
          </div>
        </div>

        <p className="text-muted text-sm">
          © {new Date().getFullYear()} IEONG HOI LONG NOVAL. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
