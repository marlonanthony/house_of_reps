const keys = require('../../config/keys')

module.exports = emailInfo => {
  return `
    <html>
      <body>
        <div style='text-align: center'>
          <h3>House of Reps</h3>
          <p>${emailInfo.body}</p>
          <a href="${keys.redirectDomain}/verify/?token=${emailInfo.token}">Confirm email</a>
        </div>
      </body>
    </html>
  `
}

// email=${emailInfo.recipients}&