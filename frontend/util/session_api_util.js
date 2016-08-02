const SessionApiUtil = {
	logIn(user, success) {
		$.ajax({
			url: '/api/session',
			type: 'POST',
			data: { user },
			success
		});
	},

	logOut(success) {
		$.ajax({
			url: '/api/session',
			method: 'delete',
			success,
			error: function () {
			  console.log("Logout error in SessionApiUtil#logout");
			}
		});
	},

	signUp(user, success) {
		$.ajax({
			url: '/api/users',
			type: 'POST',
			dataType: 'json',
			data: { user },
			success
		});
	},

	fetchCurrentUser(success, complete) {
		$.ajax({
			url: '/api/session',
			method: 'GET',
			success,
			error: function () {
			  console.log("Error in SessionApiUtil#fetchCurrentUser");
			},
      complete: function(){
				complete();
			}
		});
	}
};

module.exports = SessionApiUtil;
