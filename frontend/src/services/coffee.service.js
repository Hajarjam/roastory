import { coffee } from "../api/coffeeApi";


export const coffeeService = {
  getProducts() {
    return coffee.getAll();
  },


  getProductById(id) {
    if (!id) throw new Error("Coffee ID is required");
    return coffee.getById(id);
  },
};