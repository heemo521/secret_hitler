/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGO_DB:
      'mongodb+srv://mymongo:mybongo@cluster0.d2cqwgg.mongodb.net/secret_hitler?retryWrites=true&w=majority',
  },
};

module.exports = nextConfig;
