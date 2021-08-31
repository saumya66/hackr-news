import styles from "../styles/PostComp.module.css";
import { faComments, faUser } from "@fortawesome/free-regular-svg-icons";
import { faChevronUp, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import parse from "html-react-parser";
import { useState, useEffect } from "react";

const ParsedComment = (str) => {
	return parse(`${str}`);
};

const PostComp = (props) => {
	var url = props.url ? String(props?.url) : "";
	var postName = String(props.name);
	const [saved, setSaved] = useState("#4d5b79");

	function savePost() {
		if (localStorage.getItem("bookmarks")) {
			let bookmarks = localStorage.getItem("bookmarks");
			bookmarks = JSON.parse(bookmarks);
			if (bookmarks.includes(props.id)) {
				bookmarks = bookmarks.filter((id) => id != props.id);
				setSaved("#4d5b79");
			} else {
				bookmarks.push(props.id);
				setSaved("#00b074");
			}
			localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
		} else {
			let bookmarks = [];
			bookmarks.push(props.id);
			localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
			setSaved("#00b074");
		}
	}
	useEffect(() => {
		if (localStorage.getItem("bookmarks")) {
			let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
			if (bookmarks.includes(props.id)) {
				setSaved("#00b074");
			}
		}
	}, []);
	return (
		<div className={styles.postComp}>
			<div className={styles.upVotes}>
				<FontAwesomeIcon className={styles.icon} icon={faChevronUp} />
				<p className={styles.votes}>{props.points}</p>
			</div>
			<div className={styles.mainArea}>
				<div className={styles.firstRow}>
					<Link href={props.url ? props.url : ""}>
						<a target="_blank">{postName}</a>
					</Link>
				</div>
				<div className={styles.secondRow}>
					<p className={styles.linkCol}>
						{
							url
								.replace("http://", "")
								.replace("https://", "")
								.split(/[/?#]/)[0]
						}
					</p>
				</div>
				<div className={styles.thirdRow}>
					<div className={styles.firstCol}>
						<div className={styles.authorCont}>
							<FontAwesomeIcon className={styles.userIcon} icon={faUser} />
							<Link href={{ pathname: "profile", query: { userId: props.by } }}>
								<p className={styles.author}>{props.by}</p>
							</Link>
						</div>
						<Link href={{ pathname: "comments", query: { postId: props.id } }}>
							<div className={styles.commentCont}>
								<FontAwesomeIcon
									className={styles.commentIcon}
									icon={faComments}
								/>
								<p className={styles.comment}>{props.comments}</p>
							</div>
						</Link>
					</div>
					<div onClick={savePost} className={styles.secondCol}>
						<FontAwesomeIcon
							style={{ color: `${saved}` }}
							className={styles.saveIcon}
							icon={faBookmark}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostComp;
