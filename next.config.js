/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      // Game embeds - backward compat
      { source: '/abaTekken', destination: '/play/tekken' },
      { source: '/abaCrash', destination: '/play/crash' },
      { source: '/abaMetal', destination: '/play/metal' },
      { source: '/abaResident', destination: '/play/resident' },
      { source: '/abaBubsy', destination: '/play/bubsy' },
      { source: '/abaFifa', destination: '/play/fifa' },
      { source: '/abaTomb', destination: '/play/tomb' },
      { source: '/abaStreet', destination: '/play/street' },
      { source: '/abaCb3', destination: '/play/cb3' },
      { source: '/abaTn2', destination: '/play/tn2' },
      { source: '/abaGt', destination: '/play/gt' },
      { source: '/abaFf7', destination: '/play/ff7' },
      // Movie embeds - backward compat
      { source: '/abaDonnie', destination: '/play/donnie' },
      { source: '/abaCrashM', destination: '/play/crash-movie' },
      { source: '/abaResidentM', destination: '/play/resident-movie' },
      { source: '/abaJogador', destination: '/play/jogador' },
      { source: '/abaSpider', destination: '/play/spider' },
      { source: '/abaSonic', destination: '/play/sonic' },
      { source: '/abaMario', destination: '/play/mario' },
      { source: '/abaTekkenM', destination: '/play/tekken-movie' },
    ];
  },
};

module.exports = nextConfig;
