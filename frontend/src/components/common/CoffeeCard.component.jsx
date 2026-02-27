import { Link } from "react-router-dom";


export default function CoffeeCard({ coffee }) {
  const imageUrl = coffee.images?.[0] || "/assets/coffee-beans.jpg";
  
  return (
    <Link to={`/coffees/${coffee._id}`} className="block">
    <div className="h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-44 sm:h-52 lg:h-56 w-full overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={coffee.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex flex-col">
          <h2 className="font-instrument-sans font-bold text-sm sm:text-base text-brown mb-1">
            {coffee.name}
          </h2>
          <p className="font-instrument-sans font-semibold text-sm md:text-base text-charcoal mb-1">
            ${coffee.price.toFixed(2)}
          </p>
        </div>
        <div className="font-instrument-sans text-xs sm:text-sm text-gray-500">
          <p>{coffee.roastLevel}</p>
          <p>{coffee.tasteProfile?.join(", ")}</p>
          <p>Intensity: {coffee.intensity}/5</p>
        </div>
      </div>
    </div>
    </Link>
  );
}
