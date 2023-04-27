"use client";
import { useState, useEffect } from "react";

import { FaCopy, FaLink } from "react-icons/fa";
import {
  AiOutlineLoading3Quarters,
  AiOutlineCheck,
  AiOutlineSend,
} from "react-icons/ai";

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
  const [article, setArticle] = useState(obj);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setArticle(newArticle);
      console.log(newArticle);
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center item-center"
          onSubmit={handleSubmit}
        >
          <FaLink className="absolute left-0 my-3 ml-3 w-5 text-slate-400" />
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
      </div>
    </section>
  );
};

export default Demo;
