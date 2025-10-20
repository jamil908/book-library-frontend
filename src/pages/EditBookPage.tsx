import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../services/bookApi";
import { ArrowLeft, Save, X, BookOpen, User, Hash, Layers, FileText } from "lucide-react";
import type { IUpdateBook } from "../types/book.types";

const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: bookResponse, isLoading, isError } = useGetBookByIdQuery(id!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  
  const book = bookResponse?.data;

  // ✅ Properly typed form state
  const [formData, setFormData] = useState<Omit<IUpdateBook, "id">>({
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when book data loads
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description || "",
        copies: book.copies,
        available: book.available,
      });
    }
  }, [book]);

  // Auto-update available when copies changes
  useEffect(() => {
    if (formData.copies === 0) {
      setFormData(prev => ({ ...prev, available: false }));
    }
  }, [formData.copies]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
    // Clear error for this field
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, available: e.target.checked });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.author?.trim()) {
      newErrors.author = "Author is required";
    }
    if (!formData.isbn?.trim()) {
      newErrors.isbn = "ISBN is required";
    }
    if (formData.copies !== undefined && formData.copies < 0) {
      newErrors.copies = "Copies cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Updating book...");

    try {
      // ✅ Properly typed update
      const updateData: IUpdateBook = {
        id: id!,
        ...formData,
        // Ensure available is false if copies is 0
        available: formData.copies === 0 ? false : formData.available,
      };

      await updateBook(updateData).unwrap();

      // Dismiss loading and show success
      toast.dismiss(loadingToast);
      toast.success(`"${formData.title}" updated successfully! 🎉`);

      // Redirect after short delay
      setTimeout(() => {
        navigate("/books");
      }, 1000);
    } catch (error: any) {
      toast.dismiss(loadingToast);
      console.error("❌ Update failed:", error);
      const errorMessage = error?.data?.message || "Failed to update book";
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure? Any unsaved changes will be lost.")) {
      navigate("/books");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-lg shadow-xl p-8 max-w-md">
          <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h2>
          <p className="text-gray-600 mb-6">The book you're trying to edit doesn't exist.</p>
          <button
            onClick={() => navigate("/books")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-lg shadow-lg p-6 border-b">
          <button
            onClick={() => navigate("/books")}
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Books</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            Edit Book
          </h1>
          <p className="text-gray-600 mt-2">Update the details of "{book.title}"</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-b-lg shadow-lg p-6">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                placeholder="Enter book title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Author */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 text-indigo-600" />
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={`w-full border ${errors.author ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                placeholder="Enter author name"
              />
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">{errors.author}</p>
              )}
            </div>

            {/* Genre & ISBN Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Genre */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  Genre <span className="text-red-500">*</span>
                </label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                >
                  <option value="FICTION">Fiction</option>
                  <option value="NON_FICTION">Non-Fiction</option>
                  <option value="SCIENCE">Science</option>
                  <option value="HISTORY">History</option>
                  <option value="BIOGRAPHY">Biography</option>
                  <option value="FANTASY">Fantasy</option>
                </select>
              </div>

              {/* ISBN */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Hash className="w-4 h-4 text-indigo-600" />
                  ISBN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  className={`w-full border ${errors.isbn ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                  placeholder="Enter ISBN"
                />
                {errors.isbn && (
                  <p className="text-red-500 text-sm mt-1">{errors.isbn}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Enter book description (optional)"
              />
            </div>

            {/* Copies & Available Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Copies */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Copies <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="copies"
                  value={formData.copies}
                  onChange={handleChange}
                  min={0}
                  className={`w-full border ${errors.copies ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                  placeholder="Number of copies"
                />
                {errors.copies && (
                  <p className="text-red-500 text-sm mt-1">{errors.copies}</p>
                )}
                {formData.copies === 0 && (
                  <p className="text-amber-600 text-sm mt-1">
                    ⚠️ Books with 0 copies will be marked as unavailable
                  </p>
                )}
              </div>

              {/* Available Checkbox */}
              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer bg-gray-50 p-3 rounded-lg border border-gray-200 w-full">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={handleCheckbox}
                    disabled={formData.copies === 0}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <span className={`text-sm font-medium ${formData.copies === 0 ? 'text-gray-400' : 'text-gray-700'}`}>
                    Available for borrowing
                  </span>
                </label>
              </div>
            </div>

            {/* Status Badge */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-indigo-900">Current Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  formData.copies && formData.copies > 0 && formData.available
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {formData.copies && formData.copies > 0 && formData.available ? '✓ Available' : '✗ Unavailable'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t">
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 font-semibold shadow-lg"
            >
              {isUpdating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Update Book
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isUpdating}
              className="px-8 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookPage;