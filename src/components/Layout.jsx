import '../styles/layout.css';
import Header from './Header';
import Footer from './Footer';

export const BLOG_TITLE = 'Sparta Coding Club Blog';

function Layout({ children }) {
  // const savedTheme = cookies().get(COLOR_THEME_COOKIE_NAME);
  // const theme = savedTheme?.value || 'light';

  return (
    <div>
      <Header initialTheme={'light'} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
