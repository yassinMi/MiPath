import { Link } from "react-router-dom";

function About() {
  const features = [
    "Login with email",
    "Create/Delete projects",
    "Create/Delete tasks",
    'View "This Week" tasks summary',
    'View "Today" tasks summary',
    "Filter projects and tasks by custom attributes",
  ];

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Features
      </h1>

      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <div className="flex flex-col gap-2">
        <Link
          to="/"
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          &larr; Back to app
        </Link>

        <a
          href="https://github.com/yassinMi/MiPath"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          View project on GitHub
        </a>
      </div>
    </div>
  );
}

export default About;
