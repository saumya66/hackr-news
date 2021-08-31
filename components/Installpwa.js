import React, { useEffect, useState } from "react";

const InstallPWA = () => {
	const [supportsPWA, setSupportsPWA] = useState(false);
	const [promptInstall, setPromptInstall] = useState(null);

	useEffect(() => {
		const handler = (e) => {
			e.preventDefault();
			console.log("we are being triggered :D");
			setSupportsPWA(true);
			setPromptInstall(e);
		};
		window.addEventListener("beforeinstallprompt", handler);

		return () => window.removeEventListener("transitionend", handler);
	}, []);

	const onClick = (evt) => {
		evt.preventDefault();

		promptInstall.prompt();
	};

	return (
		<button
			className="link-button"
			id="setup_button"
			aria-label="Install app"
			title="Install app"
			onClick={onClick}
		>
			Install
		</button>
	);
};

export default InstallPWA;
