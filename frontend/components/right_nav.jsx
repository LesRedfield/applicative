const React = require('react');
const DragOption = require('./drag_option');

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

  selectNav(nav) {
    this.setState({ selectedNav: nav });
  },

  render() {
    const lists = {
      'Events': ['Add to Cart', 'Proceed to Checkout', 'Purchase', 'Session'],
      'Properties': ['AB Group', 'Age', 'Gender', 'Marketing Channel', 'Signup Platform']
    };

    let selNav = this.state.selectedNav
    let navList = lists[selNav];

    return(
      <div id='right-nav' className='right-nav group'>
        <div className='right-nav-header'>
          <div className="right-nav-header-icon"></div>
          <div className="right-nav-header-text">
            {selNav}
          </div>
        </div>

        <div className="right-nav-data">
          <div className="right-navs">

            {
              navList.map( (nav, index) => {
                return (
                  <div className="seg-opt">
                    <DragOption
                      key={index}
                      name={nav}
                      type={ selNav }
                    />
                  </div>
                );
              })
            }

          </div>
        </div>
        <div className="right-nav-menu">
          <Menu
            selectedNav={ selNav }
            onNavChosen={ this.selectNav }
            navs={ ['Events', 'Properties'] }>
          </Menu>
        </div>
      </div>
    );
  }

});

module.exports = RightNav;
