// eslint-disable-next-line camelcase
import { JetBrains_Mono, Roboto } from 'next/font/google'

export const roboto = Roboto({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})
export const jetBrainsMono = JetBrains_Mono({
  weight: ['500', '800'],
  subsets: ['latin'],
  variable: '--font-jetBrainsMono',
})
