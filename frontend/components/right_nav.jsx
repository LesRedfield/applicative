const React = require('react');
const Segmentation = require('./segmentation');

const LeftNav = React.createClass({

  getInitialState() {
    return ( { selected: '' } );
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
        <input id="left-nav-dashboard" className="left-nav-button" type="submit" value="D" onClick={ this._handleDashboardClick } />
        <input id="left-nav-segmentation" className="left-nav-button" type="submit" value="S" onClick={ this._handleSegmentationClick } />
      </div>
    );
  }

});

module.exports = LeftNav;
