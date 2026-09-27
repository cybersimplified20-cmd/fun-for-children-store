import { Bus, Castle, Fish, Rocket, Rabbit, TreePine } from 'lucide-react'

const THEMES = [
  { icon: Rabbit, label: 'Cute animals' },
  { icon: Rocket, label: 'Space & rockets' },
  { icon: Castle, label: 'Fairy tales' },
  { icon: Fish, label: 'Under the sea' },
  { icon: Bus, label: 'Vehicles' },
  { icon: TreePine, label: 'Seasons & holidays' },
]

export function Themes() {
  return (
    <section aria-labelledby="themes-title" className="bg-muted px-4 py-16 sm:py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <h2 id="themes-title" className="text-center font-heading text-3xl font-semibold text-balance">
          Every theme little artists ask for
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {THEMES.map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col items-center gap-3 rounded-2xl bg-card p-6 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="font-bold">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const FAQS = [
  {
    q: 'How do I get my pages?',
    a: 'Right after payment you land on a confirmation page with secure download buttons. Your ZIP files contain print-ready PDFs.',
  },
  {
    q: 'Which payment methods can I use?',
    a: 'Checkout is handled by Stripe and shows the methods available in your country, including cards, Apple Pay, Google Pay and Link.',
  },
  {
    q: 'Is my payment secure?',
    a: 'Yes. You pay on Stripe’s secure checkout page. Your card details never touch our website.',
  },
  {
    q: 'Can I print the pages more than once?',
    a: 'Absolutely. Print as many copies as you need for your family or classroom.',
  },
]

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="bg-muted px-4 py-16 sm:py-20">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <h2 id="faq-title" className="text-center font-heading text-3xl font-semibold">
          Questions, answered
        </h2>
        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group rounded-2xl bg-card p-5 open:shadow-sm">
              <summary className="cursor-pointer list-none font-bold marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {q}
                  <span aria-hidden="true" className="text-xl text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="pt-3 leading-relaxed text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
