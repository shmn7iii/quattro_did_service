import { decodeJWT } from "did-jwt";
import { resolve, verify } from "@decentralized-identity/ion-tools";
import verifyVc from "../../vc/scripts/verify.js";

async function verifyVp(vpJwt) {
  const { payload } = decodeJWT(vpJwt, false);

  const holderDidUri = payload.iss;

  let holderDid;
  try {
    holderDid = await resolve(holderDidUri);
  } catch (error) {
    return {
      error: "DID can't be resolved: " + holderDidUri,
    };
  }

  const holderPublicKeyJwk =
    holderDid.didDocument.verificationMethod[0].publicKeyJwk;

  const vpVerifyResult = await verify({
    jws: vpJwt,
    publicJwk: holderPublicKeyJwk,
  });

  // VC Verify
  // TODO: loop
  const vcJwt = payload.vp.verifiableCredential[0];
  const { verified: vcVerifyResult, vc, issuerDid } = await verifyVc(vcJwt);

  return {
    verified: vpVerifyResult && vcVerifyResult,
    vp: payload.vp,
    holderDid: holderDid,
    vc: vc,
    issuerDid: issuerDid,
  };
}

export default verifyVp;
