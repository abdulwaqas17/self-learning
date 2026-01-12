import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getBlogs } from "@/lib/getBlogs";


const articles = [
  {
    category: "Engineering",
    title: "Building scalable UI systems with Tailwind CSS",
    description:
      "Learn how to design reusable UI components using Tailwind and CSS variables.",
    date: "March 12, 2026",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
  {
    category: "Design",
    title: "Design systems that scale with your product",
    description:
      "Best practices for building consistent and accessible design systems.",
    date: "March 15, 2026",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },
  {
    category: "Frontend",
    title: "Modern UI patterns for React apps Solutions",
    description:
      "Explore modern UI patterns to improve usability and performance.",
    date: "March 18, 2026",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
  },
  {
    category: "Architecture",
    title: "Microservices UI architecture explained",
    description:
      "Understand how microservices affect frontend architecture.",
    date: "March 22, 2026",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    category: "CSS",
    title: "Advanced Tailwind CSS techniques for developers",
    description:
      "Write cleaner, faster, and scalable Tailwind CSS code with these tips.",
    date: "March 25, 2026",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
];


const blogs = getBlogs();
export default function BlogSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">

        {/* HEADER */}
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-foreground">
            From the blog
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Learn, explore, and stay updated with modern development practices.
          </p>
        </div>

<Carousel>
  <CarouselContent>
    {articles.map((item, index) => (
      <CarouselItem
        key={index}
        className="md:basis-1/2 lg:basis-1/3"
      >
        <article className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-xl">

          {/* IMAGE */}
          <div className="relative h-52 w-full">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition group-hover:scale-105"
            />
          </div>

          {/* CONTENT */}
          <div className="p-6">
            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {item.category}
            </span>

            <h3 className="mt-4 text-xl font-semibold text-foreground">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {item.date}
              </span>

              <span className="flex items-center gap-2 text-sm font-medium text-primary">
                Read more <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </article>
      </CarouselItem>
    ))}
  </CarouselContent>

  <CarouselPrevious />
  <CarouselNext />
</Carousel>

      </div>
    </section>
  );
}
