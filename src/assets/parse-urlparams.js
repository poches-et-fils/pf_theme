// parses the received URL
// and returns an array containing the found URL params
const getProductUrlparams = url => {
  if(typeof url === 'string') {
    return url.replace(/(http){1}.+\?+/, '').split('&')
  } else {
    return false
  }
}