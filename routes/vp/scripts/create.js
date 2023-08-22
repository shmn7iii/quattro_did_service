import { ES256KSigner, hexToBytes } from "did-jwt";
import { createVerifiablePresentationJwt } from "did-jwt-vc";

async function createVp(vcJwt, holderDid, holderPrivateKey, aud, nonce) {
  const privateKeyHex = Buffer.from(holderPrivateKey.d, "base64").toString("hex");

  const signer = ES256KSigner(hexToBytes(privateKeyHex));
  const jwtIssuer = {
    did: holderDid,
    signer: signer,
  };

  const issuanceTime = new Date();
  const issuanceUnixTimestamp = Math.floor(issuanceTime.getTime() / 1000);
  const expireTime = new Date();
  expireTime.setMinutes(expireTime.getMinutes() + 10);
  const expireUnixTimestamp = Math.floor(expireTime.getTime() / 1000);

  // TODO: jti
  const vpPayload = {
    jti: "ID of VP",
    aud: aud, // ID of Audience, ex) Merchant ID
    nbf: issuanceUnixTimestamp,
    iat: issuanceUnixTimestamp,
    exp: expireUnixTimestamp,
    nonce: nonce,
    vp: {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      type: ["VerifiablePresentation"],
      verifiableCredential: [vcJwt],
    },
  };
  const vpJwt = await createVerifiablePresentationJwt(vpPayload, jwtIssuer);

  return {
    vpJwt: vpJwt,
  };
}

export default createVp;
