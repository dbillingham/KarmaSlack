Free Karma Bot For Slack
============================

#Intro
A lightweight karma bot designed to be integrated easily into slack.

#Setup

##Create new Outgoing WebHook:

    Shortcut: https://<team>.slack.com/services/new/outgoing-webhook
- Go to slack home "https://<team>.slack.com/home"
- Click "Integration"
- Click "Add" on "Outgoing WebHooks"

Click "Add Outgoing WebHooks Integration"

###Fill in the following configuration:
- Channel: Any
- Trigger Word: karma
- Url: http://warm-sea-8289.herokuapp.com/karma
- Token: (Leave as default)(copy this as you will need it later)
- Descriptive Label: (Leave as default)
- Customize Name: karma
- Customize Icon: (choose cat icon)
- Click "Save Settings"

    ![Outgoing WebHook Config](http://warm-sea-8289.herokuapp.com/instructions/outgoingWebHooksConfig.JPG)

Create the deferred object. Call its resolve or reject methods in the body. Then return the deferred promise.

	function promiseOld(field) {

		var deferred = $q.defer();

		dataService1(field).then(function() {
			deferred.resolve();
		});

		return deferred.promise;
	}

#ES6 Style Way
Return $q() which takes a functions with resolve and reject parameters through its construction. Then simply call resolve() / reject() methods within the function.

	function promiseNew(field) {

		return $q(function(resovle){
		
			dataService1(field).then(function() {
				resolve();
			});
		});
	}

#Conclusion
To conclude, this is a much cleaner code which ties closer to the promise interface found within the ES6 specification.
