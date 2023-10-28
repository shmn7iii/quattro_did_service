import { DID, generateKeyPair, anchor } from "@decentralized-identity/ion-tools";
import crypto from "node:crypto";
global.crypto ??= crypto;

async function createDid(services) {
  const signingKey = await generateKeyPair();
  const did = new DID({
    content: {
      publicKeys: [
        {
          id: "signing-key",
          type: "EcdsaSecp256k1VerificationKey2019",
          publicKeyJwk: signingKey.publicJwk,
          purposes: ["authentication"],
        },
      ],
      services: services,
    },
  });

  const longFormURI = await did.getURI();

  return {
    did: longFormURI,
    signingKey: signingKey,
  };
}

export default createDid;
