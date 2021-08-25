import { build, fake, perBuild } from '@jackfranklin/test-data-bot';
import { bundleMDX } from 'mdx-bundler';
import remarkPrism from 'remark-prism';
import path from 'path';
import fs from 'fs';

import type { Information } from 'components/BlogContainer';

const OUTPUT_FILE = path.resolve(
  __dirname,
  '..',
  'src',
  '__tests__',
  'blog.json',
);

const blogBuilder = build<Information>('Blog', {
  fields: {
    slug: fake((f) => `/blog/${f.lorem.slug()}`),
    readingTime: {
      minutes: fake((f) => f.random.number({ min: 2, max: 10 })),
    },
    title: fake((f) => f.name.title()),
    description: fake((f) => f.lorem.sentences()),
    locale: perBuild(() => 'en'),
    alternate: fake((f) => `/blog/${f.lorem.slug()}`),
    isPublished: perBuild(() => true),
    publishedAt: fake((f) => {
      const date = f.date.past();
      const year = date.getUTCFullYear();
      const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
      const day = ('0' + date.getUTCDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }),
    tags: perBuild(() => ['react', 'test']),
  },
});

(async (blog: Information) => {
  const mdxSource = `
---
title: ${blog.title}
description: ${blog.description}
locale: ${blog.locale}
alternate: ${blog.alternate}
isPublished: ${blog.isPublished}
publishedAt: ${blog.publishedAt}
tags:
  - ${blog.tags[0]}
  - ${blog.tags[1]}
---

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

This is a paragraph

- first
- second
- third

1. first
2. second
3. third

![image](/images/none)

[text](https://link)

\`inline code\`

\`\`\`js
  code block
\`\`\`
`.trim();

  const remarkPlugins = [remarkPrism];
  const result = await bundleMDX(mdxSource, {
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkPlugins,
      ] as never;
      return options;
    },
  });

  const props = {
    ...result,
    readingTime: blog.readingTime,
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(props));
})(blogBuilder());
