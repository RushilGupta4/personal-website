import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="py-20 text-center space-y-6">
      <h1 className="text-4xl font-bold text-text-heading">Page not found</h1>
      <p className="text-text-body">The page you’re looking for doesn’t exist or is no longer available.</p>
      <div className="flex justify-center gap-4">
        <Link href="/" className="btn btn-primary">Home</Link>
        <Link href="/blogs" className="btn btn-outline">Blogs</Link>
      </div>
    </main>
  );
}
