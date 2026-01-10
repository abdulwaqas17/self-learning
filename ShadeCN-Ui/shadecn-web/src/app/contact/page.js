import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">

      {/* 1️⃣ HERO */}
      <section className="py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold">
          Contact Us
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Have a question or want to work together? We’d love to hear from you.
        </p>
      </section>

      {/* 2️⃣ CONTACT INFO */}
      <section className="pb-24">
        <div className="container px-4 mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          <InfoCard
            icon={<Mail className="h-6 w-6" />}
            title="Email"
            value="support@yourapp.com"
          />

          <InfoCard
            icon={<Phone className="h-6 w-6" />}
            title="Phone"
            value="+92 300 1234567"
          />

          <InfoCard
            icon={<MapPin className="h-6 w-6" />}
            title="Location"
            value="Karachi, Pakistan"
          />
        </div>
      </section>

      {/* 3️⃣ CONTACT FORM */}
      <section className="pb-24">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-12">

            <h2 className="text-2xl font-semibold text-center">
              Send Us a Message
            </h2>

            <form className="mt-10 grid gap-6 md:grid-cols-2">

              <input
                type="text"
                placeholder="Your Name"
                className="rounded-xl bg-background px-4 py-3 text-foreground border border-input focus:outline-none focus:ring-2 focus:ring-ring"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="rounded-xl bg-background px-4 py-3 text-foreground border border-input focus:outline-none focus:ring-2 focus:ring-ring"
              />

              <input
                type="text"
                placeholder="Subject"
                className="md:col-span-2 rounded-xl bg-background px-4 py-3 text-foreground border border-input focus:outline-none focus:ring-2 focus:ring-ring"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="md:col-span-2 rounded-xl bg-background px-4 py-3 text-foreground border border-input focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />

        

            </form>
                  <div className="md:col-span-2 text-center flex justify-center mt-10">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2  rounded-xl bg-primary px-6 py-3 text-primary-foreground font-medium hover:opacity-90 transition"
                >
                  Send Message <Send className="h-4 w-4" />
                </button>
              </div>
          </div>
        </div>
      </section>

      {/* 4️⃣ CTA */}
      <section className="py-24 bg-muted">
        <div className="container px-4 mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-semibold">
            Let’s Build Something Great
          </h2>
          <p className="mt-4 text-muted-foreground">
            Whether it’s a product idea or a collaboration, we’re ready.
          </p>
        </div>
      </section>

    </main>
  );
}

/* INFO CARD COMPONENT */
function InfoCard({ icon, title, value }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 text-center hover:shadow-lg transition">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
        {icon}
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 text-muted-foreground">{value}</p>
    </div>
  );
}
