// src/api/libraryApis.js

const LIBRARY_KEYS = {
  libA: "apikey-for-libA",
  libB: "apikey-for-libB",
};

export const libraryApis = {
  libA: {
    key: LIBRARY_KEYS.libA,
    fetchBooks: async (query) => {
      const res = await fetch(`https://api.libA.com/search?q=${query}&key=${LIBRARY_KEYS.libA}`);
      return await res.json();
    },
  },
  libB: {
    key: LIBRARY_KEYS.libB,
    fetchBooks: async (query) => {
      const res = await fetch(`https://api.libB.com/search?keyword=${query}&apiKey=${LIBRARY_KEYS.libB}`);
      return await res.json();
    },
  },
};