import React, { useState, useEffect } from 'react';
import { FaTimes, FaUpload, FaImage, FaDollarSign, FaTag } from 'react-icons/fa';

const ProductForm = ({ product, onSubmit, onCancel, categories }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        price: product.price || '',
        description: product.description || '',
        category: product.category || '',
        image: product.image || ''
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Product title is required';
    if (!formData.price || parseFloat(formData.price) <= 0) 
      newErrors.price = 'Valid price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onSubmit({
      ...formData,
      price: parseFloat(formData.price)
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade ">
      <div className="card max-w-2xl w-full max-h-[90vh] overflow-x-auto  border-gradient shadow-hard">
        <div className="p-1 bg-gradient-to-r from-primary-500 to-primary-700"></div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {product ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className="text-slate-600 mt-1">
                {product ? 'Update product information' : 'Fill in the product details below'}
              </p>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              <FaTimes className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2  items-center gap-2">
                <FaTag className="text-primary-600" />
                Product Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`input ${errors.title ? 'input-error' : ''}`}
                placeholder="Enter product title"
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="mt-2 text-sm text-error-600">{errors.title}</p>
              )}
            </div>

            {/* Price & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 items-center gap-2">
                  <FaDollarSign className="text-success-600" />
                  Price ($) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`input pl-8 ${errors.price ? 'input-error' : ''}`}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.price && (
                  <p className="mt-2 text-sm text-error-600">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 mt-3.5">
                  Category *
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`input ${errors.category ? 'input-error' : ''}`}
                    disabled={isSubmitting}
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <div className="w-2 h-2 border-t border-r border-slate-400 transform rotate-45"></div>
                  </div>
                </div>
                {errors.category && (
                  <p className="mt-2 text-sm text-error-600">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input min-h-[120px] resize-none"
                placeholder="Enter detailed product description..."
                rows="4"
                disabled={isSubmitting}
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2  items-center gap-2">
                <FaImage className="text-warning-600" />
                Product Image
              </label>
              <div className="relative">
                <FaUpload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="https://example.com/product-image.jpg"
                  disabled={isSubmitting}
                />
              </div>
              
              {formData.image && (
                <div className="mt-4">
                  <p className="text-sm text-slate-600 mb-2">Image Preview:</p>
                  <div className="w-32 h-32 border-2 border-dashed border-slate-300 
                                rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.title)}&background=3b82f6&color=fff`;
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-outline flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {product ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  product ? 'Update Product' : 'Add Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;