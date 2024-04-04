const handleResponse = (statusCode, data) => ({
  statusCode,
  body: JSON.stringify(data),
})

module.exports = handleResponse
