const React = require('react');
const Link = require('react-router').Link;
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

        <Link to="/dashboard" id="left-nav-dashboard" className="left-nav-button" activeClassName="current">
        </Link>

        <Link to="/segmentation" id="left-nav-segmentation" className="left-nav-button" activeClassName="current">
        </Link>

        <Link to="/bookmarks" id="left-nav-bookmarks" className="left-nav-button" activeClassName="current">
        </Link>


      </div>
    );
  }

});

module.exports = LeftNav;

// <div id="bot-bord" className="left-nav-button">
//   <div id="left-nav-dashboard" />
// </div>
//
// <div className="left-nav-button">
//   <div id="left-nav-segmentation" />
// </div>
