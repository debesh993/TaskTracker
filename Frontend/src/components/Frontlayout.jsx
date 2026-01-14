import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="w-full bg-blue-600 text-white shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-16">
          <h1 className="text-2xl font-bold">Task Tracker</h1>
          <div className="flex gap-4">
            <Link
              to="/signup"
              className="bg-emerald-500 hover:bg-emerald-600 px-1 py-1 md:px-3 md:py-2 rounded-md shadow-md text-white transition duration-300"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-white text-blue-600 hover:bg-gray-100 px-1 py-1 md:px-3 md:py-2 rounded-md shadow-md transition duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      <div className="h-16"></div>

      <main className="flex-1 flex flex-col justify-center items-center text-center px-4 md:px-0">
        <div className="max-w-3xl bg-white rounded-xl shadow-lg p-8 md:p-12 mt-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Welcome to Task Tracker
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-4">
            This is a simple web application to help you manage your tasks.
          </p>
          <p className="text-gray-600 text-lg md:text-xl mb-6">
            Just sign up with your email and password, then you can add tasks, view them, mark them as completed, and delete tasks.  
          </p>
          <p className="text-gray-500 text-sm">
            Try it out and organize your tasks efficiently!
          </p>
        </div>
      </main>

      <footer className="w-full bg-blue-600 text-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} Task Tracker. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
