import { useParams, useNavigate } from "react-router-dom";
import { useDeleteBookMutation, useGetBookByIdQuery } from "../services/bookApi";
import {
  BookOpen,
  User,
  Layers,
  Hash,
  Copy,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Edit,

  BookMarked,
  Calendar,
  AlertCircle,
} from "lucide-react";
import type { IBook } from "../types/book.types";

const BookDetailsPage = () => {
      const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: bookResponse, isLoading, isError } = useGetBookByIdQuery(id!);

  const book: IBook | undefined = bookResponse?.data;

  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get genre color
  const getGenreColor = (genre: string) => {
    const colors: Record<string, string> = {
      FICTION: "bg-purple-100 text-purple-800 border-purple-200",
      NON_FICTION: "bg-blue-100 text-blue-800 border-blue-200",
      SCIENCE: "bg-green-100 text-green-800 border-green-200",
      HISTORY: "bg-amber-100 text-amber-800 border-amber-200",
      BIOGRAPHY: "bg-pink-100 text-pink-800 border-pink-200",
      FANTASY: "bg-indigo-100 text-indigo-800 border-indigo-200",
    };
    return colors[genre] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteBook(id).unwrap();
        alert("✅ Book deleted successfully");
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("❌ Delete failed:", error);
        const errorMessage = error?.data?.message || "Failed to delete book";
        alert(errorMessage);
      }
    }
  };
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading book details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-lg shadow-xl p-8 max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h2>
          <p className="text-gray-600 mb-6">
            The book you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/books")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition shadow-md"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/books")}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 transition group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Books</span>
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-10 h-10" />
                  <h1 className="text-3xl md:text-4xl font-bold">{book.title}</h1>
                </div>
                <p className="text-indigo-100 text-lg flex items-center gap-2">
                  <User className="w-5 h-5" />
                  by {book.author}
                </p>
              </div>
              
              {/* Status Badge */}
              <div
                className={`px-4 py-2 rounded-full font-semibold text-sm shadow-lg ${
                  book.available && book.copies > 0
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {book.available && book.copies > 0 ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Available
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Unavailable
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Genre */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Genre
                  </span>
                </div>
                <span
                  className={`inline-block px-4 py-2 rounded-lg font-semibold border ${getGenreColor(
                    book.genre
                  )}`}
                >
                  {book.genre.replace("_", " ")}
                </span>
              </div>

              {/* ISBN */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Hash className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    ISBN
                  </span>
                </div>
                <p className="text-lg font-mono text-gray-900">{book.isbn}</p>
              </div>

              {/* Copies Available */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Copy className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Copies Available
                  </span>
                </div>
                <p className="text-3xl font-bold text-indigo-600">{book.copies}</p>
              </div>

              {/* Availability Status */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <BookMarked className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Status
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {book.available && book.copies > 0 ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="text-lg font-semibold text-green-600">
                        Ready to Borrow
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-red-600" />
                      <span className="text-lg font-semibold text-red-600">
                        Not Available
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {book.description && (
              <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>
            )}

            {/* Timestamps */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    Created
                  </div>
                  <p className="text-gray-900 font-medium">
                    {formatDate(book.createdAt)}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    Last Updated
                  </div>
                  <p className="text-gray-900 font-medium">
                    {formatDate(book.updatedAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {/* Borrow Button */}
              <button
                onClick={() => navigate(`/borrow/${book._id}`)}
                disabled={!book.available || book.copies === 0}
                className="flex-1 min-w-[200px] bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 font-semibold shadow-lg"
              >
                <BookMarked className="w-5 h-5" />
                {book.available && book.copies > 0 ? "Borrow This Book" : "Not Available"}
              </button>

              {/* Edit Button */}
              <button
                onClick={() => navigate(`/edit-book/${book._id}`)}
                className="flex-1 min-w-[150px] bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-semibold shadow-lg"
              >
                <Edit className="w-5 h-5" />
                Edit Book
              </button>

              {/* Delete Button */}
               <button
                            onClick={() => handleDelete(book._id, book.title)}
                            disabled={isDeleting}
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                            title="Delete Book"
                          >
                            Delete
                          </button>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Borrowing Information</h3>
              <p className="text-sm text-gray-600">
                {book.available && book.copies > 0 ? (
                  <>
                    This book is currently available for borrowing. There {book.copies === 1 ? 'is' : 'are'}{" "}
                    <span className="font-semibold text-indigo-600">{book.copies}</span>{" "}
                    {book.copies === 1 ? 'copy' : 'copies'} in stock. Click "Borrow This Book" to proceed.
                  </>
                ) : (
                  "This book is currently unavailable for borrowing. Please check back later or contact the library for more information."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;