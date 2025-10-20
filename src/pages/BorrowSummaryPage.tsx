/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetBorrowSummaryQuery } from "../services/bookApi";
import { useNavigate } from "react-router-dom";

const BorrowSummaryPage = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();
  const navigate = useNavigate();

  const borrows = data?.data || [];

  if (isLoading) return <div className="p-4">Loading borrow summary...</div>;
  if (isError) return <div className="p-4 text-red-500">Failed to load summary</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📊 Borrow Summary</h1>
        <button
          onClick={() => navigate("/books")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Books
        </button>
      </div>

      {borrows.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-xl mb-2">No borrowed books yet</p>
          <button
            onClick={() => navigate("/books")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Browse Books to Borrow
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Book Title</th>
                <th className="border p-2">ISBN</th>
                <th className="border p-2">Total Quantity Borrowed</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((borrow: any) => (
                <tr key={borrow._id}>
                  <td className="border p-2">{borrow.bookTitle}</td>
                  <td className="border p-2">{borrow.isbn}</td>
                  <td className="border p-2 text-center font-semibold">
                    {borrow.totalQuantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BorrowSummaryPage;