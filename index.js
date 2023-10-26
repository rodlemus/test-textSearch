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
  const query = "hamburger soda pie pizza";
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
    results.push(matches);
  }
  //se obtiene en que frases se encuentran cada palabra
  const data = results
    .reduce((prev, curr) => prev.concat(curr.dictionarysExistIn), [])
    .map((item) => item.id);

  //array plano con la metadata de cada palabra
  const ocurrencysWeigth = results.map((wordIndex) => {
    return wordIndex.dictionarysExistIn.map((phrasseIndex) => ({
      phrasseId: phrasseIndex.id,
      wordWeigth: wordIndex.weigth,
      wordIndexId: wordIndex.id,
    }));
  });

  //
  const plainOcurrencysWeigth = ocurrencysWeigth.reduce(
    (prev, curr) => prev.concat(curr),
    []
  );

  const auxSet = new Set(data);
  const uniqueData = Array.from(auxSet);
  delete auxSet;

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

  const response = phrassesTotalWeigth.map((metadataPhrase) => {
    const phrasse = dictionarys.find(
      (dictionaryItem) => dictionaryItem.id === metadataPhrase.phrasseId
    );

    return {
      ...metadataPhrase,
      word: phrasse.words,
    };
  });

  console.log(response);
};
result();
