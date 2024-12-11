const url =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const dataset = data.data;
    const width = 850,
      height = 450,
      barWidth = width / dataset.length,
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

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0, ${height - padding})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('id', 'y-axis')
      .attr('transform', `translate(${padding}, 0)`)
      .call(yAxis);

    svg
      .selectAll('.bar')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(new Date(d[0])))
      .attr('y', (d) => yScale(d[1]))
      .attr('width', barWidth)
      .attr('height', (d) => height - padding - yScale(d[1]))
      .attr('fill', '#00ff3c');

    const tooltip = d3.select('#tooltip').style('opacity', 0);

    svg
      .selectAll('.bar')
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(100).style('opacity', 0.9);
        tooltip
          .html(
            `${d[0]}<br>$${d3
              .format('.1f')(d[1])
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Billion`
          )
          .attr('data-date', d[0])
          .style('left', event.barWidth + 'px')
          .style('top', height - 150 + 'px')
          .style('transform', 'translateX(250px)');
      })
      .on('mouseout', function () {
        tooltip.transition().duration(100).style('opacity', 0);
      });
  });
