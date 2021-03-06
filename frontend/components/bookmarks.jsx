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

  toggleDash(query) {
    if (query.dashboard) {
      QueriesActions.removeQueryFromDash(query);
    } else {
      QueriesActions.addQueryToDash(query);
    }
  },

  deleteQuery(query) {
    QueriesActions.deleteQuery(query.id);
  },

  render(){

    let userQueries = [];

    if (this.state.queries.length > 0) {
      userQueries = this.state.queries.map( query => {
        return(
          <div className="bookmark-item group">
            <div className="bm-item-main">
              <div className="bm-query-logo-outer">
                <span className="bm-query-logo-inner"></span>
              </div>
              <div className="bookmark-item-name">
                {query.title}
              </div>
            </div>
            <div className="bm-query-options group">
              <div className="bm-query-option group" id="add-to-dash" onClick={ this.toggleDash.bind(this, query) }>
                <span className="bm-query-option-logo" id="add-to-dash-logo"></span>
                <div className="bm-query-option-text" id="add-to-dash-text">
                  { query.dashboard ? 'Remove From' : 'Add To' }
                </div>
              </div>
              <div className="bm-query-option group" id="bm-view-seg" onClick={ this.showBookmark.bind(this, query)}>
                <span className="bm-query-option-logo" id="bm-view-seg-logo"></span>
                <div className="bm-query-option-text" id="bm-view-seg-text">View In</div>
              </div>
              <div className="bm-query-option group" id="delete-query" onClick={ this.deleteQuery.bind(this, query) }>
                <span className="bm-query-option-logo" id="delete-query-logo"></span>
                <div className="bm-query-option-text" id="delete-query-text">Delete Query</div>
              </div>
            </div>
          </div>
        );
      });
    }
    else {
      userQueries = <div className="no-queries">Sorry, you don't have any saved queries yet.</div>
    }

    return(
      <div className="bookmarks group">
        <header className="bm-head group">
          <h1 id="bm-head-title">Bookmarks</h1>
        </header>

        <div className="bm-list group">
          { userQueries }
        </div>
      </div>

    );

  }

});

module.exports = Bookmarks;
