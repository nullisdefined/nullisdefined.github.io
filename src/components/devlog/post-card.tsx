import Link from "next/link";
import { format } from "date-fns";
import { Post } from "@/types/index";
import { Tag } from "./tag";
import Image from "next/image";
import { getFirstParagraph, removeMarkdown } from "@/lib/remove-markdown-utils";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const category = post.category?.toLowerCase();
  const firstParagraph = getFirstParagraph(post.content);
  const plainContent = firstParagraph
    ? removeMarkdown(firstParagraph)
    : removeMarkdown(post.content);

  return (
    <Link href={`/devlog/${category}/${post.slug}`}>
      <div className="border-y py-4 hover:bg-accent/50 transition-all duration-300 w-full">
        <div className="flex justify-between items-center px-2 gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">{post.category}</span>
              <span>•</span>
              <time dateTime={post.date}>
                {format(new Date(post.date), "yyyy.MM.dd")}
              </time>
            </div>

            <h2 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
              {post.title}
            </h2>

            <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
              {plainContent}
            </p>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {post.tags.map((tag) => (
                  <Tag key={tag} name={tag} className="text-xs" />
                ))}
              </div>
            )}
          </div>

          <div className="relative w-40 h-40 flex-shrink-0">
            {post.thumbnail ? (
              <Image
                src={post.thumbnail}
                alt={post.title}
                width={160}
                height={160}
                className="object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                <p className="text-4xl font-semibold text-muted-foreground">
                  {post.title.charAt(0)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
