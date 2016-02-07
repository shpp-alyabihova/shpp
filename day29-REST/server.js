var express = require('express');
//var path = require('path');
var bodyParser = require('body-parser');
var log = require('./moduls/logger')(module);

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var streams = {}; //{streamID: state};
var allowLists = {}; // {streamID: {userID: state, userID: state}, streamID: {userID: state, userID: state}}


var msg = {
    200: 'OK: ',
    201: 'Success adding: ',
    202: 'Success updaing: ',
    400: 'Bad Request',
    404: 'Not Found',
    422: 'Unprocessable Entity: ',
    500: 'Internal server error'
};


app.post('/streams', function (req, res, next) {
    var streamID = req.query.streamId;
    if (streamID) {
        streams[streamID] = true;
        sendSuccessRes(res, '201', 'streamId=' + streamID);
    } else
        sendErrorRes(res, '400');
});

app.get('/allowlist', function (req, res, next) {
    var streamID = req.query.streamId;
    if (streamID) {
        if ((streams[streamID] !== undefined) && (allowLists[streamID] !== undefined)) {
            var userID = req.query.userId;
            if (allowLists[streamID][userID])
                sendSuccessRes(res, '200', 'Access-accept', true);
            else
                sendSuccessRes(res, '200', 'Access-denied', false);
        } else
            sendErrorRes(res, '422', 'streamId=' + streamID);
    } else
        sendErrorRes(res, '400');
});

app.put('/allowlist/:action', function (req, res) {
    var action = req.params.action;
    var userID = req.query.userId;
    var streamID = req.query.streamId;
    var state;
    if (streamID && userID) {
        if (action == 'add') {
            state = 1;
            if (!(streamID in allowLists)) {
                allowLists[streamID] = {};
            }
            allowLists[streamID][userID] = true;
            sendSuccessRes(res, '201', 'userId=' + userID);
        } else if (action == 'del') {
            state = 2;
            if (streamID in allowLists) {
                if (userID in allowLists[streamID]) {
                    delete  allowLists[streamID][userID];
                    sendSuccessRes(res, '202', 'userId=' + userID);
                } else
                    sendErrorRes(res, '422', 'userId=' + userID);
            } else
                sendErrorRes(res, '422', 'streamId=' + streamID);
        }
    } else if (!state)
        sendErrorRes(res, '400');

});

app.delete('/streams', function (req, res) {
    var streamID = req.query.streamId;
    if (streamID) {
        if (streamID in streams) {
            delete  streams[streamID];
            sendSuccessRes(res, '202', 'streamId=' + streamID);
            if (streamID in allowLists)
                delete allowLists[streamID];
        } else
            sendErrorRes(res, '422', 'streamId=' + streamID);
    } else
        sendErrorRes(res, '400');
});

function sendErrorRes(res, code, param) {
    var param = param || '';
    log.error(msg[code] + param);
    res.status(code);
    res.send({'code': code, "message": msg[code] + param});
}

function sendSuccessRes(res, code, param, data) {
    var param = param || '';
    log.info(msg[code] + param);
    res.status('200');
    res.send({'code': code, "message": msg[code] + param, 'response': data});
}
app.use(function (req, res) {
    sendErrorRes(res, '404');
});

app.use(function (err, req, res) {
    sendErrorRes(res, 500);
});

var server = app.listen(8081, function () {
    console.log('Running on http://localhost:8081');
});