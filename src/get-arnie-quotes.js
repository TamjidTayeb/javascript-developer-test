const { httpGet } = require('./mock-http-interface');

// Constants
const OK_RES = 200
const SUCC_KEY = 'Arnie Quote'
const FAIL_KEY = 'FAILURE'

const getArnieQuotes = (urls) => {
  // Map over the urls and return an array of the initiated promises
  const promises = urls.map( async url => {
    try {
      // Initiate get request
      const response = await httpGet(url)
      
      // Extract response status
      const { status } = response
      // Parse response body and extract message
      const { message } = JSON.parse(response.body)

      // Return object with key based on response status
      const key = status === OK_RES ? SUCC_KEY : FAIL_KEY
      return { [key]: message }
    } catch(err) {
      return err
    }
  })
  // Return the array of pending promises which will resolve to objects containing arnie quotes
  return Promise.all(promises);
};

module.exports = {
  getArnieQuotes,
};
