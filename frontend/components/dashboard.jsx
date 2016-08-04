const React = require('react');
const Highchart = require('./highchart');
const OptionsStore = require('../stores/options_store');
const OptionsActions = require('../actions/options_actions');

const Dashboard = React.createClass({
  getInitialState(){
    return({options: OptionsStore.all()});
  },

  _optionsChanged() {
    this.setState({options: OptionsStore.all()});
  },

  componentDidMount() {
    OptionsStore.addListener(this._optionsChanged);
    OptionsActions.fetchOptions();
  },

  render(){
    return(
      <div>
        <Highchart
          container="dash"
          options={this.state.options}
        />
      </div>
    );
  }

});

module.exports = Dashboard;
