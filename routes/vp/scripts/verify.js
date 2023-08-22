import { decodeJWT } from "did-jwt";
import { resolve, verify } from "@decentralized-identity/ion-tools";
import verifyVc from "../../vc/scripts/verify.js";

async function verifyVp(vpJwt, aud, nonce) {
  const { payload } = decodeJWT(vpJwt, false);

  const holderDidUri = payload.iss;
  const expireUnixTimestamp = payload.exp;

  // Verify Expire time
  const currentTime = new Date();
  const expireTime = new Date(expireUnixTimestamp * 1000);
  const expVerifyResult = currentTime <= expireTime;

  // Verify aud
  const audVerifyResult = payload.aud == aud;

  // Verify nonce
  const nonceVerifyResult = payload.nonce == nonce;

  // Resolve DID
  let holderDid;
  try {
    holderDid = await resolve(holderDidUri);
  } catch (error) {
    return {
      error: "DID can't be resolved: " + holderDidUri,
    };
  }

  // Verify JWT
  const holderPublicKeyJwk = holderDid.didDocument.verificationMethod[0].publicKeyJwk;
  const jwtVerifyResult = await verify({
    jws: vpJwt,
    publicJwk: holderPublicKeyJwk,
  });

  // Verify VC
  // TODO: loop all vc
  const vcJwt = payload.vp.verifiableCredential[0];
  const { verified: vcVerifyResult, vc, issuerDid } = await verifyVc(vcJwt);

  return {
    verified: expVerifyResult && audVerifyResult && nonceVerifyResult && jwtVerifyResult && vcVerifyResult,
    vp: payload.vp,
    holderDid: holderDid,
    vc: vc,
    issuerDid: issuerDid,
  };
}

export default verifyVp;
