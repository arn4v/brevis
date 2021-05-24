import * as React from "react";
import Button from "~/components/Button";
import Input from "~/components/Input";
import { BASE_URL } from "~/lib/constants";

const IndexPage = () => {
  const [state, setState] = React.useState({
    url: "",
    shortUrl: "",
    isAlreadyShortened: false,
    copyText: "Copy",
  });
  const copyInputRef = React.useRef<HTMLInputElement>();

  const setCopyText = (text: string) => {
    setState((prev) => ({ ...prev, copyText: text }));
  };

  const onCopyClick = () => {
    copyInputRef.current.select();
    document.execCommand("copy");
    setCopyText("Copied");
    setTimeout(() => setCopyText("Copy"), 2500);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      url: e.target.value,
      isAlreadyShortened: new RegExp(`${BASE_URL}/(.+)`).test(e.target.value),
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = BASE_URL + "/api/v1/links";
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "text/plain",
      },
      body: state.url,
    })
      .then((res) => {
        return res.text();
      })
      .then((shortUrl) => {
        setState((prev) => ({ ...prev, shortUrl: shortUrl }));
      });
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
      <div className="z-10 flex flex-col items-center justify-center w-1/3 gap-6 bg-white rounded-md shadow-md h-1/5">
        <form
          onSubmit={onSubmit}
          className="flex items-center w-2/3 h-10 space-x-6"
        >
          <Input
            placeholder="Paste URL"
            type="url"
            value={state.url}
            onChange={onChange}
            required
          />
          <Button type="submit">Shorten</Button>
        </form>
        {state.shortUrl && (
          <div className="flex items-center w-2/3 h-10 gap-4">
            <Input
              value={state.shortUrl}
              ref={copyInputRef}
              onClick={() => copyInputRef.current?.select()}
            />
            <Button type="button" onClick={onCopyClick}>
              {state.copyText}
            </Button>
          </div>
        )}
      </div>
      <div className="absolute inset-0 z-0 w-screen h-screen overflow-hidden">
        <img src="/mesh.png" className="object-contain" />
      </div>
      <div className="absolute bottom-0 flex w-full">
        <div className="z-10 flex items-center justify-center py-4 mx-auto rounded-md">
          Made with 💖 by&nbsp;
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://arnavgosain.com"
            className="hover:text-blue-800"
          >
            Arnav Gosain
          </a>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
