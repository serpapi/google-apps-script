// You must set SerpAPI private API Key
// https://serpapi.com/dashboard
var api_key = ""

/**
* Returns Google search results
*
* @param {"cars"} query REQUIRED The root domain, example: "nytimes.com", DO NOT include protocol (http/https)
* @param {Austin,TX,Texas,United States} location OPTIONAL normalized location for google: =GOOGLELOCATION("city, state, country"). see: https://serpapi.com/search-api. Default is `null`.
* @param {"en"} language OPTIONAL The country database you want to search from. Default is US
* @param {"us"} country OPTIONAL Leave this blank for current data. YYYYMM format for historical reports, note: always reports on the 15th of the month.
* @param {10} num OPTIONAL true to EXCLUDE column headers or false to include. Default is false.
* @param {"desktop"} device OPTIONAL use "mobile" for mobile results, "desktop" is default
* @param {"100"} offset OPTIONAL offset for google search results (start= param)
* @return Returns organic keywords count, organic traffic, organic cost, adwords data
* @customfunction
*/
function GOOGLESEARCH(query, opt_location, opt_language, opt_country, opt_num, opt_device, opt_offset) {
  if(query == null) {
    return "query must be provided"
  }
  
  if(api_key == null) {
   return "api_key must be hard coded in the code"
  }
  
  try {
    var url = "https://serpapi.com/search?q=" + query + "&api_key=" + api_key;
    
    if(opt_location != null) {
     url += '&location=' + encodeURIComponent(opt_location)
    }
    
    if(opt_language != null) {
     url += "&hl=" + opt_language;
    }
    
    if(opt_country != null) {
     url += "&gl=" + opt_country
    }
    
    if(opt_device != null ){
     url += "&device=" + opt_device
    }
    
    if(opt_offset ) {
      var num = opt_num || 100
      var offset = opt_offset || 0
      url += "&num=" + (num + offset)
    }
    
    var req = UrlFetchApp.fetch(url, {muteHttpExceptions:true}).getContentText();
    var rsp = JSON.parse(req)
    if (rsp.error) {
      throw rsp.error
    }
    
    var resultArray = []
    // iterate on all organic_results
    rsp["organic_results"].forEach(function(item) {
      // extract the link per search result
      resultArray.push(item.link)
    })
    return resultArray
  }
  catch(e) {
    return e 
  }
}
