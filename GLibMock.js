const gas = require('gas-local');
const fs = require('fs');

gas.globalMockDefault.Logger.enabled = false;

const defMock = gas.globalMockDefault;

const customMock = {
    ContentService: {
        createTextOutput: function (text) {
            return {
                setMimeType: function (mimeType) {
                    return {
                        content: text,
                        mime: mimeType,
                    };
                },
            };
        },
        MimeType: {
            JSON: 'application/javascript'
        },
    },
    DocumentApp: {
        openById: function (fileId) {
            return {
                getBody: function () {
                    return {
                        appendParagraph: function (text) {
                            console.log(text);
                        },
                    };
                },
            };
        },
    },
    __proto__: defMock,
};

module.exports = gas.require('./src', customMock);