import { CeramicClient } from '@ceramicnetwork/http-client';
import { DID } from 'dids';
import * as KeyResolver from 'key-did-resolver';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { fromString } from 'uint8arrays';
import dotenv from 'dotenv';

dotenv.config();

// const ceramic = new CeramicClient('http://localhost:7007');

const ceramic = new CeramicClient('https://ceramic.nomis.cc');

const seed = process.env.DID_SEED as string;

const authenticateCeramic = async () => {
    const provider = new Ed25519Provider(fromString(seed, 'hex'));
    const did = new DID({
        provider,
        resolver: KeyResolver.getResolver(),
    });

    ceramic.did = did;
    const authenticated = await ceramic.did.authenticate();

    console.log('Authenticated:', authenticated);
};

export { authenticateCeramic, ceramic };
