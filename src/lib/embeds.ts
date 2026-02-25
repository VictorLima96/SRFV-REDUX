export interface EmbedData {
  slug: string;
  title: string;
  url: string;
  type: 'game' | 'movie';
  width: number;
  height: number;
}

export const embeds: Record<string, EmbedData> = {
  tekken:          { slug: 'tekken',          title: 'Tekken 3',                  url: 'https://www.retrogames.cc/embed/40238-tekken-3.html',                              type: 'game',  width: 600, height: 450 },
  crash:           { slug: 'crash',           title: 'Crash Team Racing',          url: 'https://www.retrogames.cc/embed/41687-crash-team-racing.html',                      type: 'game',  width: 600, height: 450 },
  metal:           { slug: 'metal',           title: 'Metal Slug',                 url: 'https://www.retrogames.cc/embed/9157-metal-slug-super-vehicle-001.html',            type: 'game',  width: 600, height: 450 },
  resident:        { slug: 'resident',        title: 'Resident Evil 3 - Nemesis',  url: 'https://www.retrogames.cc/embed/42155-resident-evil-3-nemesis-u.html',              type: 'game',  width: 600, height: 450 },
  bubsy:           { slug: 'bubsy',           title: 'Bubsy 3D',                   url: 'https://www.retrogames.cc/embed/42362-bubsy-3d-furbitten-planet.html',              type: 'game',  width: 600, height: 450 },
  fifa:            { slug: 'fifa',            title: 'FIFA 2000',                  url: 'https://www.retrogames.cc/embed/17484-fifa-2000-usa.html',                          type: 'game',  width: 600, height: 450 },
  tomb:            { slug: 'tomb',            title: 'Tomb Raider II',             url: 'https://www.retrogames.cc/embed/42724-tomb-raider-2.html',                          type: 'game',  width: 600, height: 450 },
  street:          { slug: 'street',          title: 'Street Fighter Alpha 2',     url: 'https://www.retrogames.cc/embed/9966-street-fighter-alpha-2-960306-usa.html',       type: 'game',  width: 600, height: 450 },
  cb3:             { slug: 'cb3',             title: 'Crash Bandicoot: Warped',    url: 'https://www.retrogames.cc/embed/40136-crash-bandicoot-warped.html',                 type: 'game',  width: 600, height: 450 },
  tn2:             { slug: 'tn2',             title: "Tony Hawk's Pro Skater 2",   url: 'https://www.retrogames.cc/embed/42153-tony-hawks-pro-skater-2.html',               type: 'game',  width: 600, height: 450 },
  gt:              { slug: 'gt',              title: 'Gran Turismo',               url: 'https://www.retrogames.cc/embed/41826-gran-turismo.html',                           type: 'game',  width: 600, height: 450 },
  ff7:             { slug: 'ff7',             title: 'Final Fantasy VII',           url: 'https://www.retrogames.cc/embed/43658-final-fantasy-vii-usa-disc-1.html',           type: 'game',  width: 600, height: 450 },
  donnie:          { slug: 'donnie',          title: 'Donnie Darko',               url: 'https://www.youtube.com/embed/RPZTgNgsdIw',                                        type: 'movie', width: 875, height: 490 },
  'crash-movie':   { slug: 'crash-movie',     title: 'Crash: o Filme',             url: 'https://www.youtube.com/embed/KlShHE98AKw',                                        type: 'movie', width: 875, height: 490 },
  'resident-movie':{ slug: 'resident-movie',  title: 'Resident Evil',              url: 'https://www.youtube.com/embed/KU-IPeBF8UE',                                        type: 'movie', width: 875, height: 490 },
  jogador:         { slug: 'jogador',         title: 'Jogador nº 1',              url: 'https://www.youtube.com/embed/JBThcJ2P3zY',                                        type: 'movie', width: 875, height: 490 },
  spider:          { slug: 'spider',          title: 'Homem Aranha: Lótus',       url: 'https://www.youtube.com/embed/mBrUx6M6R7U',                                        type: 'movie', width: 875, height: 490 },
  sonic:           { slug: 'sonic',           title: 'Sonic 2: o Filme',           url: 'https://www.youtube.com/embed/A2SjVRziC7M',                                        type: 'movie', width: 875, height: 490 },
  mario:           { slug: 'mario',           title: 'Super Mario Bros',           url: 'https://www.youtube.com/embed/lv7FPDR66Lk',                                        type: 'movie', width: 875, height: 490 },
  'tekken-movie':  { slug: 'tekken-movie',    title: 'Tekken',                     url: 'https://www.youtube.com/embed/LMevAl7i994',                                        type: 'movie', width: 875, height: 490 },
};
