const defaultVolume = {
  author: "",
  categories: [],
  description: "",
  expanded: false,
  imageLinks: {},
  industryIdentifiers: [],
  language: "",
  maturityRating: "",
  pageCount: 0,
  previewLink: "",
  printType: "",
  publishedDate: "",
  publisher: "",
  title: "",
  currentPage: 0,
  startDate: null,
  goalDate: null,
  goalToday: {
    date: null,
    page: 0
  }
};

export {defaultVolume};

const stringFromArrayOfStrings = (array) => {
  let newString = '';
  let i;
  for (i = 0; i < array.length; i++) {
    if (!newString.length) {
      newString = array[i];
    }
    else {
      newString += `, ${array[i]}`;
    }
  }
  return newString;
}

export {stringFromArrayOfStrings};