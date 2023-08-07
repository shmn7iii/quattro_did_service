import { resolve } from "@decentralized-identity/ion-tools";

async function resolveDid(didUri) {
  try {
    const didDocument = await resolve(didUri);
    return {
      did: didDocument,
    };
  } catch (error) {
    return {
      error: "not found",
    };
  }
}

export default resolveDid;
