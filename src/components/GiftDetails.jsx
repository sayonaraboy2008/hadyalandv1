import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function GiftDetails() {
  const { id } = useParams();
  const [gift, setGift] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [checkImage, setCheckImage] = useState(null);

  useEffect(() => {
    fetch(`https://ba782843c67c0d8e.mokky.dev/gifts/${id}`)
      .then((res) => res.json())
      .then((data) => setGift(data));
  }, []);

  if (!gift) return "Yuklanmoqda...";

  const submitOrder = async () => {
    if (!receiver || !checkImage) {
      alert("Ikkala maydon ham to‘ldirilishi shart.");
      return;
    }

    const formData = new FormData();
    formData.append("file", checkImage);

    // 1️⃣ Rasmni Telegram botga yuborib file_id olish
    const uploadReq = await fetch("https://YOUR_BACKEND/upload-check", {
      method: "POST",
      body: formData,
    });

    const uploadRes = await uploadReq.json();

    // 2️⃣ Buyurtmani yaratish (pending)
    await fetch("https://ba782843c67c0d8e.mokky.dev/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gift_id: gift.id,
        receiver: receiver,
        check_file_id: uploadRes.file_id,
        status: "pending",
        buyer: window.Telegram.WebApp.initDataUnsafe.user.username,
      }),
    });

    alert("Buyurtmangiz yuborildi. Admin tasdiqlaydi.");
    setOpenModal(false);
  };

  return (
    <div className="p-4">
      <img src={gift.image} className="w-full rounded-xl" />
      <h2 className="text-3xl font-bold mt-4">{gift.name}</h2>
      <p className="mt-2">{gift.description}</p>
      <p className="text-xl font-semibold mt-4">{gift.price} so‘m</p>

      <button
        onClick={() => setOpenModal(true)}
        className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-xl">
        Sotib olish
      </button>

      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-xl font-bold mb-3">Sotib olish</h3>

            <input
              type="text"
              className="border p-2 w-full rounded mb-3"
              placeholder="@username kimga beriladi?"
              onChange={(e) => setReceiver(e.target.value)}
            />

            <input
              type="file"
              className="border p-2 w-full rounded mb-3"
              onChange={(e) => setCheckImage(e.target.files[0])}
            />

            <button
              onClick={submitOrder}
              className="bg-green-600 text-white w-full py-3 rounded mt-2">
              Buyurtmani yuborish
            </button>

            <button
              onClick={() => setOpenModal(false)}
              className="w-full py-3 rounded mt-2 border">
              Bekor qilish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
