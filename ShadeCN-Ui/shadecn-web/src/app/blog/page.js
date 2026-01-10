import { ArrowRight, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    title: "Design Systems for Scalable Apps",
    date: "Jan 8, 2026",
    tag: "Design",
    slug: "design-systems-scalable-apps",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1200",
  },
  {
    title: "REST API Best Practices",
    date: "Jan 4, 2026",
    tag: "Backend",
    slug: "rest-api-best-practices",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
  },
  {
    title: "Shadcn UI for Clean Interfaces",
    date: "Dec 29, 2025",
    tag: "Frontend",
    slug: "shadcn-ui-clean-interfaces",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
  },
  {
    title: "Improving React Performance",
    date: "Dec 22, 2025",
    tag: "React",
    slug: "improving-react-performance",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200",
  },
  {
    title: "Microservices Made Simple",
    date: "Dec 16, 2025",
    tag: "Architecture",
    slug: "microservices-made-simple",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
  },
  {
    title: "Tailwind CSS Like a Pro",
    date: "Dec 10, 2025",
    tag: "CSS",
    slug: "tailwind-css-like-a-pro",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200",
  },
];


export default function BlogPage() {
  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold">Blog & Insights</h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Articles, tutorials, and best practices for modern web development.
        </p>
      </section>

      {/* BLOG GRID */}
      <section className="pb-24">
        <div className="container px-4 mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </section>

      {/* FEATURED BLOG */}

      <section className="pb-24">
        <div className="container px-4 mx-auto">
          <div className="rounded-3xl border border-border bg-card overflow-hidden grid md:grid-cols-2">
            {/* IMAGE */}
            <div className="relative h-64 md:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200"
                alt="Featured blog"
                fill
                className="object-cover"
              />

              {/* subtle overlay for readability */}
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* CONTENT */}
            <div className="p-8 flex flex-col justify-center">
              <span className="text-sm text-primary font-medium">
                Featured Post
              </span>

              <h2 className="mt-4 text-2xl font-semibold text-foreground">
                How to Build Scalable Apps with Next.js & Tailwind
              </h2>

              <p className="mt-4 text-muted-foreground">
                Learn best practices for structuring your frontend, improving
                performance, and maintaining clean UI code.
              </p>

              <button className="mt-6 inline-flex items-center gap-2 text-primary font-medium hover:underline">
                Read More <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/*  CATEGORIES */}
      <section className="py-24 bg-muted/40">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-semibold text-foreground">
            Browse by Category
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {["Frontend", "Backend", "UI/UX", "DevOps", "AI", "Career"].map(
              (cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-border px-5 py-2 text-sm text-foreground hover:bg-secondary transition cursor-pointer"
                >
                  {cat}
                </span>
              )
            )}
          </div>
        </div>
      </section>

    {/*  NEWSLETTER CTA */}
<section className="py-24 bg-primary text-primary-foreground">
  <div className="container px-4 mx-auto text-center max-w-2xl">
    <h2 className="text-3xl font-semibold">Stay Updated</h2>

    <p className="mt-4 opacity-90">
      Subscribe to get the latest articles straight to your inbox.
    </p>

    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
      
      {/* INPUT */}
      <input
        type="email"
        placeholder="Enter your email"
        className="
          w-full sm:w-72
          rounded-xl
          bg-background
          px-4 py-3
          text-foreground
          placeholder:text-muted-foreground
          border border-input
          focus:outline-none
          focus:ring-2 focus:ring-ring
        "
      />

      {/* BUTTON */}
      <button
        className="
          rounded-xl
          bg-background
          px-6 py-3
          text-sm font-medium
          text-foreground
          hover:opacity-90
          transition
        "
      >
        Subscribe
      </button>
    </div>
  </div>
</section>

    </main>
  );
}

/* 🔹 BLOG CARD COMPONENT */
function BlogCard({ title, date, tag, image, slug }) {
  return (
    <div className="group rounded-3xl border border-border bg-card overflow-hidden transition hover:shadow-2xl">

      {/* IMAGE (clickable) */}
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative h-52">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {date}
          </span>
          <span className="flex items-center gap-1">
            <Tag className="w-4 h-4" /> {tag}
          </span>
        </div>

        {/* TITLE (clickable) */}
        <h3 className="mt-4 text-xl font-semibold group-hover:text-primary transition">
          <Link href={`/blog/${slug}`}>
            {title}
          </Link>
        </h3>

        {/* CTA */}
        <Link
          href={`/blog/${slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          Read More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
