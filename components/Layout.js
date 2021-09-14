import styles from "../styles/Layout.module.css";
import Navbar from "./Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faTwitter,
	faReddit,
	faLinkedIn,
	faHackerNews,
} from "@fortawesome/free-brands-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { useRouter } from "next/router";
import Image from "next/image";

const Layout = ({ children }) => {
	// const [show, setShow] = useState(true);
	const router = useRouter();

	let show = router.asPath === "/" ? false : true;

	return (
		<>
			<div className={styles.layout}>
				<Navbar />

				{children}
				{show && (
					<>
						<a
							href={"https://www.buymeacoffee.com/saumya66"}
							target="_blank"
							rel="noreferrer"
						>
							<div
								style={{ position: "fixed", bottom: "20px", right: "15px" }}
							>
								<Image src="/buymeacoffee.png" width="70" height="70" />
							</div>
						</a>
					</>
				)}
				{show && (
					<div className={styles.feedFooter}>
						<p className={styles.saumya}>🧡 Loving </p>
						<a
							target="_blank"
							rel="noreferrer"
							href="https://twitter.com/intent/tweet?url=https://hackrnews.vercel.app/&text=I'm%20loving%20this%20revamped%20version%20of%20Hackernews%20-%20HackrNews%20!%20%0ACheck%20it%20out!"
						>
							<FontAwesomeIcon
								classname={styles.twitter}
								style={{
									fontSize: "1.5rem",
									color: "#0c85d0",
									marginRight: "0.5rem",
								}}
								icon={faTwitter}
							/>
						</a>
						<a
							target="_blank"
							rel="noreferrer"
							href="https://www.reddit.com/submit?url=http%3A%2F%2Fhackrnews.vercel.app%2F&title=Check+out+this+revamped+version+of+Hackernews+-+HackrNews+!"
						>
							<FontAwesomeIcon
								style={{
									fontSize: "1.5rem",
									color: "#ff4500",
									marginRight: "0.5rem",
								}}
								icon={faReddit}
							/>{" "}
						</a>
						<a
							href="https://www.facebook.com/sharer/sharer.php?u=https://hackrnews.vercel.app/"
							target="_blank"
							rel="noreferrer"
						>
							<FontAwesomeIcon
								classname={styles.facebook}
								style={{
									fontSize: "1.5rem",
									color: "#1c8bf6",
									marginRight: "0.5rem",
								}}
								icon={faFacebook}
							/>{" "}
						</a>
						<a
							href="https://www.linkedin.com/shareArticle?mini=true&url=https://hackrnews.vercel.app/"
							target="_blank"
							rel="noreferrer"
						>
							<FontAwesomeIcon
								style={{
									fontSize: "1.5rem",
									color: "#0a66c2",
									marginRight: "0.5rem",
								}}
								icon={faLinkedIn}
							/>{" "}
						</a>

						<p className={styles.saumya}>HackrNews ? </p>
					</div>
				)}
			</div>
		</>
	);
};
export default Layout;
