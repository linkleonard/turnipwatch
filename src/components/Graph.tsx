import moment from 'moment'
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
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: this.props.dataset.map(d => d.x).map(this.props.convertLabel),
          datasets: [{
            label: this.props.label,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: this.props.dataset,
            spanGaps: true,
            showLine: true,
          }]
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            type: "linear",
            ticks: {
              min: this.props.domain.min,
              max: this.props.domain.max,
              callback: this.props.convertLabel,
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }]
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
