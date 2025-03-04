const Categories = () => {
    const categories = [
      { name: "Burger", icon: "🍔" },
      { name: "Pizza", icon: "🍕" },
      { name: "Kebab", icon: "🥙" },
      { name: "Asiatisk", icon: "🍜" },
      { name: "Dessert", icon: "🍩" },
      { name: "Grill", icon: "🔥" },
    ];
  
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto text-center p-20">
          <h2 className="text-3xl font-semibold mb-6 ">Find Restaurant By Category</h2>
          <p className="text-gray-500 mb-8">Velg din favorittmat og oppdag de beste halal-restaurantene.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div key={category.name} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <span className="text-4xl">{category.icon}</span>
                <p className="mt-2 text-lg font-semibold">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Categories;
  