import { ES256KSigner, hexToBytes } from "did-jwt";
import { createVerifiableCredentialJwt } from "did-jwt-vc";

async function createVc(subjectDid, issuerDid, issuerPrivateKey) {
  const privateKeyHex = Buffer.from(issuerPrivateKey.d, "base64").toString(
    "hex"
  );

  const signer = ES256KSigner(hexToBytes(privateKeyHex));
  const jwtIssuer = {
    did: issuerDid,
    signer: signer,
  };

  const issuanceTime = new Date();
  const issuanceUnixTime = Math.floor(issuanceTime.getTime() / 1000);

  const vcPayload = {
    sub: subjectDid,
    jti: "ID of VC",
    nbf: issuanceUnixTime,
    iat: issuanceUnixTime,
    vc: {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      type: ["VerifiableCredential"],
      issuer: issuerDid,
      credentialSubject: {
        id: subjectDid,
        degree: {
          type: "QuattroWallet",
          name: "Wallet of Quattro payment network",
        },
      },
    },
  };
  const vcJwt = await createVerifiableCredentialJwt(vcPayload, jwtIssuer);

  return {
    vcJwt: vcJwt,
  };
}

export default createVc;
