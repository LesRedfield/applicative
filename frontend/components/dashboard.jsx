const React = require('react');
const Highchart = require('./highchart');
const OptionsStore = require('../stores/options_store');
const OptionsActions = require('../actions/options_actions');

const Dashboard = React.createClass({
  getInitialState(){
    return({options: OptionsStore.all().dashboard});
  },

  _optionsChanged() {
    this.setState({options: OptionsStore.all().dashboard});
  },

  componentDidMount() {
    this.optionsListener = OptionsStore.addListener(this._optionsChanged);
  },

  componentWillUnmount() {
    this.optionsListener.remove();
  },

  render(){
    const dashNums = ['one', 'two', 'three', 'four'];

    return(
      <div className="dashboard">
        <header className="dash-head">
          <h1 id="dash-head-title">Dashboard</h1>
          <span id="dash-head-right">You are exploring Applicative on your own</span>
        </header>
        <div className='dash-charts'>
          {
            dashNums.map( dashNum => {
              return(

                <Highchart
                  key={dashNum}
                  container={"dash-" + dashNum}
                  options={this.state.options[dashNum]}
                />
              );
            })
          }
        </div>
      </div>
    );
  }

});

module.exports = Dashboard;
