export default function TestimonialSection() {
  return (
    <section className="relative py-24 bg-background">
      <div className="container px-4 mx-auto">

        {/* HEADER */}
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-foreground">
            Trusted by teams worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Thousands of developers and startups use our platform to build
            faster and ship with confidence.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

          {/* CARD */}
          <div className="group relative rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute -top-6 left-8 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
              Power User
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">
              “The design system feels extremely polished. Dark mode, spacing,
              and responsiveness work flawlessly out of the box.”
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                A
              </div>
              <div>
                <p className="font-medium text-foreground">Ahmed Raza</p>
                <p className="text-sm text-muted-foreground">
                  Senior Frontend Engineer
                </p>
              </div>
            </div>
          </div>

          {/* CARD */}
          <div className="group relative rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute -top-6 left-8 rounded-full bg-secondary px-4 py-1 text-xs font-medium text-secondary-foreground">
              Product Team
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">
              “We reduced our UI development time by more than 40%. The
              consistency across components is impressive.”
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-lg font-semibold text-secondary-foreground">
                S
              </div>
              <div>
                <p className="font-medium text-foreground">Sarah Khan</p>
                <p className="text-sm text-muted-foreground">
                  Product Manager
                </p>
              </div>
            </div>
          </div>

          {/* CARD */}
          <div className="group relative rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute -top-6 left-8 rounded-full bg-accent px-4 py-1 text-xs font-medium text-accent-foreground">
              Startup Founder
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">
              “This helped us launch our MVP much faster. The UI looks premium
              without spending weeks on design.”
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-semibold text-accent-foreground">
                M
              </div>
              <div>
                <p className="font-medium text-foreground">Muhammad Ali</p>
                <p className="text-sm text-muted-foreground">
                  SaaS Founder
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
