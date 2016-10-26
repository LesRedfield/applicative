const React = require('react');
const Highcharts = require('highcharts');
const OptionsActions = require('../actions/options_actions');

const Highchart = React.createClass({

  componentDidMount() {

  },

  componentWillUpdate() {
    this.chart = new Highcharts[this.props.type || "Chart"](
      this.props.container,
      this.props.options
    );
  },

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
