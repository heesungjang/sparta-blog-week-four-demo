import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import styles from './styles/homepage.module.css';
import BlogSummaryCard from './components/BlogSummaryCard';
import mainPageImg from './assets/Main_Page_Img.png';
import { PUBLISHED_POSTS } from './posts';

function App() {
  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const posts = await Promise.all(
        Object.entries(PUBLISHED_POSTS).map(async ([fileName, post]) => {
          const response = await fetch(`/posts/${fileName}`);
          const blogContent = await response.text();

          return {
            blogTitle: post.title,
            blogContent,
            blogFileName: fileName,
            blogAbstraction: post.abstraction,
            blogPublishedAt: post.publishedAt,
          };
        })
      );

      setBlogPosts(posts);
    };

    getPosts();
  }, []);
  return (
    <Layout>
      <div className={styles.wrapper}>
        <h1>👋 안녕하세요, x 개발자 x 입니다.</h1>
        <img src={mainPageImg} className={styles.mainImage} />
        <h2 className={styles.mainHeading}>최근 올라온 글: </h2>
        {blogPosts.map((post) => (
          <BlogSummaryCard key={post.blogFileName} blogPost={post} />
        ))}
      </div>
    </Layout>
  );
}

export default App;
