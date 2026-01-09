import Image from "next/image";

export default function Home() {
  return (
  <main>
    
    {/* hero section */}
         <section className="container px-4 py-10 mx-auto lg:h-128 lg:flex lg:items-center lg:space-x-8">
      
      {/* LEFT CONTENT */}
      <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
        <h1 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
          A <span className="font-semibold">free repository</span> for community
          <br className="hidden lg:block" />
          components using{" "}
          <span className="font-semibold underline decoration-primary">
            Tailwind CSS
          </span>
        </h1>

        <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
          Open source Tailwind UI components and templates to
          <br className="hidden lg:block" />
          bootstrap your new apps, projects or landing sites!
        </p>

        {/* SEARCH BOX */}
        <div className="mt-6 bg-transparent border rounded-lg dark:border-gray-700 lg:w-2/3 focus-within:border-primary focus-within:ring focus-within:ring-primary focus-within:ring-opacity-20">
          <form
            action="https://www.creative-tim.com/twcomponents/search"
            className="flex flex-wrap justify-between md:flex-row"
          >
            <input
              type="text"
              name="query"
              placeholder="Search Components"
              required
              className="flex-1 h-10 px-4 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none lg:h-12 dark:text-gray-200 focus:outline-none focus:ring-0 focus:placeholder-transparent"
            />

            <button
              type="submit"
              className="flex items-center justify-center w-full p-2 m-1 text-white transition duration-300 rounded-lg lg:w-12 lg:h-12 bg-primary hover:bg-primary/70 focus:outline-none"
            >
              🔍
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
        <Image
          src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
          alt="tailwind css components"
          width={400}
          height={400}
          className="w-full h-full max-w-md mx-auto"
        />
      </div>
    </section>


{/* pricing section */}
       <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        
        {/* HEADER */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl text-foreground">
            Simple & Transparent Pricing
          </h2>
          <p className="mt-4 text-muted-foreground">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* PRICING GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {/* BASIC PLAN */}
          <div className="p-8 border rounded-2xl bg-card border-border">
            <h3 className="text-xl font-semibold text-foreground">Basic</h3>
            <p className="mt-2 text-muted-foreground">For individuals</p>

            <div className="mt-6">
              <span className="text-4xl font-bold text-foreground">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>✔ 1 Project</li>
              <li>✔ Community Access</li>
              <li>✔ Basic Support</li>
            </ul>

            <button className="w-full mt-8 rounded-xl border border-border py-2.5 text-sm font-medium hover:bg-muted transition">
              Get Started
            </button>
          </div>

          {/* PRO PLAN (FEATURED) */}
          <div className="relative p-8 border rounded-2xl bg-card border-primary shadow-lg">
            <span className="absolute px-3 py-1 text-xs rounded-full -top-3 right-6 bg-primary text-primary-foreground">
              Most Popular
            </span>

            <h3 className="text-xl font-semibold text-foreground">Pro</h3>
            <p className="mt-2 text-muted-foreground">For professionals</p>

            <div className="mt-6">
              <span className="text-4xl font-bold text-foreground">$29</span>
              <span className="text-muted-foreground">/month</span>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>✔ Unlimited Projects</li>
              <li>✔ Priority Support</li>
              <li>✔ Advanced Analytics</li>
            </ul>

            <button className="w-full mt-8 rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:opacity-90 transition">
              Start Free Trial
            </button>
          </div>

          {/* ENTERPRISE PLAN */}
          <div className="p-8 border rounded-2xl bg-card border-border">
            <h3 className="text-xl font-semibold text-foreground">Enterprise</h3>
            <p className="mt-2 text-muted-foreground">For large teams</p>

            <div className="mt-6">
              <span className="text-4xl font-bold text-foreground">$99</span>
              <span className="text-muted-foreground">/month</span>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>✔ Everything in Pro</li>
              <li>✔ Dedicated Manager</li>
              <li>✔ Custom Integrations</li>
            </ul>

            <button className="w-full mt-8 rounded-xl border border-border py-2.5 text-sm font-medium hover:bg-muted transition">
              Contact Sales
            </button>
          </div>

        </div>
      </div>
    </section>

    {/* testimonial section */}
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
  </main>
  );
}
