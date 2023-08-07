import { ES256KSigner, hexToBytes } from "did-jwt";
import { createVerifiablePresentationJwt } from "did-jwt-vc";

async function createVp(vcJwt, holderDid, holderPrivateKey) {
  const privateKeyHex = Buffer.from(holderPrivateKey.d, "base64").toString(
    "hex"
  );

  const signer = ES256KSigner(hexToBytes(privateKeyHex));
  const jwtIssuer = {
    did: holderDid,
    signer: signer,
  };

  const issuanceTime = new Date();
  const issuanceUnixTime = Math.floor(issuanceTime.getTime() / 1000);

  const vpPayload = {
    jti: "ID of VP",
    nbf: issuanceUnixTime,
    iat: issuanceUnixTime,
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
