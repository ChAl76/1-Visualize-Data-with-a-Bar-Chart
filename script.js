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

    const xScale = d3
      .scaleTime()
      .domain([
        new Date(d3.min(dataset, (d) => d[0])),
        new Date(d3.max(dataset, (d) => d[0])),
      ])
      .range([padding, width - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[1])])
      .range([height - padding, padding]);
  });
