export default process.env.NODE_ENV === 'development' ? {
  server: 'https://localhost:3093',
} : {
  server: 'https://weblite.me:3093',
}
