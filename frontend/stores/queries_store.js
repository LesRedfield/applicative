const Store = require('flux/utils').Store;
const QueriesConstants = require('../constants/queries_constants');
const AppDispatcher = require('../dispatcher/dispatcher');
const QueriesStore = new Store(AppDispatcher);

let _queries = [];

QueriesStore.all = function(){
  return _queries;
};

function _resetAllQueries(queries){
  _queries = queries;
  QueriesStore.__emitChange();
}

QueriesStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case QueriesConstants.QUERIES_RECEIVED:
      _resetAllQueries(payload.queries);
      break;
  }
};

module.exports = QueriesStore;
