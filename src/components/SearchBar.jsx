import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ onSearch, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, selectedCategory);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    onSearch('', 'all');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch(e.target.value, selectedCategory);
            }}
            placeholder="Search products..."
            className="input pl-10 pr-10"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                onSearch('', selectedCategory);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <FaTimes className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                onSearch(searchTerm, e.target.value);
              }}
              className="input md:w-48"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-outline flex-1 md:flex-none"
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1 md:flex-none"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;