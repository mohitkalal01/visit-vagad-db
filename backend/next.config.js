/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://visit-vagad.vercel.app",
      process.env.FRONTEND_URL,
    ].filter(Boolean);

    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: allowedOrigins.join(", ") },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ]
  }
}

module.exports = nextConfig;
