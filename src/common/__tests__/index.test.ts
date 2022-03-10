import { addLauncherScript, LauncherOptions, LAUNCHER_SCRIPT_BASE_URL, subscribeToOpenWebEvents } from '../utils';

const spotId = 'sp_test';

const mockedLauncherParams: LauncherOptions = {
  spotId,
};

// Clean DOM after each test to prevent duplications.
afterEach(() => {
  document.body.innerHTML = '';
});

describe('Creating Launcher', () => {
  test('Launcher should be created', () => {
    const script = addLauncherScript(mockedLauncherParams);

    expect(script.src).toEqual(`${LAUNCHER_SCRIPT_BASE_URL}/${spotId}`);
    expect(script.dataset).toMatchObject({
      spotimAutorun: 'false',
      spotimModule: 'spotim-launcher',
    });
  });
  test('Launcher should not be created twice', () => {
    const script = addLauncherScript(mockedLauncherParams);
    const anotherMockedLauncher = {
      spotId: 'sp_test2',
    };

    const expectedSrc = `${LAUNCHER_SCRIPT_BASE_URL}/${spotId}`;
    const script2 = addLauncherScript(anotherMockedLauncher);

    expect(script === script2).toBe(true);
    expect(script.src).toEqual(expectedSrc);
    expect(script2.src).toEqual(expectedSrc);
  });

  test('Should override data-spotim-autorun', () => {
    const mock: LauncherOptions = {
      ...mockedLauncherParams,
      autoRun: true,
      spotId: 'aaaaaa',
    };

    const script = addLauncherScript(mock);

    expect(script.dataset).toMatchObject({
      spotimAutorun: 'true',
    });
  });

  test('Should subscribed to OpenWeb custom events', () => {
    const testHandler = jest.fn();
    const testEventName = `test-event`;
    subscribeToOpenWebEvents({ [testEventName]: testHandler });

    const createOpenWebSDKEvent = (eventName, payload = {}) =>
      new CustomEvent(`ow-sdk-event`, { detail: { type: eventName, payload } });
    const testEvent = createOpenWebSDKEvent('test-event', { test: 1, test2: 2 });

    document.dispatchEvent(testEvent);

    expect(testHandler).toHaveBeenCalledWith(testEvent);
  });

  test('Should unsubscribe from events', () => {
    const testHandler = jest.fn();
    const testEventName = `test-event`;
    const unsubscribe = subscribeToOpenWebEvents({ [testEventName]: testHandler });

    const createOpenWebSDKEvent = (eventName, payload = {}) =>
      new CustomEvent(`ow-sdk-event`, { detail: { type: eventName, payload } });
    const testEvent = createOpenWebSDKEvent('test-event', { test: 1, test2: 2 });

    document.dispatchEvent(testEvent);

    unsubscribe();

    expect(testHandler).toHaveBeenCalledTimes(1);
  });
});
