const AppDispatcher = require('../dispatcher/dispatcher');
const OptionsConstants = require('../constants/options_constants');
const OptionsApiUtil = require('../util/options_api_util');

const OptionsActions = {

  fetchOptions(id) {
    OptionsApiUtil.fetchOptions(id, OptionsActions.receiveOptions);
  },

  changeOptions(params) {
    OptionsApiUtil.changeOptions(params, OptionsActions.receiveOptions);
  },

  receiveOptions(options) {
    AppDispatcher.dispatch({
      actionType: OptionsConstants.OPTIONS_RECEIVED,
      options: options
    });
  }

};

module.exports = OptionsActions;
