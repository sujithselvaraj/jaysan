import api from "../../Reducers/AxiosConfig";

const DealerService = {
  getAllDealers: () => api.get("/dealer"),
  getDealerById: (id) => api.get(`/dealer/${id}`), // ✅ Corrected API call
  getDealerByState: (state) => api.get(`/dealer/state/${state}`), // ✅ Fixed endpoint
  addDealer: (dealerData) => api.post("/dealer/save", dealerData),
  updateDealer: (id, dealerData) => api.put(`/dealer/update/${id}`, dealerData),
  deleteDealer: (id) => api.delete(`/dealer/delete/${id}`)
};

export default DealerService;
