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

const FAMILY_CARDS = [
  {
    label: 'Road trips',
    text: 'Print a selection before leaving so kids have something new to color without relying on a screen.',
    avatarPosition: '100% 100%',
  },
  {
    label: 'Everyday coloring',
    text: 'Keep a large library ready so there is always a new page to choose and print at home.',
    avatarPosition: '50% 0%',
  },
  {
    label: 'Creative afternoons',
    text: 'Mix animals, dinosaurs, fairy tales, space and vehicles to keep activity time varied.',
    avatarPosition: '75% 0%',
  },
  {
    label: 'Favorite themes',
    text: 'Choose from many different themes so it is easy to find something that matches each child’s interests.',
    avatarPosition: '25% 100%',
  },
  {
    label: 'Screen-free time',
    text: 'Download, print and set out crayons for a simple activity away from tablets and phones.',
    avatarPosition: '100% 0%',
  },
  {
    label: 'Birthday activities',
    text: 'Print a small themed set for parties, playdates or other moments when several kids need an activity.',
    avatarPosition: '75% 100%',
  },
  {
    label: 'Quiet time',
    text: 'Use a few pages for calm creative time at home whenever you need an easy activity.',
    avatarPosition: '50% 100%',
  },
  {
    label: 'Print what you need',
    text: 'Choose a few pages today and come back to the rest of the collection another time.',
    avatarPosition: '0% 0%',
  },
  {
    label: 'Lots of variety',
    text: 'Rotate between animals, vehicles, characters and other designs instead of repeating the same pages.',
    avatarPosition: '25% 0%',
  },
  {
    label: 'Siblings',
    text: 'Let each child pick different pages so everyone can color something they like at the same time.',
    avatarPosition: '0% 100%',
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

function FamilyCard({
  label,
  text,
  avatarPosition,
}: {
  label: string
  text: string
  avatarPosition: string
}) {
  return (
    <article className="w-[300px] shrink-0 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm sm:w-[360px]">
      <div className="mb-3 flex items-center gap-3">
        <div
          className="h-11 w-11 shrink-0 rounded-full border border-border bg-cover shadow-sm"
          role="img"
          aria-label="Family activity avatar"
          style={{
            backgroundImage: "url('/images/review-avatars.webp')",
            backgroundSize: '500% 200%',
            backgroundPosition: avatarPosition,
          }}
        />
        <p className="text-sm font-bold text-foreground">{label}</p>
      </div>
      <p className="line-clamp-4 text-sm leading-relaxed text-foreground">{text}</p>
    </article>
  )
}

export function ReviewRoad() {
  const loop = [...FAMILY_CARDS, ...FAMILY_CARDS]

  return (
    <section className="overflow-hidden border-y border-border/70 bg-background py-7">
      <p className="mb-5 text-center font-heading text-xl font-semibold">How families use the bundle</p>
      <div className="review-road flex w-max gap-4 px-4 hover:[animation-play-state:paused]">
        {loop.map((card, index) => (
          <FamilyCard key={`${card.label}-${index}`} {...card} />
        ))}
      </div>
    </section>
  )
}
