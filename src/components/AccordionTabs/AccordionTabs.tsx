import React, { ReactElement, useState, isValidElement } from "react";
import cn from "classnames";
import { ITabItemProps, ITabsProps } from "../Tabs/Tabs";
import './AccordionTabs.css';
import { Title } from "../Title/Title";
import { Paragraph } from "../Paragraph/Paragraph";
export const AccordionTabs: React.FC<ITabsProps> = ({
  activeKey,
  onTabChange,
  children,
  className,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const tabs = React.Children.toArray(children).filter(isValidElement) as ReactElement<ITabItemProps>[];

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className={cn("accordion-tabs-wrapper", className)}>
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
      <div className="tab-content">
        <Paragraph weight="normal">
          {tabs.find((tab) => tab.props.value === activeKey)?.props.children ?? <div>Tab not found</div>}
        </Paragraph>
      </div>
    </div>
  );
};