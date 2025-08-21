// 404 Not Found middleware
// Usage: Place after all API routes in server.js
export default function notFound(req, res, next) {
  res.status(404).json({ error: 'Route not found' });
}
