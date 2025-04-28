/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "static-cdn.jtvnw.net" }, // Twitch thumbnails
      { hostname: "images.kick.com" }, // Kick thumbnails
      { hostname: "kick.com" }, // Kick profile images
      { hostname: "*.cloudfront.net" }, // IPFS images
      { hostname: "files.kick.com" }, // Kick category thumbnails
      { hostname: "dummyimage.com" }, // Dummy image service
      { hostname: "i.ytimg.com" }, // Youtube
      { hostname: "yt3.ggpht.com" }, // Youtube
    ],
  },
};

module.exports = nextConfig;
