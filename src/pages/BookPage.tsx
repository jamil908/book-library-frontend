import { useGetBooksQuery } from "../services/bookApi";

const BooksPage = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();

  if (isLoading) return <p className="p-4">Loading books...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load books</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📚 All Books</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Genre</th>
            <th className="border p-2">Copies</th>
            <th className="border p-2">Availability</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book: any) => (
            <tr key={book._id}>
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.genre}</td>
              <td className="border p-2">{book.copies}</td>
              <td className="border p-2">
                {book.copies > 0 ? "✅ Available" : "❌ Unavailable"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksPage;
