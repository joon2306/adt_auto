import axios from "axios";
import BaseUri from "../lib/BaseUri";

let instance;
let apps = [];
let baseUri = BaseUri.url;
class AppsService {
  constructor() {
    if (instance) {
      throw new Error("Cannot create new instance");
    }
    instance = this;
  }

  async initApps() {
    try {
      if (!apps.length) {
        const response = await axios.get(baseUri + "/apps");
        apps = response?.data;
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  copy(item) {
    return axios
      .post(baseUri + "/copy/", { item })
      .then(() => "Success")
      .catch(() => "Failure");
  }

  getApps() {
    return apps;
  }
}

const appsService = Object.freeze(new AppsService());
export default appsService;
