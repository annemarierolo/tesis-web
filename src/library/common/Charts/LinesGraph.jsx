import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './graph.module.css'

export default class LinesGraph extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            data: props.data,
            label: props.label,
        }
    }
    
    render() {
        return (
            <div className={styles.page}>
                <h1 className={styles.title}>{this.state.label}</h1>
                <ResponsiveContainer width="99%" height="99%">
                    <LineChart
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
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                    <Line type="monotone" dataKey="ventas" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
  }
}
