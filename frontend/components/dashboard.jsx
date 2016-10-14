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
    // this.setState({ queries: QueriesStore.allDash() });

    // this.setState({ num: this.state.num + 1 });

    // QueriesActions.fetchDashQueriesOptions
  },

  componentWillMount() {
    QueriesActions.fetchQueries(SessionStore.currentUser().id);

    OptionsActions.fetchOptions(SessionStore.currentUser().id);

    // QueriesActions.fetchDashQueries(SessionStore.currentUser().id);

    this.optionsListener = OptionsStore.addListener(this._optionsChanged);
    // this.queriesListener = QueriesStore.addListener(this._queriesChanged);
  },

  componentDidMount() {
  },

  componentWillUnmount() {
    this.optionsListener.remove();
    // this.queriesListener.remove();


  },

  showInSeg(options) {
    let params = JSON.parse(options.query.split('=>').join(': '));
    params.title = options.title;

    // debugger
    OptionsActions.changeOptions(params);

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
        <div className='dash-charts'>
          {
            dashNums.map( dashNum => {
              return(
                <div key={dashNum + "-outer"} className="dash-chart">
                  <DashHighchart
                    key={dashNum}
                    dashNum={dashNum}
                    container={"dash-" + dashNum}
                    />
                </div>
              );
            })
          }

          {
            custDashOptions.map( custom => {
              return(
                <div key={custom.title + "-outer"} className="dash-chart">
                  <DashHighchart
                    key={custom.title}
                    dashNum={custom.title}
                    container={"dash-" + custom.title}
                    dashSeg={" dash-seg"}
                    />
                  <div className="view-seg" onClick={ this.showInSeg.bind(this, custom) }>
                    View In Segmentation
                  </div>
                </div>
              );
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
