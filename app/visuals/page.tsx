import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visuals",
  description: "Animated charts, data stories, and visual explanations of finance.",
};

export default function VisualsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-navy">
        Visuals
      </h1>

      <p className="mt-4 max-w-2xl text-teal">
        Animated charts, data stories, and visual explanations of finance.
      </p>
    </div>
  );
}
