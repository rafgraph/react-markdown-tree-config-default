// @flow
import React from 'react';
import Interactive from 'react-interactive';

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
    <Interactive as="a" href={props.href} title={props.title} {...Link.style}>
      {props.children}
    </Interactive>
  );
};
Link.style = {
  style: {
    ...sharedStyle,
    color: 'rgb(3, 102, 214)',
    backgroundColor: 'transparent',
    textDecoration: 'none',
  },
  hover: { textDecoration: 'underline' },
  active: 'hover',
  focusFromTab: {
    backgroundColor: 'rgba(3, 102, 214, 0.3)',
    padding: '2px 4px',
    margin: '-2px -4px',
    borderRadius: '3px',
  },
  touchActiveTapOnly: true,
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
    return <ol start={props.start} style={List.style}>{props.children}</ol>;
  }
  return <ul style={List.style}>{props.children}</ul>;
};
List.style = {
  ...sharedStyle,
  margin: '0 0 16px',
  paddingLeft: '2em',
};

const Item = (props: { children: any }) => {
  // check to see if the item conains another list, if it does
  // offset the bottom margin of the list it contains
  const containsList = props.children.some(
    child =>
      React.isValidElement(child) &&
      typeof child.type === 'function' &&
      child.type.name === 'List',
  );
  const style = {};
  if (containsList) style.margin = '0 0 -16px';
  return <li style={style}>{props.children}</li>;
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
  return (
    <code style={Code.style}>
      <span style={{ letterSpacing: '-3px' }}>&nbsp;</span>
      {props.literal}
      <span style={{ letterSpacing: '-3px' }}>&nbsp;</span>
    </code>
  );
};
Code.style = {
  ...sharedStyle,
  fontFamily: 'Courier, monospace',
  color: 'inherit',
  backgroundColor: 'rgba(16, 16, 16, 0.05)',
  padding: '2px 0',
  borderRadius: '3px',
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
