import React, { useState, useEffect, Suspense, lazy } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  FaBox,
  FaFilter,
  FaChartBar,
  FaPlus,
  FaSync,
  FaSearch,
  FaDatabase,
  FaCog,
} from "react-icons/fa";
import { productAPI } from "./services/api";
import EnhancedLoadingSpinner from "./components/EnhancedLoadingSpinner";
import SkeletonLoader from "./components/SkeletonLoader";

// Lazy load components for better performance
const ProductTable = lazy(() => import("./components/ProductTable"));
const ProductForm = lazy(() => import("./components/ProductForm"));
const SearchBar = lazy(() => import("./components/SearchBar"));
const StatsCard = lazy(() => import("./components/StatsCard"));

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setRefreshing(true);

      const [productsData, categoriesData] = await Promise.all([
        productAPI.getAllProducts(),
        productAPI.getCategories(),
      ]);

      setProducts(productsData);
      setFilteredProducts(productsData);
      setCategories(categoriesData);

      toast.success("Products loaded successfully!", {
        icon: "fa",
        style: {
          background: "#10b981",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Failed to load products. Please try again.", {
        icon: "❌",
        style: {
          background: "#ef4444",
          color: "#fff",
        },
      });
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      await productAPI.addProduct(productData);

      const newProduct = {
        ...productData,
        id: Date.now(),
        rating: { rate: 4.5, count: Math.floor(Math.random() * 100) },
      };

      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      setShowForm(false);

      toast.success("Product added successfully!", {
        icon: "🎉",
        style: {
          background: "#10b981",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Failed to add product", {
        icon: "❌",
        style: {
          background: "#ef4444",
          color: "#fff",
        },
      });
    }
  };

  const handleUpdateProduct = async (id, updatedData) => {
    try {
      await productAPI.updateProduct(id, updatedData);

      const updatedProducts = products.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product
      );

      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      setEditingProduct(null);
      setShowForm(false);

      toast.success("Product updated successfully!", {
        icon: "✏️",
        style: {
          background: "#3b82f6",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await productAPI.deleteProduct(id);

      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);

      toast.success("Product deleted successfully!", {
        icon: "🗑️",
        style: {
          background: "#ef4444",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleSearch = (searchTerm, category) => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }

    setFilteredProducts(filtered);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleRefresh = () => {
    fetchData();
  };

  if (loading) {
    return <EnhancedLoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            padding: "16px",
            fontSize: "14px",
            fontWeight: "500",
          },
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 glass shadow-depth-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 
                              rounded-lg flex items-center justify-center shadow-md"
                >
                  <FaDatabase className="w-6 h-6 text-white" />
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 
                              rounded-full border-2 border-white"
                ></div>
              </div>
              <div className="max-w-full">
  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 leading-tight">
    Product
    <span className="text-gradient">Hub</span>
  </h1>

  
</div>

            </div>

            <div className="flex items-center gap-3">
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="btn btn-ghost"
                title="Refresh data"
              >
                <FaSync
                  className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                />

                {/* Text: only visible on lg+ */}
                <span className="hidden lg:inline">
                  {refreshing ? "Refreshing..." : "Refresh"}
                </span>
              </button>

              {/* Add Product Button */}
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowForm(true);
                }}
                className="btn btn-primary"
                title="Add Product"
              >
                <FaPlus className="w-4 h-4" />

                {/* Text: only visible on lg+ */}
                <span className="hidden lg:inline">Add Product</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<SkeletonLoader />}>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-in">
            <StatsCard
              title="Total Products"
              value={products.length}
              icon={<FaBox className="w-6 h-6" />}
              color="primary"
              trend="up"
              percentage="12%"
            />
            <StatsCard
              title="Filtered"
              value={filteredProducts.length}
              icon={<FaFilter className="w-6 h-6" />}
              color="secondary"
            />
            <StatsCard
              title="Categories"
              value={categories.length}
              icon={<FaChartBar className="w-6 h-6" />}
              color="success"
            />
            <StatsCard
              title="Avg. Price"
              value={`$${(
                products.reduce((acc, p) => acc + p.price, 0) /
                  products.length || 0
              ).toFixed(2)}`}
              icon={<FaSearch className="w-6 h-6" />}
              color="warning"
            />
          </div>

          {/* Search & Filter Section */}
          <div
            className="card-elevated p-6 mb-8 animate-in"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FaSearch className="text-primary-600" />
              Search & Filter Products
            </h2>
            <SearchBar onSearch={handleSearch} categories={categories} />
          </div>

          {/* Products Section */}
          <div className="animate-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Product Catalog
                </h2>
                <p className="text-slate-600">
                  Manage your product inventory efficiently
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Showing</span>
                <span className="font-semibold text-primary-600">
                  {filteredProducts.length} of {products.length}
                </span>
                <span className="text-slate-500">products</span>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="card p-12 text-center">
                <FaSearch className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">
                  No products found
                </h3>
                <p className="text-slate-500 mb-6">
                  Try adjusting your search criteria or add a new product
                </p>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setShowForm(true);
                  }}
                  className="btn btn-primary"
                >
                  <FaPlus className="w-4 h-4" />
                  Add First Product
                </button>
              </div>
            ) : (
              <div className="table-container">
                <ProductTable
                  products={filteredProducts}
                  onEdit={handleEdit}
                  onDelete={handleDeleteProduct}
                />
              </div>
            )}
          </div>
        </Suspense>

        {/* Product Form Modal */}
        {showForm && (
          <Suspense
            fallback={
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="card p-8">
                  <div className="flex items-center gap-3">
                    <div className="skeleton w-6 h-6 rounded-full"></div>
                    <div className="skeleton h-6 w-48 rounded"></div>
                  </div>
                </div>
              </div>
            }
          >
            <ProductForm
              product={editingProduct}
              onSubmit={
                editingProduct
                  ? (data) => handleUpdateProduct(editingProduct.id, data)
                  : handleAddProduct
              }
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
              categories={categories}
            />
          </Suspense>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t bg-white border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
                <div
                  className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 
                              rounded-lg flex items-center justify-center"
                >
                  <FaBox className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-slate-900">ProductHub</span>
              </div>
              <p className="text-slate-600 text-sm">
                Advanced product management solution for modern businesses
              </p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-slate-500 mb-2">
                Powered by FakeStore API • Built with React & Tailwind CSS
              </p>
              <p className="text-xs text-slate-400">
                Version 1.0.0 • © {new Date().getFullYear()} ProductHub
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
