# jscalc

JavaScript Calculator Library

## Install

```sh
npm install @mroutput/jscalc
```

## Usage

```js
const Calculator = require("@mroutput/jscalc");

var c = new Calculator();
var ans = c.exec("5 + 3");//8
```

## Examples

```sh
rafael@mroutput ~/github/jscalc $ node example.js 
|(5-100) / 2| = 47.5
-3 + (5-6) = -4
(3+1) + (-3-1) = 0
-23 + 3 - (18 + (-3 - 8)) = -27
3 + 2 + 3 = 8
3 + 2 / 3 = 3.6666666666666665
3 + 2 * 3 = 9
100 * 10% = 10
5% + 2% = 0.07
3^2 = 9
3^(2*2) = 81
3^2*2 = 18
pi*2^2 = 12.566370614359172
ans+1 = 13.566370614359172
e+2 = 4.718281828459045
sqrt(2 + 2) = 2
sqrt((10 + 10) * 5) = 10
sqrt(10^2) + 2 = 12
log(100) = 2
ln(e^3) = 3
|-3| = 3
5-10 = -5
|5-10| = 5
3 = 3
3 + 2 - 1 + (-3-3) = -2
calculation time: 14.683ms
```
