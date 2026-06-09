export const CATEGORIES = [
  { id: 'all', label: 'Todo' },
  { id: 'novel', label: 'Novelas' },
  { id: 'bachman', label: 'Bachman' },
  { id: 'dark-tower', label: 'La Torre Oscura' },
  { id: 'collections', label: 'Cuentos' },
  { id: 'nonfiction', label: 'No Ficción' },
  { id: 'bill-hodges', label: 'Trilogía Bill Hodges' },
  { id: 'gwendy', label: 'Trilogía Gwendy' },
  { id: 'talisman', label: 'El Talismán' },
]

export const BOOKS = [
  // Novelas
  { id: 'carrie', title: 'Carrie', year: 1974, category: 'novel' },
  { id: 'salems-lot', title: "'Salem's Lot", year: 1975, category: 'novel' },
  { id: 'the-shining', title: 'The Shining', year: 1977, category: 'novel' },
  { id: 'the-stand', title: 'The Stand', year: 1978, category: 'novel' },
  { id: 'the-dead-zone', title: 'The Dead Zone', year: 1979, category: 'novel' },
  { id: 'firestarter', title: 'Firestarter', year: 1980, category: 'novel' },
  { id: 'cujo', title: 'Cujo', year: 1981, category: 'novel' },
  { id: 'the-eyes-of-the-dragon', title: 'The Eyes of the Dragon', year: 1984, category: 'novel' },
  { id: 'it', title: 'It', year: 1986, category: 'novel' },
  { id: 'misery', title: 'Misery', year: 1987, category: 'novel' },
  { id: 'the-tommyknockers', title: 'The Tommyknockers', year: 1987, category: 'novel' },
  { id: 'the-dark-half', title: 'The Dark Half', year: 1989, category: 'novel' },
  { id: 'needful-things', title: 'Needful Things', year: 1991, category: 'novel' },
  { id: 'geralds-game', title: "Gerald's Game", year: 1992, category: 'novel' },
  { id: 'dolores-claiborne', title: 'Dolores Claiborne', year: 1992, category: 'novel' },
  { id: 'insomnia', title: 'Insomnia', year: 1994, category: 'novel' },
  { id: 'rose-madder', title: 'Rose Madder', year: 1995, category: 'novel' },
  { id: 'the-green-mile', title: 'The Green Mile', year: 1996, category: 'novel' },
  { id: 'desperation', title: 'Desperation', year: 1996, category: 'novel' },
  { id: 'bag-of-bones', title: 'Bag of Bones', year: 1998, category: 'novel' },
  { id: 'the-girl-who-loved-tom-gordon', title: 'The Girl Who Loved Tom Gordon', year: 1999, category: 'novel' },
  { id: 'hearts-in-atlantis', title: 'Hearts in Atlantis', year: 1999, category: 'novel' },
  { id: 'dreamcatcher', title: 'Dreamcatcher', year: 2001, category: 'novel' },
  { id: 'from-a-buick-8', title: 'From a Buick 8', year: 2002, category: 'novel' },
  { id: 'cell', title: 'Cell', year: 2006, category: 'novel' },
  { id: 'liseys-story', title: "Lisey's Story", year: 2006, category: 'novel' },
  { id: 'duma-key', title: 'Duma Key', year: 2008, category: 'novel' },
  { id: 'under-the-dome', title: 'Under the Dome', year: 2009, category: 'novel' },
  { id: '11-22-63', title: '11/22/63', year: 2011, category: 'novel' },
  { id: 'doctor-sleep', title: 'Doctor Sleep', year: 2013, category: 'novel' },
  { id: 'joyland', title: 'Joyland', year: 2013, category: 'novel' },
  { id: 'revival', title: 'Revival', year: 2014, category: 'novel' },
  { id: 'sleeping-beauties', title: 'Sleeping Beauties (con Owen King)', year: 2017, category: 'novel' },
  { id: 'the-outsider', title: 'The Outsider', year: 2018, category: 'novel' },
  { id: 'elevation', title: 'Elevation', year: 2018, category: 'novel' },
  { id: 'the-institute', title: 'The Institute', year: 2019, category: 'novel' },
  { id: 'later', title: 'Later', year: 2021, category: 'novel' },
  { id: 'billy-summers', title: 'Billy Summers', year: 2021, category: 'novel' },
  { id: 'fairy-tale', title: 'Fairy Tale', year: 2022, category: 'novel' },
  { id: 'holly', title: 'Holly', year: 2023, category: 'novel' },
  { id: 'never-flinch', title: 'Never Flinch', year: 2025, category: 'novel' },

  // Christine y Cycle of the Werewolf
  { id: 'christine', title: 'Christine', year: 1983, category: 'novel' },
  { id: 'pet-sematary', title: 'Pet Sematary', year: 1983, category: 'novel' },
  { id: 'cycle-of-the-werewolf', title: 'Cycle of the Werewolf', year: 1983, category: 'novel' },

  // Richard Bachman
  { id: 'rage', title: 'Rage', year: 1977, category: 'bachman', note: 'como Richard Bachman' },
  { id: 'the-long-walk', title: 'The Long Walk', year: 1979, category: 'bachman', note: 'como Richard Bachman' },
  { id: 'roadwork', title: 'Roadwork', year: 1981, category: 'bachman', note: 'como Richard Bachman' },
  { id: 'the-running-man', title: 'The Running Man', year: 1982, category: 'bachman', note: 'como Richard Bachman' },
  { id: 'thinner', title: 'Thinner', year: 1984, category: 'bachman', note: 'como Richard Bachman' },
  { id: 'the-regulators', title: 'The Regulators', year: 1996, category: 'bachman', note: 'como Richard Bachman' },
  { id: 'blaze', title: 'Blaze', year: 2007, category: 'bachman', note: 'como Richard Bachman' },

  // La Torre Oscura
  { id: 'dt-1-gunslinger', title: 'I. The Gunslinger', year: 1982, category: 'dark-tower' },
  { id: 'dt-2-drawing', title: 'II. The Drawing of the Three', year: 1987, category: 'dark-tower' },
  { id: 'dt-3-waste-lands', title: 'III. The Waste Lands', year: 1991, category: 'dark-tower' },
  { id: 'dt-4-wizard-and-glass', title: 'IV. Wizard and Glass', year: 1997, category: 'dark-tower' },
  { id: 'dt-5-wolves', title: 'V. Wolves of the Calla', year: 2003, category: 'dark-tower' },
  { id: 'dt-6-song', title: 'VI. Song of Susannah', year: 2004, category: 'dark-tower' },
  { id: 'dt-7-dark-tower', title: 'VII. The Dark Tower', year: 2004, category: 'dark-tower' },
  { id: 'dt-45-wind', title: 'IV.5 The Wind Through the Keyhole', year: 2012, category: 'dark-tower' },

  // Colecciones de cuentos
  { id: 'night-shift', title: 'Night Shift', year: 1978, category: 'collections' },
  { id: 'skeleton-crew', title: 'Skeleton Crew', year: 1985, category: 'collections' },
  { id: 'nightmares-dreamscapes', title: 'Nightmares & Dreamscapes', year: 1993, category: 'collections' },
  { id: 'everythings-eventual', title: "Everything's Eventual", year: 2002, category: 'collections' },
  { id: 'just-after-sunset', title: 'Just After Sunset', year: 2008, category: 'collections' },
  { id: 'full-dark-no-stars', title: 'Full Dark, No Stars', year: 2010, category: 'collections' },
  { id: 'bazaar-of-bad-dreams', title: 'The Bazaar of Bad Dreams', year: 2015, category: 'collections' },
  { id: 'if-it-bleeds', title: 'If It Bleeds', year: 2020, category: 'collections' },
  { id: 'you-like-it-darker', title: 'You Like It Darker', year: 2024, category: 'collections' },

  // No Ficción
  { id: 'danse-macabre', title: 'Danse Macabre', year: 1981, category: 'nonfiction' },
  { id: 'on-writing', title: 'On Writing', year: 2000, category: 'nonfiction' },

  // Trilogía Bill Hodges
  { id: 'mr-mercedes', title: 'Mr. Mercedes', year: 2014, category: 'bill-hodges' },
  { id: 'finders-keepers', title: 'Finders Keepers', year: 2015, category: 'bill-hodges' },
  { id: 'end-of-watch', title: 'End of Watch', year: 2016, category: 'bill-hodges' },

  // Trilogía Gwendy (con Richard Chizmar)
  { id: 'gwendy-button-box', title: "Gwendy's Button Box", year: 2017, category: 'gwendy', note: 'con Richard Chizmar' },
  { id: 'gwendy-magic-feather', title: "Gwendy's Magic Feather", year: 2019, category: 'gwendy', note: 'con Richard Chizmar' },
  { id: 'gwendy-final-task', title: "Gwendy's Final Task", year: 2022, category: 'gwendy', note: 'con Richard Chizmar' },

  // El Talismán
  { id: 'the-talisman', title: 'The Talisman (con Peter Straub)', year: 1984, category: 'talisman' },
  { id: 'black-house', title: 'Black House (con Peter Straub)', year: 2001, category: 'talisman' },
].sort((a, b) => a.year - b.year || a.title.localeCompare(b.title))
