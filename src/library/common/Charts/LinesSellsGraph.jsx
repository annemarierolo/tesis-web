import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './graph.module.css'

export default class LinesSellsGraph extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            data: props.data,
            label: props.label,
            color: props.color
        }
    }
    
    render() {
        return (
            <div className={styles.page_year}>
                <h2 className={styles.title}>{this.state.label}</h2>
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
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="product" />
                    <YAxis domain={[0, 'dataMax']}/>
                    <Tooltip />
                    <Legend />
                    {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                    <Line type="monotone" dataKey="Ventas" stroke={this.state.color} activeDot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
  }
}
