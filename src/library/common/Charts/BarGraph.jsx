import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './graph.module.css'

export default class BarGraph extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            label: props.label,
            keyLegend: props.keyLegend,
            keyX: props.keyX,
            data: props.data,
            color: props.color
        }
    }

    render() {
        return (
            <div className={styles.page}>
                <h2 className={styles.title}>{this.state.label}</h2>
                <ResponsiveContainer width="99%" height="99%" >
                    <BarChart
                    width={500}
                    height={300}
                    data={this.state.data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={this.state.keyX} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={this.state.keyLegend} fill={this.state.color} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
  }
}
