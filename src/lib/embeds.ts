import { sanitizeEmbedUrl } from './embedSecurity';

export interface EmbedData {
  slug: string;
  title: string;
  url: string;
  type: 'game' | 'movie';
}

const rawEmbeds: Record<string, EmbedData> = {
  tekken:          { slug: 'tekken',          title: 'Tekken 3',                  url: 'https://www.retrogames.cc/embed/40238-tekken-3.html',                              type: 'game'  },
  crash:           { slug: 'crash',           title: 'Crash Team Racing',          url: 'https://www.retrogames.cc/embed/41687-crash-team-racing.html',                      type: 'game'  },
  metal:           { slug: 'metal',           title: 'Metal Slug',                 url: 'https://www.retrogames.cc/embed/9157-metal-slug-super-vehicle-001.html',            type: 'game'  },
  resident:        { slug: 'resident',        title: 'Resident Evil 3 - Nemesis',  url: 'https://www.retrogames.cc/embed/42155-resident-evil-3-nemesis-u.html',              type: 'game'  },
  bubsy:           { slug: 'bubsy',           title: 'Bubsy 3D',                   url: 'https://www.retrogames.cc/embed/42362-bubsy-3d-furbitten-planet.html',              type: 'game'  },
  fifa:            { slug: 'fifa',            title: 'FIFA 2000',                  url: 'https://www.retrogames.cc/embed/17484-fifa-2000-usa.html',                          type: 'game'  },
  tomb:            { slug: 'tomb',            title: 'Tomb Raider II',             url: 'https://www.retrogames.cc/embed/42724-tomb-raider-2.html',                          type: 'game'  },
  street:          { slug: 'street',          title: 'Street Fighter Alpha 2',     url: 'https://www.retrogames.cc/embed/9966-street-fighter-alpha-2-960306-usa.html',       type: 'game'  },
  cb3:             { slug: 'cb3',             title: 'Crash Bandicoot: Warped',    url: 'https://www.retrogames.cc/embed/40136-crash-bandicoot-warped.html',                 type: 'game'  },
  tn2:             { slug: 'tn2',             title: "Tony Hawk's Pro Skater 2",   url: 'https://www.retrogames.cc/embed/42153-tony-hawks-pro-skater-2.html',               type: 'game'  },
  gt:              { slug: 'gt',              title: 'Gran Turismo',               url: 'https://www.retrogames.cc/embed/41826-gran-turismo.html',                           type: 'game'  },
  ff7:             { slug: 'ff7',             title: 'Final Fantasy VII',           url: 'https://www.retrogames.cc/embed/43658-final-fantasy-vii-usa-disc-1.html',           type: 'game'  },
  mgs1:            { slug: 'mgs1',            title: 'Metal Gear Solid',           url: 'https://www.retrogames.cc/embed/43266-metal-gear-solid-disc-1.html',                type: 'game'  },
  mohu:            { slug: 'mohu',            title: 'Medal of Honor - Underground',url: 'https://www.retrogames.cc/embed/43154-medal-of-honor-underground.html',             type: 'game'  },
  soulreaver:      { slug: 'soulreaver',      title: 'Legacy of Kain - Soul Reaver',url: 'https://www.retrogames.cc/embed/43155-legacy-of-kain-soul-reaver.html',              type: 'game'  },
  donnie:          { slug: 'donnie',          title: 'Donnie Darko',               url: 'https://www.youtube.com/embed/RPZTgNgsdIw',                                        type: 'movie' },
  'crash-movie':   { slug: 'crash-movie',     title: 'Crash: o Filme',             url: 'https://www.youtube.com/embed/KlShHE98AKw',                                        type: 'movie' },
  'resident-movie':{ slug: 'resident-movie',  title: 'Resident Evil',              url: 'https://www.youtube.com/embed/KU-IPeBF8UE',                                        type: 'movie' },
  jogador:         { slug: 'jogador',         title: 'Jogador nº 1',              url: 'https://www.youtube.com/embed/JBThcJ2P3zY',                                        type: 'movie' },
  spider:          { slug: 'spider',          title: 'Homem Aranha: Lótus',       url: 'https://www.youtube.com/embed/mBrUx6M6R7U',                                        type: 'movie' },
  sonic:           { slug: 'sonic',           title: 'Sonic 2: o Filme',           url: 'https://www.youtube.com/embed/A2SjVRziC7M',                                        type: 'movie' },
  mario:           { slug: 'mario',           title: 'Super Mario Bros',           url: 'https://www.youtube.com/embed/lv7FPDR66Lk',                                        type: 'movie' },
  'tekken-movie':  { slug: 'tekken-movie',    title: 'Tekken',                     url: 'https://www.youtube.com/embed/LMevAl7i994',                                        type: 'movie' },
};

export const embeds: Record<string, EmbedData> = Object.fromEntries(
  Object.entries(rawEmbeds)
    .map(([key, embed]) => {
      const safeUrl = sanitizeEmbedUrl(embed.url);
      if (!safeUrl) return null;
      return [key, { ...embed, url: safeUrl }] as const;
    })
    .filter((entry): entry is readonly [string, EmbedData] => entry !== null)
);
