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
  const query = "hambur";
  const testData = query.length > 0 ? query.split(" ") : [];
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
    console.log("WORD =>", word, "-", matches);
    results.push(matches);
  }
  const data = results
    .reduce((prev, curr) => prev.concat(curr.dictionarysExistIn), [])
    .map((item) => item.id);

  const ocurrencysWeigth = results.map((wordIndex) => {
    return wordIndex.dictionarysExistIn.map((phrasseIndex) => ({
      phrasseId: phrasseIndex.id,
      wordWeigth: wordIndex.weigth,
      wordIndexId: wordIndex.id,
    }));
  });

  const plainOcurrencysWeigth = ocurrencysWeigth.reduce(
    (prev, curr) => prev.concat(curr),
    []
  );

  const auxSet = new Set(data);
  const uniqueData = Array.from(auxSet);

  const phrassesTotalWeigth = uniqueData
    .map((wordId) => {
      return plainOcurrencysWeigth
        .filter((ocurrency) => ocurrency.phrasseId === wordId)
        .reduce(
          (prev, curr) => ({
            phrasseId: curr.phrasseId,
            totalWeight: curr.wordWeigth + prev.totalWeight,
          }),
          { totalWeight: 0 }
        );
    })
    .sort((phrasseA, phrasseB) => phrasseB.totalWeight - phrasseA.totalWeight);

  console.log(phrassesTotalWeigth);
};
result();
