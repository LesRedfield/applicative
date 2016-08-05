const React = require('react');

const Segmentation = require('./segmentation');
const Event = require('./event');

const RightNav = React.createClass({

  getInitialState() {
    return ( { selected: '' } );
  },

  _handleOptionClick(e) {
    e.preventDefault();

  },

  render() {
    const eventList = ['session', 'purchase'];

    return(
      <div id='right-nav' className='right-nav'>
        {
          eventList.map( event => {
            return (
              <Event
                key={event}
                name={event}
              />
            );
          })
        }
      </div>
    );
  }

});

module.exports = RightNav;
