import axios from "axios";
import BaseUri from "../lib/BaseUri";

let instance;
let environments = [];
let baseUri = BaseUri.url;
class EnvironmentsService {
  constructor() {
    if (instance) {
      throw new Error("Cannot create new instance");
    }
    instance = this;
  }

  async getEnvironments() {
    try {
      if (!environments.length) {
        const response = await axios.get(baseUri + "/environments");
        environments = response?.data;
      }
      return environments;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

}

const environmentsService = Object.freeze(new EnvironmentsService());
export default environmentsService;
