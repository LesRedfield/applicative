const React = require('react');
const ReactRouter = require('react-router');
const Link = require('react-router').Link;
const Highchart = require('./highchart');
const DashHighchart = require('./dash_highchart');

const OptionsStore = require('../stores/options_store');
const SessionStore = require('../stores/session_store');
const QueriesStore = require('../stores/queries_store');

const OptionsActions = require('../actions/options_actions');
const QueriesActions = require('../actions/queries_actions');

const Dashboard = React.createClass({
  contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState(){
  //   return({ options: OptionsStore.all().dashboard, customOptions: QueriesStore.allDashOptions(SessionStore.currentUser().id) });

    return( { dashNums: [] } );
  },

  _optionsChanged() {
    // this.setState({ options: OptionsStore.all().dashboard });

    this.setState({ dashNums: Object.keys(OptionsStore.all().dashboard) });
  },

  _queriesChanged() {

  },

  componentWillMount() {
    QueriesActions.fetchQueries(SessionStore.currentUser().id);

    OptionsActions.fetchOptions(SessionStore.currentUser().id);

    this.optionsListener = OptionsStore.addListener(this._optionsChanged);
    // this.queriesListener = QueriesStore.addListener(this._queriesChanged);
  },

  componentDidMount() {
  },

  componentWillUnmount() {
    this.optionsListener.remove();
    // this.queriesListener.remove();


  },

  showInSeg(title) {
    // let params = JSON.parse(options.query.split('=>').join(': '));
    // params.title = options.title;

    // debugger
    OptionsActions.changeOptions(OptionsStore.all().dashboard[title].query);

    OptionsStore.enableImport();

    this.context.router.push("/segmentation");
  },

  render(){
    let dashNums = this.state.dashNums;
    let custOpts = [];
    // let dCharts = {};

    // let dashOptions = OptionsStore.all().dashboard;
    let custDashOptions = [];


    // if (this.state.options.four.title) {
    //   dashNums = ['one', 'two', 'three', 'four'];
    // }
    //
    // if (this.state.customOptions.length > 0) {
    //   custOpts = this.state.customOptions;
    // }


    return(
      <div className="dashboard group">
        <header className="dash-head group">
          <h1 id="dash-head-title">Dashboard</h1>
          <span id="dash-head-right">You are exploring Applicative on your own</span>
        </header>
        <div className='dash-charts group'>
          {
            dashNums.map( dashNum => {
              if (dashNum === "one" || dashNum === "two" || dashNum === "three" || dashNum === "four") {
                return(
                  <div key={dashNum + "-outer"} className="dash-chart">
                    <DashHighchart
                      key={dashNum}
                      dashNum={dashNum}
                      container={"dash-" + dashNum}
                      />
                  </div>
                );
              } else {
                return(
                  <div key={dashNum + "-outer"} className="dash-chart">
                    <DashHighchart
                      key={dashNum}
                      dashNum={dashNum}
                      container={"dash-" + dashNum}
                      />

                    <div className="view-seg group" onClick={ this.showInSeg.bind(this, dashNum) }>
                      <div className="view-seg-text">View In</div>
                      <span className="view-seg-logo"></span>
                    </div>
                  </div>
                );
              }
            })
          }
        </div>
      </div>
    );

  }

});

module.exports = Dashboard;
// <div className='dash-charts'>
//
// </div>
