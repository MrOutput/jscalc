const Enum = require("./Enum");

class Lexer {
    constructor(string) {
        this.string = string;
        this.i = 0;
    }

    next() {
        var lexeme = { token: "", category: null };
        var c = this.getchar();

        lexeme.token = c;

        if (c === "0") {
            lexeme.category = Lexer.cat.ZERO;
        } else if (c === "*" || c === "/" ||
                   c === "+" || c === "^") {
            lexeme.category = Lexer.cat.OP;
        } else if (c === "(") {
            lexeme.category = Lexer.cat.LP;
        } else if (c === ")") {
            lexeme.category = Lexer.cat.RP;
        } else if ((c === "-") || (c >= "1" && c <= "9")) {
            lexeme.token = "";
            lexeme.category = Lexer.cat.INT;
            if (c === "-") {
                this.rewind();
                this.rewind();
                var p = this.getchar();
                this.getchar();
                var n = this.getchar();
                this.rewind();
                if ((p === ")" || Lexer.isdigit(p)) &&
                    (n === "(" || n === "-" || Lexer.isdigit(n))) {
                    lexeme.category = Lexer.cat.OP;
                    lexeme.token = c;
                    return lexeme;
                }
            }
            do {
                lexeme.token += c;
                c = this.getchar();
            } while (Lexer.isdigit(c));
            this.rewind();
            this.rewind();
            var c = this.getchar();
            if (c === "-")
                throw new SyntaxError();
        } else if (c !== "") {
            throw new SyntaxError();
        }

        return lexeme;
    }

    static isdigit(c) {
        return (c >= "0" && c <= "9");
    }

    static isws(c) {
        return (c === " " || c === "\t");
    }

    getchar() {
        var c;
        do {
            c = this.string.charAt(this.i++);
        } while (Lexer.isws(c));
        return c;
    }

    rewind() {
        var c;
        do {
            c = this.string.charAt(--this.i);
        } while (Lexer.isws(c));
    }
}
Lexer.cat = new Enum(["OP", "ZERO", "LP", "RP", "INT"], 1);
module.exports = Lexer;
