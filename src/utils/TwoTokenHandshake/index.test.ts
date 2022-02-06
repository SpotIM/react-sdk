import { logout, startTTH } from ".";

const performBEDHandshake = async (codeA) => "code_b";

describe("Two Token Handshake", () => {
  afterEach(() => {
    window.SPOTIM = {};
  });

  it("should call startTTH when its on window", async () => {
    const windowStartTTHMock = jest.fn().mockReturnValue("bla");

    window.SPOTIM = {
      startTTH: windowStartTTHMock,
    };
    startTTH({ userId: "user-user", performBEDHandshake });

    expect(windowStartTTHMock).toBeCalledTimes(1);
  });

  it("should call startTTH when its on window and throw error", async () => {
    const completeTTHCallback = jest.fn();
    const windowStartTTHMock = jest
      .fn()
      .mockImplementation(({ userId, callback }) => {
        return callback("code_a", completeTTHCallback);
      });
    const err = new Error("performBEDHandshake");

    window.SPOTIM = {
      startTTH: windowStartTTHMock,
    };
    try {
      await startTTH({
        userId: "user-user",
        performBEDHandshake: jest.fn().mockRejectedValue(err),
      });
    } catch (error) {
      expect(error).toEqual(err);
    }
  });

  it("should call startTTH only after event fired and remove handler", async () => {
    const windowStartTTHMock = jest.fn().mockReturnValue("bla");

    startTTH({ userId: "user-user", performBEDHandshake });
    expect(windowStartTTHMock).toBeCalledTimes(0);

    window.SPOTIM = {
      startTTH: windowStartTTHMock,
    };

    document.dispatchEvent(new Event("spot-im-api-ready"));
    expect(windowStartTTHMock).toBeCalledTimes(1);

    // fire again to check we removed the event listener
    document.dispatchEvent(new Event("spot-im-api-ready"));
    expect(windowStartTTHMock).toBeCalledTimes(1);
  });

  it("should call completeSSOCallback with codeB when its on window", async () => {
    const completeTTHCallback = jest.fn();
    const windowStartTTHMock = jest
      .fn()
      .mockImplementation(({ userId, callback }) => {
        callback("code_a", completeTTHCallback);
      });

    window.SPOTIM = {
      startTTH: windowStartTTHMock,
    };
    await startTTH({ userId: "user-user", performBEDHandshake });

    expect(completeTTHCallback).toBeCalledTimes(1);
  });

  it("should call logout when its on window", async () => {
    const windowLogoutMock = jest.fn();

    window.SPOTIM = {
      logout: windowLogoutMock,
    };
    logout();

    expect(windowLogoutMock).toBeCalledTimes(1);
  });

  it("should call logout only after event fired and remove handler", async () => {
    const windowLogoutMock = jest.fn().mockReturnValue(Promise.resolve("bla"));

    logout();
    expect(windowLogoutMock).toBeCalledTimes(0);

    window.SPOTIM = {
      logout: windowLogoutMock,
    };

    document.dispatchEvent(new Event("spot-im-api-ready"));
    expect(windowLogoutMock).toBeCalledTimes(1);

    // fire again to check we removed the event listener
    document.dispatchEvent(new Event("spot-im-api-ready"));
    expect(windowLogoutMock).toBeCalledTimes(1);
  });
});
