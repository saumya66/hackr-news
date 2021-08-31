import styles from "../styles/Navbar.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import {
	faCaretDown,
	faBars,
	faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
	const router = useRouter();

	const { user, error, isLoading } = useUser();
	const [dropDown, setDropDown] = useState("none");
	const [hamMenu, setHamMenu] = useState("none");

	let [activeTheme, setActiveTheme] = useState("light");
	let inactiveTheme = activeTheme === "light" ? "dark" : "light";

	useEffect(() => {
		document.body.dataset.theme = activeTheme;
		inactiveTheme = activeTheme === "light" ? "dark" : "light";
	}, [activeTheme]);

	const showDropDown = (event) => {
		event.preventDefault();

		if (dropDown == "none") setDropDown("block");
		else setDropDown("none");
	};
	const showHamMenu = (event) => {
		event.preventDefault();

		if (hamMenu == "none") setHamMenu("block");
		else setHamMenu("none");
	};
	const path = router.asPath.replace("/", "");

	return (
		<div className={styles.navbar}>
			<div className={styles.hamburger}>
				<FontAwesomeIcon
					className={styles.hamIcon}
					onClick={showHamMenu}
					icon={faEllipsisH}
				/>
				<div className={styles.hamMenu} style={{ display: hamMenu }}>
					{!user ? (
						<Link href={"/api/auth/login"}>
							<div className={styles.hamMenuLink}>
								<h4 className={styles.navItem}>Login</h4>
							</div>
						</Link>
					) : (
						<Link href={"/myprofile"}>
							<div className={styles.hamMenuLink}>
								<h4 className={styles.navItem}>Profile</h4>
							</div>
						</Link>
					)}
					<Link href={"/new"}>
						<div className={styles.hamMenuLink}>
							<h4 className={styles.navItem}>New</h4>
						</div>
					</Link>
					<Link href={"/top"}>
						<div className={styles.hamMenuLink}>
							<h4 className={styles.navItem}>Top</h4>
						</div>
					</Link>
					<Link href={"/best"}>
						<div className={styles.hamMenuLink}>
							<h4 className={styles.navItem}>Best</h4>
						</div>
					</Link>
					<Link href={"/jobs"}>
						<div className={styles.hamMenuLink}>
							<h4 className={styles.navItem}>Jobs</h4>
						</div>
					</Link>
					<Link href={"/show"}>
						<div className={styles.hamMenuLink}>
							<h4 className={styles.navItem}>Show</h4>
						</div>
					</Link>
					{user && (
						<Link href={"/api/auth/logout"}>
							<div className={styles.hamMenuLink}>
								<h4 className={styles.navItem}>Logout</h4>
							</div>
						</Link>
					)}
				</div>
			</div>
			<div className={styles.logoCont}>
				<Link href="/">
					<Image
						src="/hackrnews-logo.png"
						alt="hackrnews"
						width="50"
						height="50"
						className={styles.picLogo}
					/>
				</Link>
				<Link href="/">
					<p className={styles.logo}>HackrNews </p>
				</Link>
			</div>
			<div className={styles.navLinks}>
				<Link href={"/new"}>
					<h4 className={path == "new" ? styles.currItem : styles.navItem}>
						New
					</h4>
				</Link>
				<Link href={"/top"}>
					<h4 className={path == "top" ? styles.currItem : styles.navItem}>
						Top
					</h4>
				</Link>
				<Link href={"/best"}>
					<h4 className={path == "best" ? styles.currItem : styles.navItem}>
						Best
					</h4>
				</Link>
				<Link href={"/jobs"}>
					<h4 className={path == "jobs" ? styles.currItem : styles.navItem}>
						Jobs
					</h4>
				</Link>
				<Link href={"/show"}>
					<h4 className={path == "show" ? styles.currItem : styles.navItem}>
						Show
					</h4>
				</Link>
			</div>
			<div className={styles.user}>
				<div className={styles.toggleBtn}>
					<input
						type="checkbox"
						id="toggle"
						className={styles.togglecheckbox}
						onClick={() => setActiveTheme(inactiveTheme)}
					/>
					<label htmlFor="toggle" className={styles.togglelabel}>
						<span className={styles.togglelabelbackground}></span>
					</label>
				</div>
				{isLoading && <p>Loading...</p>}

				{error && (
					<>
						<h4>Error</h4>
						<pre>{error.message}</pre>
					</>
				)}

				{user ? (
					<>
						<Image
							src={user.picture}
							alt={user.name}
							className={styles.userImg}
							height="40"
							width="40"
						/>

						<FontAwesomeIcon
							className={styles.dropIcon}
							icon={faCaretDown}
							onClick={showDropDown}
						/>

						<div className={styles.dropDown} style={{ display: dropDown }}>
							<div className={styles.dropDownLink}>
								<Link href={"/myprofile"}>
									<a className={styles.linkText}>Profile </a>
								</Link>
							</div>
							<div className={styles.dropDownLink}>
								<Link href={"/api/auth/logout"}>
									<a className={styles.linkText}>Logout </a>
								</Link>
							</div>
						</div>
						{/* <h2 className={styles.userName}>{user.name}</h2> */}
					</>
				) : (
					<button className={styles.authBtn}>
						<Link href={"/api/auth/login"}>Login </Link>
					</button>
				)}
			</div>
		</div>
	);
};

export default Navbar;
