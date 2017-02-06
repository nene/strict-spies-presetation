
- The principles for good tests.
    - Easy to maintain
    - independence between tests
    - fast
    - testing just one thing

- Be strict instead of being loose
    - Use toHaveBeenCalledWith() over toHaveBeenCalled()
    - Avoid jasmine.contains() etc.

- Do not share data between tests, unless you're testing mutable state

- No negative assertions
    - expect(html).not.toContain("Error")
      They have the problem that they can easily give false positives.
      (this test will always succeed when we decide to replace "Error" with "Problem")
      There's infinity of things that should not happen (a lot less things that should happen)
