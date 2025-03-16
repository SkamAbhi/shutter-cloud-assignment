import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome </h1>
      <h2 className="text-xl font-bold mb-4 "> Please click the link below to see the design</h2>
      <Link
        href="/dashboard/projects/123/edit"
        className="text-blue-500 hover:underline"
      >
        Edit Project 123
      </Link>
    </div>
  );
}