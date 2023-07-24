import React, { useState, useEffect } from "react";
import Item from "./Item";
import ItemForm from "./ItemForm";
import Filter from "./Filter";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((response) => response.json())
      .then((data) => setItems(data.items));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const itemsToDisplay = selectedCategory === "All"
    ? items
    : items.filter(item => item.category === selectedCategory);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleUpdateItem = (updatedItem) => {
    setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const handleDeleteItem = (deletedItem) => {
    setItems(items.filter(item => item.id !== deletedItem.id));
  };

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map(item => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
