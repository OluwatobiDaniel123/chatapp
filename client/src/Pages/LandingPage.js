import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold text-pink-600">Welcome to LoveChat</h1>
      <p className="text-gray-600 mt-2">
        Find your perfect match and chat instantly.
      </p>
      <div className="mt-5">
        <Link
          to="/login"
          className="bg-pink-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-pink-600"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
export default LandingPage;
