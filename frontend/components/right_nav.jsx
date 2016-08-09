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
    const propertiesList = ['AB Group', 'Age', 'Gender', 'Marketing Channel', 'Signup Platform'];

    return(
      <div id='right-nav' className='right-nav'>
        <div className='right-nav-header'>
          Events/Properties
        </div>

        <div className='right-nav-events'>
          {
            eventList.map( event => {
              return (
                <div className="seg-opt">
                  <Event
                    key={event}
                    name={event}
                    query={this.props.query}
                  />
                </div>
              );
            })
          }
        </div>
        <br/>
        <div className='right-nav-properties'>
          {
            propertiesList.map( property => {
              return (
                <div className="seg-opt">
                  <Property
                    key={property}
                    name={property}
                    query={this.props.query}
                  />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }

});

module.exports = RightNav;
