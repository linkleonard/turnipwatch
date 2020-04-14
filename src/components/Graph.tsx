import Chart, { Point } from 'chart.js'
import React from 'react'

export interface Domain {
  min: number,
  max: number,
}

type Props = {
  label: string,
  dataset: Point[],
  domain: Domain,
  convertLabel: (n: number) => string,
}
type State = {}

const canvasProps = {
  width: 800,
  height: 200,
}

class Graph extends React.Component<Props, State> {
  canvas: React.RefObject<HTMLCanvasElement>
  chart?: Chart

  constructor(props: Props) {
    super(props)
    this.canvas = React.createRef()
    this.chart = undefined
  }
  componentDidMount() {
    this.renderChart()
  }

  componentDidUpdate() {
    this.renderChart()
  }

  renderChart() {
    var ctx = this.canvas.current?.getContext("2d") ?? null
    if (ctx === null) {
      return
    }
    const labels = this.props.dataset.map(d => d.x)
    const data = this.props.dataset
    this.chart = new Chart(ctx, {
      type: "bar",
      data: {
          labels,
          datasets: [
            {
              label: this.props.label,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data,
            },
          ]
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            ticks: {
              callback: (value: number) => this.props.convertLabel(value),
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }]
        },
        tooltips: {
          callbacks: {
            title: item => {
              const index = item[0]?.index
              if (index === undefined) {
                return ""
              }
              return this.props.convertLabel(index)
            },
          }
        }
      }
    })
  }

  render() {
    return (
      <div>
        <canvas ref={this.canvas} {...canvasProps} />
      </div>
    )
  }  
}

export default Graph
