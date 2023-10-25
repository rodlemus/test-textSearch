const dictionarys = [
  {
    id: 1,
    words: "pizza soda potatos",
  },

  {
    id: 2,
    words: "hamburger soda ketchup pie",
  },

  {
    id: 3,
    words: "sandwich juice soda pie",
  },
];

const indexFood = [
  {
    id: 1,
    word: "pizza",
    dictionarysExistIn: [
      {
        id: 1,
      },
    ],
  },
  {
    id: 2,
    word: "soda",
    dictionarysExistIn: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ],
  },
  {
    id: 3,
    word: "potatos",
    dictionarysExistIn: [
      {
        id: 1,
      },
    ],
  },
  {
    id: 4,
    word: "hamburger",
    dictionarysExistIn: [
      {
        id: 2,
      },
    ],
  },
  {
    id: 5,
    word: "ketchup",
    dictionarysExistIn: [
      {
        id: 2,
      },
    ],
  },
  {
    id: 6,
    word: "sandwich",
    dictionarysExistIn: [
      {
        id: 3,
      },
    ],
  },
  {
    id: 7,
    word: "juice",
    dictionarysExistIn: [
      {
        id: 3,
      },
    ],
  },
  {
    id: 8,
    word: "pie",
    dictionarysExistIn: [
      {
        id: 3,
      },
      {
        id: 2,
      },
    ],
  },
];

const result = () => {
  const testData = "hamburger soda pie".split(" ");
  let results = [];
  for (const word of testData) {
    const matches =
      indexFood
        .map((index) => {
          const weigth = 1 / index.dictionarysExistIn.length;
          return {
            ...index,
            weigth,
          };
        })
        .find((index) => index.word.includes(word)) || [];
    results.push(matches);
  }

  const data = results
    .reduce((prev, curr) => prev.concat(curr.dictionarysExistIn), [])
    .map((item) => item.id);

  const uniqueData = Array.from(new Set(data));
  console.log(data, uniqueData);
};
result();
