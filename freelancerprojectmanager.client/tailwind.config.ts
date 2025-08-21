

const config: Config = {
    darkMode: 'class', // class-based dark mode
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx}", // include your TS and TSX files
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    corePlugins: {
        preflight: true, 
    }
}

export default config