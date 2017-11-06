const Enum = require("./Enum");

class Lexer {
    constructor(string) {
        this.string = string;
        this.i = 0;
    }

    next() {
        var lexeme = { token: "", category: null };
        var c = this.getchar();
        var n;

        lexeme.token = c;

        if (c === "0") {
            lexeme.category = Lexer.cat.INT;
        } else if (c === "*" || c === "/" || c === "+" ||
                   c === "^" || c === "|") {
            lexeme.category = Lexer.cat.OP;
        } else if (c === "e" || (c === "p" && this.getchar() === "i") ||
                  (c === "a" && this.getchar() === "n" && this.getchar() === "s")) {
            if (c === "p") {
                lexeme.token = "pi";
            } else if (c === "a") {
                lexeme.token = "ans";
            }
            lexeme.category = Lexer.cat.IDENT;
        } else if (c === "s" && this.getchar() === "q" &&
                   this.getchar() === "r" && this.getchar() === "t") {
            lexeme.token = "sqrt";
            lexeme.category = Lexer.cat.FUNC;
        } else if (c === "l" && ((n = this.getchar()) === "n" || n === "o" &&
                   this.getchar() === "g")) {
            lexeme.token = (n === "n") ? "ln" : "log";
            lexeme.category = Lexer.cat.FUNC;
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
            if (c === "%")
                lexeme.category = Lexer.cat.PCNT;
            else
                this.rewind();
            this.rewind();
            var c = this.getchar();
            if (c === "-")
                throw new SyntaxError();
        } else if (c !== "") {
            console.log("char '%s'", c);
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
Lexer.cat = new Enum(["OP", "LP", "RP", "INT", "IDENT", "PCNT", "FUNC"], 1);
module.exports = Lexer;
