const AppDispatcher = require('../dispatcher/dispatcher');
const QueriesConstants = require('../constants/queries_constants');
const QueriesApiUtil = require('../util/queries_api_util');

const SessionStore = require('../stores/session_store');
const QueriesStore = require('../stores/queries_store');

const QueriesActions = {

  fetchQueries(user_id) {
    QueriesApiUtil.fetchQueries(user_id, QueriesActions.receiveQueries);
  },

  fetchDashQueries(user_id) {
    QueriesApiUtil.fetchDashQueries(user_id, QueriesActions.receiveDashQueries);
  },

  fetchDashQueriesOptions(queries) {
    QueriesApiUtil.fetchDashQueriesOptions(queries, QueriesActions.receiveDashQueriesOptions);
  },

  saveQuery(params) {
    QueriesApiUtil.saveQuery(params, QueriesActions.receiveNewQueries, QueriesActions.saveQueryFailed);

    QueriesActions.fetchQueries(SessionStore.currentUser().id);
  },

  deleteQuery(id) {
    QueriesApiUtil.deleteQuery(id, SessionStore.currentUser().id, QueriesActions.receiveQueries);
  },

  showQueries(queries) {
    return queries;
  },

  addQueryToDash(params) {
    QueriesApiUtil.addQueryToDash(params, QueriesActions.receiveQueries);
  },

  removeQueryFromDash(params) {
    QueriesApiUtil.removeQueryFromDash(params, QueriesActions.receiveQueries);
  },

  saveQueryFailed(message) {
    let modal = document.getElementById('save-query-failed-modal');
    let span = document.getElementById('error-message');

    span.innerHTML = message.responseJSON.join(', ');
    modal.style.display = "block";
  },

  receiveNewQueries(queries) {
    let modal = document.getElementById('save-query-modal');

    modal.style.display = "block";

    AppDispatcher.dispatch({
      actionType: QueriesConstants.QUERIES_RECEIVED,
      queries: queries
    });
  },

  receiveQueries(queries) {
    AppDispatcher.dispatch({
      actionType: QueriesConstants.QUERIES_RECEIVED,
      queries: queries
    });
  },

  receiveDashQueries(queries) {
    AppDispatcher.dispatch({
      actionType: QueriesConstants.DASH_QUERIES_RECEIVED,
      queries: queries
    });
  },

  receiveDashQueriesOptions(queries) {
    AppDispatcher.dispatch({
      actionType: QueriesConstants.DASH_QUERIES_OPTIONS_RECEIVED,
      queries: queries
    });
  }

};

module.exports = QueriesActions;
