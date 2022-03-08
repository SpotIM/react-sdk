import { logout, startTTH } from '.';

const performBEDHandshakeCallback = async _codeA => 'code_b';

describe('Two Token Handshake', () => {
  afterEach(() => {
    window.SPOTIM = {};
  });

  it('should call startTTH when its on window', async () => {
    const windowStartTTHMock = jest.fn().mockReturnValue('bla');

    window.SPOTIM = {
      startTTH: windowStartTTHMock,
    };
    startTTH({ userId: 'user-user', performBEDHandshakeCallback });

    expect(windowStartTTHMock).toHaveBeenCalledTimes(1);
  });

  it('should call startTTH and throw error because SPOTIM is not available', async () => {
    try {
      const waitForDocumentEvent = async () =>
        new Promise((resolve, reject) => {
          startTTH({ userId: 'user-user', performBEDHandshakeCallback }).then(resolve).catch(reject);
          document.dispatchEvent(new Event('spot-im-api-ready'));
        });
      await waitForDocumentEvent();
    } catch (err) {
      // eslint-disable-next-line jest/no-try-expect, jest/no-conditional-expect
      expect(err).toEqual(new Error('startTTH - window.SPOTIM.startTTH is not visible on window'));
    }
  });

  it('should call startTTH when its on window and throw error', async () => {
    const completeTTHCallback = jest.fn();
    const windowStartTTHMock = jest.fn().mockImplementation(({ callback }) => {
      return callback('code_a', completeTTHCallback);
    });
    const err = new Error('performBEDHandshakeCallback');

    window.SPOTIM = {
      startTTH: windowStartTTHMock,
    };
    try {
      await startTTH({
        userId: 'user-user',
        performBEDHandshakeCallback: jest.fn().mockRejectedValue(err),
      });
    } catch (error) {
      // eslint-disable-next-line jest/no-try-expect, jest/no-conditional-expect
      expect(error).toEqual(err);
    }
  });

  it('should call startTTH only after event fired and remove handler', async () => {
    const windowStartTTHMock = jest.fn().mockReturnValue('bla');

    startTTH({ userId: 'user-user', performBEDHandshakeCallback });
    expect(windowStartTTHMock).toHaveBeenCalledTimes(0);

    window.SPOTIM = {
      startTTH: windowStartTTHMock,
    };

    document.dispatchEvent(new Event('spot-im-api-ready'));
    expect(windowStartTTHMock).toHaveBeenCalledTimes(1);

    // fire again to check we removed the event listener
    document.dispatchEvent(new Event('spot-im-api-ready'));
    expect(windowStartTTHMock).toHaveBeenCalledTimes(1);
  });

  it('should call completeSSOCallback with codeB when its on window', async () => {
    const completeTTHCallback = jest.fn();
    const windowStartTTHMock = jest.fn().mockImplementation(({ callback }) => {
      callback('code_a', completeTTHCallback);
    });

    window.SPOTIM = {
      startTTH: windowStartTTHMock,
    };
    await startTTH({ userId: 'user-user', performBEDHandshakeCallback });

    expect(completeTTHCallback).toHaveBeenCalledTimes(1);
  });

  it('should call logout when its on window', async () => {
    const windowLogoutMock = jest.fn();

    window.SPOTIM = {
      logout: windowLogoutMock,
    };
    logout();

    expect(windowLogoutMock).toHaveBeenCalledTimes(1);
  });

  it('should call logout only after event fired and remove handler', async () => {
    const windowLogoutMock = jest.fn().mockReturnValue(Promise.resolve('bla'));

    logout();
    expect(windowLogoutMock).toHaveBeenCalledTimes(0);

    window.SPOTIM = {
      logout: windowLogoutMock,
    };

    document.dispatchEvent(new Event('spot-im-api-ready'));
    expect(windowLogoutMock).toHaveBeenCalledTimes(1);

    // fire again to check we removed the event listener
    document.dispatchEvent(new Event('spot-im-api-ready'));
    expect(windowLogoutMock).toHaveBeenCalledTimes(1);
  });
});
