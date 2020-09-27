describe("no-window-open", () => {
  afterEach(jest.resetAllMocks);

  it("blocks window open", () => {
    const spyConsoleLog = jest.spyOn(console, "log");
    const spyWindowOpen = jest.spyOn(window, "open");
    require("./index.user");
    const url = "https://example.com";
    expect(window.open(url)).toBeNull();
    expect(spyWindowOpen).not.toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledWith(expect.stringContaining(url));
  });
});
