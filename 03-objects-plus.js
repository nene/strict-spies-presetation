// But this code won't be like this for a long.
// We get a requirement for also adding Cache headers:

function addHeaders(headers, file) {
    headers["Content-Type"] = "text/" + file.name.split(/\./)[1];
    headers["Content-Length"] = file.size;
    headers["Content-Encoding"] = "gzip";

    if (file.cache === false) {
        headers["Cache-Control"] = "no-cache";
        headers["Pragma"] = "no-cache";
        headers["Expires"] = "0";
    }

    return headers;
}


describe("addHeaders()", function() {
    it("adds Content-* fields", function() {
        const headers = addHeaders({}, {
            name: "styles.css", size: 1024
        });
        expect(headers).toEqual(jasmine.objectContaining({
            "Content-Type": "text/css",
            "Content-Length": 1024,
            "Content-Encoding": "gzip",
        }));
    });

    it("preserves original headers", function() {
        const headers = addHeaders({"Server": "example.com"}, {
            name: "styles.css", size: 1024
        });
        expect(headers["Server"]).toEqual("example.com");
    });

    it("adds Cache-Control fields for non-cacheable resources", function() {
        const headers = addHeaders({}, {
            name: "styles.css", size: 1024, cache: false
        });
        expect(headers).toEqual(jasmine.objectContaining({
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Expires": "0",
        }));
    });
});

// However, we also need to ensure that we don't add
// the Cache-Control headers in ordinary case.
// We could add an explicit assertion:

// --> expect(headers["Cache-Control"]).not.toBeDefined();

// Or we could check the expected count of headers:

// --> expect(Object.keys(headers).length).toEqual(3);

// But counting is a job for computers.

// This all happens because we're testing only the partial return value.
// It's very similar to the silly case where we were testing just the part of the string that the function returned.


// But it would be much simpler to just compare the
// whole returned object:

describe("addHeaders()", function() {
    it("adds only Content-* fields for CSS files", function() {
        const headers = addHeaders({"Server": "example.com"}, {
            name: "styles.css", size: 1024
        });
        expect(headers).toEqual({
            "Server": "example.com",
            "Content-Type": "text/css",
            "Content-Length": 1024,
            "Content-Encoding": "gzip",
        });
    });

    it("adds Cache-Control fields for non-cacheable resources", function() {
        const headers = addHeaders({"Server": "example.com"}, {
            name: "styles.css", size: 1024, cache: false
        });
        expect(headers).toEqual({
            "Server": "example.com",
            "Content-Type": "text/css",
            "Content-Length": 1024,
            "Content-Encoding": "gzip",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Expires": "0",
        });
    });
});

// There is however some duplication going on.
// Which we can eliminate by simple function extraction:

describe("addHeaders()", function() {
    function defaultHeaders() {
        return {
            "Server": "example.com",
            "Content-Type": "text/css",
            "Content-Length": 1024,
            "Content-Encoding": "gzip",
        };
    }

    it("adds only Content-* fields for CSS files", function() {
        const headers = addHeaders({"Server": "example.com"}, {
            name: "styles.css", size: 1024
        });
        expect(headers).toEqual(defaultHeaders());
    });

    it("adds Cache-Control fields for non-cacheable resources", function() {
        const headers = addHeaders({"Server": "example.com"}, {
            name: "styles.css", size: 1024, cache: false
        });
        expect(headers).toEqual({
            ...defaultHeaders(),
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Expires": "0",
        });
    });
});
