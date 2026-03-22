import { FC } from 'react';
import cn from 'classnames';
import './Text.css';
import { Title } from '../Title/Title';
import { Paragraph } from '../Paragraph/Paragraph';

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
      <Title level={2} size="medium" weight="bold">
        {title}
      </Title>
      {paragraphGroups.map((group, groupIndex) => (
        <div key={groupIndex} className={cn({ 'paragraph-group': grouped })}>
          {group.map((text, index) => (
            <Paragraph key={text.slice(0, 20) + index}>{text}</Paragraph>
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
    if (paragraph.trim() === '') {
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
};
