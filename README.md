# Quattro DID Service

- node.js v18.13.0

```bash
$ npm install
$ npm start
```

## DID

### [POST] /did/create

- params
  ```json
  {
    "services": [
      {
        "id": "quattro-wallet",
        "type": "QuattroWallets",
        "serviceEndpoint": "https://issuer.quattro.example.com/wallet/hogehoge"
      }
    ]
  }
  ```
- return
  ```json
  {
    "did": {
      "@context": "https://w3id.org/did-resolution/v1",
      "didDocument": {
        "..."
      }
    },
    "signingKey":{
      "publicJwk": {
        "kty": "EC",
        "crv": "secp256k1",
        "x": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "y": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
      },
      "privateJwk": {
        "kty": "EC",
        "crv": "secp256k1",
        "x": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "y": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
        "d": "ddddddddddddddddddddddddddddddddddddddddddd"
      }
    }
  }
  ```

### [GET] /did/create/:did

- return
  ```json
  {
    "did": {
      "@context": "https://w3id.org/did-resolution/v1",
      "didDocument": {
        "..."
      }
    }
  }
  ```

### [POST] /did/sign

- params
  ```json
  {
    "payload": "hoge",
    "privateKey": {
      "kty": "EC",
      "crv": "secp256k1",
      "x": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "y": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
      "d": "ddddddddddddddddddddddddddddddddddddddddddd"
    }
  }
  ```
- return
  ```json
  {
    "jws": "eyhogehoge.hoge.hoge"
  }
  ```

### [POST] /did/verify

- params
  ```json
  {
    "jws": "eyhogehoge.hoge.hoge",
    "publicKey": {
      "kty": "EC",
      "crv": "secp256k1",
      "x": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "y": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
    }
  }
  ```
- return
  ```json
  {
    "result": true
  }
  ```

## Verifiable Credential

JWT による VC の表現については以下参照

[検証可能な資格証明データ・モデル v1.1](http://www.asahi-net.or.jp/~ax2s-kmtn/internet/did/REC-vc-data-model-20220303.html#json-web-token)

### [POST] /vc/create

- params
  ```json
  {
    "subjectDid": "hoge",
    "issuerDid": "did:ion:hoge",
    "issuerPrivateKey": {
      "kty": "EC",
      "crv": "secp256k1",
      "x": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "y": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
      "d": "ddddddddddddddddddddddddddddddddddddddddddd"
    }
  }
  ```
- return
  ```json
  {
    "vcJwt": "eyhogehoge.hoge.hoge"
  }
  ```

### [POST] /vc/verify

- params
  ```json
  {
    "vcJwt": "eyhogehoge.hoge.hoge"
  }
  ```
- return
  ```json
  {
    "verified": true,
    "vc": {
      "@context": [
        "https://www.w3.org/2018/credentials/v1"
      ],
      "type": [
        "VerifiableCredential"
      ],
      "..."
    },
    "issuerDid": {
      "@context": "https://w3id.org/did-resolution/v1",
      "didDocument": {
        "..."
      }
    }
  }
  ```

## Verifiable Presentation

### [POST] /vp/create

- params
  ```json
  {
    "vcJwt": "eyhogehoge.hoge.hoge",
    "issuerDid": "did:ion:hoge",
    "issuerPrivateKey": {
      "kty": "EC",
      "crv": "secp256k1",
      "x": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "y": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
      "d": "ddddddddddddddddddddddddddddddddddddddddddd"
    }
  }
  ```
- return
  ```json
  {
    "vpJwt": "eyhogehoge.hoge.hoge"
  }
  ```

### [POST] /vp/verify

- params
  ```json
  {
    "vpJwt": "eyhogehoge.hoge.hoge"
  }
  ```
- return
  ```json
  {
    "verified": true,
    "vp": {
      "@context": [
        "https://www.w3.org/2018/credentials/v1"
      ],
      "type": [
        "VerifiablePresentation"
      ],
      "..."
    },
    "holderDid": {
      "@context": "https://w3id.org/did-resolution/v1",
      "didDocument": {
        "..."
      }
    },
    "vc": {
      "@context": [
        "https://www.w3.org/2018/credentials/v1"
      ],
      "type": [
        "VerifiableCredential"
      ],
      "..."
    },
    "issuerDid": {
      "@context": "https://w3id.org/did-resolution/v1",
      "didDocument": {
        "..."
      }
    }
  }
  ```
