import React from "react";
import MenuItemCard from "./MenuItemCard";

const MenuCategory = ({ data, isExpanded, onToggle }) => {
  const { title, items = [] } = data || {};
  return (
    <div className={`menu-category ${isExpanded ? "category-expanded" : ""}`}>
      <button className="category-header" onClick={onToggle}>
        <div className="category-title-row">
          <h3 className="category-title">{title} <span className="category-count">({items.length})</span></h3>
          <span className="category-arrow">{isExpanded ? "▲" : "▼"}</span>
        </div>
      </button>
      {isExpanded && (
        <div className="category-items">
          {items.map((item) => (
            <MenuItemCard key={item?.id || item?.name} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuCategory;
