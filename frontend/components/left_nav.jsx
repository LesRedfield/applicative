const React = require('react');
const Dashboard = require('./dashboard');
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;

const LeftNav = React.createClass({

  getInitialState() {
    return ( { selected: 'dashboard' } );
  },

  _handleDashboardClick(e) {
    e.preventDefault();

    if ( this.state.selected != 'dashboard' ) {
      this.setState( { selected: 'dashboard' } );

      hashHistory.push('/dashboard');
    }
  },

  _handleSegmentationClick(e) {
    e.preventDefault();

    if ( this.state.selected != 'segmentation' ) {
      this.setState( { selected: 'segmentation' } );

      hashHistory.push('/segmentation');
    }
  },

  render() {

    return(
      <div id='left-nav' className='left-nav'>

        <div id="bot-bord" className="left-nav-button" onClick={ this._handleDashboardClick }>
          <div id="left-nav-dashboard" />
        </div>

        <div className="left-nav-button" onClick={ this._handleSegmentationClick }>
          <div id="left-nav-segmentation" />
        </div>

      </div>
    );
  }

});

module.exports = LeftNav;
