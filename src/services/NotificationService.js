let instance;
let notificationCallbacks = {};
class NotificationService {
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created");
    }

    instance = this;
  }

  subscribe(id, callback) {
    notificationCallbacks[id] = callback;
  }

  info(txt) {
    if (notificationCallbacks.info) {
      const callback = notificationCallbacks.info;
      callback(txt);
      return;
    }
    throw new Error("No callback regisgtered");
  }

  warn(txt) {
    if (notificationCallbacks.warn) {
      const callback = notificationCallbacks.warn;
      callback(txt);
      return;
    }

    throw new Error("No callback registered");
  }
}

const notificationService = Object.freeze(new NotificationService());
export default notificationService;
