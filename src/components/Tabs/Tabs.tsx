import React, { Children, ReactElement, isValidElement, useState } from 'react';
import cn from 'classnames';
import './Tabs.css';
import { Title } from '../Title/Title';
import { useIsMobile } from '../../hooks';
import { useTranslation } from 'react-i18next';

export interface ITabItemProps {
  value: string;
  label?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Tab = (_props: ITabItemProps) => null;

export interface ITabsProps {
  activeKey: string;
  onTabChange: (key: string) => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Tabs: React.FC<ITabsProps> = ({
  activeKey,
  onTabChange,
  children,
  className,
  title,
}) => {
  const isAccordion = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const tabs = Children.toArray(children).filter(isValidElement) as ReactElement<ITabItemProps>[];

  const activeTab = tabs.find((tab) => tab.props.value === activeKey);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className={cn('tabs', className, { 'accordion-mode': isAccordion })}>
      {isAccordion ? (
        <div className="accordion-tabs">
          <button className="accordion-toggle" onClick={toggleAccordion} aria-expanded={isOpen}>
            <Title level={2} size="large" weight="normal">
              {isOpen ? '−' : '+'}
            </Title>
          </button>

          {isOpen && (
            <div className="accordion-content">
              {tabs.map((tab) => (
                <button
                  key={tab.props.value}
                  onClick={() => {
                    if (!tab.props.disabled) {
                      onTabChange(tab.props.value);
                      setIsOpen(false);
                    }
                  }}
                  className={cn('accordion-tab-label', {
                    active: activeKey === tab.props.value,
                    disabled: tab.props.disabled,
                  })}
                >
                  <Title
                    level={5}
                    size="small"
                    weight={activeKey === tab.props.value ? 'bold' : 'normal'}
                  >
                    {tab.props.label}
                  </Title>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="tabs-content">
          {title && <div className="tabs-title">{title}</div>}

          <div className="tabs-nav__list" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.props.value}
                role="tab"
                aria-selected={activeKey === tab.props.value}
                aria-controls={'tabpanel-' + tab.props.value}
                id={'tab-' + tab.props.value}
                onClick={() => !tab.props.disabled && onTabChange(tab.props.value)}
                className={cn('tab-label', {
                  active: activeKey === tab.props.value,
                  disabled: tab.props.disabled,
                })}
              >
                {tab.props.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div
        className="tab-content"
        role="tabpanel"
        id={'tabpanel-' + activeKey}
        aria-labelledby={'tab-' + activeKey}
      >
        {activeTab?.props.children ?? <div>{t('error.tabNotFound')}</div>}
      </div>
    </div>
  );
};
