const argv = require("minimist")(process.argv.slice(2));

module.exports = {
  prefix: `${argv["cssPrefix"]}-`,
  corePlugins: {
    preflight: true,
  },
  mode: "jit",
  // These paths are just examples, customize them to match your project structure
  purge: ["./build/*.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
