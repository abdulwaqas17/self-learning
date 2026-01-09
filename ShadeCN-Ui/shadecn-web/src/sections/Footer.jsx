import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container px-4 py-16 mx-auto">

        {/* TOP GRID */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              YourApp
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Build modern, scalable applications faster using a clean UI
              system powered by Tailwind and Shadcn.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="rounded-lg border border-border p-2 text-muted-foreground transition hover:text-foreground hover:bg-muted"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-lg border border-border p-2 text-muted-foreground transition hover:text-foreground hover:bg-muted"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-lg border border-border p-2 text-muted-foreground transition hover:text-foreground hover:bg-muted"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-lg border border-border p-2 text-muted-foreground transition hover:text-foreground hover:bg-muted"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Product
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Features</a></li>
              <li><a href="#" className="hover:text-foreground">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground">Testimonials</a></li>
              <li><a href="#" className="hover:text-foreground">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Company
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About</a></li>
              <li><a href="#" className="hover:text-foreground">Careers</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
              <li><a href="#" className="hover:text-foreground">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Resources
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground">API Reference</a></li>
              <li><a href="#" className="hover:text-foreground">Community</a></li>
              <li><a href="#" className="hover:text-foreground">Support</a></li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="my-12 h-px w-full bg-border" />

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} YourApp. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
