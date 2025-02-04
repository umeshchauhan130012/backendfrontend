import React, { useState } from "react";

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState([]); // Array to store menu items
  const [form, setForm] = useState({
    name: "",
    url: "",
    order: "",
    parentId: "", // For associating child menu with a parent
  });
  const [nextId, setNextId] = useState(1); // Keeps track of the next unique ID

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addMenuItem = () => {
    if (form.name && form.url) {
      const newMenuItem = {
        id: nextId, // Use a unique ID
        name: form.name,
        url: form.url,
        order: form.order,
        parentId: form.parentId ? parseInt(form.parentId) : null, // Associate with parent if ID provided
        children: [], // Initialize children as an empty array
      };

      let updatedMenuItems;

      if (newMenuItem.parentId) {
        // Add to the appropriate parent menu's children
        updatedMenuItems = addChildToParent(menuItems, newMenuItem);
      } else {
        // Add as a top-level menu item
        updatedMenuItems = [...menuItems, newMenuItem];
      }

      setMenuItems(updatedMenuItems);

      // Increment the next unique ID
      setNextId(nextId + 1);

      // Log data in object and array format
      console.log("Menu Items as Object:", {
        count: updatedMenuItems.length,
        items: updatedMenuItems,
      });
      console.log("Menu Items as Array:", updatedMenuItems);

      // Reset the form
      setForm({ name: "", url: "", order: "", parentId: "" });
    } else {
      alert("Please fill out both fields!");
    }
  };

  // Recursive function to find the correct parent and add the child
  const addChildToParent = (items, newChild) => {
    return items.map((item) => {
      if (item.id === newChild.parentId) {
        // Found the parent, add the child
        return { ...item, children: [...item.children, newChild] };
      } else if (item.children && item.children.length > 0) {
        // Recurse into children to find the correct parent
        return { ...item, children: addChildToParent(item.children, newChild) };
      }
      return item;
    });
  };

  // Recursive function to generate a flat list of all menu items with hierarchy
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
    <div style={{ padding: "20px" }}>
      <h1>Menu Manager</h1>
      <div style={{ marginBottom: "10px" }}>
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
      </div>
      <div>
        <h2>Menu Items:</h2>
        {menuItems.length === 0 ? (
          <p>No menu items added yet.</p>
        ) : (
          <ul>{renderMenuItems(menuItems)}</ul>
        )}
      </div>
    </div>
  );
};

export default MenuManager;
