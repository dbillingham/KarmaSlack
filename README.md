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

##Create new Incoming WebHook:

    Shortcut: https://<team>.slack.com/services/new/incoming-webhook
- Go to slack home "https://<team>.slack.com/home"
- Click "Integration"
- Click "Add" on "Incoming WebHooks"

###Fill in the following configuration:
- Post to Channel: #general

- Click "Add Incoming WebHooks Integration"
- Fill in the following configuration:
- Post to Channel: #general
- Webhook URL: (Leave as default)(copy this as you will need it later)
- Descriptive Label: (Leave as default)
- Customize Name: karma
- Customize Icon: (choose cat icon)
- Click "Save Settings"

    ![Incoming WebHook Config](http://warm-sea-8289.herokuapp.com/instructions/incomingWebHooksConfig.JPG)

##Initialising karma:
Within slack, (general channel), run karma init passing the:
- Outgoing WebHook Token
- Incoming WebHook Url

        E.g:
        karma: init {
            "incomingWebhookUrl": "https://hooks.slack.com/services/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",
            "outgoingToken": "25LnEy4vXHEi88Plrpvg6htP"
        }

You should how see a confirmation message, if you dont, then either of these two properties is incorrect.

##Complete:

run "karma: ?" for a full list of karma commands