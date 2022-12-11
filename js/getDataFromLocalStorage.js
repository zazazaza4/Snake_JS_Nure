export function getBestResFromLocalStorage() {
  const best = localStorage.getItem('best');

  if (!best) {
    localStorage.setItem('best', 0);
    return 0;
  }

  return +best;
}
