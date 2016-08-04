const OptionsApiUtil = {

  fetchOptions(success) {
		$.ajax({
			url: '/api/events',
			type: 'GET',
			success: function(options){
        success(options);
      }
		});
	}

};

module.exports = OptionsApiUtil;
