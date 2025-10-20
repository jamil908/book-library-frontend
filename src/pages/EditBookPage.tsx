/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../services/bookApi";
import {
  ArrowLeft,
  Save,
  X,
  BookOpen,
  User,
  Hash,
  Layers,
  FileText,
} from "lucide-react";
import type { IUpdateBook } from "../types/book.types";

const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: bookResponse, isLoading, isError } = useGetBookByIdQuery(id!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const book = bookResponse?.data;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Omit<IUpdateBook, "id">>({
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
    },
  });

  const copies = watch("copies");
  const available = watch("available");

  // Populate form when book data loads
  useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description || "",
        copies: book.copies,
        available: book.available,
      });
    }
  }, [book, reset]);

  // Auto-disable available if copies = 0
  useEffect(() => {
    if (copies === 0) {
      setValue("available", false);
    }
  }, [copies, setValue]);

  const onSubmit = async (data: Omit<IUpdateBook, "id">) => {
    if (!book) {
      toast.error("Book not found");
      return;
    }

     if (data?.copies < 0) {
      toast.error("Copies cannot be negative");
      return;
    }

    const loadingToast = toast.loading("Updating book...");

    try {
      const updateData: IUpdateBook = {
        id: id!,
        ...data,
        available: data.copies === 0 ? false : data.available,
      };

      await updateBook(updateData).unwrap();
      toast.dismiss(loadingToast);
      toast.success(`"${data.title}" updated successfully 🎉`);
      setTimeout(() => navigate("/books"), 1000);
    } catch (error: any) {
      toast.dismiss(loadingToast);
      console.error("❌ Update failed:", error);
      toast.error(error?.data?.message || "Failed to update book");
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure? Unsaved changes will be lost.")) {
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Book Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The book you’re trying to edit doesn’t exist.
          </p>
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
          <p className="text-gray-600 mt-2">
            Update the details of “{book.title}”
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-b-lg shadow-lg p-6"
        >
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                className={`w-full border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } p-3 rounded-lg focus:ring-2 focus:ring-indigo-500`}
                placeholder="Enter book title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Author */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 text-indigo-600" />
                Author <span className="text-red-500">*</span>
              </label>
              <input
                {...register("author", { required: "Author is required" })}
                className={`w-full border ${
                  errors.author ? "border-red-500" : "border-gray-300"
                } p-3 rounded-lg focus:ring-2 focus:ring-indigo-500`}
                placeholder="Enter author name"
              />
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.author.message}
                </p>
              )}
            </div>

            {/* Genre & ISBN */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  Genre
                </label>
                <select
                  {...register("genre")}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="FICTION">Fiction</option>
                  <option value="NON_FICTION">Non-Fiction</option>
                  <option value="SCIENCE">Science</option>
                  <option value="HISTORY">History</option>
                  <option value="BIOGRAPHY">Biography</option>
                  <option value="FANTASY">Fantasy</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Hash className="w-4 h-4 text-indigo-600" />
                  ISBN <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("isbn", { required: "ISBN is required" })}
                  className={`w-full border ${
                    errors.isbn ? "border-red-500" : "border-gray-300"
                  } p-3 rounded-lg focus:ring-2 focus:ring-indigo-500`}
                  placeholder="Enter ISBN"
                />
                {errors.isbn && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.isbn.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Optional description"
              />
            </div>

            {/* Copies & Available */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Copies <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("copies", {
                    required: "Copies required",
                    min: { value: 0, message: "Copies cannot be negative" },
                  })}
                  className={`w-full border ${
                    errors.copies ? "border-red-500" : "border-gray-300"
                  } p-3 rounded-lg focus:ring-2 focus:ring-indigo-500`}
                />
                {errors.copies && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.copies.message}
                  </p>
                )}
                {copies === 0 && (
                  <p className="text-amber-600 text-sm mt-1">
                    ⚠️ Books with 0 copies will be unavailable
                  </p>
                )}
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 w-full cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("available")}
                    disabled={copies === 0}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  />
                  <span
                    className={`text-sm font-medium ${
                      copies === 0 ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    Available for borrowing
                  </span>
                </label>
              </div>
            </div>

            {/* Status */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-indigo-900">
                  Current Status:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    copies > 0 && available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {copies > 0 && available ? "✓ Available" : "✗ Unavailable"}
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t">
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition flex items-center justify-center gap-2 font-semibold shadow-lg"
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
              className="px-8 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-semibold"
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
