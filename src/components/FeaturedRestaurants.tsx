const FeaturedRestaurants = () => {
    const restaurants = [
      { name: "Holmlia kulturkafé", location: "Oslo", image: "/images/Holmlia.jpg" },
      { name: "Two Fat Ladies", location: "Stockholm", image: "/images/twofatladies.jpg" },
      { name: "Zócalo", location: "København", image: "/images/copenhagen.png" },
    ];
  
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto text-center p-20">
          <h2 className="text-3xl font-semibold mb-6">Utvalgte Restauranter</h2>
          <p className="text-gray-500 mb-8">Sjekk ut noen av de beste halal-restaurantene i Skandinavia.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-12">
            {restaurants.map((restaurant) => (
              <div key={restaurant.name} className="bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                  <p className="text-gray-500">{restaurant.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default FeaturedRestaurants;
  