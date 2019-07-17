// You must set SerpAPI private API Key
// https://serpapi.com/dashboard
String api_key = ""

/**
 * Get Google result rank for a domain, a keyword, and an optional location
 *
 * This returns the current ranking on Google without persisting the rank.
 * Google sheet will automatically refresh this data everytime the sheet open. 
 * To persist the data, the "add rank button" enables to save the result in the spreadsheet.
 *
 * @param {starbucks.com} domain to rank in the Google results.
 * @param {Coffee} query to search on Google.
 * @param {Austin, Texas, United States} opt_location optional normalized location for google. see: https://serpapi.com/search-api.
 * @param {en} opt_hl optional google hl parameter.
 * @param {us} opt_gl optional google gl parameter.
 * @param {2020-01-01} opt_date optional date where the query is executed this enabled to persist the query on the backend (experimental).
 * @return {Number} rank of the domain in the search result as of today at a given location.
 * @customfunction
 */
function GOOGLERANK(domain, query, opt_location, opt_hl, opt_gl, opt_date) {  
  if(domain == null) {
    return "domain must be provided";
  }
  
  if(query == null) {
    return "query must be provided";
  }
  
  // TODO enable other country than USA
  var url = 'https://serpapi.com/search'
  + '?q=' + encodeURIComponent(query)
  + '&output=rank:' + encodeURIComponent(domain) 
  + '&google_domain=google.com'
  + '&num=100'
  + '&api_key=' + api_key;
  
  // optional location
  if(opt_location != null) {
    url += '&location=' + encodeURIComponent(opt_location);
  }
  
  // optional gl parameter
  if(opt_gl != null) {
     url += '&gl=' + opt_gl;
  }
  
  // optional hl parameter
  if(opt_hl != null) {
     url += '&hl=' + opt_hl;
  }
  
  // optional date for caching purpose
  if(opt_date != null) {
    url += '&date=' + opt_date;
  }

  var rank = UrlFetchApp.fetch(url, {'muteHttpExceptions': true}).getContentText();
  
  if(rank == "-") {
    return rank;
  }
  
  // convert rank to a number
  try {
    return parseInt(rank);
  } catch(e) {
    return rank;
  }
}
