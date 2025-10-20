import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../services/bookApi";
import type { ICreateBook } from "../types/book.types";

const AddBookPage = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading, error }] = useCreateBookMutation();

  const [formData, setFormData] = useState<ICreateBook>({
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  // ✅ Auto-update available when copies changes
  useEffect(() => {
    if (formData.copies === 0) {
      setFormData(prev => ({ ...prev, available: false }));
    }
  }, [formData.copies]);

  const handleCopiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copies = Number(e.target.value);
    setFormData({
      ...formData,
      copies,
      // ✅ Auto-set available based on copies
      available: copies > 0 ? formData.available : false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validation: If copies is 0, force available to false
    const dataToSubmit: ICreateBook = {
      ...formData,
      available: formData.copies > 0 ? formData.available : false,
    };

    try {
      await createBook(dataToSubmit).unwrap();
      alert("✅ Book added successfully!");
      navigate("/books");
    } catch (err) {
      console.error("Failed to add book:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📚 Add New Book</h2>
        <button
          onClick={() => navigate("/books")}
          className="text-gray-600 hover:text-gray-800"
        >
          ← Back
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {(error as any)?.data?.message || "Failed to add book"}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter book title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Author <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter author name"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Genre <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value as any })}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
          <label className="block text-sm font-medium mb-1">
            ISBN <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter ISBN"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            placeholder="Enter book description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={4}
          />
        </div>

        {/* Copies */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Number of Copies <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="Number of copies"
            value={formData.copies}
            onChange={handleCopiesChange} // ✅ Use custom handler
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            min={0}
            required
          />
          {formData.copies === 0 && (
            <p className="text-sm text-amber-600 mt-1">
              ⚠️ Books with 0 copies will be marked as unavailable
            </p>
          )}
        </div>

        {/* Available Checkbox */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.available}
              onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
              disabled={formData.copies === 0} // ✅ Disable if no copies
              className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className={`text-sm font-medium ${formData.copies === 0 ? 'text-gray-400' : ''}`}>
              Mark as available for borrowing
            </span>
          </label>
          {formData.copies === 0 && (
            <p className="text-xs text-gray-500 mt-1 ml-6">
              Cannot be available when copies = 0
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {isLoading ? "Adding Book..." : "Add Book"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/books")}
            className="px-6 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookPage;