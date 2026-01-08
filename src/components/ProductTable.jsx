import React from 'react';
import { FaEdit, FaTrash, FaStar } from 'react-icons/fa';

const ProductTable = ({ products, onEdit, onDelete }) => {
  const formatPrice = (price) => `$${price.toFixed(2)}`;

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`w-4 h-4 ${i <= rating.rate ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return (
      <div className="flex items-center gap-2">
        <div className="flex">{stars}</div>
        <span className="text-sm text-gray-600">
          ({rating.rate})
        </span>
      </div>
    );
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full ">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left text-md font-semibold text-gray-700">Product</th>
            <th className="py-3 px-4 text-left text-md font-semibold text-gray-700">Category</th>
            <th className="py-3 px-4 text-left text-md font-semibold text-gray-700">Price</th>
            <th className="py-3 px-4 text-left text-md font-semibold text-gray-700">Rating</th>
            <th className="py-3 px-4 text-left text-md font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/48';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 line-clamp-1">{product.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="px-6 py-2 truncate text-xs font-medium bg-blue-100 hover:bg-none hover:border-black  text-blue-800 rounded-full capitalize">
                  {product.category}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="font-semibold text-green-600">
                  {formatPrice(product.price)}
                </span>
              </td>
              <td className="py-4 px-4">
                {renderRating(product.rating)}
              </td>
              <td className="py-4 px-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-3 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Edit"
                  >
                    <FaEdit className="w-4 h-4 " />
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="p-3 text-red-600 bg-white hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;