import { decodeJWT } from "did-jwt";
import { resolve, verify } from "@decentralized-identity/ion-tools";

async function verifyVc(vcJwt) {
  const { payload } = decodeJWT(vcJwt, false);

  const issuerDidUri = payload.iss;
  const holderDidUri = payload.sub;
  const expireUnixTimestamp = payload.exp;

  // Verify Expire time
  const currentTime = new Date();
  const expireTime = new Date(expireUnixTimestamp * 1000);
  const expVerifyResult = currentTime <= expireTime;

  // Resolve DID
  let issuerDid;
  try {
    issuerDid = await resolve(issuerDidUri);
  } catch (error) {
    return {
      error: "DID can't be resolved: " + issuerDidUri,
    };
  }

  let holderDid;
  try {
    holderDid = await resolve(holderDidUri);
  } catch (error) {
    return {
      error: "DID can't be resolved: " + holderDidUri,
    };
  }

  // Verify JWT
  const issuerPublicKeyJwk = issuerDid.didDocument.verificationMethod[0].publicKeyJwk;
  const jwtVerifyResult = await verify({
    jws: vcJwt,
    publicJwk: issuerPublicKeyJwk,
  });

  return {
    verified: expVerifyResult && jwtVerifyResult,
    vc: payload.vc,
    issuerDid: issuerDid,
    holderDid: holderDid,
  };
}

export default verifyVc;
