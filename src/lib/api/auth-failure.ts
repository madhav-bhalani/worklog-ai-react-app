let terminalAuthFailureHandler: (() => void) | undefined;

export function notifyTerminalAuthFailure() {
  terminalAuthFailureHandler?.();
}

export function setTerminalAuthFailureHandler(handler: () => void) {
  terminalAuthFailureHandler = handler;

  return () => {
    if (terminalAuthFailureHandler === handler) {
      terminalAuthFailureHandler = undefined;
    }
  };
}
