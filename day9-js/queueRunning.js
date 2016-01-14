function QueueRunner(handler){
    this.handler = handler || function(data, onFinish){ onFinish(data, 'success', 'ok'); };
    this.queue = [];

    this.push = function(params){
        this.queue.push(params);
        exec(this);
        return this;
    };

    this.pause = function(){
        isPaused = true;
        return this;
    };
    this.resume = function(){
        isPaused = false;
        exec(this);
        return this;
    };
    this.clear = function(){
        isCanceled = true;
        return this;
    };

    var isRunning = false;
    var isPaused = false;
    var isCanceled = false;

    function exec(obj) {
        var params;
        if (isCanceled) {
            while (params = obj.queue.shift()) {
                params.onFinish(params.data, 'canceled', 'Canceled queue');
            }
            isRunning = false;
            isPaused = false;
            isCanceled = false;
        } else if (!isRunning && !isPaused && obj.queue.length > 0) {
            params = obj.queue.shift();
            isRunning = true;
            try {
                obj.handler.call(obj, params.data, function(data, status, error){
                    params.onFinish(data, status, error);
                    isRunning = false;
                    exec(obj);
                });
            } catch (ex) {
                params.onFinish(params.data, "error", ex);
                isRunning = false;
                exec(obj);
            }
        }
    }
    return this;
}

