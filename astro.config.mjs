import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [react()],
  // pages: {
  //   'products/*': async ({ request }) => {
  //     const handle = request.params.handle;
  //     const productUrl = `http://localhost:5000/api/products/find/${handle.join('/')}`;
  //     const product = await fetch(productUrl).then((res) => res.json());

  //     return {
  //       props: {
  //         product,
  //       },
  //     };
  //   },
  // }
});