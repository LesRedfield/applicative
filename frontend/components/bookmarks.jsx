const React = require('react');
const ReactRouter = require('react-router');
const Link = require('react-router').Link;

const SessionStore = require('../stores/session_store');
const QueriesStore = require('../stores/queries_store');
const OptionsStore = require('../stores/options_store');

const QueriesActions = require('../actions/queries_actions');
const OptionsActions = require('../actions/options_actions');

const Bookmarks = React.createClass({
  contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState(){
    QueriesActions.fetchQueries(SessionStore.currentUser().id);

    return({ queries: QueriesStore.all() });
  },

  componentWillMount() {
    QueriesActions.fetchQueries(SessionStore.currentUser().id);

    this.setState({ queries: QueriesStore.all() });
  },

  showBookmark(query) {

    let params = JSON.parse(query.query.split('=>').join(': '));

    params.title = query.title;

    OptionsActions.changeOptions(params);

    OptionsStore.enableImport();

    this.context.router.push("/segmentation");
  },

  addToDash(query) {
    QueriesActions.addQueryToDash(query);

    this.context.router.push("/dashboard");
  },

  render(){


    let userQueries = [];

    if (this.state.queries.length > 0) {
      userQueries = this.state.queries;
    }
    else {
      userQueries = [ { title: "Sorry, You Don't Have Any Saved Queries" } ];
    }


    return(
      <div className="bookmarks">
        {
          userQueries.map( query => {
            return(
              <div>
                <div className="bookmark" onClick={ this.showBookmark.bind(this, query) }>
                  {query.title}
                </div>
                <div className="add-to-dash" onClick={ this.addToDash.bind(this, query) }>
                  Add To Dashboard
                </div>
              </div>
            );
          })
        }
      </div>

    );

  }

});

module.exports = Bookmarks;

// return(
//   userQueries.map( query => {
//     return(
//       <div key={query.title} className="bookmark" onClick={ this.showBookmark.bind(this, query) }>
//         {query.title}
//       </div>
//     );
//   })
// );
