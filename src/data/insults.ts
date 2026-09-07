import { DeathFeedback } from '../types';

interface InsultEntry {
  category?: 'Dark Souls III' | 'Elden Ring' | 'The Witcher 3' | 'Formula 1' | 'general';
  text: string;
}

const INSULT_POOL: InsultEntry[] = [
  // Technical & Vim / Architect jabs
  {
    category: 'general',
    text: 'Typing `:q!` will not exit this humiliation. Software architect in title, lore intern in execution.',
  },
  {
    category: 'general',
    text: 'Pressing `hjkl` across your custom mechanical switches will not dodge this catastrophic blunder.',
  },
  {
    category: 'general',
    text: 'You designed distributed systems with nine nines of uptime, yet collapsed on a single byte of common knowledge.',
  },
  // Architectural & System cuts
  {
    category: 'general',
    text: 'A catastrophic architectural failure in production. Panic-rolling will not recover this lost reputation.',
  },
  {
    category: 'general',
    text: 'Not even a 1,000-line custom Lua configuration in Neovim could buffer you from this utter collapse of reasoning.',
  },
  // Souls / Wiki jabs
  {
    category: 'Dark Souls III',
    text: 'You consulted Fextralife in a frantic tab switch and still clicked like an unhollowed novice.',
  },
  {
    category: 'Dark Souls III',
    text: 'Gael did not crawl through the ash at the end of the world for you to display this level of ignorance.',
  },
  {
    category: 'Elden Ring',
    text: 'The sculptor wept in Leyndell. Gideon Ofnir would not even bother writing a footnote about your attempt.',
  },
  {
    category: 'Elden Ring',
    text: 'Malenia has never known defeat. You, conversely, appear intimately acquainted with it.',
  },
  // Witcher jabs
  {
    category: 'The Witcher 3',
    text: 'Roach is stuck on a tavern roof and she still has a firmer grasp of Continent genealogy than you.',
  },
  {
    category: 'The Witcher 3',
    text: 'Geralt would have taken Swallow, meditated until dawn, and still answered better half-drunk in an Oxenfurt ditch.',
  },
  // Formula 1 jabs
  {
    category: 'Formula 1',
    text: 'You sat through 22 race weekends, analyzed telemetries, and still managed to bin it into the wall on the final sector.',
  },
  {
    category: 'Formula 1',
    text: 'Box, box, box. 10-second penalty for erratic reasoning in the pitlane. Christian Horner is shaking his head.',
  },
  // General cold FromSoft jabs
  {
    category: 'general',
    text: 'Queen Marika expected a warrior forged in sovereign fire. Instead, she received this.',
  },
  {
    category: 'general',
    text: 'The Erdtree itself shuddered at the audacity of that incorrect selection.',
  },
];

const BIRTHDAY_PARDONS: string[] = [
  'Because it is your birthday, Marika grants a reluctant dispensation. You may retry from this exact spot. Do not test her twice.',
  'It is your birthday. Even hollows receive a coupon once a year. Stand and face this same question again.',
  'Grace is on clearance today. The calendar spared you from starting at step one. Rise, birthday boy.',
  'A year older, yet visibly no wiser. By royal birthday exception, your progress is kept. Try again.',
  'Marika is weary, but not entirely cruel on your natal day. You remain here. Do not make her repeat herself.',
  'Birthday dispensation in effect: you do not reset to zero. Answer this very question again and salvage what little honor remains.',
];

/**
 * Returns a randomized insult and birthday pardon, favoring category relevance if available.
 */
export function getRandomFeedback(category?: string): DeathFeedback {
  const matching = INSULT_POOL.filter(
    (item) => item.category === category || item.category === 'general'
  );
  const selectedPool = matching.length > 0 ? matching : INSULT_POOL;
  const insult = selectedPool[Math.floor(Math.random() * selectedPool.length)].text;
  const pardon = BIRTHDAY_PARDONS[Math.floor(Math.random() * BIRTHDAY_PARDONS.length)];

  return { insult, pardon };
}
