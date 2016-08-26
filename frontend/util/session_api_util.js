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
			  alert("Logout failed");
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
			  alert("Fetch failed");
			},
      complete: function(){
				complete();
			}
		});
	}
};

module.exports = SessionApiUtil;
