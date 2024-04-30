// import node module libraries
import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import SSRProvider from "react-bootstrap/SSRProvider";

// import provider and store from redux state management.
import { Provider } from "react-redux";
import { store } from "store/store";

// import theme style scss file
import "styles/theme.scss";

// import default layouts
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400-italic.css"; // Specify weight and style
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Web3ReactProvider } from "@web3-react/core";
import DefaultDashboardLayout from "layouts/dashboard/DashboardIndex";
import DefaultMarketingLayout from "layouts/marketing/DefaultLayout";
import { appWithTranslation } from "next-i18next";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { RecoilRoot } from "recoil";
import { getLibrary } from "../helper/web3.helper";

import Script from "next/script";

import i18 from "../next-i18next.config";
const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const pageURL = process.env.baseURL + router.pathname;
  const title = "MundoCrypto: Plataforma Educativa Learn to Earn. ☑️ MCT Token";
  const description = "MundoCrypto Academy";
  const keywords =
    "Cursos de Criptomonedas, Blockchain, Web3, Nft, Metaverso y desarrollo. ☑️ Aprende y Gana con $MCT token. Plataforma educativa MundoCrypto";
  const siteName = "MundoCrypto";
  // Identify the layout, which will be applied conditionally
  const Layout =
    Component.Layout ||
    (router.pathname.includes("CourseResume1")
      ? router.pathname.includes("instructor") ||
        router.pathname.includes("student")
        ? DefaultMarketingLayout
        : DefaultDashboardLayout
      : DefaultMarketingLayout);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <RecoilRoot>
        <SSRProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale = 0.86, maximum-scale=3.0, minimum-scale=0.86"
            />
            <meta name="keywords" content={keywords} />
            <link rel="shortcut icon" href="/fav.png" type="image/x-icon" />
          </Head>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
          >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TCKDCHX');`}</Script>
          <Script
            id="fb-script"
            strategy="afterInteractive"
          >{`!function(f,b,e,v,n,t,s)
           {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
           if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
           n.queue=[];t=b.createElement(e);t.async=!0;
           t.src=v;s=b.getElementsByTagName(e)[0];
           s.parentNode.insertBefore(t,s)}(window, document,'script',
           'https://connect.facebook.net/en_US/fbevents.js');
           fbq('init', '2390311267803562');
           fbq('track', 'PageView');`}</Script>

          <NextSeo
            title={title}
            description={description}
            canonical={pageURL}
            openGraph={{
              url: pageURL,
              title: title,
              description: description,
              site_name: siteName,
              images: [
                {
                  url: "/images_optimized/mc_black_blue.png",
                  width: 1200,
                  height: 630,
                  alt: "MundoCrypto",
                },
              ],
            }}
          />
          <Provider store={store}>
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </SSRProvider>
      </RecoilRoot>
    </Web3ReactProvider>
  );
};

export default appWithTranslation(MyApp, i18);
