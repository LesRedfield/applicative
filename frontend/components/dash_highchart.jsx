const React = require('react');
const Highcharts = require('highcharts');
const OptionsActions = require('../actions/options_actions');
const OptionsStore = require('../stores/options_store');
const QueriesStore = require('../stores/queries_store');

const DashHighchart = React.createClass({

  componentWillMount() {
    // OptionsActions.fetchOptions();
  },

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

    // this.chart = new Highcharts[this.props.type || "Chart"](
    //   this.props.container,
    //   OptionsStore.all().dashboard[this.props.dashNum]
    // );
    let title = this.props.dashNum;

    // if (title === "one" || title === "two" || title === "three" || title === "four") {
      this.chart = new Highcharts[this.props.type || "Chart"](
        this.props.container,
        OptionsStore.all().dashboard[this.props.dashNum]
      );
    // } else {
    //   this.chart = new Highcharts[this.props.type || "Chart"](
    //     this.props.container,
    //     QueriesStore.allDashOptions()[this.props.dashNum]
    //   );
    // }
  },

  componentWillUpdate() {
    // this.chart = new Highcharts[this.props.type || "Chart"](
    //   this.props.container,
    //   this.props.options
    // );
    // let title = this.props.dashNum;
    //
    // if (title === "one" || title === "two" || title === "three" || title === "four") {
    //   this.chart = new Highcharts[this.props.type || "Chart"](
    //     this.props.container,
    //     OptionsStore.all().dashboard[this.props.dashNum]
    //   );
    // } else {
    //   this.chart = new Highcharts[this.props.type || "Chart"](
    //     this.props.container,
    //     QueriesStore.allDashOptions()[this.props.dashNum]
    //   );
    // }

  },

  // componentWillUnmount() {
  //   this.chart.destroy();
  // },

  //Create the div which the chart will be rendered to.
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
