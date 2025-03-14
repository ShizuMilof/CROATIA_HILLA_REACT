import { UserConfigFn } from 'vite';
import { overrideVaadinConfig } from './vite.generated';

const customConfig: UserConfigFn = (env) => ({
  server: {
    host: "0.0.0.0",  // Omogućava pristup s drugih uređaja
    port: 5173,       // Standardni Vite port
    strictPort: true, // Osigurava da Vite koristi upravo ovaj port
    hmr: {
      clientPort: 5173 // Osigurava da Hot Module Reload koristi ispravnu mrežnu adresu
    }
  }
});

export default overrideVaadinConfig(customConfig);
