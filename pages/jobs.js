import { useState, useEffect } from "react";
import axios from "axios";
import PostComp from "../components/PostComp";
import styles from "../styles/Page.module.css";
import Head from "next/head";
const Job = ({ send }) => {
	const [stories, setStories] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setStories(send);
		setLoading(false);
	}, []);
	return (
		<>
			<Head>
				<link rel="manifest" href="/manifest.json" />
				<title>HackrNews</title>
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
				<div className={styles.list}>
					{!loading ? (
						stories.map((story) => {
							return (
								<PostComp
									key={story.id}
									id={story?.id}
									name={story.title}
									comments={story.descendants}
									by={story.by}
									points={story.score}
									type={story.type}
									time={story.time}
									url={story.url}
								/>
							);
							//	console.log(story);
						})
					) : (
						<div style={{ width: "100px", height: "100px" }}>
							<div className={styles.loading}></div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export async function getStaticProps(context) {
	const res = await axios.get(
		"https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty"
	);
	const ids = res.data;

	const stories = ids.slice(0, 99).map(async (id) => {
		return await axios
			.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
			.then((res) => res.data);
	});

	var send = await Promise.all(stories).then((res) => {
		return res;
	});

	return {
		props: { send },
	};
}

export default Job;
