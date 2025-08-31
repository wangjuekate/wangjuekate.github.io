import React from 'react';
import { Github, Twitter, Linkedin, Mail, Code, Users, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About TechFounder
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Empowering software engineers to build successful startups through 
          open source communities and strategic investment guidance.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700 leading-relaxed mb-4">
            We believe that the future of successful tech startups lies at the intersection of 
            open source innovation, community building, and strategic fundraising. Our mission 
            is to provide software engineers with the knowledge, tools, and strategies they need 
            to transform their technical expertise into thriving businesses.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Through in-depth articles, case studies, and practical guides, we help developers 
            navigate the complex journey from code to capital, building sustainable businesses 
            that benefit both creators and communities.
          </p>
        </div>
      </section>

      {/* What We Cover */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Cover</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="bg-green-100 text-green-600 inline-flex p-3 rounded-lg mb-4">
              <Code className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Open Source Strategy</h3>
            <p className="text-gray-600">
              Learn how to build, maintain, and monetize open source projects while 
              fostering healthy developer ecosystems.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="bg-blue-100 text-blue-600 inline-flex p-3 rounded-lg mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Community Building</h3>
            <p className="text-gray-600">
              Discover proven methods for growing engaged developer communities 
              that drive adoption and contribute to your project's success.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="bg-purple-100 text-purple-600 inline-flex p-3 rounded-lg mb-4">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Fundraising & Investment</h3>
            <p className="text-gray-600">
              Navigate the investment landscape with insights on pitching, 
              valuation, and building relationships with VCs and angel investors.
            </p>
          </div>
        </div>
      </section>

      {/* Author */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Author</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600">KW</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Kate Wang</h3>
              <p className="text-gray-600 mb-4">
                Software engineer turned entrepreneur with experience in building open source 
                communities and securing investment for tech startups. Kate has helped numerous 
                developers transition from individual contributors to successful founders.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://twitter.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="mailto:contact@example.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
        <div className="bg-primary-50 rounded-lg p-6">
          <p className="text-gray-700 mb-4">
            Have questions about building your startup? Want to share your success story? 
            We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="mailto:contact@example.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Mail className="h-4 w-4 mr-2" />
              Send us an email
            </a>
            <a 
              href="https://twitter.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors"
            >
              <Twitter className="h-4 w-4 mr-2" />
              Follow on Twitter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
