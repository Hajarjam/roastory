import { machine } from "../api/machineApi";


export const machineService = {
  getProducts() {
    return machine.getAll();
  },


  getProductById(id) {
    if (!id) throw new Error("Machine ID is required");
    return machine.getById(id);
  },
};