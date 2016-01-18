var KarelCodeCompiler = (function (){
    var compiler = {};

    function myPrivateFunctionToCompileCodeAndReturnCommands(code, maps) {
        var result = false;
        var adaptCodes = adaptCode(code);
        var resultExecution = runKarel(adaptCodes, maps.original);
        var actionCommands = resultExecution.actions;
        if (actionCommands[actionCommands.length - 1].command == 'finish'){
            result = compareMaps(maps.final, resultExecution.resultMap);
        }
        return {commands: actionCommands, result: result};
    }

    compiler.compile = function (data) {
        return myPrivateFunctionToCompileCodeAndReturnCommands(data.code, data.maps);
    };
    return compiler


})();