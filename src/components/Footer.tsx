
import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/20 bg-slate-900/30 backdrop-blur-md">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">FOVY</h3>
            <p className="text-sm text-slate-400">
              AI-driven career mapping for freelancers. Build confidence, clarity, and client communication.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition-colors" href="#">
                  Features
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition-colors" href="#">
                  Pricing
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition-colors" href="#">
                  Testimonials
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition-colors" href="#">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition-colors" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition-colors" href="#">
                  Blog
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition-colors" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition-colors" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition-colors" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition-colors" href="#">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition-colors" href="#">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} FOVY. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 mt-4 md:mt-0">
            Designed with precision. Built with care.
          </p>
        </div>
      </div>
    </footer>
  );
};
