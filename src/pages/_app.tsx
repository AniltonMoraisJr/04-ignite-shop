import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'

import logoImg from '../assets/logo.svg'
import { AppContainer, AppHeader } from '@/styles/pages/app'
import Image from 'next/image'

import '@radix-ui/themes/styles.css'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContainer>
      <AppHeader>
        <Image src={logoImg} alt="Logo Ignite Shop" />
      </AppHeader>
      <Component {...pageProps} />
    </AppContainer>
  )
}
