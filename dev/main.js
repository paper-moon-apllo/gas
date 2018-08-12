const Log = require('./Log');

global.log = new Log('MAIN');
global.token = require('../secret/Google').token;

global.dbId = require('../secret/Google').dbFileId;
global.tableSystem = require('../secret/Google').tableSystem;
global.tableAdd = require('../secret/Google').tableAdd;

global.doPost = function (query) {
    const log = global.log;
    log.v('Call doGet function');
    log.v(`Query is '${JSON.stringify(query)}'`);

    if (query.parameter.token !== global.token) {
        log.e('Bad token access');
        return ContentService
            .createTextOutput(JSON.stringify({content: 'Bad access'}))
            .setMimeType(ContentService.MimeType.JSON);
    }

    // DB SHEET
    var sheetFile = SpreadsheetApp.openById(global.dbId);
    var param = query.parameter; 
    var type = param.type;
    
    var result = 0;
    if (type == "SYSTEM") {
        var sheet = sheetFile.getSheetByName(global.tableSystem);
        sheet.getRange('A1').setValue(query.parameter.system).setBackgroundColor('#eee');  
    } else if (type == "ADD") {
        var sheet = sheetFile.getSheetByName(global.tableAdd);
        sheet.appendRow([param.add1, param.add2, param.add3
        ]);
    } else if(type == 'POST') {
        var urlParam = "?value1=111&value2=22&value3=val3";
        var url = require('../secret/Google').iftttPostURL + urlParam;
        var botMessage = { 'text' : 'Hello from GoogleAppsScript!'}
      
        var options = {
          'method': 'POST',
          'headers' : {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          'payload':JSON.stringify(botMessage)
        };
      
        result = UrlFetchApp.fetch(url, options);
    }

    return ContentService
        .createTextOutput(JSON.stringify({content: type + ' ' + 'Process OK(' + result + ')'}))
        .setMimeType(ContentService.MimeType.JSON);
};

global.doGet = function (query) {
    return global.doPost(query);
}