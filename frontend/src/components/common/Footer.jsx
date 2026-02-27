export default function Footer() {
  return (
    <footer className="bg-brown text-white py-10 md:py-12 px-4 sm:px-8 lg:px-16 font-instrument-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
        <div className="sm:col-span-2 lg:col-span-2 flex flex-col sm:flex-row lg:flex-col items-start gap-4">
          <img
            src="/assets/logo.png"
            alt="Brand logo"
            className="h-14 w-auto sm:h-16 md:h-20 opacity-50"
          />
          <p className="opacity-75 text-sm md:text-base leading-snug max-w-sm">
            Premium coffee subscriptions, roasted fresh and delivered to your door.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold mb-2 text-sm md:text-base">Support</p>
          <a href="#home" className="hover:underline text-sm md:text-base">How It Works</a>
          <a href="#home" className="hover:underline text-sm md:text-base">FAQ</a>
          <a href="#home" className="hover:underline text-sm md:text-base">Delivery & Returns</a>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold mb-2 text-sm md:text-base">Contact</p>
          <a href="#home" className="hover:underline text-sm md:text-base">Rabat, Morocco</a>
          <a href="#home" className="hover:underline text-sm md:text-base">support@brewly.com</a>
        </div>

        <div className="flex flex-col gap-2">
          <a href="#home" className="hover:underline text-sm md:text-base">Privacy Policy</a>
          <a href="#home" className="hover:underline text-sm md:text-base">Terms & Conditions</a>
          <p className="font-robotoSerif font-semibold mt-3 mb-1 text-sm md:text-base">Follow Us:</p>
          <div className="flex gap-4 opacity-75">
            <img src="/assets/facebook.png" alt="facebook" className="w-8 h-8 md:w-10 md:h-10" />
            <img src="/assets/instagram.png" alt="instagram" className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <p className="text-xs mt-4 sm:text-left">© 2026 Brewly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
