import { useEffect, useState } from "react";

const BorrowSummaryPage = () => {
  const [summary, setSummary] = useState<any[]>([]);

  useEffect(() => {
    // temporary mock – later connect to backend /borrow-summary endpoint
    setSummary([
      { title: "Book A", isbn: "1234", totalBorrowed: 3 },
      { title: "Book B", isbn: "5678", totalBorrowed: 1 },
    ]);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📖 Borrow Summary</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">ISBN</th>
            <th className="border p-2">Total Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((item, idx) => (
            <tr key={idx}>
              <td className="border p-2">{item.title}</td>
              <td className="border p-2">{item.isbn}</td>
              <td className="border p-2">{item.totalBorrowed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowSummaryPage;
