module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["s.gravatar.com", "lh3.googleusercontent.com"],
	},
};
const withPWA = require("next-pwa");

module.exports = withPWA({
	pwa: {
		dest: "public",
		disable: process.env.NODE_ENV === "development",
	},
	images: {
		domains: ["s.gravatar.com", "lh3.googleusercontent.com"],
	},
	reactStrictMode: true,
});
