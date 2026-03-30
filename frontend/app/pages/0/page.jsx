"use client";
import Main from "@/app/components/Main";
import "./css.css";
import { useState } from "react";
import Compare from "./Compare";

export default function Page() {
  const [formData, setFormData] = useState([
    {
      left: 0,
      right: 0,
      id: 0,
    },
    {
      left: 0,
      right: 0,
      id: 1,
    },
  ]);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = prevData.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      );
  
      // Llamar a calculate inmediatamente después de actualizar el estado
      calculate(updatedData);
      
      return updatedData;
    });
  };

  const calculate = (data) => { // Recibimos `data` como argumento
    if (data[0].right && data[1].left && data[0].left) {
      const newRight = (parseFloat(data[0].right) * parseFloat(data[1].left)) / parseFloat(data[0].left);
  
      setFormData((prevData) =>
        prevData.map((item) =>
          item.id === 1 && item.right !== newRight
            ? { ...item, right: newRight }
            : item
        )
      );
    }
  };

  return (
    <Main title="Proporciones" className="cont__pages">
      <div className="f0">
        <Compare mode="title" left="Variable" right="Resultado" />
        <Compare mode="number" left={formData[0].left} right={formData[0].right} on={handleChange} variable={formData[0].id} />
        <Compare mode="number" left={formData[1].left} right={formData[1].right} on={handleChange} variable={formData[1].id} />
      </div>
    </Main>
  );
}
