import { verify } from "@decentralized-identity/ion-tools";

async function verifyDid(jws, publicKey) {
  const result = await verify({ jws: jws, publicJwk: publicKey });

  return {
    result: result,
  };
}

export default verifyDid;
