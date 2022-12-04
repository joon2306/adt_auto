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

  copyUsername(user) {
    const usernameUrl = baseUri + "/username/" + user.id;
    return axios.get(usernameUrl).then((res) => {
      if (res?.data === "Success") {
        return "Success";
      } else {
        return "Failed";
      }
    });
  }

  copyPwd(user) {
    const pwdUrl = baseUri + "/pwd/" + user.id;
    return axios.get(pwdUrl).then((res) => {
      if (res?.data === "Success") {
        return "Success";
      } else {
        return "Failed";
      }
    });
  }

  copyUser(user) {
    if (!user) {
      return "Failed";
    }
    this.copyUsername(user).then((res) => {
      if (res === "Success") {
        setTimeout(() => {
          this.copyPwd(user)
        },2000);
      }
    });
  }
}

const userService = Object.freeze(new UserService());
export default userService;
