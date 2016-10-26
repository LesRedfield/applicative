const React = require('react');
const Highcharts = require('highcharts');
const OptionsActions = require('../actions/options_actions');
const OptionsStore = require('../stores/options_store');
const QueriesStore = require('../stores/queries_store');

const DashHighchart = React.createClass({

  componentDidMount() {
    let title = this.props.dashNum;

    this.chart = new Highcharts[this.props.type || "Chart"](
      this.props.container,
      OptionsStore.all().dashboard[this.props.dashNum]
    );
  },

  render() {
    let klass = ""
    let title = this.props.dashNum;

    if (title === "one" || title === "two" || title === "three" || title === "four") {
      klass = "chart";
    } else {
      klass = "chart dash-seg"
    }

    return(
      <div id={this.props.container} className={klass}></div>
    );

  }
});

module.exports = DashHighchart;
