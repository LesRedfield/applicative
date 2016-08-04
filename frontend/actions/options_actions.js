const AppDispatcher = require('../dispatcher/dispatcher');
const OptionsConstants = require('../constants/options_constants');
const OptionsApiUtil = require('../util/options_api_util');

const OptionsActions = {

  fetchOptions() {
    OptionsApiUtil.fetchOptions(OptionsActions.receiveOptions);
  },

  receiveOptions(options) {
    AppDispatcher.dispatch({
      actionType: OptionsConstants.OPTIONS_RECEIVED,
      options: options
    });
  }

};

module.exports = OptionsActions;
