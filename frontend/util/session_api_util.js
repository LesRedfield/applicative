const SessionApiUtil = {
	logIn(user, success, error) {
		$.ajax({
			url: '/api/session',
			type: 'POST',
			data: { user },
			success,
			error: function(message){
        error(message);
      }
		});
	},

	logOut(success) {
		$.ajax({
			url: '/api/session',
			method: 'delete',
			success,
			error: function () {
			  return "Logout failed";
			}
		});
	},

	signUp(user, success, error) {
		$.ajax({
			url: '/api/users',
			type: 'POST',
			dataType: 'json',
			data: { user },
			success,
			error: function(message){
        error(message);
      }
		});
	},

	fetchCurrentUser(success, complete) {
		$.ajax({
			url: '/api/session',
			method: 'GET',
			success,
			error: function () {
			  return "Fetch failed";
			},
      complete: function(){
				complete();
			}
		});
	}
};

module.exports = SessionApiUtil;
