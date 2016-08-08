const React = require('react');

const Segmentation = require('./segmentation');
const Event = require('./event');
const Property = require('./property');

const RightNav = React.createClass({

  getInitialState() {
    return ( { selected: '' } );
  },

  _handleOptionClick(e) {
    e.preventDefault();

  },

  render() {
    const eventList = ['Add to Cart', 'Proceed to Checkout', 'Purchase', 'Session'];
    const propertiesList = ['Age', 'Gender', 'A/B Group', 'Marketing Channel'];

    return(
      <div id='right-nav' className='right-nav'>
        <div className='right-nav-events'>
          {
            eventList.map( event => {
              return (
                <Event
                  key={event}
                  name={event}
                  query={this.props.query}
                />
              );
            })
          }
        </div>
        <br/>
        <div className='right-nav-properties'>
          {
            propertiesList.map( property => {
              return (
                <Property
                  key={property}
                  name={property}
                  query={this.props.query}
                />
              );
            })
          }
        </div>
      </div>
    );
  }

});

module.exports = RightNav;
