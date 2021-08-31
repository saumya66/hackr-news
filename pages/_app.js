import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0";
import "../styles/globals.css";
import Layout from "../components/Layout";
import nProgress from "nprogress";
import Router from "next/router";
import Head from "next/head";
import "../styles/nprogress.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import Script from "next/script";

import MetaTags from "../components/MetaTags";
Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

Router.onRouteChangeError = () => NProgress.done();
export default function App({ Component, pageProps }) {
	const router = useRouter();
	useEffect(() => {
		const handleRouteChange = (url) => {
			gtag.pageview(url);
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	return (
		<>
			<Head>
				<link rel="manifest" href="/manifest.json" />
			</Head>

			<UserProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</UserProvider>
		</>
	);
}
