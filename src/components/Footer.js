import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold mb-4">TechFounder Blog</h3>
            <p className="text-gray-300 mb-4">
              Empowering software engineers to build successful startups through 
              open source communities and strategic investment guidance.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-gray-300 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:contact@example.com" className="text-gray-300 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Open Source</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Community Building</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Fundraising</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Technical Leadership</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Startup Strategy</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Investor Database</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Open Source Tools</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Community Templates</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pitch Deck Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Legal Resources</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 TechFounder Blog. Built with React and ❤️ for the developer community.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
