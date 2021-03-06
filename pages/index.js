import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Landing.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from 'next/router'

const FeatureCard = ({ name, desc }) => {
	return (
		<div className={styles.featureCard}>
			<h2 className={styles.featureName}>{name}</h2>
			<p className={styles.featureDesc}>{desc}</p>
		</div>
	);
};



export default function Home() {
	const {user}= useUser();
	const router = useRouter()

	useEffect(()=>{
		if(user){
			router.push("/top")
		}
		
	},[]);
	return (
		<>
			<Head>
				<link rel="manifest" href="/manifest.json" />
				<title>HackrNews</title>
				<meta
					property="og:image"
					content={
						"https://hackrnews.vercel.app/_next/image?url=%2Fhackrnews-logo.png&w=64&q=75"
					}
					key="ogimage"
				/>
				<meta property="og:site_name" content={"HackrNews"} key="ogsitename" />
				<meta
					name="description"
					content="HackrNews is a Super Clean, Cross-Platform, Revamped version of HackerNews filled with the top-most Interesting Tech News & Updates from around the world!"
				/>
				<meta
					property="og:title"
					content="HackrNews - Read HackerNews with Ease."
				/>
				<meta
					property="og:description"
					content="HackrNews is a Super Clean, Cross-Platform, Revamped version of HackerNews filled with the top-most Interesting Tech News & Updates from around the world!"
				/>
				<meta property="og:url" content="https://hackrnews.vercel.app/" />
			</Head>

			<div className={styles.page}>
				<div className={styles.header}>
					<div className={styles.leftComp}>
						<h1 className={styles.heading}>Read HackrNews with Ease.</h1>
						<div className={styles.desc}>
							<div className={styles.descRowOne}>
								<Link href="/top">
									<button className={styles.authBtn}>Get In !</button>
								</Link>
								<a
									href="https://github.com/saumya66/hackr-news"
									target="_blank"
									rel="noreferrer"
								>
									<button className={styles.authBtn}>
										<FontAwesomeIcon
											style={{ marginRight: "0.2rem" }}
											icon={faStar}
										/>
										<span>Github </span>
									</button>
								</a>
							</div>
							<div className={styles.descRowTwo}>
								<a
									href="https://www.producthunt.com/posts/hackrnews?utm_source=badge-review&utm_medium=badge&utm_souce=badge-hackrnews#discussion-body"
									target="_blank"
									rel="noreferrer"
								>
									<div>
										<Image
											src="https://api.producthunt.com/widgets/embed-image/v1/review.svg?post_id=310643&theme=dark"
											alt="HackrNews - Read Hacker News with ease | Product Hunt"
											width="240"
											height="54"
										/>
									</div>
								</a>
							</div>
						</div>
					</div>
					<div className={styles.rightComp}>
						<Image src="/mockupfull.webp" width="950" height="770" />
					</div>
				</div>

				<div className={styles.features}>
					<FeatureCard
						name="Light/Dark Mode"
						desc="Give your eyes some rest while you read."
					/>
					<FeatureCard
						name="Cross Platform "
						desc="Install the PWA to get it as an app on your Phone or Desktop"
					/>

					<FeatureCard
						name="More than a Feed"
						desc="SignUp To See Posts you Save. Read the Comments. See an User's Karma and Posts."
					/>
					<FeatureCard
						name="Read Effortessly"
						desc="Clean &#38; Responsive UI to make reading effortless ."
					/>
				</div>
				<h3 style={{ textAlign: "center" }}>
					{" "}
					Built with ???? by{" "}
					<a
						href="https://twitter.com/saumya4real"
						target="_blank"
						rel="noreferrer"
						style={{ color: "#5B31EC" }}
					>
						Saumya !
					</a>
				</h3>
			</div>
		</>
	);
}
