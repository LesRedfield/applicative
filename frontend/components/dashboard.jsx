const React = require('react');
const Highchart = require('./highchart');

const OptionsStore = require('../stores/options_store');
const SessionStore = require('../stores/session_store');
const QueriesStore = require('../stores/queries_store');

const OptionsActions = require('../actions/options_actions');
const QueriesActions = require('../actions/queries_actions');

const Dashboard = React.createClass({
  getInitialState(){
    return({ options: OptionsStore.all().dashboard, custom: QueriesStore.allDash() });
  },

  _optionsChanged() {
    this.setState({options: OptionsStore.all().dashboard});
  },

  componentDidMount() {
    this.optionsListener = OptionsStore.addListener(this._optionsChanged);

    QueriesActions.fetchQueries(SessionStore.currentUser().id);
    QueriesActions.fetchDashQueries(SessionStore.currentUser().id);
  },

  componentWillUnmount() {
    this.optionsListener.remove();
  },

  render(){
    const dashNums = ['one', 'two', 'three', 'four'];

    const customs = this.state.custom.map( dashQuery => {
      let params = JSON.parse(dashQuery.query.split('=>').join(': '));
      params.title = dashQuery.title;

      return params;
    })

    // debugger

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
            customs.map( custom => {
              return(
                <div key={custom.title + "-outer"} className="dash-chart">
                  <Highchart
                    key={custom.title}
                    container={"dash-" + custom.title}
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
