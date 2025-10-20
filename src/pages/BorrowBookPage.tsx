import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookByIdQuery, useBorrowBookMutation } from "../services/bookApi";
import { BookOpen, Calendar, Hash, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import type { ICreateBorrow } from "../types/borrow.types";

const BorrowBookPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data: bookResponse, isLoading: loadingBook } = useGetBookByIdQuery(bookId!);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const book = bookResponse?.data;

  const [formData, setFormData] = useState<Omit<ICreateBorrow, "bookId">>({
    quantity: 1,
    dueDate: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" ? Number(value) : value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.quantity || formData.quantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }

    if (!book) {
      setError("Book not found");
      return;
    }

    if (formData.quantity > book.copies) {
      setError(`Only ${book.copies} copies available. Please reduce quantity.`);
      return;
    }

    if (!formData.dueDate) {
      setError("Please select a due date");
      return;
    }

    if (new Date(formData.dueDate) <= new Date()) {
      setError("Due date must be in the future");
      return;
    }

    try {
      await borrowBook({
        bookId: bookId!,
        ...formData,
      }).unwrap();

      setSuccess(true);
      setTimeout(() => {
        navigate("/borrow-summary");
      }, 1500);
    } catch (err: any) {
      console.error("❌ Borrow failed:", err);
      const errorMessage = err?.data?.message || "Failed to borrow book. Please try again.";
      setError(errorMessage);
    }
  };

  if (loadingBook) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-lg shadow-xl p-8 max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h2>
          <p className="text-gray-600 mb-6">The book you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/books")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-lg shadow-xl p-8 max-w-md animate-fade-in">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Success! 🎉</h2>
          <p className="text-gray-600 mb-4">
            You've successfully borrowed <span className="font-semibold">{book.title}</span>
          </p>
          <p className="text-sm text-gray-500">Redirecting to borrow summary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/books")}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Books
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <BookOpen className="w-10 h-10 text-indigo-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
              <p className="text-gray-500">by {book.author}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <Hash className="w-4 h-4 text-indigo-500" /> Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min={1}
                max={book.copies}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <Calendar className="w-4 h-4 text-indigo-500" /> Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                min={today}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isBorrowing}
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-70"
            >
              {isBorrowing ? "Borrowing..." : "Borrow Book"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BorrowBookPage;
