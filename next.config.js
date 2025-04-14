/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "static-cdn.jtvnw.net" }, // Twitch thumbnails
      { hostname: "images.kick.com" }, // Kick thumbnails
      { hostname: "files.kick.com" }, // Kick category thumbnails
      { hostname: "dummyimage.com" }, // Dummy image service
      { hostname: "i.ytimg.com" }, // Youtube
    ],
  },
};

module.exports = nextConfig;
