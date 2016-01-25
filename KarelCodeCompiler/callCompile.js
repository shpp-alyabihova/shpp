
var data = {
    code: 'move();pickBeeper();move();putBeeper();turnLeft();if(beepersPresent()){putBeeper();pickBeeper();}while(frontIsClear()){move();}putBeeper()',
    maps: {original: [
                ['', 1, '', '', 'x'],
                [1, '', '', '', 'x'],
                ['', '', 2, '', 'x'],
                [1, '>', 1, '', 'x']
            ],
        final: [
                ['', 1, '', 1, 'x'],
                [1, '', '', '', 'x'],
                ['', '', 2, '', 'x'],
                [1, '', 0, 1, 'x']
            ]

    }

};
console.log(KarelCodeCompiler.compile(data));