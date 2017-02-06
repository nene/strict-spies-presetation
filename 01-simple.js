function greet(name) {
    return "Hello, " + name;
}

describe("greet()", function() {
    it("displays greeting", function() {
        // The worst
        expect(greet("John")).toEqual(jasmine.anything());

        // Hopeless
        expect(greet("John")).not.toEqual("John");
        expect(greet("John")).not.toEqual("Goodby, John");

        // Not so good
        expect(greet("John")).toEqual(jasmine.any(String));

        // Trying to do it partially
        expect(greet("John")).toEqual(jasmine.stringMatching("John"));
        expect(greet("John")).toEqual(jasmine.stringMatching("Hello"));

        // The perfect test
        expect(greet("John")).toEqual("Hello, John");
    });
});

// These examples look really silly.
// Why would anybody do this?
// Let's take a more real-world like example:
