

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





};

