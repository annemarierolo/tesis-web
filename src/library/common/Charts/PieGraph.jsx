import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import styles from './graph.module.css'

export default class PieGraph extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            data: props.data,
            keyCenter: props.keyCenter,
            keyLegend: props.keyLegend,
            label: props.label,
            color: props.color
        }
    }

    renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const value = this.state.keyLegend;
        const label = this.state.keyCenter;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';
    
        return (
            <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {`${(percent * 100).toFixed(2)}%`}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload[label]}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Ganancias de ${payload[value]} $)`}
            </text>
            </g>
        );
    };

    onPieEnter = (_, index) => {
        this.setState({ activeIndex: index });
    };

    render() {
        return (
            <div className={styles.page_pie}>
                <h2 className={styles.title}>{this.state.label}</h2>
                <ResponsiveContainer width="99%" height="99%">
                    <PieChart width={400} height={400}>
                    <Pie
                        activeIndex={this.state.activeIndex}
                        activeShape={this.renderActiveShape}
                        data={this.state.data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill={this.state.color}
                        dataKey={this.state.keyLegend}
                        onMouseEnter={this.onPieEnter}
                    />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
  }
}