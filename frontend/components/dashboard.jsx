const React = require('react');
const ReactRouter = require('react-router');
const Link = require('react-router').Link;
const Highchart = require('./highchart');

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
    return({ options: OptionsStore.all().dashboard, custom: QueriesStore.allDash(), customOptions: QueriesStore.allDashOptions() });
  },

  _optionsChanged() {
    this.setState({ options: OptionsStore.all().dashboard });
  },

  _queriesChanged() {
    this.setState({ customOptions: QueriesStore.allDashOptions() });
  },

  componentWillMount() {
    QueriesActions.fetchQueries(SessionStore.currentUser().id);
    QueriesActions.fetchDashQueries(SessionStore.currentUser().id);
    this.optionsListener = OptionsStore.addListener(this._optionsChanged);
    this.queriesListener = QueriesStore.addListener(this._queriesChanged);
  },

  componentDidMount() {
  },

  componentWillUnmount() {
    this.optionsListener.remove();
    this.queriesListener.remove();
  },

  showInSeg(options) {
    OptionsActions.changeOptions(options);

    OptionsStore.enableImport();

    this.context.router.push("/segmentation");
  },

  render(){
    let dashNums = [];
    let custOpts = [];
    let dCharts = {};

    if (this.state.options.four.title) {
      dashNums = ['one', 'two', 'three', 'four'];
    }

    if (this.state.customOptions.length > 0) {
      custOpts = this.state.customOptions;
    }

    return(
      <div className="dashboard group">
        <header className="dash-head group">
          <h1 id="dash-head-title">Dashboard</h1>
          <span id="dash-head-right">You are exploring Applicative on your own</span>
        </header>
        <div className='dash-charts'>

          {
            custOpts.map( custom => {
              return(
                <div key={custom.query.title + "-outer"} className="dash-chart">
                  <Highchart
                    key={custom.query.title}
                    container={"dash-" + custom.query.title}
                    dashSeg={" dash-seg"}
                    options={custom}
                    />
                  <div className="view-seg" onClick={ this.showInSeg.bind(this, custom.query) }>
                    View In Segmentation
                  </div>
                </div>
              );
            })
          }
          
          {
            dashNums.map( dashNum => {
              return(
                <div key={dashNum + "-outer"} className="dash-chart">
                  <Highchart
                    key={dashNum}
                    container={"dash-" + dashNum}
                    options={this.state.options[dashNum]}
                  />
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
