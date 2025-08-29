import { useState } from "react";
import { useAddBookMutation } from "../services/bookApi";
import { useNavigate } from "react-router-dom";

const AddBookPage = () => {
  const [form, setForm] = useState({ title: "", author: "", genre: "", copies: 1 });
  const [addBook] = useAddBookMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(form);
    navigate("/books");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">➕ Add New Book</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <input
          className="border p-2"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2"
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2"
          name="copies"
          type="number"
          min="1"
          value={form.copies}
          onChange={handleChange}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
