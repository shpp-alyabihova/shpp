

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
