import { Library, Menu, X } from 'lucide-react';
import  { useState } from 'react'

const Navbar = () => {
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div>
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-3">
                      <Library className="w-8 h-8 text-indigo-600" />
                      <span className="text-xl font-bold text-gray-900">LibraryHub</span>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                      <a href="/" className="text-gray-700 hover:text-indigo-600 transition font-medium">Home</a>
                      <a href="/books" className="text-gray-700 hover:text-indigo-600 transition font-medium">All Books</a>
                      <a href="/create-book" className="text-gray-700 hover:text-indigo-600 transition font-medium">Add Book</a>
                      <a href="/borrow-summary" className="text-gray-700 hover:text-indigo-600 transition font-medium">Borrow Summary</a>
                      <a href="/books" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md">Get Started</a>
                    </div>
        
                    {/* Mobile Menu Button */}
                    <button 
                      className="md:hidden text-gray-700"
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                      {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                  </div>
        
                  {/* Mobile Menu */}
                  {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-3">
                      <a href="/" className="block text-gray-700 hover:text-indigo-600 py-2">Home</a>
                      <a href="/books" className="block text-gray-700 hover:text-indigo-600 py-2">All Books</a>
                      <a href="/create-book" className="block text-gray-700 hover:text-indigo-600 py-2">Add Book</a>
                      <a href="/borrow-summary" className="block text-gray-700 hover:text-indigo-600 py-2">Borrow Summary</a>
                      <a href="/books" className="block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition text-center">Get Started</a>
                    </div>
                  )}
                </div>
              </nav>
    </div>
  )
}

export default Navbar