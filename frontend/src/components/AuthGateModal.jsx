import { createPortal } from "react-dom";

export default function AuthGateModal({
  isOpen,
  onClose,
  onLogin,
  onRegister,
}) {
  if (!isOpen || typeof document === "undefined") return null;

  const handleLogin = () => {
    onClose?.();
    onLogin?.();
  };

  const handleRegister = () => {
    onClose?.();
    onRegister?.();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/50 flex items-end sm:items-center justify-center p-0 sm:px-4"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-sm rounded-t-2xl sm:rounded-xl bg-[#FFF3EB] text-[#3B170D] p-5 sm:p-6 shadow-xl min-h-[35vh] sm:min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base sm:text-lg font-semibold">Authentication Required</h3>
        <p className="mt-2 text-sm sm:text-base text-[#3B170D]/80">
          Please login or register to continue.
        </p>
        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            onClick={handleRegister}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[#3B170D]/30 hover:bg-[#3B170D]/5 transition"
          >
            Register
          </button>
          <button
            onClick={handleLogin}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#3B170D] text-[#FFF3EB] hover:bg-[#BB9582] hover:text-[#3B170D] transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
