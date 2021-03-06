import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Line} from 'react-chartjs-2';

const styles = {
  card: {
    width: '100%',
    height: '100%',
  }
}

class Plot extends React.Component {
  render() {
    const { classes } = this.props;
    let allPoints = this.props.plot.points.map((point) => {
      return {x: point.timestamp, y: point.value}
    })
    let data = {
      datasets: [
        {
          fill: false,
          data: allPoints,
          type: 'line',
          borderColor: '#EC932F',
          backgroundColor: '#EC932F',
          pointBorderColor: '#EC932F',
          pointBackgroundColor: '#EC932F',
          pointHoverBackgroundColor: '#EC932F',
          pointHoverBorderColor: '#EC932F',
        }
      ]
    }

    let options = {
      responsive: true,
			title: {
				display: false
			},
      legend: {
           display: false
      },
			scales: {
				xAxes: [{
					type: 'time',
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Timestamp'
					},
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'value'
					}
				}]
			}
    }

    return (
      <Card style={styles.card} className={classes}>
        <CardContent>
          <Typography variant="h5" component="h2">{this.props.plot.name}</Typography>
          <Line data={data} options={options}/>
        </CardContent>
      </Card>
    )
  }
}

class Plots extends React.Component {
  render() {
    const { classes } = this.props;
    let charts = []
    for (var i = 0; i < this.props.plots.length; i++) {
      charts.push((
        <Grid style={styles.card}  key={i} item>
          <Plot classes={classes} plot={this.props.plots[i]}/>
        </Grid>
      ))
    }
    return (
      <Grid container spacing={8}>
      {charts}
      </Grid>
    )
  }
}

export default withStyles(styles)(Plots);
