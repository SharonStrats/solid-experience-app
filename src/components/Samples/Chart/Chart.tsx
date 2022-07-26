import classes from './Chart.module.css'
import ChartBar from './ChartBar'


const Chart = props => {

    return <div className="chart">
        {props.dataPoints.map(dataPoint => (
            <ChartBar
                key={dataPoint.id}
                value={dataPoint.value}
                maxValue={null}
                label={dataPoint.label}/>
        )
        )}
    </div>
}

export default Chart;