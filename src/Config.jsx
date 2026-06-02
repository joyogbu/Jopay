import { createConfig, http } from 'wagmi';
import { arcTestnet } from './arcTestnet.jsx';
import { injected } from 'wagmi/connectors';
import { mainnet, sepolia, baseSepolia } from 'wagmi/chains';

/*export const config = createConfig({
	chains: [arcTestnet],
	connectors: [
		injected(),
	],
	transports: {
		[arcTestnet.id]: http("https://rpc.testnet.arc.network"),
	
	},
})*/

export const config = createConfig({
	chains: [arcTestnet, baseSepolia, sepolia],
	ssr: false,
	/*connectors: [
		injected(),
	],*/
	transports: {
		[arcTestnet.id]: http("https://rpc.testnet.arc.network"),
		[baseSepolia.id]: http("https://sepolia-preconf.base.org"),
		[sepolia.id]: http(),
	},
})
