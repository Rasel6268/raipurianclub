// app/admin/categories/page.jsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff,
  Search,
  Filter,
  RefreshCw,
} from "lucide-react";

export default function CategoriesManagement() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    subTitle: "",
    description: "",
    problems: [],
    solutions: [],
    impact: "",
    order: 0,
  });
  const [newProblem, setNewProblem] = useState("");
  const [newSolution, setNewSolution] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      subTitle: "",
      description: "",
      problems: [],
      solutions: [],
      impact: "",
      order: 0,
    });
    setNewProblem("");
    setNewSolution("");
    setEditingCategory(null);
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        id: category.id,
        title: category.title,
        subTitle: category.subTitle,
        description: category.description,
        problems: category.problems || [],
        solutions: category.solutions || [],
        impact: category.impact || "",
        order: category.order || 0,
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addProblem = () => {
    if (newProblem.trim()) {
      setFormData({
        ...formData,
        problems: [...formData.problems, newProblem.trim()],
      });
      setNewProblem("");
    }
  };

  const removeProblem = (index) => {
    setFormData({
      ...formData,
      problems: formData.problems.filter((_, i) => i !== index),
    });
  };

  const addSolution = () => {
    if (newSolution.trim()) {
      setFormData({
        ...formData,
        solutions: [...formData.solutions, newSolution.trim()],
      });
      setNewSolution("");
    }
  };

  const removeSolution = (index) => {
    setFormData({
      ...formData,
      solutions: formData.solutions.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      let res;
      if (editingCategory) {
        // Update existing category
        res = await fetch(`http://localhost:5000/api/categories/${editingCategory._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new category
        res = await fetch("http://localhost:5000/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      }

      const data = await res.json();
      if (data.success) {
        fetchCategories();
        handleCloseModal();
        alert(editingCategory ? "Category updated successfully!" : "Category created successfully!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Failed to save category");
    }
  };

  const handleDelete = async (category) => {
    if (!confirm(`Are you sure you want to delete "${category.title}" category? This will also affect associated projects.`)) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/categories/${category._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        fetchCategories();
        alert("Category deleted successfully!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Failed to delete category");
    }
  };

  const handleReorder = async (direction, index) => {
    const newCategories = [...categories];
    if (direction === "up" && index > 0) {
      [newCategories[index], newCategories[index - 1]] = [newCategories[index - 1], newCategories[index]];
    } else if (direction === "down" && index < categories.length - 1) {
      [newCategories[index], newCategories[index + 1]] = [newCategories[index + 1], newCategories[index]];
    } else {
      return;
    }

    const updatedCategories = newCategories.map((cat, idx) => ({
      id: cat._id,
      order: idx,
    }));

    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/categories/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ categories: updatedCategories }),
      });

      if (res.ok) {
        setCategories(newCategories);
      }
    } catch (error) {
      console.error("Failed to reorder:", error);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Category Management</h1>
            <p className="text-gray-600 mt-1">Manage project categories, challenges, and solutions</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchCategories}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories by title, subtitle, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredCategories.map((category, index) => (
            <div
              key={category._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-gray-800">{category.title}</h2>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded font-mono">
                        ID: {category.id}
                      </span>
                      {category.order !== undefined && (
                        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                          Order: {category.order}
                        </span>
                      )}
                    </div>
                    <p className="text-emerald-600 text-sm font-medium mb-2">{category.subTitle}</p>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReorder("up", index)}
                      disabled={index === 0}
                      className={`p-2 rounded-lg transition ${
                        index > 0
                          ? "text-gray-600 hover:bg-gray-100"
                          : "text-gray-300 cursor-not-allowed"
                      }`}
                      title="Move Up"
                    >
                      <MoveUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleReorder("down", index)}
                      disabled={index === filteredCategories.length - 1}
                      className={`p-2 rounded-lg transition ${
                        index < filteredCategories.length - 1
                          ? "text-gray-600 hover:bg-gray-100"
                          : "text-gray-300 cursor-not-allowed"
                      }`}
                      title="Move Down"
                    >
                      <MoveDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenModal(category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit Category"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {/* Problems */}
                  <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <h3 className="font-semibold text-red-800 text-sm">Challenges</h3>
                      <span className="text-xs text-red-600 bg-red-100 px-1.5 py-0.5 rounded ml-auto">
                        {category.problems?.length || 0}
                      </span>
                    </div>
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {category.problems?.slice(0, 3).map((problem, idx) => (
                        <p key={idx} className="text-xs text-red-700">
                          • {problem.length > 60 ? problem.substring(0, 60) + "..." : problem}
                        </p>
                      ))}
                      {category.problems?.length > 3 && (
                        <p className="text-xs text-red-600 font-medium">
                          +{category.problems.length - 3} more
                        </p>
                      )}
                      {(!category.problems || category.problems.length === 0) && (
                        <p className="text-xs text-gray-500 italic">No challenges listed</p>
                      )}
                    </div>
                  </div>

                  {/* Solutions */}
                  <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <h3 className="font-semibold text-emerald-800 text-sm">Solutions</h3>
                      <span className="text-xs text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded ml-auto">
                        {category.solutions?.length || 0}
                      </span>
                    </div>
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {category.solutions?.slice(0, 3).map((solution, idx) => (
                        <p key={idx} className="text-xs text-emerald-700">
                          • {solution.length > 60 ? solution.substring(0, 60) + "..." : solution}
                        </p>
                      ))}
                      {category.solutions?.length > 3 && (
                        <p className="text-xs text-emerald-600 font-medium">
                          +{category.solutions.length - 3} more
                        </p>
                      )}
                      {(!category.solutions || category.solutions.length === 0) && (
                        <p className="text-xs text-gray-500 italic">No solutions listed</p>
                      )}
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <h3 className="font-semibold text-purple-800 text-sm">Impact</h3>
                    </div>
                    <p className="text-xs text-purple-700">
                      {category.impact || "No impact data available"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t text-xs text-gray-400 flex justify-between items-center">
                  <span>Created: {new Date(category.createdAt).toLocaleDateString()}</span>
                  <span>Updated: {new Date(category.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="text-gray-400 mb-4">
                <AlertTriangle className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Categories Found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? "No categories match your search criteria" : "Get started by creating your first category"}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => handleOpenModal()}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Category
                </button>
              )}
            </div>
          )}
        </div>

        {/* Statistics Summary */}
        {categories.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl p-6 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold">{categories.length}</div>
                <div className="text-sm opacity-90">Total Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold">
                  {categories.reduce((sum, cat) => sum + (cat.problems?.length || 0), 0)}
                </div>
                <div className="text-sm opacity-90">Total Challenges</div>
              </div>
              <div>
                <div className="text-3xl font-bold">
                  {categories.reduce((sum, cat) => sum + (cat.solutions?.length || 0), 0)}
                </div>
                <div className="text-sm opacity-90">Total Solutions</div>
              </div>
              <div>
                <div className="text-3xl font-bold">
                  {categories.filter(cat => cat.impact).length}
                </div>
                <div className="text-sm opacity-90">With Impact Data</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingCategory ? "Edit Category" : "Create New Category"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category ID *
                  </label>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="e.g., river_erosion, flood_relief"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                    disabled={!!editingCategory}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {editingCategory ? "ID cannot be changed" : "Unique identifier (lowercase with underscores)"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Riverbank Erosion Relief"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle *
                  </label>
                  <input
                    type="text"
                    name="subTitle"
                    value={formData.subTitle}
                    onChange={handleChange}
                    placeholder="e.g., নদীভাঙন প্রতিরোধ ও পুনর্বাসন"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order (Display Priority)
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Describe the category and its objectives..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Impact Statement
                  </label>
                  <input
                    type="text"
                    name="impact"
                    value={formData.impact}
                    onChange={handleChange}
                    placeholder="e.g., 500+ families protected, 2000+ people rehabilitated"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Problems Section */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-gray-800">Challenges & Problems</h3>
                </div>
                
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newProblem}
                    onChange={(e) => setNewProblem(e.target.value)}
                    placeholder="Enter a challenge or problem"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    onKeyPress={(e) => e.key === "Enter" && addProblem()}
                  />
                  <button
                    type="button"
                    onClick={addProblem}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
                
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {formData.problems.map((problem, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-red-50 p-3 rounded-lg">
                      <span className="text-sm text-red-800 flex-1">{problem}</span>
                      <button
                        type="button"
                        onClick={() => removeProblem(idx)}
                        className="text-red-600 hover:text-red-800 ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {formData.problems.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No challenges added yet. Click "Add" to include challenges.
                    </p>
                  )}
                </div>
              </div>

              {/* Solutions Section */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-semibold text-gray-800">Solutions & Initiatives</h3>
                </div>
                
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSolution}
                    onChange={(e) => setNewSolution(e.target.value)}
                    placeholder="Enter a solution or initiative"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    onKeyPress={(e) => e.key === "Enter" && addSolution()}
                  />
                  <button
                    type="button"
                    onClick={addSolution}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
                
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {formData.solutions.map((solution, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-emerald-50 p-3 rounded-lg">
                      <span className="text-sm text-emerald-800 flex-1">{solution}</span>
                      <button
                        type="button"
                        onClick={() => removeSolution(idx)}
                        className="text-emerald-600 hover:text-emerald-800 ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {formData.solutions.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No solutions added yet. Click "Add" to include solutions.
                    </p>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-linear-to-r from-emerald-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingCategory ? "Update Category" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}