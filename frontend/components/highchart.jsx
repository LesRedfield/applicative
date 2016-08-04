const React = require('react');
const Highcharts = require('highcharts');
const OptionsActions = require('../actions/options_actions');

const Highchart = React.createClass({

  componentDidMount() {
    OptionsActions.fetchOptions();
  },

  componentWillUpdate() {
    this.chart = new Highcharts[this.props.type || "Chart"](
      this.props.container,
      this.props.options
    );
  },

  componentWillUnmount() {
    this.chart.destroy();
  },

  //Create the div which the chart will be rendered to.
  render() {
    return(
      <div id={this.props.container} className='dash-chart'></div>
    );
  }
});

module.exports = Highchart;
