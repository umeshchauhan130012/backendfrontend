import React, { useState } from "react";
import Div from "./div";

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState([]); 
  const [form, setForm] = useState({
    name: "",
    url: "",
    order: "",
    parentId: "", 
  });
  const [nextId, setNextId] = useState(1); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addMenuItem = () => {
    if (form.name && form.url) {
      const newMenuItem = {
        id: nextId, 
        name: form.name,
        url: form.url,
        order: form.order,
        parentId: form.parentId ? parseInt(form.parentId) : null,
        children: [], 
      };

      let updatedMenuItems;
      if (newMenuItem.parentId) {
        updatedMenuItems = addChildToParent(menuItems, newMenuItem);
      } else {
        updatedMenuItems = [...menuItems, newMenuItem];
      }

      setMenuItems(updatedMenuItems);
      setNextId(nextId + 1);

      console.log("Menu Items as Object:", {
        count: updatedMenuItems.length,
        items: updatedMenuItems,
      });
      console.log("Menu Items as Array:", updatedMenuItems);

      setForm({ name: "", url: "", order: "", parentId: "" });
    } else {
      alert("Please fill out both fields!");
    }
  };

  const addChildToParent = (items, newChild) => {
    return items.map((item) => {
      if (item.id === newChild.parentId) {
        return { ...item, children: [...item.children, newChild] };
      } else if (item.children && item.children.length > 0) {
        return { ...item, children: addChildToParent(item.children, newChild) };
      }
      return item;
    });
  };

  const getParentOptions = (items, prefix = "") => {
    let options = [];
    for (let item of items) {
      options.push({
        id: item.id,
        name: `${prefix}${item.name}`,
      });
      if (item.children && item.children.length > 0) {
        options = [...options, ...getParentOptions(item.children, `${prefix}-- `)];
      }
    }
    return options;
  };

  const renderMenuItems = (items) => {
    return items.map((item) => (
      <li key={item.id}>
        {item.name} - <a href={item.url}>{item.url}</a>
        {item.children && item.children.length > 0 && (
          <ul>{renderMenuItems(item.children)}</ul>
        )}
      </li>
    ));
  };

  return (
    <Div style={{ padding: "20px" }}>
      <h1>Menu Manager</h1>
      <Div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          name="name"
          placeholder="Menu Item Name"
          value={form.name}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="url"
          placeholder="Menu Item URL"
          value={form.url}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="order"
          placeholder="order"
          value={form.order}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <select
          name="parentId"
          value={form.parentId}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        >
          <option value="">No Parent</option>
          {getParentOptions(menuItems).map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <button onClick={addMenuItem}>Add Menu Item</button>
      </Div>
      <Div>
        <h2>Menu Items:</h2>
        {menuItems.length === 0 ? (
          <p>No menu items added yet.</p>
        ) : (
          <ul>{renderMenuItems(menuItems)}</ul>
        )}
      </Div>
    </Div>
  );
};

export default MenuManager;
