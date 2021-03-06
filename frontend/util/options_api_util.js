const OptionsApiUtil = {

  fetchOptions(id, success) {
		$.ajax({
			url: '/api/events',
			type: 'GET',
			data: { user_id: id },
			success: function(options){
        success(options);
      }
		});
	},

  changeOptions(params, success) {
    $.ajax({
			url: '/api/events',
			type: 'GET',
      data: { query: params },
			success: function(options){
        success(options);
      }
		});
  }

};

module.exports = OptionsApiUtil;
