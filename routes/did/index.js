import express from "express";
import createDid from "./scripts/create.js";
import signDid from "./scripts/sign.js";
import verifyDid from "./scripts/verify.js";
import resolveDid from "./scripts/resolve.js";

const router = express.Router();

router.get("/", function (req, res, next) {
  res.json({ message: "DID" });
});

router.post("/create", async function (req, res, next) {
  const services = req.body.services;
  if (services == undefined) {
    res.status(400).json({ error: "Invalid parameter" });
    return;
  }

  const createDidRes = await createDid(services);
  res.json(createDidRes);
});

router.post("/sign", async function (req, res, next) {
  const payload = req.body.payload;
  const privateKey = req.body.privateKey;
  if (payload == undefined || privateKey == undefined) {
    res.status(400).json({ error: "Invalid parameter" });
    return;
  }

  const signDidRes = await signDid(payload, privateKey);
  res.json(signDidRes);
});

router.post("/verify", async function (req, res, next) {
  const jws = req.body.jws;
  const publicKey = req.body.publicKey;
  if (jws == undefined || publicKey == undefined) {
    res.status(400).json({ error: "Invalid parameter" });
    return;
  }

  const verifyDidRes = await verifyDid(jws, publicKey);
  res.json(verifyDidRes);
});

router.get("/resolve/:did", async function (req, res, next) {
  const didUri = req.params.did;
  if (didUri == undefined) {
    res.status(400).json({ error: "Invalid parameter" });
    return;
  }

  const resolveDidRes = await resolveDid(didUri);
  res.json(resolveDidRes);
});

export default router;
