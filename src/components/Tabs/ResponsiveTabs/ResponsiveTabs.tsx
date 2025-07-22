import React, { useState } from "react";
import cn from "classnames";
import "./ResponsiveTabs.css";

type TabItemProps = {
  value: string;
  label: string;
};

type ResponsiveTabsMenuProps = {
  activeKey: string;
  onTabChange: (key: string) => void;
  tabs: TabItemProps[];
  className?: string;
};

export const ResponsiveTabs: React.FC<ResponsiveTabsMenuProps> = ({
  activeKey,
  onTabChange,
  tabs,
  className,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className={cn("responsive-tabs-menu", className)}>
      <button onClick={toggleMenu} className="menu-toggle-button">
        {menuOpen ? "Close Menu" : "Open Menu"}
      </button>
      {menuOpen && (
        <div className="menu">
          {tabs.map((tab) => (
            <div
              key={tab.value}
              onClick={() => {
                onTabChange(tab.value);
                toggleMenu();
              }}
              className={cn("menu-item", {
                active: activeKey === tab.value,
              })}
            >
              {tab.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};