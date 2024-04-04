import React from 'react';
import styles from './styles.module.css';

function Error404() {
  const goBack = () => {
    window.location.href = '/';
  };

  return (
    <div>
      <video autoPlay loop muted id={styles.video} name="media">
        <source src="1.webm" type="video/webm"/>
      </video>
      <div className={styles.befvid}>
      <main className={styles.container}>
        <div className={styles['page-content']}>
          <div className={styles['inner-content']}>
            <h1 className={styles.heading}>Error 404. Page Not Found.</h1>
            <p style={{fontSize: '2rem'}}>Head back to previous page?</p>
            <div className={styles.buttons}>
              <a style={{height: '50px', width: '18rem'}} href="#" onClick={goBack} className={styles.active}>Head Back</a>
            </div>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}

export default Error404;