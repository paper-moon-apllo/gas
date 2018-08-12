module.exports = function (tag) {
    const self = this;
    const fileId = require('../secret/Google.js').logFileId;
    this.level = require('../secret/Google.js').logLevel;

    const file = DocumentApp.openById(fileId);
    const body = file.getBody();

    const levels = 'newidv';

    const put = (level, object) => {
        if (self.level < levels.indexOf(level)) return;

        const text = typeof object === 'string' ? object : JSON.stringify(object);
        const datetime = JSON.stringify(new Date()).substring(1, 20);
        body.appendParagraph('[' + datetime + '] (' + tag + ') ' + level.toUpperCase() + ': ' + text);
    };

    [].map.call(levels, level => {
        self[level] = object => put(level, object);
    });
};