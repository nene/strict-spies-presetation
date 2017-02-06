import StrictSpies, {toHaveCalls, toHaveSingleCall, toHaveAnyCalls} from "strict-spies";

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
        // Initialize spies container for each test run.
        this.spies = new StrictSpies();

        // Register Spies-specific assertions to be used insited of Jasmine built-in spy-assertions
        jasmine.addMatchers({toHaveCalls, toHaveSingleCall, toHaveAnyCalls});

        this.response = this.spies.createObj("response", [
            "addHeader", "write", "send"
        ]);

        sendFile(this.response, {name: "styles.css", content: "some text"});
    });

    it("sets content-type header, writes and sends the response", function() {
        expect(this.spies).toHaveCalls([
            ["response.addHeader", "Content-Type", "text/css"],
            ["response.write", "some text"],
            ["response.send"],
        ]);
    });
});
