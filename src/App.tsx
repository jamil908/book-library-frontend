import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import BooksPage from "./pages/BookPage";
import BorrowSummaryPage from "./pages/BorrowSummaryPage";
import EditBookPage from "./pages/EditBookPage";
import BorrowBookPage from "./pages/BorrowBookPage";
import LibraryLandingPage from "./pages/LandingPage";
import Layout from "./layouts/layout";
import AddBookPage from "./pages/AddBookPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
   
    
      <Toaster 
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
        <Router>
      <Routes>
     
        
        {/* Routes with Navbar - Wrapped in Layout */}
        <Route element={<Layout />}>
        <Route path="/" element={<LibraryLandingPage />} />
        
          <Route path="/books" element={<BooksPage />} />
          <Route path="/create-book" element={<AddBookPage/>} />
          <Route path="/borrow-summary" element={<BorrowSummaryPage />} />
          <Route path="/edit-book/:id" element={<EditBookPage />} />
          <Route path="/borrow/:bookId" element={<BorrowBookPage />} />
        </Route>
      </Routes>
    </Router>
    
    </>
  
  );
}

export default App;