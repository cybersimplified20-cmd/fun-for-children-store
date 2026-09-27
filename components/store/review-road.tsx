const reviews = [
  { name: 'Sarah M.', text: 'Bought this for a long road trip and it was an absolute lifesaver. Kept my 5-year-old completely engaged for hours without a single screen!' },
  { name: 'David L.', text: 'Super intuitive and durable! My son dropped it multiple times already and it still works like a charm. Great value for money.' },
  { name: 'Emily R.', text: 'A wonderful gift for creative minds. My niece started playing with it immediately and hasn’t put it down since.' },
  { name: 'Mark Thompson', text: 'Simple, sturdy, and highly entertaining. It’s rare to find something that holds a toddler’s attention this well.' },
  { name: 'Jessica K.', text: 'Fantastic quality! It’s clean, mess-free, and keeps the kids quietly entertained while I get some work done.' },
  { name: 'Rachel B.', text: 'Ordered this for my daughter’s 6th birthday and it was the highlight of all her gifts. Highly recommended for young kids!' },
  { name: 'Michael P.', text: 'Great educational toy that doesn’t feel like learning. My kids love it and ask to play with it every single day.' },
  { name: 'Amanda Miller', text: 'Worth every penny! Compact enough to pack in a handbag, making it perfect for restaurants and waiting rooms.' },
  { name: 'Chris H.', text: 'Exceeded my expectations. The materials feel premium and safe, and it sparks so much imaginative play.' },
  { name: 'Laura G.', text: 'My twins usually fight over everything, but this kept them playing together peacefully for an entire afternoon. A total winner!' },
]

function ReviewCard({ name, text }: { name: string; text: string }) {
  return (
    <article className="w-[300px] shrink-0 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm sm:w-[360px]">
      <div className="mb-2 text-sm tracking-[0.12em] text-amber-500" aria-label="5 out of 5 stars">★★★★★</div>
      <p className="line-clamp-3 text-sm leading-relaxed text-foreground">“{text}”</p>
      <p className="mt-3 text-sm font-bold text-foreground">{name}</p>
    </article>
  )
}

export function ReviewRoad() {
  const loop = [...reviews, ...reviews]

  return (
    <section className="overflow-hidden border-y border-border/70 bg-background py-7" aria-label="Customer reviews">
      <p className="mb-5 text-center font-heading text-xl font-semibold">What families are saying</p>
      <div className="review-road flex w-max gap-4 px-4 hover:[animation-play-state:paused]">
        {loop.map((review, index) => (
          <ReviewCard key={`${review.name}-${index}`} {...review} />
        ))}
      </div>
    </section>
  )
}
