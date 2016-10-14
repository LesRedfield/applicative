const Store = require('flux/utils').Store;
const OptionsConstants = require('../constants/options_constants');
const OptionsActions = require('../actions/options_actions');
const AppDispatcher = require('../dispatcher/dispatcher');

const OptionsStore = new Store(AppDispatcher);

let _options = { dashboard: { one: {}, two: {}, three: {}, four: {} }, segmentation: { query: { events: [], properties: [], title: "Untitled" } } };
let _import = false;

OptionsStore.all = function(){
  return Object.assign({}, _options);
};

OptionsStore.allDashOptions = function(){
  // OptionsActions.fetchOptions();
};

OptionsStore.removeEvent = function(event){
  let idx = _options.segmentation.query.events.indexOf(`${event}`);

  if (idx != -1) {
    _options.segmentation.query.events.splice(idx, 1);
  }
};

OptionsStore.removeProperty = function(property){
  let idx = _options.segmentation.query.properties.indexOf(`${property}`);

  if (idx != -1) {
    _options.segmentation.query.properties.splice(idx, 1);
  }
};

OptionsStore.canImport = function(){
  return _import;
};

OptionsStore.enableImport = function(){
  _import = true;
};

OptionsStore.disableImport = function(){
  _import = false;
};

OptionsStore.removeAllOptions = function(){
  _options = { dashboard: { one: {}, two: {}, three: {}, four: {} }, segmentation: { query: { events: [], properties: [], title: "Untitled" } } };
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
