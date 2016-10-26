const React = require('react');
const DragDropContext = require('react-dnd').DragDropContext;
const HTML5Backend = require('react-dnd-html5-backend');

const OptionsStore = require('../stores/options_store');
const SessionStore = require('../stores/session_store');

const QueriesActions = require('../actions/queries_actions');

const SegChart = require('./seg_chart');
const RightNav = require('./right_nav');
const SegQueryBar = require('./seg_query_bar');

const Segmentation = React.createClass({
  getInitialState(){
    return({ options: OptionsStore.all().segmentation });
  },

  componentDidMount() {
    this.optionsListener = OptionsStore.addListener(this._optionsChanged);

    QueriesActions.fetchQueries(SessionStore.currentUser().id);
  },

  _optionsChanged() {
    this.setState({ options: OptionsStore.all().segmentation });
  },

  componentWillUnmount() {
    OptionsStore.removeAllOptions();

    this.optionsListener.remove();
  },

  render(){

    return(
      <div className="segmentation group">

        <header className="seg-head group">
          <h1 id="seg-head-title">Segmentation</h1>
          <span id="seg-head-right">You are exploring Applicative on your own</span>
        </header>

        <div className='seg-body group'>
          <div className='seg-query-chart group'>
            <div className="loading" id="loading-black"></div>
            <div className='seg-query-bar group'>
              <SegQueryBar
                options={this.state.options}
              />
            </div>
            <div className='seg-chart-outer'>
              <div className="loading" id="loading-white">Loading...</div>
              <SegChart
                options={this.state.options}
              />
            </div>
          </div>
          <div className="seg-options">
            <RightNav/>
          </div>
        </div>

      </div>
    );

  }

});

module.exports = DragDropContext(HTML5Backend)(Segmentation);
