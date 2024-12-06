import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "front-mission.bigs.or.kr",
				port: "",
				pathname: "/**",
			},
		],
	},

	sassOptions: {
		silenceDeprecations: ["legacy-js-api"],
	},
};

export default nextConfig;
