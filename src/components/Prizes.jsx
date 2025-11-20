import React, { useState, useEffect } from "react";

function Prizes() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState("Barchasi");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); // Xabarlarni ko'rsatish

  useEffect(() => {
    async function load() {
      try {
        const itemsRes = await fetch(
          "https://c3a880f50e0b5f67.mokky.dev/gifts"
        );
        const categoriesRes = await fetch(
          "https://c3a880f50e0b5f67.mokky.dev/categories"
        );

        const itemsData = await itemsRes.json();
        const categoriesData = await categoriesRes.json();

        // Takroriy "Barchasi"ni olib tashlab unique qilish
        const uniqueCategories = Array.from(
          new Map(categoriesData.map((cat) => [cat.name, cat])).values()
        );

        setCategories(uniqueCategories);
        setItems(itemsData);
      } catch (err) {
        console.error("Ma’lumot olishda xato:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filteredItems =
    active === "Barchasi"
      ? items
      : items.filter((item) => item.category === active);

 const handleBuy = async (item) => {
  try {
    setMessage("Xarid jarayoni boshlanmoqda...");

    // Telegram bot backend URL
    const response = await fetch(
      "https://web-production-d1af9.up.railway.app/api/buy",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.id, // yoki item.name
          telegramId: "123456789", // foydalanuvchi Telegram ID sini shu yerga qo‘ying
        }),
      }
    );

    const data = await response.json();
    if(data.ok){
      setMessage("Buyurtma yuborildi! Telegram adminga xabar keladi ✅");
    } else {
      setMessage("Xatolik: " + (data.msg || "Noma'lum xatolik"));
    }
  } catch (err) {
    setMessage("Xatolik yuz berdi: " + err.message);
  }
};


  if (loading) {
    return <p className="text-white text-center mt-10">Yuklanmoqda...</p>;
  }

  return (
    <div className="py-6">
      {/* Categories */}
      <section className="categories">
        <ul className="max-w-[1280px] m-auto py-[15px] flex gap-[15px] items-center flex-wrap">
          {categories.map((cat) => (
            <li
              key={cat.id} // unique id
              onClick={() => setActive(cat.name)}
              className={`w-[140px] text-center px-[20px] py-[6px] rounded-[10px] text-[18px] cursor-pointer transition-all duration-200
                ${
                  active === cat.name
                    ? "bg-[#7F5AC0] text-white"
                    : "bg-[#47396E] text-white hover:bg-[#7F5AC0]"
                }
              `}>
              {cat.name}
            </li>
          ))}
        </ul>
      </section>

      {/* Items */}
      <section className="prizes max-w-[1280px] m-auto mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#2D2345] p-5 rounded-2xl text-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3">
              <img
                src={item.img}
                alt={item.name}
                className="w-[120px] h-[140px] object-contain"
              />

              <p className="text-[18px] opacity-80 text-center mt-2">
                {item.name}
              </p>

              <p className="text-[22px] font-semibold text-center">
                {Number(item.price).toLocaleString("uz-UZ")} so‘m
              </p>

              <button
                onClick={() => handleBuy(item)}
                className="bg-[#A966FF] hover:bg-[#9a52ff] w-full py-3 rounded-xl text-[18px] font-semibold mt-2">
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

      {/* Xabar */}
      {message && <p className="text-center mt-4 text-yellow-400">{message}</p>}
    </div>
  );
}

export default Prizes;
