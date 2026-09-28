const reviews = [
  {
    name: 'Sarah M.',
    text: 'Bought this for a long road trip and it was an absolute lifesaver. I printed a selection of pages beforehand and it kept my 5-year-old entertained for hours without a screen!',
    avatarPosition: '100% 100%',
  },
  {
    name: 'David L.',
    text: 'There are so many different pages to choose from. My son loves picking a new coloring page every day, and I love that I can simply print more whenever we need them.',
    avatarPosition: '50% 0%',
  },
  {
    name: 'Emily R.',
    text: 'A wonderful bundle for creative kids. I printed a few pages for my niece and she immediately wanted to start coloring. There’s enough variety to keep her busy for ages.',
    avatarPosition: '75% 0%',
  },
  {
    name: 'Mark Thompson',
    text: 'Really impressed with how much content is included. There are lots of different themes, so it’s easy to find something my child is interested in.',
    avatarPosition: '25% 100%',
  },
  {
    name: 'Jessica K.',
    text: 'Such an easy way to keep the kids entertained without putting them in front of a screen. Download, print, and they’re ready to start coloring.',
    avatarPosition: '100% 0%',
  },
  {
    name: 'Rachel B.',
    text: 'I used these pages as part of my daughter’s birthday activities and the kids loved them. Having so many designs to choose from made it really easy.',
    avatarPosition: '75% 100%',
  },
  {
    name: 'Michael P.',
    text: 'My kids genuinely enjoy these. It keeps them busy, encourages creativity, and gives us an easy screen-free activity whenever we need one.',
    avatarPosition: '50% 100%',
  },
  {
    name: 'Amanda Miller',
    text: 'Great value for the amount of printable content included. I love being able to choose a few pages, print them at home, and save the rest for another day.',
    avatarPosition: '0% 0%',
  },
  {
    name: 'Chris H.',
    text: 'Much more variety than I expected. Animals, fun characters and lots of different designs — my kids are always finding something new they want to color.',
    avatarPosition: '25% 0%',
  },
  {
    name: 'Laura G.',
    text: 'My twins each chose their own pages and spent the afternoon coloring together. Having such a big collection means they rarely argue over what to do next!',
    avatarPosition: '0% 100%',
  },
]

function ReviewCard({
  name,
  text,
  avatarPosition,
}: {
  name: string
  text: string
  avatarPosition: string
}) {
  return (
    <article className="w-[300px] shrink-0 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm sm:w-[360px]">
      <div className="mb-3 flex items-center gap-3">
        <div
          className="h-11 w-11 shrink-0 rounded-full border border-border bg-cover shadow-sm"
          role="img"
          aria-label={`${name} profile photo`}
          style={{
            backgroundImage: "url('/images/review-avatars.webp')",
            backgroundSize: '500% 200%',
            backgroundPosition: avatarPosition,
          }}
        />
        <div>
          <p className="text-sm font-bold text-foreground">{name}</p>
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Illustrative example
          </p>
        </div>
      </div>
      <p className="line-clamp-4 text-sm leading-relaxed text-foreground">“{text}”</p>
    </article>
  )
}

export function ReviewRoad() {
  const loop = [...reviews, ...reviews]

  return (
    <section
      className="overflow-hidden border-y border-border/70 bg-background py-7"
      aria-label="Illustrative family use examples"
    >
      <p className="text-center font-heading text-xl font-semibold">How families can use the bundle</p>
      <p className="mx-auto mb-5 mt-1 max-w-2xl px-4 text-center text-xs text-muted-foreground">
        Illustrative examples showing common ways parents can use printable activities.
      </p>
      <div className="review-road flex w-max gap-4 px-4 hover:[animation-play-state:paused]">
        {loop.map((review, index) => (
          <ReviewCard key={`${review.name}-${index}`} {...review} />
        ))}
      </div>
    </section>
  )
}
