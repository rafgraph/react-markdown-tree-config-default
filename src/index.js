// @flow
import React from 'react';

const sharedStyle = {
  fontFamily: 'system-ui, Helvetica, sans-serif',
  lineHeight: '1.5',
  wordWrap: 'break-word',
  color: 'black',
  fontSize: '16px',
};

const Heading = (props: { level: number, children: any }) => {
  const { level } = props;
  const style = {
    ...Heading.style,
    fontSize: (level === 1 && '32px') ||
      (level === 2 && '24px') ||
      (level === 3 && '20px') ||
      (level === 4 && '16px') ||
      '14px',
    color: (level === 6 && 'rgb(100, 100, 100)') || 'black',
    paddingBottom: (level <= 2 && '0.3em') || null,
    borderBottom: (level <= 2 && '1px solid rgb(216, 216, 216)') || null,
  };
  const H = `h${level}`;
  return <H style={style}>{props.children}</H>;
};
Heading.style = {
  ...sharedStyle,
  fontWeight: '500',
  margin: '24px 0 16px 0',
  lineHeight: '1.25',
};

const Paragraph = (props: { children: any }) => {
  return <p style={Paragraph.style}>{props.children}</p>;
};
Paragraph.style = {
  ...sharedStyle,
  margin: '0 0 16px 0',
};

const Link = (props: { href: string, title?: string, children: any }) => {
  return (
    <a href={props.href} title={props.title}>
      {props.children}
    </a>
  );
};

const Image = (props: { src: string, alt: string, title?: string }) => {
  return <img src={props.src} alt={props.alt} title={props.title} />;
};

// tight prop is if the list items don't have blank lines between them
// if a list is not tight then the contents are automatically wrapped in p tags
// e.g. <li><p>rendered item of loose list</p></li>
// see http://spec.commonmark.org/0.26/#lists for more info
// you don't have to wrry about this in your renderer unless you want to
// treat tight/loose lists differently (the p tags are already a part of children)
const List = (props: {
  type: 'ordered' | 'bullet',
  start?: number,
  tight: boolean,
  children: any,
}) => {
  if (props.type === 'ordered') {
    return <ol start={props.start}>{props.children}</ol>;
  }
  return <ul>{props.children}</ul>;
};

const Item = (props: { children: any }) => {
  return <li>{props.children}</li>;
};

const BlockQuote = (props: { children: any }) => {
  return <blockquote>{props.children}</blockquote>;
};

const Emph = (props: { children: any }) => {
  return <em>{props.children}</em>;
};

const Strong = (props: { children: any }) => {
  return <strong>{props.children}</strong>;
};

const Softbreak = () => {
  // returning null will render text as though the softbreak doesn't exist
  // to render a line break instead, return <br />;
  // to render a space, omit this renderer
  return null;
};

// a line with 2 spaces at the end followed by a return
const Linebreak = () => {
  return <br />;
};

const ThematicBreak = () => {
  return <hr />;
};

const Code = (props: { literal: string }) => {
  return <code>{props.literal}</code>;
};

const CodeBlock = (props: { literal: string, language?: string }) => {
  return (
    <pre style={{ width: '100%', overflow: 'scroll' }}>
      {props.literal}
    </pre>
  );
};

export default {
  renderers: {
    Heading,
    Paragraph,
    Link,
    Image,
    List,
    Item,
    BlockQuote,
    Emph,
    Strong,
    Softbreak,
    Linebreak,
    ThematicBreak,
    Code,
    CodeBlock,
  },
};
