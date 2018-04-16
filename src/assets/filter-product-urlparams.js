// parses the received URL
// and returns an array containing the found URL params
const getProductUrlparams = url => {
    return url.includes('?') ? url.replace(/(http){1}.+\?+/, '').split('&') : false
  }
