/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "static-cdn.jtvnw.net", // Twitch thumbnails
      "images.kick.com", // Kick thumbnails
      "files.kick.com", // Kick category thumbnails
      "dummyimage.com", // Dummy image service
    ],
  },
};

module.exports = nextConfig;
