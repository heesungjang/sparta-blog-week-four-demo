import styles from '../styles/footer.module.css';
import Decorative from './Decorative';
import Logo from './Logo';

function Footer() {
  return (
    <div className={styles.wrapper}>
      <Decorative />
      <div className={styles.content}>
        <div>
          <Logo mobileAlignment='center' />
          <p className={styles.attribution}>
            <a href='https://spartacodingclub.kr/'>
              Template created by: 스파르타 코딩 클럽{' '}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
