import { Users, Rocket, ShieldCheck, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-background">

      {/* 1️⃣ HERO SECTION */}
      <section className="py-24">
        <div className="container px-4 mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            About Us
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            We help teams build modern, scalable, and beautiful products faster
            using a clean design system and developer-first tools.
          </p>
        </div>
      </section>

      {/* 2️⃣ MISSION & VISION */}
      <section className="py-20 bg-muted/40">
        <div className="container px-4 mx-auto grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Our Mission
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our mission is to simplify product development by providing
              reusable UI components, scalable architecture, and best
              practices that teams can trust.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Our Vision
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We envision a world where developers spend less time rebuilding
              the same UI and more time solving meaningful problems.
            </p>
          </div>
        </div>
      </section>

      {/* 3️⃣ WHAT WE DO */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-semibold text-foreground">
              What We Do
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything we build is focused on performance, usability, and
              developer experience.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <Feature
              icon={<Rocket />}
              title="Fast Development"
              text="Reusable components that help you ship faster."
            />
            <Feature
              icon={<Users />}
              title="Team Friendly"
              text="Designed for collaboration and scalability."
            />
            <Feature
              icon={<ShieldCheck />}
              title="Reliable & Secure"
              text="Built with best practices and long-term stability."
            />
            <Feature
              icon={<Heart />}
              title="Loved by Devs"
              text="Crafted with care and attention to detail."
            />
          </div>
        </div>
      </section>

      {/* 4️⃣ VALUES */}
      <section className="py-24 bg-muted/40">
        <div className="container px-4 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-foreground">
            Our Core Values
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Transparency, quality, and simplicity guide everything we do —
            from design decisions to customer support.
          </p>
        </div>
      </section>

      {/* 5️⃣ TEAM SECTION */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-semibold text-foreground">
              Meet the Team
            </h2>
            <p className="mt-4 text-muted-foreground">
              A small team of passionate developers and designers.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <TeamCard name="Ahmed Raza" role="Frontend Engineer" />
            <TeamCard name="Sarah Khan" role="Product Manager" />
            <TeamCard name="Muhammad Ali" role="Founder & CEO" />
          </div>
        </div>
      </section>

      {/* 6️⃣ CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-semibold">
            Want to build something great together?
          </h2>
          <p className="mt-4 opacity-90">
            Join thousands of teams using our platform to launch faster.
          </p>

          <button className="mt-8 rounded-xl bg-background px-6 py-3 text-sm font-medium text-foreground hover:opacity-90 transition">
            Get Started
          </button>
        </div>
      </section>

    </main>
  );
}

/* 🔹 Reusable Components */

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        {icon}
      </div>
      <h3 className="font-medium text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function TeamCard({ name, role }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xl font-semibold">
        {name[0]}
      </div>
      <h4 className="font-medium text-foreground">{name}</h4>
      <p className="text-sm text-muted-foreground">{role}</p>
    </div>
  );
}
