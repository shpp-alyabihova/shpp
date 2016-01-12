function $(id) {
    return {
        property : document.getElementById(id),
        html : function(sometext) {
            if(arguments.length > 0){
                this.property.innerHTML = sometext;
            }
            return this.property.innerHTML;
        }
    };
}