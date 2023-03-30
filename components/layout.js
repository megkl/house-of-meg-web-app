//wrapper for all layers
import Head from "next/head";
import React from "react";

export default function layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title ? title + " - House Of Meg" : "House Of Meg"}</title>
        <meta name="description" content="Ecommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <header>header</header>
        <main>{children}</main>
        <footer>footer</footer>
      </div>
    </>
  );
}
