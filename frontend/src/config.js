export default (process.env.NODE_ENV === "development"
  ? {
      server: "https://localhost:4140",
    }
  : {
      server: "https://wapp.weblite.me/soundlite",
    })
