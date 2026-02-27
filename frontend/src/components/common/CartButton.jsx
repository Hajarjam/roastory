import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../contexts/CartContext";
import AuthContext from "../../contexts/AuthContext";


export default function CartButton() {
  const { items, total } = useContext(CartContext);
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);
  const { isAuthenticated, role } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated && role === "client" && (
        <Link
          to="/client/cart"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center justify-center gap-2 hover:bg-blue-700 z-50 text-sm sm:text-base"
        >
          <span>{totalQty} | {total.toFixed(2)} DH</span>
        </Link>
      )}
    </>
  );
}
