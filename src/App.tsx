import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import LitContext from "./contexts/LitContext";
import MinaSigner from "mina-signer";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const signer = new MinaSigner({ network: "mainnet" });

function App() {
  const {
    accounts,
    authenticate,
    googleSignIn,
    setActiveKey,
    createWrappedKey,
    wrappedKeys,
    signMessageWithKey,
  } = useContext(LitContext);
  const [key, setKey] = useState<string | undefined>();

  useEffect(() => {
    if (!authenticate) return;

    authenticate();
  }, []);

  async function signAndVerifyMessage() {
    if (!signMessageWithKey) {
      return;
    }

    if (!key) {
      throw new Error("select a key first");
    }

    const message = prompt("Enter a message");

    const signedMessage = await signMessageWithKey(key, message as string);

    const verified = signer.verifyMessage({
      data: message as string,
      // @ts-expect-error unknown data type
      signature: signedMessage.signature,
      publicKey: key,
    });

    window.alert(verified ? "Message Verified" : "Message Not Verified");
  }

  if (googleSignIn && accounts.length === 0) {
    return (
      <Card className="w-[640px] mx-auto mt-16">
        <CardHeader>
          <CardTitle>Lit Mina Signer</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={googleSignIn}>Authenticate With Google</Button>{" "}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[640px] mx-auto mt-16">
      <CardHeader>
        <CardTitle>Lit Mina Signer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={setActiveKey}>
            <SelectTrigger>
              <SelectValue placeholder="Select PKP" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((acc) => (
                <SelectItem key={acc} value={acc}>
                  {acc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {wrappedKeys.length > 0 && (
            <Select onValueChange={setKey} value={key} defaultValue={undefined}>
              <SelectTrigger>
                <SelectValue placeholder="Select Key" />
              </SelectTrigger>
              <SelectContent>
                {wrappedKeys.map((acc) => (
                  <SelectItem key={acc.publicKey} value={acc.publicKey}>
                    {acc.publicKey}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {key && (
            <div>
              <Button onClick={signAndVerifyMessage}>Test Sign</Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={createWrappedKey}>Create New Key</Button>
      </CardFooter>
    </Card>
  );
}

export default App;
