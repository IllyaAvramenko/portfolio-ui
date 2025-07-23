import React, { FC } from 'react';
import cn from 'classnames';
import './Text.css';

interface ITextProps {
  title: string;
  paragraphs: string[];
  className?: string;
  grouped?: boolean;
}

export const Text: FC<ITextProps> = ({ title, paragraphs, className, grouped }) => {
  const paragraphGroups = grouped ? groupParagraphs(paragraphs) : [paragraphs];

  return (
    <div className={cn('text-wrapper', className)}>
      <h2 className="text-title">{title}</h2>
      {paragraphGroups.map((group, groupIndex) => (
        <div key={groupIndex} className={cn({ "paragraph-group": grouped })}>
          {group.map((paragraph, index) => (
            <p key={index} className="text-paragraph">{paragraph}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

const groupParagraphs = (paragraphs: string[]): string[][] => {
  const groups: string[][] = [];
  let currentGroup: string[] = [];

  paragraphs.forEach((paragraph) => {
    if (paragraph.trim() === "") {
      if (currentGroup.length > 0) {
        groups.push(currentGroup);
        currentGroup = [];
      }
    } else {
      currentGroup.push(paragraph);
    }
  });

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
}