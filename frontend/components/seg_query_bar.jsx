const React = require('react');
const DragDropContext = require('react-dnd').DragDropContext;
const HTML5Backend = require('react-dnd-html5-backend');

const OptionsStore = require('../stores/options_store');
const QueriesStore = require('../stores/queries_store');
const SessionStore = require('../stores/session_store');

const OptionsActions = require('../actions/options_actions');
const QueriesActions = require('../actions/queries_actions');
const SessionActions = require('../actions/session_actions');

const SegChart = require('./seg_chart');
const RightNav = require('./right_nav');

const SegQueryBar = React.createClass({
  getInitialState(){
    return({ options: OptionsStore.all().segmentation, title: "Untitled" });

  },

  _optionsChanged() {
    this.setState({ options: OptionsStore.all().segmentation });
  },

  componentDidMount() {
    this.optionsListener = OptionsStore.addListener(this._optionsChanged);

    QueriesActions.fetchQueries(SessionStore.currentUser().id);
    // debugger
  },

  componentWillUnmount() {
    OptionsStore.removeAllOptions();

    this.optionsListener.remove();
  },

  _titleInputHandler(e) {

    return (e) => this.setState({ title: e.target.value });

  },

  _handleRemoveEvent(event) {
    OptionsStore.removeEvent(event);

    OptionsActions.changeOptions(OptionsStore.all().segmentation.query);
  },

  _handleRemoveProperty(property) {
    OptionsStore.removeProperty(property);

    OptionsActions.changeOptions(OptionsStore.all().segmentation.query);
  },

  _updateTitle() {
    if (this.state.options.query) {
      this.setState({ title: this.state.options.query.title });

      OptionsStore.disableImport();
    }
  },

  _resetQueryBar() {
    // this.setState({ title: "Untitled" });

    OptionsActions.changeOptions({ events: [], properties: [], title: "Untitled" });
  },

  render(){

    let query = { events: [], properties: [], title: this.state.title };

    if (this.state.options.query) {
      query = this.state.options.query;
    }

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
      <div>
        <div className="query-header group">
          <span className="seg-query-icon"></span>
          <input type="text"
            value={this.state.title}
            onChange={ this._titleInputHandler() }
            placeholder={ "Untitled" }
            className="seg-query-title" />
          <div className="query-header-right group">

            <div
              className="save-query group"
              onClick={ QueriesActions.saveQuery.bind(this, {
                title: this.state.title,
                query: OptionsStore.all().segmentation.query,
                user_id: SessionStore.currentUser().id,
                dashboard: false}
              ) }>
              SAVE QUERY
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
