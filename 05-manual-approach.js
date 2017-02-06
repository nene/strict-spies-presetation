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
        this.calls = [];

        this.response = {
            addHeader: (name, value) => this.calls.push(["response.addHeader", name, value]),
            write: (content) => this.calls.push(["response.write", content]),
            send: () => this.calls.push(["response.send"]),
        };

        sendFile(this.response, {name: "styles.css", content: "some text"});
    });

    it("sets content-type header, writes and sends the response", function() {
        expect(this.calls).toEqual([
            ["response.addHeader", "Content-Type", "text/css"],
            ["response.write", "some text"],
            ["response.send"],
        ]);
    });
});
