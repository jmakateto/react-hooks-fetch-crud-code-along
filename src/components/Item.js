import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  const handleAddToCartClick = () => {
    const updatedItem = { ...item, isInCart: !item.isInCart };

    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem)
    })
    .then((response) => response.json())
    .then((data) => onUpdateItem(data));
  };

  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE"
    })
    .then((response) => {
      if (response.ok) {
        onDeleteItem(item);
      } else {
        console.log("Failed to delete item");
      }
    });
  };

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
