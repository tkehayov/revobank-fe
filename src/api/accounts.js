import axios from "axios";
import { API_URLS } from "../config";

export class AccountsApi {
  static async fetchAccounts() {
    const response = await axios.get(`${API_URLS.accounts}`);

    return response.data;
  }

  static async fetchAccount(id) {
    const response = await axios.get(`${API_URLS.accounts}/${id}`);

    return response.data;
  }

  static async addUser(formData) {
    const response = await axios.post(`${API_URLS.accounts}`, formData);

    return response.data;
  }

  static async editUser(formData) {
    const response = await axios.put(`${API_URLS.accounts}`, formData);

    return response.data;
  }

  static async changeStatus(id, status) {
    const response = await axios.put(`${API_URLS.accounts}/status/${id}`, {
      status: status,
    });

    return response.data;
  }
}
