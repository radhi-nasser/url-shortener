import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { copyToClipboard, sleep } from "../utils";

export function UrlShortenerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState<null | string>(null);
  const [longUrl, setLongUrl] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value);
  };

  const onClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const {
        data: { shortUrlHash },
      } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/shorten`,
        { longUrl },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );

      await sleep(1000); // for the sake of the demo

      setShortenedUrl(`${process.env.REACT_APP_BACKEND_URL}/${shortUrlHash}`);

      setIsLoading(false);
    } catch (err) {
      console.error("An error has occurred", err);
    }
  };

  return (
    <div className="flex flex-col gap-y-6 max-w-md mx-auto bg-white p-8 border rounded-md shadow-md">
      <h2 className="text-xl font-semibold">Shorten a long link</h2>
      <form className="flex flex-col gap-y-6" onSubmit={onClick}>
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="input-field"
            className="block text-sm font-medium text-gray-700"
          >
            Paste a long URL
          </label>
          <input
            type="text"
            id="input-field"
            name="input-field"
            placeholder="Example: http://www.very-long-url.com/please-shorten-me"
            className="p-2 block w-full rounded-md border-gray-300 shadow-sm"
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
          disabled={!longUrl || isLoading}
        >
          {!isLoading ? "Submit" : "Generating..."}
        </button>
      </form>
      {shortenedUrl && (
        <div className="inline-block">
          Your shortened url is:
          <div className="flex flex-row items-center justify-content gap-x-2">
            <span className="font-bold">{shortenedUrl}</span>
            <button
              className="py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-200 hover:bg-gray-300"
              onClick={() => {
                copyToClipboard(shortenedUrl);
              }}
            >
              Copy to clipboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
