import Image from 'next/image'
import styles from './header.module.scss'
import logoIcon from '../../../public/assets/icons/logo.svg'
import { GetDateNowFormated } from '@/utils/dates'

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={logoIcon} alt="FocalPoint Logo" width={33} height={33} />
        <p>FocalPoint</p>
      </div>
      <p className={styles.welcomeTitle}>Bem-vindo de volta, Marcus</p>
      <p className={styles.dateInfo}>{GetDateNowFormated()}</p>
    </header>
  )
}
