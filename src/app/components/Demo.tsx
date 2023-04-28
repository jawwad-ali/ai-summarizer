"use client";
import { useState, useEffect } from "react";

import {
  FaCopy,
  FaLink,
  FaSpinner,
  FaCheck,
} from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";

import { useLazyGetSummaryQuery } from "@/services/article";

interface IArticle {
  url: string;
  summary: string;
}

const obj: IArticle = {
  summary: "",
  url: "",
};

const Demo = () => {
  const [copied, setCopied] = useState("");

  // single articles
  const [article, setArticle] = useState<IArticle>(obj);

  // store all articles
  const [allArticles, setAllArticles] = useState<IArticle[]>([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    // getting articles to local storage
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles") as string
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  // submitting form
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = {
        ...article,
        summary: data.summary,
      };

      const updateAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updateAllArticles);

      // setting the article to localstorage
      localStorage.setItem("articles", JSON.stringify(updateAllArticles));

      console.log(newArticle);
    }
  };

  // Copy to clipboard
  const copyToClipboard = async (copyURL: string) => {
    try {
      setCopied(copyURL);
      await navigator.clipboard.writeText(copyURL);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center item-center"
          onSubmit={handleSubmit}
        >
          <FaLink
            className="absolute left-0 my-3 ml-3 w-5 text-slate-400"
            // onClick={copyToClipboard()}
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <AiOutlineSend />
          </button>
        </form>

        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item: IArticle, idx: number) => (
            <div
              key={`link-${idx}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn">
                {copied === item.url ? (
                  <FaCheck className="w-[40%] h-[40%] object-contain text-gray-700" />
                ) : (
                  <FaCopy
                    className="w-[40%] h-[40%] object-contain text-gray-700"
                    onClick={() => copyToClipboard(item.url)}
                  />
                )}
              </div>
              <p className="flex-1 font-satoshi text-blue-700 text-sm font-medium truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {/* {article.summary} */}
        {isFetching ? (
          <>
            <FaSpinner className="w-20 h-20 object-contain" />
            <h4 className="font-extrabold text-3xl text-center">Fetching...</h4>
          </>
        ) : error ? (
          <p>
            Well, that wasn't supposed to be happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
