const React = require('react');

const Segmentation = require('./segmentation');
const Event = require('./event');
const Property = require('./property');

const Menu = React.createClass({

  render() {
    let selected = this.props.selectedNav;
    let menuTabs = this.props.navs.map((nav, index) => {
      let klass = 'menu-' + index + ' menu-tab';
      let picKlass = 'menu-' + index + '-pic' + ' menu-tab-pic';
      if (nav === selected) {
        klass += ' selected';
        picKlass += ' selected';
      }

      return (
        <div
          key={index}
          className={klass}
          onClick={this.props.onNavChosen.bind(null, nav)}>
          <div key={index} className={picKlass}></div>
        </div>
      );
    });

    return (
      <div className='menu-tabs'>
        {menuTabs}
      </div>
    );

  }

});

const RightNav = React.createClass({

  getInitialState() {
    return ( { selectedNav: 'Events' } );
  },

  _handleOptionClick(e) {
    e.preventDefault();

  },

  selectNav(nav) {
    this.setState({ selectedNav: nav });
  },

  render() {
    const lists = {
      'Events': ['Add to Cart', 'Proceed to Checkout', 'Purchase', 'Session'],
      'Properties': ['AB Group', 'Age', 'Gender', 'Marketing Channel', 'Signup Platform']
    };

    let navList = lists[this.state.selectedNav];

    return(
      <div id='right-nav' className='right-nav group'>
        <div className='right-nav-header'>
          <div className="right-nav-header-icon"></div>
          <div className="right-nav-header-text">
            {this.state.selectedNav}
          </div>
        </div>

        <div className="right-nav-data">
          <div className="right-navs">
            
            {
              navList.map( (nav, index) => {
                if (this.state.selectedNav === 'Events') {
                  return (
                    <div className="seg-opt">
                      <Event
                        key={index}
                        name={nav}
                        query={this.props.query}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div className="seg-opt">
                      <Property
                        key={index * 10}
                        name={nav}
                        query={this.props.query}
                      />
                    </div>
                  );
                }
              })
            }

          </div>
        </div>
        <div className="right-nav-menu">
          <Menu
            selectedNav={ this.state.selectedNav }
            onNavChosen={ this.selectNav }
            navs={ ['Events', 'Properties'] }>
          </Menu>
        </div>
      </div>
    );
  }

});

module.exports = RightNav;
