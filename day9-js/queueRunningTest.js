
function onFinishCallback(data, status, error) {
    // on finish handler
    if (status == 'error') {
        console.log('ERROR: '+ error);
    } else if (status == 'success') {
        console.log('RESULT: '+ data.result);
    } else {
        console.log('STATUS: '+ status +': '+ error);
    }
}

function someAsyncFunction(data, onFinish){
    data.result = data.source * 2;
    if (data.source == 6) {
        this.clear();
        throw 'Unavailable data'
    }
    onFinish(data, 'success', 'ok');
    if (data.source == 3) {
        console.log('Exec paused for 2 sec.');
        this.pause();
        var self = this;
        window.setTimeout(function(){
            self.resume();
        }, 2000);
    }
}

new QueueRunner(someAsyncFunction).push({
    data : { 'source' : 1 },
    onFinish : onFinishCallback
}).push({
    data : { 'source' : 2 },
    onFinish : onFinishCallback
}).push({
    data : { 'source' : 3 },
    onFinish : onFinishCallback
}).push({
    data : { 'source' : 4 },
    onFinish : onFinishCallback
}).push({
    data : { 'source' : 5 },
    onFinish : onFinishCallback
}).push({
    data : { 'source' : 6 },
    onFinish : onFinishCallback
}).push({
    data : { 'source' : 7 },
    onFinish : onFinishCallback
}).push({
    data : { 'source' : 8 },
    onFinish : onFinishCallback
}).push({
    data : { 'source' : 9 },
    onFinish : onFinishCallback
});



