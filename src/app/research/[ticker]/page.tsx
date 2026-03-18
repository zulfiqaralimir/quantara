import type { Metadata } from "next";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

interface Props {
  params: Promise<{ ticker: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ticker } = await params;
  return {
    title: `${ticker.toUpperCase()} Research`,
    description: `Investment memo for ${ticker.toUpperCase()} — Quantara Research`,
  };
}

export default async function ResearchMemoPage({ params }: Props) {
  const { ticker } = await params;
  const slug = ticker.toLowerCase();

  const mdxPath = join(process.cwd(), `src/app/research/posts/${slug}.mdx`);
  const mdPath = join(process.cwd(), `src/app/research/posts/${slug}.md`);

  let content: string | null = null;
  if (existsSync(mdxPath)) {
    content = readFileSync(mdxPath, "utf8");
  } else if (existsSync(mdPath)) {
    content = readFileSync(mdPath, "utf8");
  }

  if (!content) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-6">
        <a href="/research" className="text-sm text-teal hover:underline">
          ← Research
        </a>
      </div>

      <article className="prose prose-lg max-w-none">
        <MDXRemote source={content} />
      </article>
    </div>
  );
}
