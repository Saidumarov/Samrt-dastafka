import React, { useState } from "react";
import axios from "axios";

const SendOrder = () => {
  const [order, setOrder] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!order) {
      setMessage("Zakasni kiriting.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/send_order", {
        order,
      });
      setMessage(response.data.message);
      setOrder("");
    } catch (error) {
      console.error(error);
      setMessage("Buyurtma yuborishda xato yuz berdi.");
    }
  };

  return (
    <div>
      <h2>Buyurtma Yuborish</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          placeholder="Buyurtmangizni kiriting..."
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit">Yuborish</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SendOrder;
