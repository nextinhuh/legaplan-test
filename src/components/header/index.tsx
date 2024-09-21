import Image from 'next/image'
import styles from './header.module.scss'
import logoIcon from '../../assets/icons/logo.svg'

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={logoIcon} alt="FocalPoint Logo" width={33} height={33} />
        <p>FocalPoint</p>
      </div>
      <p className={styles.welcomeTitle}>Bem-vindo de volta, Marcus</p>
      <p className={styles.dateInfo}>Segunda, 01 de dezembro de 2025</p>
    </header>
  )
}
