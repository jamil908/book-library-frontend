/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../services/bookApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { ICreateBook } from "../types/book.types";

const AddBookPage = () => {
  const navigate = useNavigate();
  const [createBook] = useCreateBookMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<ICreateBook>({
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

  // Automatically set availability based on copies
  if (copies === 0) {
    setValue("available", false);
  }

  const onSubmit = async (data: ICreateBook) => {
    const payload: ICreateBook = {
      ...data,
      available: data.copies > 0 ? data.available ?? true : false,
    };

    try {
      await createBook(payload).unwrap();
      toast.success("✅ Book added successfully!");
      reset();
      navigate("/books");
    } catch (err: any) {
      console.error("Failed to add book:", err);
      toast.error(err?.data?.message || "Failed to add book");
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Enter book title"
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium mb-1">Author *</label>
          <input
            {...register("author", { required: true })}
            type="text"
            placeholder="Enter author name"
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium mb-1">Genre *</label>
          <select
            {...register("genre")}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500"
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
          <label className="block text-sm font-medium mb-1">ISBN *</label>
          <input
            {...register("isbn", { required: true })}
            type="text"
            placeholder="Enter ISBN"
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register("description")}
            placeholder="Enter book description (optional)"
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500"
            rows={4}
          />
        </div>

        {/* Copies */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Number of Copies *
          </label>
          <input
            {...register("copies", { valueAsNumber: true })}
            type="number"
            min={0}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Available Checkbox */}
        <div className="flex items-center">
          <input
            {...register("available")}
            type="checkbox"
            className="mr-2"
          />
          <label>Available</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
