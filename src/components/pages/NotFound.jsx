import { FaHome } from "react-icons/fa";
import { CiFaceFrown } from "react-icons/ci";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="hero">
      <div className="text-center hero-content">
        <div className="max-w-lg">
          <div className="flex justify-center">
            <h1 className="text-8xl font-bold mb-8 mr-3">Oops!</h1>
            <CiFaceFrown className="text-8xl" />
          </div>
          <p className="text-5xl mb-8">404 - Page not found!</p>
          <Link to="/" className="btn btn-outline btn-lg">
            <FaHome className="mr-1" />
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
