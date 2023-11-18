export const setCache = {
  long: Astro => {
    Astro.response.headers.set(
      "Cache-Control",
      "public, max-age=60, stale-while-revalidate=120"
    )
  },

  short: Astro => {
    Astro.response.headers.set(
      "Cache-Control",
      "public, max-age=1, stale-while-revalidate=9"
    )
  }
}
