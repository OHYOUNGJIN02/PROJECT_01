import React from "react";
import DropdownItem from "./DropdownItem";

function Dropdown({ items = [], isOpen = true, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="flex flex-col bg-gray-95 py-1 rounded-md shadow-lg overflow-hidden min-w-[150px]">
            {items.map((item, index) => (
                <DropdownItem
                    key={index}
                    label={item.label}
                    iconType={item.iconType}
                    onClick={() => {
                        item.onClick?.();
                        onClose?.();
                    }}
                    isActive={item.isActive}
                />
            ))}
        </div>
    );
}

export default Dropdown;
