/** Keep a short reading pause at each scene; the rest tracks native scrolling. */
export function storyPosition(progress: number, count: number): number {
  const last = Math.max(0, count - 1);
  const position = Math.max(0, Math.min(1, progress)) * last;
  const page = Math.floor(position);
  const fraction = position - page;
  const transition = Math.max(0, Math.min(1, (fraction - 0.08) / 0.84));
  return Math.min(last, page + transition * transition * (3 - 2 * transition));
}

export function storyScrollTarget(sectionTop: number, distance: number, index: number, count: number): number {
  const last = Math.max(0, count - 1);
  return sectionTop - 64 + (last ? Math.max(0, Math.min(last, index)) / last * Math.max(0, distance) : 0);
}
