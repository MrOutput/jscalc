const Calculator = require("./lib/Calc");

var calc = new Calculator();

try {
    console.time('calcuation time');
    [
        "-3 + (5-6)",
        "(3+1) + (-3-1)",
        "-23 + 3 - (18 + (-3 - 8))",
        "3 + 2 + 3",
        "3 + 2 / 3",
        "3 + 2 * 3",
        "3^2",
        "3^(2*2)",
        "3^2*2",
        "3 + 2 - 1 + (-3-3)"
    ].forEach(expr => console.log("%s = %s", expr, calc.exec(expr)));
    console.timeEnd('calcuation time');
} catch (e) {
    console.log("unexpected token '%s'", e);
}
