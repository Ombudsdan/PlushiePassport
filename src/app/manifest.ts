import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Plushie Passport",
    short_name: "Plushie",
    description: "An installable plushie passport with profile management and notification controls.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f4ef",
    theme_color: "#171717",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
