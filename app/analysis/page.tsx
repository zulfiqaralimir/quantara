import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analysis",
  description: "Deep financial analysis, market signals, and data-driven insights.",
};

export default function AnalysisPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-navy">
        Analysis
      </h1>

      <p className="mt-4 max-w-2xl text-teal">
        Deep financial analysis, market signals, and data-driven insights.
      </p>
    </div>
  );
}
