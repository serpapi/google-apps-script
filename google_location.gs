/***
 * Get location canonical name normalized based on Google location system.
 *
 * @param {"Miami, FL"} location short name for the location
 * @return {String} canonical name normalized by Google location system
 * @customfunction
 */
function GOOGLELOCATION(location) {
  if(location == null) {
    var ui = SpreadsheetApp.getUi();
    ui.alert("GOOGLELOCATION takes the name of a location as argument\nlike: =SERPAPILOCATION('Paris, France')");
    return "error";
  }
  // free end point
  var url = 'https://serpapi.com/locations.json'
  + '?q=' + encodeURIComponent(location)
  + '&limit=1';

  var rsp = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  var buf = rsp.getContentText();
  try {
    var data = JSON.parse(buf);
    if(data.length == 0) {
      return "no match";
    }
    return data[0].canonical_name;
  } catch(e) {
    return buf;
  }
}
