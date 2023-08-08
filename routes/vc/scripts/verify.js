import { decodeJWT } from "did-jwt";
import { resolve, verify } from "@decentralized-identity/ion-tools";

async function verifyVc(vcJwt) {
  const { payload } = decodeJWT(vcJwt, false);

  const issuerDidUri = payload.iss;

  let issuerDid;
  try {
    issuerDid = await resolve(issuerDidUri);
  } catch (error) {
    return {
      error: "DID can't be resolved: " + issuerDidUri,
    };
  }

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
