const handleResponse = require('../../../utils')

describe('handleResponse function', () => {
  test('should return correct response object with status code 200 and message', () => {
    const response = handleResponse(200, { message: 'Test message' })
    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({ message: 'Test message' }),
    })
  })

  test('should return correct response object with status code 400 and message', () => {
    const response = handleResponse(400, { message: 'Error message' })
    expect(response).toEqual({
      statusCode: 400,
      body: JSON.stringify({ message: 'Error message' }),
    })
  })
})
