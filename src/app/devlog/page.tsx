import { DevlogLayout } from "@/components/devlog/layout/devlog-layout";
import { PostCard } from "@/components/devlog/post-card";
import { getPostList } from "@/lib/posts";
import { Pagination } from "@/components/devlog/pagination";

export default async function DevlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const posts = await getPostList();
  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 6;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <DevlogLayout posts={posts}>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">All Posts</h1>

        <div className="grid grid-cols-1 gap-4">
          {currentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </DevlogLayout>
  );
}
