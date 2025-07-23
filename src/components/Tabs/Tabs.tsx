import React, { Children, ReactElement, isValidElement, useEffect, useState } from "react";
import cn from "classnames";
import "./Tabs.css";
import { Title } from "../Title/Title";

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
  const [isAccordion, setIsAccordion] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsAccordion(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const tabs = Children.toArray(children).filter(isValidElement) as ReactElement<ITabItemProps>[];

  const activeTab = tabs.find((tab) => tab.props.value === activeKey);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className={cn("tabs", className, { 'accordion-mode': isAccordion})}>
      {isAccordion 
        ? (
            <div className="accordion-tabs">
              <div className="accordion-toggle" onClick={toggleAccordion}>
                <Title level={2} size="large" weight="normal">
                  {isOpen ? "−" : "+"}
                </Title>
              </div>

              {isOpen && (
                <div className="accordion-content">
                  {tabs.map((tab) => (
                    <div
                      key={tab.props.value}
                      onClick={() => {
                        if (!tab.props.disabled) {
                          onTabChange(tab.props.value);
                          setIsOpen(false);
                        }
                      }}
                      className={cn("accordion-tab-label", {
                        active: activeKey === tab.props.value,
                        disabled: tab.props.disabled,
                      })}
                    >
                      <Title level={5} size="small" weight={activeKey === tab.props.value ? "bold" : "normal"}>
                        {tab.props.label}
                      </Title>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) 
        : (
            <div className="tabs-content">
              {title && <div className="tabs-title">{title}</div>}

              <div className="tabs-nav__list">
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
          ) 
      }

      

      <div className="tab-content">
        {activeTab?.props.children ?? <div>Tab not found</div>}
      </div>
    </div>
  );
};