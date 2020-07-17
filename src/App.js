import React from "react";
import { render } from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Chart from "./chart";
import {subscribeToRandomInt,getRecentData} from './api';

const styles = theme => ({
  "chart-container": {
    height: 400
  }
});

class App extends React.Component {
  state = {
    lineChartData: {
      labels: [],
      datasets: [
        {
          type: "line",
          label: "Trump",
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderColor: "#EB144C",
          //pointBackgroundColor: this.props.theme.palette.secondary.main,
          //pointBorderColor: this.props.theme.palette.secondary.main,
	  pointRadius: 0,
          borderWidth: "2",
          lineTension: 0.45,
          data: []
        },
	{
          type: "line",
          label: "Biden",
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderColor: "#4052BF",
          //pointBackgroundColor: this.props.theme.palette.secondary.main,
          //pointBorderColor: this.props.theme.palette.secondary.main,
          pointRadius: 0,
          borderWidth: "2",
          lineTension: 0.45,
          data: []
        }

      ]
    },
    lineChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true
      },
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10
            }
          }
        ]
      }
    }
  };

  componentDidMount() {
    const subscribe = {
      type: "subscribe",
      channels: [
        {
          name: "ticker",
          product_ids: ["BTC-USD"]
        }
      ]
    };

   /* this.ws = new WebSocket("ws://127.0.0.1:5000/test");

    this.ws.onopen = () => {
      this.ws.send(JSON.stringify(subscribe));
    };

    this.ws.onmessage = e => {
      const value = JSON.parse(e.data);
      console.log(e);
      if (value.type !== "ticker") {
        return;
      }


      const oldBtcDataSet = this.state.lineChartData.datasets[0];
      const newBtcDataSet = { ...oldBtcDataSet };
      newBtcDataSet.data.push(value.price);

      const newChartData = {
        ...this.state.lineChartData,
        datasets: [newBtcDataSet],
        labels: this.state.lineChartData.labels.concat(
          new Date().toLocaleTimeString()
        )
      };
      this.setState({ lineChartData: newChartData });
    };*/
     setInterval(getRecentData,1000 * 1);
     subscribeToRandomInt(msg => {
      console.log(msg)
      const oldTrumpValue = this.state.lineChartData.datasets[0];
      const newTrumpValue = { ...oldTrumpValue };
      newTrumpValue.data.push(msg.trump.positive_sentiment + msg.trump.negative_sentiment);
     
      const oldBidenValue = this.state.lineChartData.datasets[1];
      const newBidenValue = { ...oldBidenValue };
      newBidenValue.data.push(msg.biden.positive_sentiment + msg.biden.negative_sentiment);


      const newChartData = {
        ...this.state.lineChartData,
        datasets: [newTrumpValue,newBidenValue],
        labels: this.state.lineChartData.labels.concat(
          new Date().toLocaleTimeString()
        )
      };
      this.setState({ lineChartData: newChartData });
	});
  }

  componentWillUnmount() {
    //this.ws.close();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes["chart-container"]}>
        <Chart
          data={this.state.lineChartData}
          options={this.state.lineChartOptions}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
