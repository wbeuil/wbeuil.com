import readingTime from 'reading-time';
import matter from 'gray-matter';

import formatDate from 'utils/date';

const generateBlogImageHTML = (blog: string): string => {
  const { data, content } = matter(blog.trim());
  const isEN = data.locale === 'en';
  const date = isEN
    ? `Published on ${formatDate('en-US', new Date(data.publishedAt))}`
    : `Publié le ${formatDate('fr-FR', new Date(data.publishedAt))}`;
  const read = `${Math.ceil(readingTime(content).minutes).toFixed(0)} ${
    isEN ? 'min read' : 'min de lecture'
  }`;

  return `
<html>
  <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;700');
      * {
        border: 0;
        padding: 0;
        margin: 0;
      }
      body {
        background: #14191e;
        color: #ededed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-family: 'Work Sans';
      }
      h1 {
        font-weight: 700;
        font-size: 3rem;
        line-height: 4rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        margin-bottom: 1rem;
      }
      .container {
        border-radius: 0.75rem;
        border: 2px solid #1f2937;
        width: 72rem;
      }
      .subcontainer {
        padding: 2rem;
        max-width: 72rem;
      }
      .bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
      .row {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .description {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        margin-bottom: 3rem;
        color: #9ca3af;
        font-size: 32px;
      }
      .left p {
        font-size: 1.75rem;
        line-height: 2.5rem;
        padding: 0.5rem;
        color: #9ca3af;
      }
      .left span {
        color: #4b5563;
      }
      .left p {
        font-size: 1.75rem;
        line-height: 2.5rem;
        padding: 0.5rem;
        color: #9ca3af;
      }
      .right p, .right span {
        color: #6b7280;
      }
      .right p {
        font-size: 1.5rem;
        line-height: 2rem;
        padding: 0.5rem;
      }
      .right span {
        font-size: 32px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="subcontainer">
        <h1>${data.title}</h1>
        <p class="description">${data.description}</p>
        <div class="bottom">
          <div class="row left">
            ${data.tags
              .map((tag: string) => `<p><span>#</span>${tag}</p>`)
              .join('')}
          </div>
          <div class="row right">
            <p>${date}</p>
            <span>·</span>
            <p>${read}</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;
};

export default generateBlogImageHTML;
