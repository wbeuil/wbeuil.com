/* eslint-disable react/display-name */

import Heading from 'components/Heading';
import Paragraph from 'components/Paragraph';
import List from 'components/List';
import ListItem from 'components/ListItem';
import Image from 'components/Image';
import TextLink from 'components/TextLink';
import Code from 'components/Code';
import Preformatted from 'components/Preformatted';
import Division from 'components/Division';

import type { ComponentMap } from 'mdx-bundler/dist/client';

const BlogComponents: ComponentMap = {
  h1: (props) => <Heading level='h1' {...props} />,
  h2: (props) => <Heading level='h2' {...props} />,
  h3: (props) => <Heading level='h3' {...props} />,
  h4: (props) => <Heading level='h4' {...props} />,
  h5: (props) => <Heading level='h5' {...props} />,
  h6: (props) => <Heading level='h6' {...props} />,
  p: Paragraph,
  ul: (props) => <List type='ul' {...props} />,
  ol: (props) => <List type='ol' {...props} />,
  li: ListItem,
  img: Image as React.FC, // fixed type on mdx-bundler
  a: TextLink as React.FC, // fixed type on mdx-bundler
  code: Code as React.FC, // fixed type on mdx-bundler
  pre: Preformatted as React.FC, // fixed type on mdx-bundler
  div: Division as React.FC, // fixed type on mdx-bundler
};

export default BlogComponents;
