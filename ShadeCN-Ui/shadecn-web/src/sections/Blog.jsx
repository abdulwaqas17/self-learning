import Image from "next/image";
import { ArrowRight } from "lucide-react";

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

        {/* GRID */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

          {/* CARD */}
          <article className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-xl">
            
            {/* IMAGE */}
            <div className="relative h-52 w-full">
              <Image
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                alt="Tailwind CSS UI"
                fill
                className="object-cover transition group-hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                Engineering
              </span>

              <h3 className="mt-4 text-xl font-semibold text-foreground">
                Building scalable UI systems with Tailwind CSS
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Learn how to design reusable UI components using Tailwind and
                CSS variables.
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  March 12, 2026
                </span>

                <span className="flex items-center gap-2 text-sm font-medium text-primary">
                  Read more <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </article>

          {/* CARD */}
          <article className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-52 w-full">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="Startup team"
                fill
                className="object-cover transition group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                Product
              </span>

              <h3 className="mt-4 text-xl font-semibold text-foreground">
                How startups ship faster without burning out
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Practical workflows used by modern SaaS teams to stay fast and
                focused.
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  February 28, 2026
                </span>

                <span className="flex items-center gap-2 text-sm font-medium text-primary">
                  Read more <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </article>

          {/* CARD */}
          <article className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-52 w-full">
              <Image
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
                alt="Dark mode design"
                fill
                className="object-cover transition group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Design
              </span>

              <h3 className="mt-4 text-xl font-semibold text-foreground">
                Designing perfect dark mode experiences
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Learn contrast, accessibility, and UX principles for dark mode
                design.
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  January 19, 2026
                </span>

                <span className="flex items-center gap-2 text-sm font-medium text-primary">
                  Read more <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
