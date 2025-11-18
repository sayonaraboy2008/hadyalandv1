import React, { useState, useEffect } from "react";

function Prizes() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState("Barchasi");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mokky.dev endpointini o'zingizdagi URL bilan almashtiring
    const endpoint = "https://c3a880f50e0b5f67.mokky.dev/db";

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const mainData = data[0]; // JSON array ichidagi birinchi object
        // price'larni raqamga aylantiramiz, agar string bo'lsa
        const formattedItems = mainData.items.map((item) => ({
          ...item,
          price:
            typeof item.price === "string" ? parseInt(item.price) : item.price,
        }));
        setItems(formattedItems);
        setCategories(mainData.categories);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ma’lumot olishda xato:", err);
        setLoading(false);
      });
  }, []);

  const filteredItems =
    active === "Barchasi"
      ? items
      : items.filter((item) => item.category === active);

  if (loading) {
    return <p className="text-white text-center mt-10">Loading...</p>;
  }

  return (
    <div className="py-6">
      {/* Category Buttons */}
      <section className="categories">
        <ul className="max-w-[1280px] m-auto py-[15px] flex gap-[15px] items-center flex-wrap">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => setActive(cat)}
              className={`w-[140px] text-center px-[20px] py-[6px] rounded-[10px] text-[18px] cursor-pointer transition-all duration-200
                ${
                  active === cat
                    ? "bg-[#7F5AC0] text-white"
                    : "bg-[#47396E] text-white hover:bg-[#7F5AC0]"
                }
              `}>
              {cat}
            </li>
          ))}
        </ul>
      </section>

      {/* Items List */}
      <section className="prizes max-w-[1280px] m-auto mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#2D2345] p-5 rounded-2xl text-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3">
              {/* Gift Image */}
              <img
                src="/images/gift-blue.png"
                alt={item.name}
                className="w-[120px] h-[140px] object-contain"
              />

              {/* Name */}
              <p className="text-[18px] opacity-80 text-center mt-2">
                {item.name}
              </p>

              {/* Price */}
              <p className="text-[22px] font-semibold text-center">
                {item.price.toLocaleString("uz-UZ")} so‘m
              </p>

              {/* Buy Button */}
              <button className="bg-[#A966FF] hover:bg-[#9a52ff] w-full py-3 rounded-xl text-[18px] font-semibold mt-2">
                Sotib olish
              </button>
            </div>
          ))
        ) : (
          <p className="text-white text-center col-span-full opacity-70 text-[20px]">
            Bu kategoriyada sovg‘alar topilmadi 🥺
          </p>
        )}
      </section>
    </div>
  );
}

export default Prizes;
