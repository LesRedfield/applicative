const AppDispatcher = require('../dispatcher/dispatcher');
const DashboardConstants = require('../constants/dashboard_constants');
const DashboardApiUtil = require('../util/dashboard_api_util');

const DashboardActions = {

  fetchOptions() {
    DashboardApiUtil.fetchOptions(DashboardActions.receiveOptions);
  },

  receiveOptions(options) {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.OPTIONS_RECEIVED,
      options: options
    });
  }

};

module.exports = DashboardActions;
