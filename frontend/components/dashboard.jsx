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
      <div className='dash'>
        {
          dashNums.map( dashNum => {
            return(
              <Highchart
                key={"dash-" + dashNum}
                container={"dash-" + dashNum}
                options={this.state.options[dashNum]}
              />
            );
          })
        }
      </div>
    );
  }

});

module.exports = Dashboard;
