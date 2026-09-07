import { Question } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    universe: 'Dark Souls III',
    numeral: 'I',
    marikaPrologue: 'Marika looks upon the ash of another era.',
    prompt: 'The sacred hub where the Fire Keeper channels souls to level the Ashen One is known as what?',
    options: [
      'Firelink Shrine',
      'Majula',
      'Roundtable Hold',
      'The Painted World of Ariandel',
    ],
    correctAnswer: 'Firelink Shrine',
    loreNote: 'Majula belongs to Drangleic; Roundtable Hold is Queen Marika’s own.',
  },
  {
    id: 2,
    universe: 'Dark Souls III',
    numeral: 'II',
    marikaPrologue: 'Before the fire fades, the amalgam of lords stands guard.',
    prompt: 'In the base game of Dark Souls III—discounting the painted and ringed fringes—who is the final boss at the Kiln?',
    options: [
      'Soul of Cinder',
      'Slave Knight Gael',
      'Gwyn, Lord of Cinder',
      'The Nameless King',
    ],
    correctAnswer: 'Soul of Cinder',
    loreNote: 'Gael roams the end of time in DLC; Gwyn fell in Lordran centuries prior.',
  },
  {
    id: 3,
    universe: 'Elden Ring',
    numeral: 'III',
    marikaPrologue: 'The undefeated prodigy beneath the rotting roots.',
    prompt: 'She who has never known defeat proclaims her station with her blade. Malenia’s sacred title is:',
    options: [
      'Blade of Miquella',
      'Consort of Mohg',
      'Goddess of Rot',
      'Blade of the Haligtree',
    ],
    correctAnswer: 'Blade of Miquella',
    loreNote: 'Her declared title is Blade of Miquella; "Goddess of Rot" is her afflicted ascension.',
  },
  {
    id: 4,
    universe: 'Elden Ring',
    numeral: 'IV',
    marikaPrologue: 'Carved upon the stone of Leyndell: a truth hidden in plain sight.',
    prompt: 'When the golden needle and regression dispel the sculptor’s secret, what are Queen Marika and Radagon to one another?',
    options: [
      'The same being (one person, two aspects)',
      'Twin prodigies separated at birth',
      'Mere royal spouses united in marriage',
      'Rivals bound by the Greater Will to share a calendar',
    ],
    correctAnswer: 'The same being (one person, two aspects)',
    loreNote: 'Radagon is Marika. One vessel, divine schism.',
  },
  {
    id: 5,
    universe: 'The Witcher 3',
    numeral: 'V',
    marikaPrologue: 'A foreign legend, where sorcery cleanses grotesque flesh.',
    prompt: 'After Yennefer’s grueling Trial of the Grasses ritual in Kaer Morhen, the misshapen creature "Uma" is revealed to be:',
    options: [
      "Avallac'h",
      'Emiel Regis',
      'Gaunter O’Dimm',
      'Vesemir in disguise',
    ],
    correctAnswer: "Avallac'h",
    loreNote: 'The Aen Elle sage Crevan Espane aep Caer Morhen, known to mortals as Avallac\'h.',
  },
  {
    id: 6,
    universe: 'The Witcher 3',
    numeral: 'VI',
    marikaPrologue: 'The Elder Blood flows from a crown of the White Flame.',
    prompt: 'Cirilla Fiona Elen Riannon was raised by witchers, yet her biological father by blood is:',
    options: [
      'Emhyr var Emreis (Emperor of Nilfgaard)',
      'Geralt of Rivia',
      'Foltest of Temeria',
      'Eredin Bréacc Glas',
    ],
    correctAnswer: 'Emhyr var Emreis (Emperor of Nilfgaard)',
    loreNote: 'Duny, the Urcheon of Erlenwald, who crowned himself the White Flame.',
  },
  {
    id: 7,
    universe: 'Formula 1',
    numeral: 'VII',
    marikaPrologue: 'The final trial. A world of asphalt, Dutch rain, and mechanical precision.',
    prompt: 'In his historically dominant 2023 season, precisely how many Grands Prix did Max Verstappen win out of 22 races?',
    options: [
      '19',
      '15',
      '10',
      '22',
    ],
    correctAnswer: '19',
    loreNote: '19 victories out of 22 starts. 86.4% win rate, the highest in Formula 1 history.',
  },
];

/**
 * Fisher-Yates array shuffle for non-deterministic option layout
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
