import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './graph.module.css'

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export default class BubbleGraph extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            data: props.data,
            label: props.label,
        }
    }

    renderTooltip = (props) => {
        const { active, payload } = props;

        if (active && payload && payload.length) {
        const data = payload[0] && payload[0].payload;

        return (
            <div
                style={{
                    backgroundColor: '#fff',
                    border: '1px solid #999',
                    margin: 0,
                    padding: 10,
                }}
                >
                <p>
                    <span>Mes: </span>
                    {months[data.month - 1]}</p>
                <p>
                    <span>Ventas: </span>
                    {data.ventas}
                </p>
            </div>
        );
        }

        return null;
    };

    render() {
        const range = [16, 225];

        return (
            <div className={styles.page}>
                <h1 className={styles.title}>{this.state.label}</h1>
                { this.state.data.map((item, index) => (
                <ResponsiveContainer key={index} width="99%" height={99}>
                    <ScatterChart
                        width={800}
                        height={60}
                        margin={{
                        top: 10,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        }}
                    >
                        <XAxis
                        type="category"
                        dataKey="year"
                        interval={0}
                        tick={{ fontSize: 0 }}
                        tickLine={{ transform: 'translate(0, -6)' }}
                        />
                        <YAxis
                        type="number"
                        dataKey="month"
                        name="month"
                        height={10}
                        width={80}
                        tick={false}
                        tickLine={false}
                        axisLine={false}
                        label={{ value: item.year, position: 'insideRight' }}
                        />
                        <ZAxis type="number" dataKey="ventas" range={range} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={this.renderTooltip} />
                        <Scatter data={item.data} fill="#8884d8" />
                    </ScatterChart>
                </ResponsiveContainer> ))}
            </div>
        );
  }
}