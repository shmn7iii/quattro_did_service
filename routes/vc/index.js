import express from "express";
import createVc from "./scripts/create.js";
import verifyVc from "./scripts/verify.js";

const router = express.Router();

router.get("/", function (req, res, next) {
  res.json({ message: "VC" });
});

router.post("/create", async function (req, res, next) {
  const subjectDid = req.body.subjectDid;
  const issuerDid = req.body.issuerDid;
  const issuerPrivateKey = req.body.issuerPrivateKey;
  if (subjectDid == undefined || issuerDid == undefined || issuerPrivateKey == undefined) {
    res.status(400).json({ error: "Invalid parameter" });
    return;
  }

  const createVcRes = await createVc(subjectDid, issuerDid, issuerPrivateKey);
  res.json(createVcRes);
});

router.post("/verify", async function (req, res, next) {
  const vcJwt = req.body.vcJwt;
  if (vcJwt == undefined) {
    res.status(400).json({ error: "Invalid parameter" });
    return;
  }

  const verifyVcRes = await verifyVc(vcJwt);
  res.json(verifyVcRes);
});

export default router;
