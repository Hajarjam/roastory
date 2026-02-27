import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import AuthContext from "../../contexts/AuthContext";

export default function LogoutButton({ className, children, onBeforeOpen, redirectTo }) {
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpen = () => {
    onBeforeOpen?.();
    setShowLogoutAlert(true);
  };

const handleLogoutConfirm = async () => {
  setShowLogoutAlert(false);
  await logout();
  navigate(redirectTo); // fires after state is fully cleared
};

  const logoutModal =
    showLogoutAlert && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/50 flex items-end sm:items-center justify-center p-0 sm:px-4">
            <div className="w-full sm:max-w-sm rounded-t-2xl sm:rounded-xl bg-[#FFF3EB] text-[#3B170D] p-5 sm:p-6 shadow-xl min-h-[35vh] sm:min-h-0">
              <h3 className="text-base sm:text-lg font-semibold">Logout</h3>
              <p className="mt-2 text-sm sm:text-base text-[#3B170D]/80">
                Are you sure you want to logout?
              </p>
              <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
                <button
                  onClick={() => setShowLogoutAlert(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[#3B170D]/30 hover:bg-[#3B170D]/5 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogoutConfirm}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#3B170D] text-[#FFF3EB] hover:bg-[#BB9582] hover:text-[#3B170D] transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button type="button" onClick={handleOpen} className={className}>
        {children || "Logout"}
      </button>

      {logoutModal}
    </>
  );
}
