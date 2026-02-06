export default function Home() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 text-center">
      {/* Logo */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto mb-6"
      >
        <circle
          cx="32"
          cy="32"
          r="26"
          stroke="currentColor"
          strokeWidth="4"
          className="text-navy"
        />
        <path
          d="M20 36 L28 28 L36 34 L44 22"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-teal"
        />
        <line
          x1="40"
          y1="40"
          x2="50"
          y2="50"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-navy"
        />
      </svg>

      {/* Title */}
      <h1 className="text-4xl font-semibold tracking-tight text-navy">
        Quantara
      </h1>

      {/* Tagline */}
      <p className="mt-4 text-lg font-medium text-teal">
        Signals Beyond the Noise.
      </p>
    </section>
  );
}
