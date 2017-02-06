function addHeaders(headers, file) {
    headers["Content-Type"] = "text/" + file.name.split(/\./)[1];
    headers["Content-Length"] = file.size;
    headers["Content-Encoding"] = "gzip";
    return headers;
}

describe("addHeaders()", function() {
    it("adds Content-* fields", function() {
        const headers = addHeaders({}, {
            name: "styles.css", size: 1024
        });
        expect(headers).toEqual({
            "Content-Type": "text/css",
            "Content-Length": 1024,
            "Content-Encoding": "gzip",
        });
    });

    it("preserves original headers", function() {
        const headers = addHeaders({"Server": "example.com"}, {
            name: "styles.css", size: 1024
        });
        expect(headers["Server"]).toEqual("example.com");
    });
});
