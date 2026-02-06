import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const postsDirectory = path.join(
    process.cwd(),
    "src",
    "app",
    "blog",
    "posts"
  );

  const filePath = path.join(postsDirectory, `${params.slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const source = fs.readFileSync(filePath, "utf8");

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 prose">
      <MDXRemote source={source} />
    </article>
  );
}
