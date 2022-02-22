import { AppProps } from "next/app"
import Head from "next/head"
import "../styles/index.css"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Brevis</title>
			</Head>
			<Component {...pageProps} />
		</>
	)
}
