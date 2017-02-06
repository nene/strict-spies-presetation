// Similar things happen with Jasmine spies.

function sendFile(response, file) {
    response.addHeader("Content-Type", "text/" + file.name.split(/\./)[1]);

    if (file.cache === false) {
        response.addHeader("Cache-Control", "no-cache");
    }

    response.write(file.content);
    response.send();
}

describe("sendFile() with cacheable content", function() {
    beforeEach(function() {
        this.response = jasmine.createSpyObj("response", [
            "addHeader", "write", "send"
        ]);

        sendFile(this.response, {name: "styles.css", content: "some text"});
    });

    it("sets content-type header", function() {
        expect(this.response.addHeader).toHaveBeenCalledWith("Content-Type", "text/css");
    });

    it("writes file contents", function() {
        expect(this.response.write).toHaveBeenCalledWith("some text");
    });

    it("sends the reponse", function() {
        expect(this.response.send).toHaveBeenCalled();
    });
});

// This looks nice.
// But what about ensuring we don't set the Cache-Control header?

describe.skip("...", function() {
    it("does not invoke callback with out-of-bound indexes", function() {
        expect(this.response.addHeader).not.toHaveBeenCalledWith("Cache-Control", "no-cache");
    });

    it("only adds one header", function() {
        expect(this.response.addHeader.calls.count()).toBe(1);
    });
});

// This all happens because we are checking the partial state.
// We're not testing the whole thing that the function returns.
