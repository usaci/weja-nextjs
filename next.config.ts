import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{
				source: "/games/penguinado3",
				destination: "/games/penguinado3/index.html",
				permanent: true,
			},
			{
				source: "/games/grapple",
				destination: "/games/Grapple-main/index.html",
				permanent: true,
			},
			{
				source: "/games/tankgame",
				destination: "/games/TankGame-main/index.html",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
