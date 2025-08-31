import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getBlogPost } from '../utils/blogUtils';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await getBlogPost(slug);
        if (postData) {
          setPost(postData);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link 
            to="/"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link 
          to="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Link>
      </div>

      {/* Post Header */}
      <header className="mb-8">
        {post.category && (
          <span className="inline-block bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>
        
        {post.excerpt && (
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 border-t border-b border-gray-200">
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            {post.readTime && (
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            )}
          </div>
          
          <button
            onClick={sharePost}
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>
      </header>

      {/* Post Content */}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            // Custom components for better styling
            h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>,
            h2: ({children}) => <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>,
            h3: ({children}) => <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>,
            p: ({children}) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
            a: ({href, children}) => (
              <a 
                href={href} 
                className="text-primary-600 hover:text-primary-700 underline"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            ),
            blockquote: ({children}) => (
              <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-600 my-6">
                {children}
              </blockquote>
            ),
            code: ({inline, children}) => 
              inline ? (
                <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm">
                  {children}
                </code>
              ) : (
                <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  {children}
                </code>
              ),
            ul: ({children}) => <ul className="list-disc list-inside space-y-2 mb-4">{children}</ul>,
            ol: ({children}) => <ol className="list-decimal list-inside space-y-2 mb-4">{children}</ol>,
            li: ({children}) => <li className="text-gray-700">{children}</li>,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-12 p-6 bg-primary-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Building Your Tech Startup?
        </h3>
        <p className="text-gray-600 mb-4">
          Get insights on open source strategy, community building, and fundraising delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
