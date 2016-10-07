const React = require('react');
const Highchart = require('./highchart');

const OptionsStore = require('../stores/options_store');
const SessionStore = require('../stores/session_store');
const QueriesStore = require('../stores/queries_store');

const OptionsActions = require('../actions/options_actions');
const QueriesActions = require('../actions/queries_actions');

const Dashboard = React.createClass({
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
    QueriesActions.fetchDashQueries(SessionStore.currentUser().id);
  },

  componentDidMount() {
    this.optionsListener = OptionsStore.addListener(this._optionsChanged);
    this.queriesListener = QueriesStore.addListener(this._queriesChanged);

    QueriesActions.fetchQueries(SessionStore.currentUser().id);

    this._fetchDashQueriesOptions();
  },

  componentWillUnmount() {
    this.optionsListener.remove();
    this.queriesListener.remove();
  },

  _fetchDashQueriesOptions() {
    const customs = this.state.custom.map( dashQuery => {

      let params = JSON.parse(dashQuery.query.split('=>').join(': '));
      params.title = dashQuery.title;

      return params;
    });
    if (customs.length > 0) {
      QueriesActions.fetchDashQueriesOptions(customs);
    }
  },

  render(){
    const dashNums = ['one', 'two', 'three', 'four'];
    let custOpts = [];

    if (this.state.customOptions.length > 0) {
      custOpts = this.state.customOptions;
    }

    debugger

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

        <div>
          {
            custOpts.map( custom => {
              return(
                <div key={custom.query.title + "-outer"} className="dash-chart">
                  <Highchart
                    key={custom.query.title}
                    container={"dash-" + custom.query.title}
                    options={custom}
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
