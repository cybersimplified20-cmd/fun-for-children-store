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
    label: 'Sarah M.',
    text: 'Super smooth process! The download button popped up right after payment—no waiting or checking email folders. Printed the pages right away and my 5-year-old was hooked!',
    avatarPosition: '100% 100%',
  },
  {
    label: 'David L.',
    text: 'Loved how fast this was! Paid and clicked download right on the confirmation page. Printed a few sheets immediately and my son spent the entire afternoon coloring happily.',
    avatarPosition: '50% 0%',
  },
  {
    label: 'Emily R.',
    text: 'Bought this on a rainy afternoon, downloaded it directly on screen, and printed the coloring pages 2 minutes later. My kids loved all the designs!',
    avatarPosition: '75% 0%',
  },
  {
    label: 'Mark Thompson',
    text: 'Instant delivery done right. Clicked buy, hit download on screen, and printed the sheets. My daughter immediately grabbed her crayons and hasn’t stopped coloring since!',
    avatarPosition: '25% 100%',
  },
  {
    label: 'Jessica K.',
    text: 'No waiting around for emails! The PDF showed up right on screen after paying, and I printed a batch instantly. Perfect activity to keep my toddlers busy and happy!',
    avatarPosition: '100% 0%',
  },
  {
    label: 'Rachel B.',
    text: 'Super user-friendly site! Took seconds to pay and access the coloring pages right on the page. Beautiful illustrations—my twins absolutely loved coloring them!',
    avatarPosition: '75% 100%',
  },
  {
    label: 'Michael P.',
    text: 'Extremely convenient. Paid and the download link was right there on screen. Printed a few pages and my kids were so excited to start coloring right away.',
    avatarPosition: '50% 100%',
  },
  {
    label: 'Amanda Miller',
    text: 'Bought it on my phone in a few clicks, downloaded it directly, and printed the sheets. The kids were obsessed with the drawings! Fast, effortless, and fun.',
    avatarPosition: '0% 0%',
  },
  {
    label: 'Chris H.',
    text: 'Fastest purchase ever. Payment cleared and boom—download button ready right on the site. Printed the coloring sheets immediately and my daughter was over the moon!',
    avatarPosition: '25% 0%',
  },
  {
    label: 'Laura G.',
    text: 'I love that you get immediate access on screen right after paying. No digging through an inbox—just download, print, and let the kids color. Total lifesaver!',
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
      <div className="mb-2 text-amber-500" aria-hidden="true">★★★★★</div>
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
