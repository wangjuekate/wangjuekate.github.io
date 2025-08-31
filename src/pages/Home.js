import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Star, GitBranch, DollarSign } from 'lucide-react';
import { getBlogPosts } from '../utils/blogUtils';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getBlogPosts();
        setPosts(allPosts.slice(0, 6)); // Show latest 6 posts
        setFeaturedPosts(allPosts.filter(post => post.featured).slice(0, 3));
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const categories = [
    {
      name: 'Open Source Strategy',
      description: 'Building and monetizing open source projects',
      icon: GitBranch,
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Community Building',
      description: 'Growing engaged developer communities',
      icon: User,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'Fundraising',
      description: 'Securing investment for tech startups',
      icon: DollarSign,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <article key={post.slug} className="blog-card bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Featured</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    <Link to={`/post/${post.slug}`} className="hover:text-primary-600 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <Link 
                      to={`/post/${post.slug}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1"
                    >
                      <span>Read more</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className={`inline-flex p-3 rounded-lg ${category.color} mb-4`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Latest Posts */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
          <Link 
            to="/search" 
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
          >
            <span>View all</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="blog-card bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                {post.category && (
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-3">
                    {post.category}
                  </span>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  <Link to={`/post/${post.slug}`} className="hover:text-primary-600 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <Link 
                    to={`/post/${post.slug}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1"
                  >
                    <span>Read more</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts found. Create your first post!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
