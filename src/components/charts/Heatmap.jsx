import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Heatmap = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 30, right: 30, bottom: 30, left: 30 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .domain(data[0].map((_, i) => i))
      .padding(0.01);

    const y = d3.scaleBand()
      .range([height, 0])
      .domain(data.map((_, i) => i))
      .padding(0.01);

    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateInferno)
      .domain([0, d3.max(data, row => d3.max(row))]);

    svg.selectAll()
      .data(data)
      .enter()
      .append('g')
      .selectAll()
      .data(d => d)
      .enter()
      .append('rect')
      .attr('x', (_, i) => x(i))
      .attr('y', (_, i, j) => y(j))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => colorScale(d));

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 0 - (margin.top / 2))
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .text('Real-time Heatmap');

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default Heatmap;