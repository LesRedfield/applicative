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
    this.queriesListener = QueriesStore.addListener(this._queriesChanged);

    QueriesActions.fetchQueries(SessionStore.currentUser().id);
  },

  componentWillUnmount() {
    this.queriesListener.remove();
  },

  _queriesChanged() {
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

  deleteQuery(query) {
    QueriesActions.deleteQuery(query.id);
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
      <div className="bookmarks group">
        <header className="bm-head group">
          <h1 id="bm-head-title">Bookmarks</h1>
        </header>

        <div className="bm-list group">
          {
            userQueries.map( query => {
              return(
                <div className="bookmark-item group">
                  <div className="bm-item-main" onClick={ this.showBookmark.bind(this, query)}>
                    <div className="bm-query-logo-outer">
                      <span className="bm-query-logo-inner"></span>
                    </div>
                    <div className="bookmark-item-name">
                      {query.title}
                    </div>
                  </div>
                  <div className="bm-query-options group">
                    <div className="add-to-dash" onClick={ this.addToDash.bind(this, query) }>
                      Add To Dashboard
                    </div>
                    <div className="delete-query" onClick={ this.deleteQuery.bind(this, query) }>
                      Delete Query
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
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
