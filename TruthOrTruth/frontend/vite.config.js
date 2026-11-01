import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173,
		proxy: {
			// Proxy all /api calls to the Express backend so cookies work on same origin
			"/auth": {
				target: "http://localhost:3000",
				changeOrigin: true,
				secure: false,
			},
			"/user": {
				target: "http://localhost:3000",
				changeOrigin: true,
				secure: false,
			},
			"/product": {
				target: "http://localhost:3000",
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
