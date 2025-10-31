import { Link } from "react-router-dom";
import { useAuth } from "../components/hooks/useAuth";

export default function NotFoundPage() {
  const { user } = useAuth();

  return (
    <section className="bg-default-theme dark:bg-dark-theme flex items-center justify-center h-screen">
      <div className="p-4 m-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight text-white font-extrabold lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-base md:text-4xl dark:text-white">
            Page Not Found
          </p>
          <p className="mb-4 text-base font-light text-gray-300 dark:text-gray-200">
            The page you are looking for doesn&apos;t exist or has been moved.
            <br />
            If you believe this is an error, please contact support or try
            navigating back to a known page.
          </p>
          <Link
            to={user ? "/dashboard" : "/"}
            className="inline-flex text-white bg-brand-base hover:bg-brand-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 transition-all duration-300 active:scale-95"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
