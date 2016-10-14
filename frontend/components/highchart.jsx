const React = require('react');
const Highcharts = require('highcharts');
const OptionsActions = require('../actions/options_actions');

const Highchart = React.createClass({

  componentDidMount() {
    // if (this.props.container === "seg-chart") {
    //   return;
    // } else if (
    //   this.props.container === "dash-four" ||
    //   this.props.container === "dash-three"
    // ) {
    //   return;
    // } else {
    // OptionsActions.fetchOptions();
    // }
  },

  componentWillUpdate() {
    this.chart = new Highcharts[this.props.type || "Chart"](
      this.props.container,
      this.props.options
    );
  },

  // componentWillUnmount() {
  //   this.chart.destroy();
  // },

  //Create the div which the chart will be rendered to.
  render() {
    let klass = "chart"

    if (this.props.dashSeg) {
      klass += this.props.dashSeg
    }

    return(
      <div id={this.props.container} className={klass}></div>
    );
  }
});

module.exports = Highchart;
