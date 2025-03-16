import Link from "next/link";

function Project() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Project Overview</h1>
      <p className="text-gray-600 mb-6">
        This is a simple project page. Click the link below to edit project ID 123.
      </p>
      <Link
        href="/dashboard/projects/123/edit"
        className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
      >
        Edit Project 123
      </Link>
    </div>
  );
}

export default Project;