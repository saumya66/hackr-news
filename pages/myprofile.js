import { useUser } from "@auth0/nextjs-auth0";
import stylesPage from "../styles/Page.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import styles1 from "../styles/Profile.module.css";
import styles2 from "../styles/Profile.module.css";
import Head from "next/head";
import PostComp from "../components/PostComp";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { ConnectionStates } from "mongoose";

const MyProfile = () => {
	const { user, error, isLoading } = useUser();
	const [bookmarks, setBookmarks] = useState([]);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(async () => {
		if (localStorage.getItem("bookmarks")) {
			let ids = JSON.parse(localStorage.getItem("bookmarks"));
			setBookmarks(ids);

			var bk = ids.map(
				async (id) =>
					await axios
						.get(
							`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
						)
						.then((res) => res.data)
			);
			var posts = await Promise.all(bk).then((res) => res);
			setPosts(posts);
			setLoading(false);
		}
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
					<div className={styles1.user}>
						{user ? (
							<Image src={user.picture} width="80" height="80" />
						) : (
							<FontAwesomeIcon className={styles1.icon} icon={faUser} />
						)}

						<p className={styles1.userName}>{user?.name} </p>
					</div>
					<p style={{ fontSize: "1rem" }}>Your Bookmarks</p>
					<div className={styles1.userPosts}>
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
								<div className={styles1.loading}></div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default withPageAuthRequired(MyProfile);
