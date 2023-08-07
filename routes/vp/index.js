import express from "express";
import createVp from "./scripts/create.js";
import verifyVp from "./scripts/verify.js";

const router = express.Router();

router.get("/", function (req, res, next) {
  res.json({ message: "VC" });
});

router.post("/create", async function (req, res, next) {
  const vcJwt = req.body.vcJwt;
  const holderDid = req.body.holderDid;
  const holderPrivateKey = req.body.holderPrivateKey;
  if (
    vcJwt == undefined ||
    holderDid == undefined ||
    holderPrivateKey == undefined
  ) {
    res.status(400).json({ error: "Invalid parameter" });
    return;
  }

  const createVpRes = await createVp(vcJwt, holderDid, holderPrivateKey);
  res.json(createVpRes);
});

router.post("/verify", async function (req, res, next) {
  const vpJwt = req.body.vpJwt;
  if (vpJwt == undefined) {
    res.status(400).json({ error: "Invalid parameter" });
    return;
  }

  const verifyVpRes = await verifyVp(vpJwt);
  res.json(verifyVpRes);
});

export default router;
