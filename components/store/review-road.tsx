import { Car, CloudRain, House, Plane, School, Utensils } from 'lucide-react'

const USE_CASES = [
  {
    icon: House,
    title: 'Quiet time at home',
    text: 'Keep a ready-to-print activity on hand for calm afternoons and creative breaks.',
  },
  {
    icon: CloudRain,
    title: 'Rainy days',
    text: 'Pick a new theme and print a few pages when outdoor plans are off the table.',
  },
  {
    icon: Car,
    title: 'Road trips',
    text: 'Print a small stack before leaving and bring crayons for an easy travel activity.',
  },
  {
    icon: Utensils,
    title: 'Restaurants & waiting',
    text: 'Bring a few pages along for moments when kids need something simple to do.',
  },
  {
    icon: Plane,
    title: 'Travel days',
    text: 'Choose compact activities for flights, hotels and time away from home.',
  },
  {
    icon: School,
    title: 'Classroom use',
    text: 'Print themed pages for quiet activities, early finishers or creative time.',
  },
]

const SCENARIOS = [
  {
    label: 'Road-trip example',
    text: 'I would print a small selection before leaving so there is always something new to color without handing over a screen.',
  },
  {
    label: 'Rainy-day example',
    text: 'A big printable library makes it easy to choose a few pages in seconds instead of searching for a new activity every time.',
  },
  {
    label: 'Classroom example',
    text: 'Having lots of themes ready to print can be useful for quiet-time activities, early finishers and creative breaks.',
  },
]

export function UseCases() {
  return (
    <section className="border-y border-border/70 bg-background px-4 py-14 sm:py-18" aria-labelledby="use-cases-title">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Easy to use anywhere</p>
          <h2 id="use-cases-title" className="font-heading text-3xl font-semibold text-balance">
            Made for the moments you need an easy activity
          </h2>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 rounded-2xl border bg-card p-5 shadow-sm">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ParentScenarios() {
  return (
    <section className="px-4 py-14 sm:py-18" aria-labelledby="scenario-title">
      <div className="mx-auto flex max-w-5xl flex-col gap-7">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Parent-style examples</p>
          <h2 id="scenario-title" className="mt-2 font-heading text-3xl font-semibold text-balance">
            What using the bundle can look like
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {SCENARIOS.map((scenario) => (
            <article key={scenario.label} className="rounded-2xl border bg-card p-5 shadow-sm">
              <div className="mb-3 text-amber-500" aria-hidden="true">★★★★★</div>
              <p className="text-sm leading-relaxed text-foreground">“{scenario.text}”</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {scenario.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
