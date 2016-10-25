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

OptionsStore.addEvent = function(event){
  let idx = _options.segmentation.query.events.indexOf(`${event}`);

  if (idx != -1) {
    let modal = document.getElementById('save-query-failed-modal');
    let span = document.getElementById('error-message');

    let loadingBlack = document.getElementById('loading-black');
    let loadingWhite = document.getElementById('loading-white');

    loadingBlack.style.display = 'none';
    loadingWhite.style.display = 'none';

    span.innerHTML = `${event} already added to query.`
    modal.style.display = "block";
  } else {
    _options.segmentation.query.events.push(`${event}`);

    OptionsActions.changeOptions(_options.segmentation.query);
  }
};

OptionsStore.addProperty = function(property){
  let idx = _options.segmentation.query.properties.indexOf(`${property}`);

  let modal = document.getElementById('save-query-failed-modal');
  let span = document.getElementById('error-message');
  let loadingBlack = document.getElementById('loading-black');
  let loadingWhite = document.getElementById('loading-white');


  if (_options.segmentation.query.events.length < 1) {
    loadingBlack.style.display = 'none';
    loadingWhite.style.display = 'none';

    span.innerHTML = "Please add an event first.";
    modal.style.display = "block";
  } else if (idx != -1) {
    loadingBlack.style.display = 'none';
    loadingWhite.style.display = 'none';

    span.innerHTML = `${property} already added to query.`
    modal.style.display = "block";
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
