import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, Calendar, User, Filter } from 'lucide-react';
import Fuse from 'fuse.js';
import { getBlogPosts } from '../utils/blogUtils';

const Search = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [fuse, setFuse] = useState(null);

  const categories = ['Open Source', 'Community Building', 'Fundraising', 'Technical Leadership', 'Startup Strategy'];

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getBlogPosts();
        setPosts(allPosts);
        setFilteredPosts(allPosts);
        
        // Initialize Fuse.js for fuzzy search
        const fuseInstance = new Fuse(allPosts, {
          keys: ['title', 'excerpt', 'content', 'category', 'tags'],
          threshold: 0.3,
          includeScore: true,
        });
        setFuse(fuseInstance);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    let results = posts;

    // Apply search filter
    if (searchTerm && fuse) {
      const searchResults = fuse.search(searchTerm);
      results = searchResults.map(result => result.item);
    }

    // Apply category filter
    if (selectedCategory) {
      results = results.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(results);
  }, [searchTerm, selectedCategory, posts, fuse]);

  const highlightText = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Articles</h1>
        <p className="text-gray-600 mb-6">
          Find insights on open source strategy, community building, and startup fundraising
        </p>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Input */}
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles, topics, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 mb-6">
          {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
          {searchTerm && ` for "${searchTerm}"`}
          {selectedCategory && ` in ${selectedCategory}`}
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <article key={post.slug} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1">
                {post.category && (
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-3">
                    {post.category}
                  </span>
                )}
                
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  <Link 
                    to={`/post/${post.slug}`} 
                    className="hover:text-primary-600 transition-colors"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightText(post.title, searchTerm) 
                    }}
                  />
                </h2>
                
                <p 
                  className="text-gray-600 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ 
                    __html: highlightText(post.excerpt, searchTerm) 
                  }}
                />
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  {post.readTime && (
                    <span>{post.readTime} min read</span>
                  )}
                </div>
              </div>
              
              <div className="md:ml-4">
                <Link 
                  to={`/post/${post.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Read Article
                </Link>
              </div>
            </div>
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <SearchIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or browse all articles by clearing the filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
