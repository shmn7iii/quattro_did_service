import { decodeJWT } from "did-jwt";
import { resolve, verify } from "@decentralized-identity/ion-tools";

async function verifyVc(vcJwt) {
  const { payload } = decodeJWT(vcJwt, false);

  const issuerDidUri = payload.iss;
  const issuerDid = await resolve(issuerDidUri);
  const issuerPublicKeyJwk =
    issuerDid.didDocument.verificationMethod[0].publicKeyJwk;

  const verifyResult = await verify({
    jws: vcJwt,
    publicJwk: issuerPublicKeyJwk,
  });

  return {
    verified: verifyResult,
    vc: payload.vc,
    issuerDid: issuerDid,
  };
}

export default verifyVc;
