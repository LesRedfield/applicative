const React = require('react');
const Link = require('react-router').Link;
const DragDropContext = require('react-dnd').DragDropContext;
const HTML5Backend = require('react-dnd-html5-backend');

const OptionsStore = require('../stores/options_store');
const SessionStore = require('../stores/session_store');

const OptionsActions = require('../actions/options_actions');
const QueriesActions = require('../actions/queries_actions');

const SegChart = require('./seg_chart');
const RightNav = require('./right_nav');

const SegQueryBar = React.createClass({
  getInitialState(){
    return({ title: "Untitled" });
  },

  componentDidMount() {
    QueriesActions.fetchQueries(SessionStore.currentUser().id);
  },

  componentWillUnmount() {
    OptionsStore.removeAllOptions();
  },

  _titleInputHandler(e) {
    return (e) => this.setState({ title: e.target.value });
  },

  _handleRemoveEvent(event) {
    OptionsStore.removeEvent(event);

    OptionsActions.changeOptions(this.props.options.query);
  },

  _handleRemoveProperty(property) {
    OptionsStore.removeProperty(property);

    OptionsActions.changeOptions(this.props.options.query);
  },

  _updateTitle() {
    if (this.props.options.query) {
      this.setState({ title: this.props.options.query.title });

      OptionsStore.disableImport();
    }
  },

  _saveQuery(e) {
    e.preventDefault();

    let params = {
      title: this.state.title,
      query: this.props.options.query,
      user_id: SessionStore.currentUser().id,
      dashboard: false
    }

    QueriesActions.saveQuery(params);
  },

  _resetQueryBar() {
    this.setState({ title: "Untitled" });

    OptionsActions.changeOptions({ events: [], properties: [], title: "Untitled" });
  },

  _closeModal() {
    let modal = document.getElementById('save-query-modal');

    modal.style.display = "none";
  },

  render(){
    let query = this.props.options.query;

    if (query.title !== this.state.title && OptionsStore.canImport()) {
      this._updateTitle();
    }

    let eventProperties = <div className="by">By</div>;
    if (query.properties.length > 0) {
      eventProperties = query.properties.map( (property, index) => {
        return (
          <div className="enclosing">
            <div className="by">
              By
            </div>
            <div className="seg-query-event-property">
              <span className="seg-query-event-property-icon"></span>
              {property}
              <div id="remove" className="property-remove" onClick={ this._handleRemoveProperty.bind(this, property) }></div>
            </div>
          </div>
        );
      });
    }

    return(
      <div className="seg-query-bar-inner group">
        <div className="query-header group">
          <span className="seg-query-icon"></span>

          <form onSubmit={ this._saveQuery }>
            <input type="text"
              value={ this.state.title }
              onChange={ this._titleInputHandler() }
              placeholder={ "Untitled" }
              className="seg-query-title" />
          </form>

          <div className="query-header-right group">

            <div
              className="save-query group"
              onClick={ QueriesActions.saveQuery.bind(this, {
                title: this.state.title,
                query: query,
                user_id: SessionStore.currentUser().id,
                dashboard: false}
              ) }>
              SAVE QUERY
            </div>

            <div id="save-query-modal" className="modal">
              <div className="modal-content">
                <span onClick={ this._closeModal }>Query Saved Successfully To</span>
                <Link to="/bookmarks" id="bm-link">Bookmarks</Link>
              </div>
            </div>

            <div
              className="reset group"
              onClick={ this._resetQueryBar }>
                RESET
            </div>

          </div>
        </div>

        <div className="seg-query-events group">
          {
            query.events.map( event => {
              return (
                <div className="seg-query-event-line group">
                  <span className="seg-query-event">
                    <span className="seg-query-event-icon"></span>
                    {event}
                    <div id="remove" className="event-remove" onClick={ this._handleRemoveEvent.bind(this, event) }></div>
                  </span>
                  <div className="seg-query-event-properties">
                    {eventProperties}
                  </div>
                </div>
              );
            })
          }
        </div>

        <div className="drop-an-event">

        </div>
      </div>
    );
  }
});

module.exports = SegQueryBar;
