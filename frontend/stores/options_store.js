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

OptionsStore.addEvent = function(event){
  let idx = _options.segmentation.query.events.indexOf(`${event}`);

  if (idx != -1) {
    // handle error, event already added to query
    alert('event already added to query');
  } else {
    _options.segmentation.query.events.push(`${event}`);

    OptionsActions.changeOptions(_options.segmentation.query);
  }
};

OptionsStore.addProperty = function(property){
  let idx = _options.segmentation.query.properties.indexOf(`${property}`);

  if (idx != -1) {
    // handle error, property already added to query
    alert('property already added to query');
  } else {
    _options.segmentation.query.properties = [property];

    OptionsActions.changeOptions(_options.segmentation.query);
  }
},

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
