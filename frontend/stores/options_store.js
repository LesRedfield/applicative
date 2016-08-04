const Store = require('flux/utils').Store;
const OptionsConstants = require('../constants/options_constants');
const AppDispatcher = require('../dispatcher/dispatcher');
const OptionsStore = new Store(AppDispatcher);

let _options = {};


OptionsStore.all = function(){
  return Object.assign({}, _options);
};

function _resetOptions(options){
  _options = options;
  OptionsStore.__emitChange();
}

OptionsStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case OptionsConstants.OPTIONS_RECEIVED:
      _resetOptions(payload.options);
      break;
  }
};

module.exports = OptionsStore;
