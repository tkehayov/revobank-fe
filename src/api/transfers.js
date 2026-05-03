import axios from "axios";
import { API_URLS } from "../config";

export class TransfersApi {
  static async fetchTransfers() {
    const response = await axios.get(`${API_URLS.transfers}`);

    return response.data;
  }

  static async newTransfer(formData) {
    const response = await axios.post(`${API_URLS.transfers}`, formData);

    return response.data;
  }
}
