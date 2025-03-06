import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-3xl text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-extrabold leading-tight"
        >
          Welcome to <span className="text-pink-500">LoveChat</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-4 text-lg text-gray-300"
        >
          Where real connections begin. Chat, meet, and explore endless
          possibilities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <Link
            to="/login"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default LandingPage;
