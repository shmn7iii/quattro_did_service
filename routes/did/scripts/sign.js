import { sign } from "@decentralized-identity/ion-tools";

async function signDid(payload, privateKey) {
  const jws = await sign({ payload: payload, privateJwk: privateKey });

  return {
    jws: jws,
  };
}

export default signDid;
