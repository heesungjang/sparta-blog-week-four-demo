import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import styles from '../styles/blogPost.module.css';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Layout from './Layout';
import { PUBLISHED_POSTS } from '../posts';

function BlogPost() {
  const { fileName } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      const post = PUBLISHED_POSTS[fileName];

      const blogTitle = post.title;
      const blogFileName = fileName;
      const blogAbstraction = post.abstraction;
      const blogPublishedAt = post.publishedAt;
      const response = await fetch(`/posts/${blogFileName}`);
      const blogContent = await response.text();

      setPost({
        blogTitle,
        blogContent,
        blogFileName,
        blogAbstraction,
        blogPublishedAt,
      });
    };

    getPost();
  }, [fileName]);

  if (!post) {
    return null;
  }

  return (
    <Layout>
      <article className={styles.pageWrapper}>
        <header className={styles.wrapper}>
          <div className={styles.content}>
            <h1>{post.blogTitle}</h1>
            <p>
              <time dateTime={post.blogPublishedAt}>
                작성일:{' '}
                {format(new Date(post.blogPublishedAt), 'MMMM do, yyyy')}
              </time>
            </p>
          </div>
        </header>

        <div className={styles.page}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag='div'
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    style={docco}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.blogContent}
          </Markdown>
        </div>
      </article>
    </Layout>
  );
}
export default BlogPost;
