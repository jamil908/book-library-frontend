/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useGetBookByIdQuery, useBorrowBookMutation } from "../services/bookApi";
import { BookOpen, Calendar, Hash, AlertCircle, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import type { ICreateBorrow } from "../types/borrow.types";
import toast from "react-hot-toast";

const BorrowBookPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data: bookResponse, isLoading: loadingBook } = useGetBookByIdQuery(bookId!);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();
  const book = bookResponse?.data;

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<Omit<ICreateBorrow, "bookId">>({
    defaultValues: { quantity: 1, dueDate: "" },
  });

  const quantity = watch("quantity");

  const onSubmit = async (data: Omit<ICreateBorrow, "bookId">) => {
    if (!book) {
      toast.error("Book not found");
      return;
    }

    if (data.quantity > book.copies) {
      toast.error(`Only ${book.copies} copies available`);
      return;
    }

    if (new Date(data.dueDate) <= new Date()) {
      toast.error("Due date must be in the future");
      return;
    }

    try {
      await borrowBook({ bookId: bookId!, ...data }).unwrap();
      toast.success(`✅ You borrowed "${book.title}" successfully!`);
      reset();
      setTimeout(() => navigate("/borrow-summary"), 1500);
    } catch (err: any) {
      console.error("❌ Borrow failed:", err);
      toast.error(err?.data?.message || "Failed to borrow book. Try again.");
    }
  };

  if (loadingBook) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Book Not Found</h2>
          <p className="text-gray-600 mb-6">
            The book you’re trying to borrow doesn’t exist.
          </p>
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

        {/* Book Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <BookOpen className="w-10 h-10 text-indigo-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
              <p className="text-gray-500">by {book.author}</p>
            </div>
          </div>

          {/* Borrow Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Quantity */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <Hash className="w-4 h-4 text-indigo-500" /> Quantity
              </label>
              <input
                type="number"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: { value: 1, message: "Quantity must be at least 1" },
                })}
                min={1}
                max={book.copies}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {errors.quantity && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            {/* Due Date */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <Calendar className="w-4 h-4 text-indigo-500" /> Due Date
              </label>
              <input
                type="date"
                {...register("dueDate", {
                  required: "Please select a due date",
                })}
                min={today}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {errors.dueDate && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.dueDate.message}
                </p>
              )}
            </div>

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
