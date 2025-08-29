import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BooksPage from './pages/BookPage'
import AddBookPage from './pages/AddBookPage'
import BorrowSummaryPage from './pages/BorrowSummaryPage'

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/create-book" element={<AddBookPage />} />
        <Route path="/borrow-summary" element={<BorrowSummaryPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
