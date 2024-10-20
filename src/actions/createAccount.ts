import Client from 'mina-signer';

(async () => {
  console.log('start');
  const LIT_PREFIX = 'lit_';

  const accessControlConditions = [
    {
      contractAddress: '',
      standardContractType: '',
      chain: 'ethereum',
      method: '',
      parameters: [':userAddress'],
      returnValueTest: {
        comparator: '=',
        // @ts-expect-error err
        value: pkpAddress,
      },
    },
  ];

  // @ts-expect-error err
  const result = await Lit.Actions.runOnce(
    { waitForResponse: true, name: 'encryptedPrivateKey' },
    async () => {
      const client = new Client({ network: 'mainnet' });
      const { privateKey, publicKey } = client.genKeys();

      const utf8Encode = new TextEncoder();
      const encodedPrivateKey = utf8Encode.encode(
        `${LIT_PREFIX}${privateKey.toString()}`
      );

      // @ts-expect-error err
      const { ciphertext, dataToEncryptHash } = await Lit.Actions.encrypt({
        accessControlConditions: accessControlConditions,
        chain: 'ethereum',
        to_encrypt: encodedPrivateKey,
      });

      return JSON.stringify({
        ciphertext,
        dataToEncryptHash,
        publicKey: publicKey.toString(),
      });
    }
  );

  // @ts-expect-error err
  Lit.Actions.setResponse({
    response: result,
  });
})();
