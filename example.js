const Calculator = require("./lib/Calc");

var calc = new Calculator();

try {
    console.time('calculation time');
    [
        "|(5-100) / 2|",
        "-3 + (5-6)",
        "(3+1) + (-3-1)",
        "-23 + 3 - (18 + (-3 - 8))",
        "3 + 2 + 3",
        "3 + 2 / 3",
        "3 + 2 * 3",
        "100 * 10%",
        "5% + 2%",
        "3^2",
        "3^(2*2)",
        "3^2*2",
        "pi*2^2",
        "ans+1",
        "e+2",
        "sqrt(2 + 2)",
        "sqrt((10 + 10) * 5)",
        "sqrt(10^2) + 2",
        "log(100)",
        "ln(e^3)",
        "|-3|",
        "5-10",
        "|5-10|",
        "3",
        "3 + 2 - 1 + (-3-3)"
    ].forEach(expr => console.log("%s = %s", expr, calc.exec(expr)));
    console.timeEnd('calculation time');
} catch (e) {
    console.log("unexpected token '%s'", e);
}
