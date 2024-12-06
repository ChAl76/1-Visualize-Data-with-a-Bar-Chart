const url =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const dataset = data.data;
    const width = 850,
      height = 450,
      padding = 50;

    const svg = d3.select('#svg').attr('width', width).attr('height', height);
  });
