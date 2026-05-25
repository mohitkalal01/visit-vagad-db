/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // Get frontend URL from environment
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    
    // Allow multiple origins for flexibility
    const allowedOrigins = [
      frontendUrl,
      "http://localhost:3000",
      "http://localhost:3001",
      "https://visit-vagad.vercel.app",
    ].filter(Boolean);

    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: frontendUrl },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ]
  }
}

module.exports = nextConfig;
