const Store = require('flux/utils').Store;
const QueriesConstants = require('../constants/queries_constants');
const AppDispatcher = require('../dispatcher/dispatcher');
const QueriesStore = new Store(AppDispatcher);

const QueriesActions = require('../actions/queries_actions');


let _queries = [];
let _dash_queries = [];
let _dash_queries_options = {};

QueriesStore.all = function(){
  return _queries;
};

QueriesStore.allDash = function(){
  return _dash_queries;
};

QueriesStore.allDashOptions = function(){
  return _dash_queries_options;
};

function _resetAllQueries(queries){
  _queries = queries;
  QueriesStore.__emitChange();
}

function _resetAllDashQueries(queries){
  _dash_queries = queries;
  QueriesStore.__emitChange();
}

function _resetAllDashQueriesOptions(options){
  options.forEach( option => {
    _dash_queries_options[option.query.title] = option;
  });

  QueriesStore.__emitChange();
}

QueriesStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case QueriesConstants.QUERIES_RECEIVED:
      _resetAllQueries(payload.queries);
      break;
    case QueriesConstants.DASH_QUERIES_RECEIVED:
      _resetAllDashQueries(payload.queries);
      break;
    case QueriesConstants.DASH_QUERIES_OPTIONS_RECEIVED:
      _resetAllDashQueriesOptions(payload.queries);
      break;
  }
};

module.exports = QueriesStore;
