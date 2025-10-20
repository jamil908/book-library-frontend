import { BookOpen, Plus, FileText, Library,  BookMarked, Clock } from 'lucide-react';

export default function LibraryLandingPage() {


  const features = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Browse Books",
      description: "Explore our comprehensive collection of books across various genres and authors."
    },
    {
      icon: <Plus className="w-12 h-12" />,
      title: "Add Books",
      description: "Easily add new books to the library system with detailed information and tracking."
    },
    {
      icon: <BookMarked className="w-12 h-12" />,
      title: "Borrow Books",
      description: "Simple borrowing process with quantity tracking and due date management."
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Borrow Summary",
      description: "View comprehensive summaries of all borrowed books and their status."
    }
  ];

  const stats = [
    { number: "1000+", label: "Books Available" },
    { number: "500+", label: "Active Borrows" },
    { number: "50+", label: "Genres" },
    { number: "24/7", label: "Access" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
 

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Simple & Efficient Management</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Complete
            <span className="text-indigo-600"> Library Management</span>
            <br />System
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Streamline your library operations with our intuitive book management system. 
            Browse, borrow, and manage books effortlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/books" 
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition shadow-lg text-lg font-semibold"
            >
              Browse Books
            </a>
            <a 
              href="/create-book" 
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition shadow-lg text-lg font-semibold border-2 border-indigo-600"
            >
              Add New Book
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600">Everything you need to manage your library efficiently</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition group hover:-translate-y-1 duration-300"
            >
              <div className="text-indigo-600 mb-4 group-hover:scale-110 transition duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Begin managing your library collection today with our easy-to-use system
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/books" 
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition shadow-lg text-lg font-semibold"
            >
              View All Books
            </a>
            <a 
              href="/borrow-summary" 
              className="bg-indigo-700 text-white px-8 py-4 rounded-lg hover:bg-indigo-800 transition shadow-lg text-lg font-semibold"
            >
              Check Borrows
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Library className="w-6 h-6" />
                <span className="text-lg font-bold">LibraryHub</span>
              </div>
              <p className="text-gray-400">
                Your trusted library management solution for efficient book tracking and borrowing.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/books" className="hover:text-white transition">All Books</a></li>
                <li><a href="/create-book" className="hover:text-white transition">Add Book</a></li>
                <li><a href="/borrow-summary" className="hover:text-white transition">Borrow Summary</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Book Management</li>
                <li>Borrow Tracking</li>
                <li>Real-time Updates</li>
                <li>Summary Reports</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">
                Email: support@libraryhub.com<br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 LibraryHub. All rights reserved. Built with React & TypeScript.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}