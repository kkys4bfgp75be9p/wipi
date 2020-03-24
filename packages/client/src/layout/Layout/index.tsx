import React from "react";
import {BackTop} from "antd";
import {Helmet} from "react-helmet";
import {useSetting} from "@/hooks/useSetting";
import {useMenus} from "@/hooks/useMenus";
import {Header} from "@components/Header";
import {Footer} from "@components/Footer";
import style from "./index.module.scss";

interface Iprops {
  backgroundColor?: string;
  needFooter?: boolean;
}

export const Layout: React.FC<Iprops> = ({
                                           backgroundColor = "#f4f5f5",
                                           children,
                                           needFooter = true
                                         }) => {
  const setting = useSetting();
  const menus = useMenus();

  return (
    <div>
      <Helmet>
        <title>{setting.systemTitle}</title>
        <meta name="keyword" content={setting.seoKeyword}/>
        <meta name="description" content={setting.seoDesc}/>
        <link rel="shortcut icon" href={setting.systemFavicon}/>
        <link
          href="//fonts.googleapis.com/css?family=Nunito:400,400i,700,700i&amp;display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>
      <Header setting={setting} menus={menus}/>
      <main
        className={style.main}
        style={{
          backgroundColor
        }}
      >
        {children}
      </main>
      <BackTop/>
      {needFooter && <Footer setting={setting}/>}
    </div>
  );
};
