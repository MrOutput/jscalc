function* Lexer(expr) {
    var _regex = new RegExp(Lexer.lang, "g");
    var x;
    while ((x = _regex.exec(expr)) !== null) {
        var [ token ] = x;
        for (var category in Lexer.categories) {
            if (new RegExp(Lexer.categories[category]).test(token)) {
                yield { token, category };
                break;
            }
        }
    }
}
Lexer.categories = {
    op: "[+*/^|-]",
    num: "\\d+(?:\\.\\d+)?%?",
    group: "[\\[()\\]]",
    ident: "ans|pi|e",
    func: "sqrt|abs|log|ln|sin|cos|tan",
};
Lexer.lang = (function () {
    var s = "";
    Object.keys(Lexer.categories).forEach((c, i, arr) => {
        s += Lexer.categories[c];
        if (i < arr.length-1)
            s += "|";
    });
    return s;
})();

/*
for (lexeme of Lexer("3.5+3-2+[(-2+4)*(4/2)]")) {
    console.log(lexeme);
}
*/

module.exports = Lexer;
