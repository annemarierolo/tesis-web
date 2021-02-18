
import React, { Component } from 'react'
import Chart from "chart.js";
import styles from './graph.module.css'

export default class LineGraph extends Component {
    chartRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: props.labels,
                datasets: [
                    {
                        label: props.label,
                        data: props.data,
                        fill: false,
                        borderColor: "#3a45a9"
                    }
                ]
            }
        }
    }

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: this.state.data
        });
    }
    
    render() {
        return (
            <div>
                <canvas
                    className={styles.linegraph}
                    ref={this.chartRef}
                />
            </div>
        )
    }
}