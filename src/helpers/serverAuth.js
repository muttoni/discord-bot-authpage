import * as fcl from '@onflow/fcl';

const signMessage = async (args) => {
  const response = await fetch(`https://damp-ridge-15827.herokuapp.com/api/sign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });

  //TODO: add necessary corrections
  const signed = await response.json();
  console.log({ signed });

  return signed;
}

export const serverAuthorization = (scriptName) => {
    return async (account) => {
      // this gets the address and keyIndex that the server will use when signing the message
      
      const serviceAccountSigningKey = {
        address: "0x4e190c2eb6d78faa",
        keyIndex: 0
      };
      // TODO
      // const serviceAccountSigningKey = await getAccountSigningKey()
  
      return {
        ...account,
        tempId: `${fcl.sansPrefix(serviceAccountSigningKey.address)}-${serviceAccountSigningKey.keyIndex}`,
        addr: fcl.sansPrefix(serviceAccountSigningKey.address),
        keyId: serviceAccountSigningKey.keyIndex,
        signingFunction: async (signable) => {
          // this signs the message server-side and returns the signature
          const signature = await signMessage({
              scriptName,
              signable
          });
      
          return {
              addr: fcl.withPrefix(serviceAccountSigningKey.address),
              keyId: serviceAccountSigningKey.keyIndex,
              signature: signature.signature,
          }
        }
      }
    }
  }
  