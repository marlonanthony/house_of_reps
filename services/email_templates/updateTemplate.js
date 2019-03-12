module.exports = emailInfo => {
  return `
    <html>
      <body>
        <div style='text-align: center'>
          <h3>House of Reps</h3>
          <p>${emailInfo.body}</p>
          <a href='http://localhost:3000/feed'>Confirm email</a>
        </div>
      </body>
    </html>
  `
}