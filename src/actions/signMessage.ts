import MinaSigner from "mina-signer";

(async () => {
  const LIT_PREFIX = "lit_";

  let decryptedPrivateKey;

  const accessControlConditions = [
    {
      contractAddress: "",
      standardContractType: "",
      chain: "ethereum",
      method: "",
      parameters: [":userAddress"],
      returnValueTest: {
        comparator: "=",
        // @ts-expect-error error
        value: pkpAddress,
      },
    },
  ];

  try {
    // @ts-expect-error err
    decryptedPrivateKey = await Lit.Actions.decryptToSingleNode({
      accessControlConditions: accessControlConditions,
      chain: "ethereum",
      // @ts-expect-error err
      ciphertext,
      // @ts-expect-error err
      dataToEncryptHash,
      authSig: null,
    });
  } catch (error) {
    // @ts-expect-error err
    Lit.Actions.setResponse({
      response: `Error: When decrypting data to private key: ${(error as Error).message}`,
    });
    return;
  }

  if (!decryptedPrivateKey) {
    // Exit the nodes which don't have the decryptedData
    return;
  }

  const privateKey = decryptedPrivateKey.startsWith(LIT_PREFIX)
    ? decryptedPrivateKey.slice(LIT_PREFIX.length)
    : decryptedPrivateKey;

  const signer = new MinaSigner({ network: "mainnet" });
  const publicKey = signer.derivePublicKey(privateKey);

  // @ts-expect-error err
  const signedMessage = signer.signMessage(message, privateKey);

  // @ts-expect-error err
  Lit.Actions.setResponse({
    publicKey,
    response: JSON.stringify(signedMessage),
  });
})();
