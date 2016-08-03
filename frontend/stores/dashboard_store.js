const Store = require('flux/utils').Store;
const DashboardConstants = require('../constants/dashboard_constants');
const AppDispatcher = require('../dispatcher/dispatcher');
const DashboardStore = new Store(AppDispatcher);

let _options = {};


DashboardStore.all = function(){
  return Object.assign({}, _options);
};

function _resetOptions(options){
  _options = options;
  DashboardStore.__emitChange();
}

DashboardStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case DashboardConstants.OPTIONS_RECEIVED:
      _resetOptions(payload.options);
      break;
  }
};

module.exports = DashboardStore;
