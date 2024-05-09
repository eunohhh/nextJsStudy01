import { Inter } from 'next/font/google'
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../../lib/apollo';
import AuthContext from '@/context/authContext';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {

  // const apolloClient = useApollo(children.initialApolloState || {});

  return (
    <html lang="en">
      {/* <ApolloProvider client={apolloClient}>
      </ApolloProvider> */}
      <body className={inter.className}>
          <AuthContext>
            {children}
          </AuthContext>
        </body>

    </html>
  )
}
