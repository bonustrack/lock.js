const get = () => import(/* webpackChunkName: "torus" */ '@toruslabs/torus-embed');
import LockConnector from '../src/connector';
import { EIP1193Provider } from '../src/types';

export default class Connector extends LockConnector {
  async connect(): Promise<EIP1193Provider | undefined> {
    let provider;
    try {
      const Torus = (await get()).default;
      const torus = new Torus({});
      await torus.init({ showTorusButton: false });
      await torus.login({});
      provider = torus.provider;
    } catch (e) {
      console.error(e);
    }
    provider.connectorName = 'torus';
    return provider;
  }
}
