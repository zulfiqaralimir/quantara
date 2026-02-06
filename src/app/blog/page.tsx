export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-navy">
        Blog
      </h1>

      <p className="mt-4 max-w-2xl text-teal">
        Articles on finance, data analysis, and market signals.
      </p>

      <ul className="mt-8 space-y-4">
        <li>
          <a
            href="/blog/first-post"
            className="text-navy underline hover:text-teal"
          >
            Welcome to Quantara
          </a>
        </li>
      </ul>
    </div>
  );
}
