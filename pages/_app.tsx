import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import client from "../src/api/apollo-client";
import ResponsiveAppBar from "../src/components/layout/navbar/Navbar";
import NoSSR from "../src/components/_aux/noSSR";
import PostCreateModal from "../src/components/post/form/PostCreateModal";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NoSSR>
          <ResponsiveAppBar />
        </NoSSR>
        <div className="pt-[60px]">
          <Head>
            <title>NextBlog</title>
            <link rel="icon" href="/nextjs-boilerplate-logo.png" />
          </Head>
          <Component {...pageProps} />
        </div>
        <PostCreateModal />
      </ApolloProvider>
    </Provider>
  );
}
