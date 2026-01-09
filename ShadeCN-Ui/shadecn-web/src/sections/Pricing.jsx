export default function PricingSection() {
  return (
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
  );
}
