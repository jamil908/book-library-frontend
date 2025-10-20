import { useGetBooksQuery, useDeleteBookMutation } from "../services/bookApi";
import { useNavigate } from "react-router-dom";
import type { IBook } from "../types/book.types";

const BooksPage = () => {
  const { data, isLoading, isError, refetch } = useGetBooksQuery();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  const navigate = useNavigate();


  const books: IBook[] = data?.data || [];

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading books...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">❌ Failed to load books</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">📚 All Books</h1>
            <p className="text-gray-600 mt-1">
              Total: {books.length} book{books.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => navigate("/create-book")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Add New Book
          </button>
        </div>

        {/* Books Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ISBN
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Copies
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {books.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <div className="text-gray-400">
                        <p className="text-lg mb-2">📚 No books available</p>
                        <button
                          onClick={() => navigate("/create-book")}
                          className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Add your first book
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  books.map((book: IBook) => (
                    <tr key={book._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{book.title}</div>
                        {book.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {book.description}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{book.author}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {book.genre}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-sm font-mono">
                        {book.isbn}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`font-semibold ${
                          book.copies > 5 ? 'text-green-600' :
                          book.copies > 0 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {book.copies}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {book.copies > 0 ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ✓ Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            ✗ Unavailable
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-center flex-wrap">
                          {/* View Details */}
                          <button
                            onClick={() => navigate(`/books/${book._id}`)}
                            className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                            title="View Details"
                          >
                            View
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => navigate(`/edit-book/${book._id}`)}
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            title="Edit Book"
                          >
                            Edit
                          </button>

                          {/* Borrow */}
                          <button
                            onClick={() => navigate(`/borrow/${book._id}`)}
                            disabled={book.copies === 0}
                            className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                            title={book.copies === 0 ? "No copies available" : "Borrow Book"}
                          >
                            Borrow
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(book._id, book.title)}
                            disabled={isDeleting}
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                            title="Delete Book"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Footer */}
        {books.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-indigo-600">{books.length}</p>
                <p className="text-sm text-gray-600">Total Books</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {books.filter(book => book.copies > 0).length}
                </p>
                <p className="text-sm text-gray-600">Available</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {books.filter(book => book.copies === 0).length}
                </p>
                <p className="text-sm text-gray-600">Unavailable</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {books.reduce((sum, book) => sum + book.copies, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Copies</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksPage;