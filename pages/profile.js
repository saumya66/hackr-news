import stylesPage from "../styles/Page.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import styles from "../styles/Profile.module.css";
import Head from "next/head";
import PostComp from "../components/PostComp";

export async function getServerSideProps({ query }) {
	const userId = query.userId;
	const user = await axios
		.get(
			`https://hacker-news.firebaseio.com/v0/user/${userId}.json?print=pretty`
		)
		.then((res) => res.data);
	const postIds = user?.submitted;

	const posts = postIds.map(async (id) => {
		return axios
			.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
			.then((res) => res.data);
	});
	const allPosts = await Promise?.all(posts).then((res) => {
		return res;
	});
	return {
		props: { allPosts, user },
	};
}

const Profile = ({ allPosts, user }) => {
	const [userInfo, setUserInfo] = useState();
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	useState(() => {
		setUserInfo(user);
		setPosts(
			allPosts.filter((post) => post?.type == "story" && post?.deleted != true)
		);
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
			<div className={stylesPage.page}>
				<div className={stylesPage.list}>
					<div className={styles.user}>
						<FontAwesomeIcon className={styles.icon} icon={faUser} />
						<p className={styles.userName}>{userInfo?.id}</p>
						<p className={styles.karma}> Karma : {userInfo?.karma} </p>
					</div>
					<div className={styles.userPosts}>
						{!loading ? (
							posts.map((post) => (
								<PostComp
									key={post.id}
									id={post?.id}
									name={post.title}
									comments={post.descendants}
									by={post.by}
									points={post.score}
									type={post.type}
									time={post.time}
									url={post.url}
								/>
							))
						) : (
							<div
								style={{ width: "100px", height: "100px", paddingTop: "20px" }}
							>
								<div className={styles.loading}></div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
