import { Link } from "react-router-dom";

function About() {
  const features = [
    "Create/Delete projects",
    "Create/Delete tasks",
    "Mark tasks as ToDo/InProgress/Done",
    'View "Today" tasks summary',
  ];

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">

      {/* Features section */}
      <section id="features" className="mb-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Features
        </h1>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      {/* Contact section */}
      <section id="contact" className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Contact
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Have questions or feedback? Email us at{" "}
          <a
            href="mailto:yass.mi2016@gmail.com"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            yass.mi2016@gmail.com
          </a>
          .
        </p>
      </section>

      {/* Links */}
      <div className="flex flex-col gap-2">
        <Link
          to="/dashboard"
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          &larr; Back to app
        </Link>
        <Link
          to="/terms"
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Terms
        </Link>
        <Link
          to="/privacy"
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Privacy
        </Link>

        <a
          href="https://github.com/yassinMi/MiPath"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          View project / Contribute on GitHub
        </a>
      </div>
    </div>
  );
}

export default About;
