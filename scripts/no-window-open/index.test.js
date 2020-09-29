const { toMatchDiffSnapshot } = require("snapshot-diff");
expect.extend({ toMatchDiffSnapshot });

const spyConsoleLog = jest
  .spyOn(console, "log")
  .mockImplementation(() => undefined);
const spyWindowOpen = jest.spyOn(window, "open");
require("./index.user");

describe("no-window-open", () => {
  beforeAll(jest.useFakeTimers);
  afterAll(jest.useRealTimers);

  it("blocks window open", () => {
    const url = "https://example.com";
    expect(window.open(url)).toMatchSnapshot();
    expect(spyWindowOpen).not.toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledWith(expect.stringContaining(url));
  });

  it("shows popup after time", () => {
    const url = "https://example.com";
    window.open(url);
    expect(document.body).toMatchSnapshot();
    const prevBody = document.body.cloneNode(true);
    jest.advanceTimersByTime(300);
    expect(prevBody).toMatchDiffSnapshot(document.body);
  });

  it("hides popup after timer run", () => {
    const url = "https://example.com";
    window.open(url);
    jest.advanceTimersByTime(300);
    const prevBody = document.body.cloneNode(true);
    jest.runOnlyPendingTimers();
    expect(prevBody).toMatchDiffSnapshot(document.body);
  });

  it("sets the url of the popup link via window location", () => {
    const dummyWindow = window.open("https://example.com");
    const getUrl = () =>
      document.body
        .querySelector("#iamogbz-no-window-open-popup-element-link")
        .getAttribute("href");
    expect(getUrl()).toEqual("https://example.com");

    dummyWindow.location = "https://example.com/2";
    expect(getUrl()).toEqual("https://example.com/2");

    dummyWindow.location.href = "https://example.com/3";
    expect(getUrl()).toEqual("https://example.com/3");

    dummyWindow.location.assign("https://example.com/4");
    expect(getUrl()).toEqual("https://example.com/4");

    dummyWindow.location.replace("https://example.com/5");
    expect(getUrl()).toEqual("https://example.com/5");
  });
});
