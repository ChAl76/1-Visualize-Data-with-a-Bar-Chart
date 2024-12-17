const url =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
const margin = { top: 60, right: 0, bottom: -50, left: 60 };
const width = 850 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;
const padding = 40;

// SVG
const svg = d3
  .select('body')
  .append('svg')
  .attr('id', 'svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .attr('class', 'chart')
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Tooltip
const tooltip = d3
  .select('body')
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0);

// Data
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const dataset = data.data;
    const barWidth = (width - padding) / dataset.length;

    // Scales
    const xScale = d3
      .scaleTime()
      .domain([
        new Date(d3.min(dataset, (d) => d[0])),
        new Date(d3.max(dataset, (d) => d[0])),
      ])
      .range([0, width - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[1])])
      .range([height - padding, 0]);

    // Axis
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0, ${height - padding})`)
      .call(xAxis);

    svg.append('g').attr('id', 'y-axis').call(yAxis);

    // Title
    svg
      .append('text')
      .attr('id', 'title')
      .attr('x', width / 2)
      .attr('y', -margin.top / 1.7)
      .attr('text-anchor', 'middle')
      .style('font-size', '30px')
      .text('GDP Bar Chart');

    // Y-Axis Label
    svg
      .append('text')
      .attr('x', -height / 2)
      .attr('y', -45)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('fill', 'grey')
      .text('GDP (in Billions)');

    // X-Axis Label
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height - padding + 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('fill', 'grey')
      .text('Year');

    svg
      .selectAll('.bar')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('data-date', (d) => d[0])
      .attr('data-gdp', (d) => d[1])
      .attr('x', (d) => xScale(new Date(d[0])))
      .attr('y', (d) => yScale(d[1]))
      .attr('width', barWidth)
      .attr('height', (d) => height - padding - yScale(d[1]))
      .attr('fill', '#00ff3c');

    svg
      .selectAll('.bar')
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(100).style('opacity', 0.9);
        tooltip
          .html(`${d[0]}<br>$${d3.format(',.1f')(d[1])} Billion`)
          .attr('data-date', d[0])
          .style('left', `${event.pageX - 30}px`)
          .style('top', `${event.pageY - 70}px`);
      })
      .on('mouseout', function () {
        tooltip.transition().duration(100).style('opacity', 0);
      });
  });
