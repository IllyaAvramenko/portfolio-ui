import React, { Children, ReactElement, isValidElement } from "react";
import cn from "classnames";
import "./Tabs.css";

export interface ITabItemProps {
  value: string;
  label?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

export const Tab = (_: ITabItemProps) => null;

export interface ITabsProps {
  activeKey: string;
  onTabChange: (key: string) => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
};

export const Tabs: React.FC<ITabsProps> = ({ activeKey, onTabChange, children, className, title }) => {
  const tabs = Children.toArray(children).filter(isValidElement) as ReactElement<ITabItemProps>[];

  const activeTab = tabs.find((tab) => tab.props.value === activeKey);

  return (
    <div className={cn("tabs-wrapper", className)}>
      <div className="tabs-nav">
        {title && <div className="tabs-title">{title}</div>}

        <div className="tabs-nav__wrap">
            {tabs.map((tab) => (
                <div
                    key={tab.props.value}
                    onClick={() => !tab.props.disabled && onTabChange(tab.props.value)}
                    className={cn("tab-label", {
                      active: activeKey === tab.props.value,
                      disabled: tab.props.disabled,
                    })}
                >
                    {tab.props.label}
                </div>
                ))}
            </div>
      </div>
      

      <div className="tab-content">
        {activeTab?.props.children ?? <div>Tab not found</div>}
      </div>
    </div>
  );
};