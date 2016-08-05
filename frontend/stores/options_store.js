const Store = require('flux/utils').Store;
const OptionsConstants = require('../constants/options_constants');
const AppDispatcher = require('../dispatcher/dispatcher');
const OptionsStore = new Store(AppDispatcher);

let _options = { dashboard: { one: {}, two: {}, three: {}, four: {} }, segmentation: {} };


OptionsStore.all = function(){
  return Object.assign({}, _options);
};

function _resetAllOptions(options){
  _options = options;
  OptionsStore.__emitChange();
}

OptionsStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case OptionsConstants.OPTIONS_RECEIVED:
      _resetAllOptions(payload.options);
      break;
  }
};

module.exports = OptionsStore;
