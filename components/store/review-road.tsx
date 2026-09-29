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
