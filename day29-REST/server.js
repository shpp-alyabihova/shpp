var express = require('express');
var bodyParser = require('body-parser');
var log  = require('./moduls/logger')(module);

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var msg = {
    200: 'Access-accept',
    201: 'Success adding',
    202: 'Success updaing',
    400: 'Bad Request',
    404: 'Not Found',
    422: 'Unprocessable Entity',
    500: 'Internal server error'
};


app.post('/streams', function(req, res, next) {
    var streamID = req.query.streamId();
    if (streamID) {
        streams[streamID] = true;
        sendSuccessRes(res, 201, streamID);
    } else
        sendErrorRes(res, 400);
});

app.get('/allowlist', function(req, res, next) {
    var streamID =  req.query.streamId();
        if (streamID) {
            if (streams[streamID] !== undefined) {
                var userID =  req.query.userId();
                if (streams.streamID[userID])
                    sendSuccessRes(res, 200);
                else
                    sendErrorRes(res, 422, userID);
            } else
                sendErrorRes(res, 422, streamID);
        } else
            sendErrorRes(res, 400);
});

app.put('/allowlist', function(req, res) {
    var action = req.params.name;
    var userID =  req.query.userId();
    var streamID =  req.query.streamId();
    var state;
    if (action == 'add') {
        state = 1;
        allowLists[streamID = {userID: true}];
        sendSuccessRes(res, 201, userID);

    } else if (action == 'del') {
        state = 2;
        if (allowLists[streamID] !== undefined) {
            if (allowLists.streamID[userID] !== undefined) {
                delete  allowLists.streamID.userID;
                sendSuccessRes(res, 202, userID);
            } else
                sendErrorRes(res, 422, userID);
        } else
            sendErrorRes(res, 422, streamID);
    }
    if (!state)
        sendErrorRes(res, 400);
});

app.delete('/streams', function(req, res) {
    var streamID = req.query.streamId();
    if (streamID) {
        if (streams[streamID] !== undefined){
            delete  streams.streamID;
            //  streams[streamID] = false;
            sendSuccessRes(res, 202, streamID);
        } else
            sendErrorRes(res, 422, streamID);
    } else
        sendErrorRes(res, 400);
});

function sendErrorRes(res, code, param) {
    log.error(msg.code + param);
    res.status(code);
    res.send({'code': code, "message": msg.code + param});
}

function sendSuccessRes(res, code, param) {
    log.info(msg.code + param);
    res.status(200);
    res.send({'code': code, "message": msg.code + param});
}

app.use(function(req, res, next){
    sendErrorRes(res, 404);
});

app.use(function(err, req, res, next){
    sendErrorRes(res, 500);
});

var server = app.listen(8081, function() {
    console.log('Running on http://localhost:8081');
});