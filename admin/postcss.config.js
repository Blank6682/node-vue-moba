const purgecss = require("@fullhuman/postcss-purgecss")({
    content: [
        "./src/**/*.html",
        "./src/**/*.vue",
        "./src/**/*.jsx",
    ],
    defalutExtractor: content => content.match(/[\w-/:\\.]+(?i<!:)/g) || []
})
module.exports = {
    plugins: [
        require('tailwindcss'),
        require("autoprefixer"),
        ...process.env.NODE_ENV === "production" ? [purgecss] : []
    ]
}