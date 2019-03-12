const sendgrid = require('sendgrid') 
const helpler = sendgrid.mail 
const keys = require('../config/keys')

class Mailer extends helpler.Mail {
  constructor({ subject, recipients }, content) {
    super()

    this.sgApi = sendgrid(keys.sendGridKey) 
    this.from_email = new helpler.Email('mad1083@gmail.com')
    this.subject = subject 
    this.body = new helpler.Content('text/html', content) 
    this.recipients = new helpler.Email(recipients)

    this.addContent(this.body) 
    this.addClickTracking()
    this.addRecipients(this.recipients) 

  }

  addClickTracking() {
    const trackingSettings = new helpler.TrackingSettings() 
    const clickTracking = new helpler.ClickTracking(true, true) 

    trackingSettings.setClickTracking(clickTracking) 
    this.addTrackingSettings(trackingSettings) 
  }

  addRecipients(recipients) {
    const personalize = new helpler.Personalization()
    personalize.addTo(recipients) 
    this.addPersonalization(personalize)
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON() 
    })

    try {
    const response = await this.sgApi.API(request) 
    return response 
    } catch (err) {
      console.log(err) 
    }
  }
}

module.exports = Mailer 