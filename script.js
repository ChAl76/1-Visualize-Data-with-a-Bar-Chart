const url =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const dataset = data.data;
  });
