import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import aspectRatioPolyfill from "postcss-aspect-ratio-polyfill";

export default {
  plugins: [
    aspectRatioPolyfill,
    tailwindcss("./tailwind.config.js"),
    autoprefixer,
  ],
};
