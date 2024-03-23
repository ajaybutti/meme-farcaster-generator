import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p>
            Head to{' '}
            <a
              href="/api/dev"
              style={{ display: 'inline', fontWeight: 'semibold' }}
            >
              <code className={styles.code}>localhost:3000/api</code>
            </a>{' '}
            for your frame endpoint.
          </p>
        </div>
        <div></div>
      </div>

      <div className={styles.center}>
        <div>
          <h1>Meme Text Generator</h1>
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://github.com/ajaybutti"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>

        <a
          href="https://frog.fm/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Frog.fm <span>-&gt;</span>
          </h2>
          <p>Built with Frog.fm</p>
        </a>
      </div>
    </main>
  )
}
