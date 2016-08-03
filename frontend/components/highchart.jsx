const React = require('react');
const Highcharts = require('highcharts');

const Highchart = React.createClass({
  // When the DOM is ready, create the chart.

  componentDidMount() {
  },

  componentWillUpdate() {
    this.chart = new Highcharts[this.props.type || "Chart"](
      this.props.container,
      this.props.options
    );
  },
  //Destroy chart before unmount.
  // componentWillUnmount: function () {
  //   this.chart.destroy();
  // },
  //Create the div which the chart will be rendered to.
  render() {
    return(
      <div id={this.props.container}></div>
    );
  }
});

module.exports = Highchart;
