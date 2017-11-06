/* TODO support funcs
 * sin, cos, tan
 * log_<base>
 */
const Lexer = require("./Lexer");

class Calc {
    constructor() {
        this.stack = [];
        this.w = null;
        this.l = null;
    }

    static calc(a, op, b) {
        return this._chooseOp(op)(a, b);
    }

    static _chooseOp(op) {
        switch (op) {
        case "+": return this.sum;
        case "-": return this.diff;
        case "/": return this.quo;
        case "*": return this.prod;
        case "^": return this.expo;
        }
    }

    static expo(a, b) {
        return Math.pow(a, b);
    }

    static sum(a, b) {
        return a + b;
    }

    static diff(a, b) {
        return a - b;
    }

    static prod(a, b) {
        return a * b;
    }

    static quo(a, b) {
        return a / b;
    }

    _lrecmut(nt, pfn) {
        if (nt.call(this))
            return pfn.call(this);
    }

    _ophit(ops, nt, pfn, follow) {
        if (ops.some(this._istok, this)) {
            var _op = this.w.token;
            var a = this.stack.pop();
            this.w = this.l.next();
            if (nt.call(this)) {
                var b = this.stack.pop();
                this.stack.push(Calc._chooseOp(_op)(a, b));
                return pfn.call(this);
            }
        } else if (follow.some(this._istok, this) || this.w.category === null) {
            return true;
        }
    }

    _istok(o) {
        return (o === this.w.token);
    }

    exec(expr) {
        this.l = new Lexer(expr);
        this.w = this.l.next();

        if (!(this.e() || this.w.category === null))
            throw new SyntaxError(this.w.token);

        return (Calc.ans = this.stack.pop());
    }

    e() {
        return this._lrecmut(this.p, this.ep);
    }

    ep() {
        return this._ophit(["+", "-"], this.p, this.ep, [")", "|"]);
    }

    p() {
        return this._lrecmut(this.x, this.pp);
    }

    pp() {
        return this._ophit(["*", "/"], this.x, this.pp, ["+", "-", ")", "|"]);
    }
    
    x() {
        return this._lrecmut(this.z, this.xp);
    }

    xp() {
        return this._ophit(["^"], this.z, this.xp, ["*", "/", "+", "-", ")", "|"]);
    }

    z() {
        if (this._wrapped_expr()) {
            return true;
        } else if (["INT", "IDENT", "PCNT"].some(k => Lexer.cat[k] === this.w.category)) {
            this.stack.push(Calc._val(this.w));
            this.w = this.l.next();
            return true;
        } else if (this.w.category === Lexer.cat.FUNC) {
            var fn = this.w.token;
            this.w = this.l.next();
            return this._wrapped_expr(this._rep_val, fn);
        } else if (this._wrapped_expr(this._rep_val, "abs", "|", "|")) {
            return true;
        }
    }

    _rep_val(fn) {
        this.stack.push(Calc._chooseFn(fn)(this.stack.pop()));
    }

    static _chooseFn(fn) {
        switch (fn) {
        case "sqrt": return Math.sqrt;
        case "log":  return Math.log10;
        case "ln":   return Math.log;
        case "abs":  return Math.abs;
        }
    }

    _wrapped_expr(cb, arg, a = "(", b = ")") {
        if (this.w.token === a) {
            this.w = this.l.next();
            if (this.e()) {
                if (this.w.token === b) {
                    this.w = this.l.next();
                    if (cb instanceof Function)
                        cb.call(this, arg);
                    return true;
                }
            }
        }
    }

    static _val(w) {
        var n;
        if (w.category === Lexer.cat.INT || w.category === Lexer.cat.PCNT) {
            n = parseInt(w.token);
            if (w.category === Lexer.cat.PCNT)
                n /= 100;
        } else if (w.category === Lexer.cat.IDENT) {
            if (w.token === "pi") {
                n = Math.PI;
            } else if (w.token === "e") {
                n = Math.E;
            } else if (w.token === "ans") {
                n = this.ans;
            }
        }
        return n;
    }
}
Calc.ans = 0;
module.exports = Calc;
