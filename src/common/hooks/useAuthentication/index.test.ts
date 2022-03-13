import { renderHook, cleanup } from '@testing-library/react-hooks';

import * as TTH from '../../../utils/TwoTokenHandshake';

import { useAuthentication } from '.';

describe('useAuthentication', () => {
  const logoutMock = jest.spyOn(TTH, 'logout');
  logoutMock.mockImplementation(jest.fn());
  const startTTHMock = jest.spyOn(TTH, 'startTTH');
  startTTHMock.mockImplementation(jest.fn());

  beforeEach(() => {
    logoutMock.mockReset();
    startTTHMock.mockReset();
  });
  afterEach(() => {
    cleanup();
  });

  it('should perform logout because authentication is empty than login when userId and callback are present', () => {
    let authentication: Partial<TTH.TStartTTH> = {};
    const { rerender } = renderHook(() => useAuthentication(authentication));
    expect(logoutMock).toHaveBeenCalledTimes(1);
    authentication = {
      userId: 'test',
      performBEDHandshakeCallback: _ => Promise.resolve('code_b'),
    };

    rerender();
    expect(logoutMock).toHaveBeenCalledTimes(1);
    expect(startTTHMock).toHaveBeenCalledTimes(1);
    expect(startTTHMock).toHaveBeenCalledWith(authentication);
  });

  it('should perform startTTH because all params are present', () => {
    const authentication: Partial<TTH.TStartTTH> = {
      userId: 'test',
      performBEDHandshakeCallback: _ => Promise.resolve('code_b'),
    };
    renderHook(() => useAuthentication(authentication));

    expect(logoutMock).toHaveBeenCalledTimes(0);
    expect(startTTHMock).toHaveBeenCalledTimes(1);
    expect(startTTHMock).toHaveBeenCalledWith(authentication);
  });

  it('should perform startTTH because all params are present the logout because user id is not undefined', () => {
    let authentication: Partial<TTH.TStartTTH> = {
      userId: 'test',
      performBEDHandshakeCallback: _ => Promise.resolve('code_b'),
    };

    const { rerender } = renderHook(() => useAuthentication(authentication));

    expect(startTTHMock).toHaveBeenCalledTimes(1);
    expect(startTTHMock).toHaveBeenCalledWith(authentication);
    authentication = {
      userId: undefined,
      performBEDHandshakeCallback: _ => Promise.resolve('code_b'),
    };
    rerender();

    expect(startTTHMock).toHaveBeenCalledTimes(1);
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });

  it('should perform startTTH twice because user is defined and changes', () => {
    let authentication: Partial<TTH.TStartTTH> = {
      userId: 'test',
      performBEDHandshakeCallback: _ => Promise.resolve('code_b'),
    };

    const { rerender } = renderHook(() => useAuthentication(authentication));

    expect(startTTHMock).toHaveBeenCalledTimes(1);
    expect(startTTHMock).toHaveBeenCalledWith(authentication);
    authentication = {
      userId: 'test2',
      performBEDHandshakeCallback: _ => Promise.resolve('code_b'),
    };
    rerender();

    expect(startTTHMock).toHaveBeenCalledWith(authentication);
    expect(startTTHMock).toHaveBeenCalledTimes(2);
    expect(logoutMock).toHaveBeenCalledTimes(0);
  });

  it('should perform logout because callback is undefined', () => {
    const authentication: Partial<TTH.TStartTTH> = {
      userId: 'test',
      performBEDHandshakeCallback: undefined,
    };

    renderHook(() => useAuthentication(authentication));

    expect(startTTHMock).toHaveBeenCalledTimes(0);
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
