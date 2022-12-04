import axios from "axios";
import BaseUri from "../lib/BaseUri";

let instance;
let users = [];
let baseUri = BaseUri.url;
class UserService {
  constructor() {
    if (instance) {
      throw new Error("Cannot create new instance");
    }
    instance = this;
  }

  async getUsers() {
    try {
      if (!users.length) {
        const response = await axios.get(baseUri + "/users");
        users = response?.data;
      }
      return users;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

const userService = Object.freeze(new UserService());
export default userService;
