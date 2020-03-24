import {useState, useRef, useEffect} from "react";
import {PageProvider} from "@providers/page";

const defaultMenus = [
  {
    label: "首页",
    path: "/",
    dynamicPath: "/[tag]"
  },

  {
    label: "归档",
    path: "/archives"
  }
];

let cache = null;

export const useMenus = () => {
  const [, setMounted] = useState(false);
  const value = useRef(cache);

  useEffect(() => {
    if (!cache) {
      PageProvider.getAllPublisedPages().then(res => {
        const arr = res[0].map(r => ({
          path: `/page/` + r.path,
          label: r.name
        }));
        value.current = arr;
        cache = arr;
        setMounted(true);
      });
    }
  }, []);

  return value.current ? [...defaultMenus, ...value.current] : defaultMenus;
};
