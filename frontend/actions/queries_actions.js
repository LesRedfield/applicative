const AppDispatcher = require('../dispatcher/dispatcher');
const QueriesConstants = require('../constants/queries_constants');
const QueriesApiUtil = require('../util/queries_api_util');

const QueriesActions = {

  fetchQueries(user_id) {
    QueriesApiUtil.fetchQueries(user_id, QueriesActions.receiveQueries);
  },

  saveQuery(params) {
    QueriesApiUtil.saveQuery(params, QueriesActions.receiveQueries);
  },

  deleteQuery(id) {
    QueriesApiUtil.deleteQuery(id, QueriesActions.receiveQueries);

  },

  showQueries(queries) {
    return queries;
  },

  receiveQueries(queries) {
    AppDispatcher.dispatch({
      actionType: QueriesConstants.QUERIES_RECEIVED,
      queries: queries
    });
  }

};

module.exports = QueriesActions;
