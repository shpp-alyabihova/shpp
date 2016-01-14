

function Cache(limit) {
    this.limit = limit && 5;
    this.count = 0;
    this.priority = 0;
    this.values  = [];
    this.priorities = {};
    this.keys  = {};
}


Cache.prototype = {
    'set': function (key, value){
        if (this.count < this.limit) {
            this.priorities[this.priority] = this.count;
            this.values[this.count] = value;
            this.count++;
        }
        else {
            var i, minPriority = null;
            for (i in this.priorities) {
                if (minPriority === null || minPriority > i){
                    minPriority = i;
                }
            }
            for (i in this.keys) {
                if (this.keys[i] == minPriority){
                    delete this.keys[i];
                    break;
                }
            }

            this.priorities[this.priority] = minPriority;
            this.values[this.priorities[minPriority]] = value;
            delete this.priorities[minPriority];
        }
        this.keys[key] = this.priority;
        this.priority++;
    },

    'get': function (key) {
        if (key && typeof this.keys[key] != 'undefined') {
            if (this.count >= this.limit) {
                this.priority++;
            }
            var keyPriority = this.keys[key];
            var idx = this.priorities[keyPriority];
            var value = this.values[idx];
            this.keys[key] = this.priority;
            delete this.priorities[keyPriority];
            this.priorities[this.priority] = idx;
            this.priority++;
            return value
        }
        return null;
    }





    /*
    cache.prototype = {
        'set': function (key, value) {
            if (key && typeof value != undefined) {

                keys[key] = values.push(value) - 1;

                if (count < limit) {
                    count++;
                } else {
                    var olderKey = null,
                        olderIdx = values.length;
                    for (var k in keys) {
                        if (keys[k] < olderIdx) {
                            olderIdx = keys[k];
                            olderKey = k;
                        }
                    }
                    if (olderKey !== null) {
                        delete values[olderIdx];
                        delete keys[olderKey];
                    }
                }
            }
        },*/
  /*  'get': function () {
        if (key && typeof keys[key] != 'undefined') {
            var idx = keys[key];
            if (typeof values[idx] != 'undefined') {
                var value = values[idx];
                keys[key] = values.push(value) - 1;
                delete values[idx];
                return value;
            }
        }
        return null;
    }*/
};




/*
function Cache(limit) {
    this.limit = limit && 5;
    this.count = 0;
    this.vals  = [];
    this.keys  = {};
}
Cache.prototype = {
    'set': function (key, value) {
        if (key && typeof value != 'undefined') {
            if (this.count < this.limit) {
                this.count++;
            } else {
                var olderKey = null,
                    olderIdx = this.vals.length;
                for (var k in this.keys) {
                    if (this.keys[k] < olderIdx) {
                        olderIdx = this.keys[k];
                        olderKey = k;
                    }
                }
                if (olderKey !== null) {
                    delete this.vals[olderIdx];
                    delete this.keys[olderKey];
                }
            }
            this.keys[key] = this.vals.push(value) - 1;
        }
    },
    'get': function (key) {
        if (key && typeof this.keys[key] != 'undefined') {
            var idx = this.keys[key];
            if (typeof this.vals[idx] != 'undefined') {
                var value = this.vals[idx];
                this.keys[key] = this.vals.push(value) - 1;
                delete this.vals[idx];
                return value;
            }
        }
        return null;
    }
};
*/
