const React = require('react');
const Highchart = require('./highchart');
const OptionsStore = require('../stores/options_store');
const OptionsActions = require('../actions/options_actions');

const RightNav = require('./right_nav');

const Segmentation = React.createClass({
  getInitialState(){
    return({options: OptionsStore.all().segmentation});
  },

  _optionsChanged() {
    this.setState({options: OptionsStore.all().segmentation});
  },

  componentDidMount() {
    this.optionsListener = OptionsStore.addListener(this._optionsChanged);
  },

  componentWillUnmount() {
    this.optionsListener.remove();
  },

  render(){
    return(
      <div className="segmentation">
        <header className="seg-head">
          <h1 id="seg-head-title">Segmentation</h1>
          <span id="seg-head-right">You are exploring Applicative on your own</span>
        </header>
        <div className='seg-chart-outer'>
            <Highchart
              key="seg-chart"
              container="seg-chart"
              options={this.state.options}
            />
        </div>
        <div className="seg-options">
          <RightNav />
        </div>
      </div>
    );
  }

});

module.exports = Segmentation;
