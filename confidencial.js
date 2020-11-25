
let parser = d3.timeParse("%d-%b-%y")

function main() {
    createSVG()
    d3.csv('./datos/evolution.csv').then(function(data){
        let filtered = []
        for(let item of data) {
            filtered.push({
                close: parseFloat(item.close),
                date: parser(item.date)
            })
        }

        build(filtered)
    })
}


let margin = {bottom: 20, left: 70}
let screenWidth = 800
let screenHeight = 400


function createSVG() {
    let container = d3.select('#container')
    svg = container.append('svg')
      .attr('id', 'canvas')
      .attr('width', screenWidth + margin.left)
      .attr('height', screenHeight + margin.bottom + margin.top )
    
}

function build(data) {
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.close)])
      .range([screenHeight, margin.bottom])

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, screenWidth]) 

    const yAxis = d3.axisLeft(yScale)
      .ticks(5)

    const xAxis = d3.axisBottom(xScale)
      .ticks(10)

    svg.append("g")
      .attr('transform', 'translate(70,0)')
      .call(yAxis)

    svg.append("g")
      .attr('transform', 'translate(0,400)')
      .call(xAxis)

let rects = svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.date))
      .attr('y', d => yScale(d.close))
      .attr('heigth', d => yScale(d.close))
      .attr('width', screenWidth/26)
      .style('fill', 'blue')
}

main()

