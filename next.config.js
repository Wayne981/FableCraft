/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'm.media-amazon.com',
      'images.unsplash.com',
      'www.memeraki.com',
      'www.craftsnchisel.com',
      'www.gitagged.com',
      'theindiacrafthouse.com',
      'villagedecor.in',
      'artisanvariety.com',
      'www.treasuresofkashmir.in',
      'storeassets.im-cdn.com',
      's3.amazonaws.com',
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
