let instance;
let loaderCallbacks = {};
class LoaderService {
  constructor() {
    if (instance) {
      throw new Error("Cannot create new instance");
    }

    instance = this;
  }

  subscribe(id, callback) {
    loaderCallbacks[id] = callback;
  }

  load() {
    if (loaderCallbacks.load) {
      const callback = loaderCallbacks.load;
      callback();
      return;
    }
    throw new Error("No callback registered");
  }

  stop() {
    if (loaderCallbacks.stop) {
      const callback = loaderCallbacks.stop;
      callback();
      return;
    }
    throw new Error("No callback registered");
  }
}

const loaderService = Object.freeze(new LoaderService());
export default loaderService;
