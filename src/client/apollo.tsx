"use client";

import { useEffect, useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
 
const cache = new InMemoryCache();
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  const createApolloClient = () => {
    const token = sessionStorage.getItem("jwt-token");

    const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const wsLink = new GraphQLWsLink(
      createClient({
        url: process.env.NEXT_PUBLIC_WS_URL || "", // Replace with your WebSocket URL
        connectionParams: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
    );

    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink, // Send subscriptions over WebSocket
      httpLink // Send other requests over HTTP
    );

    return new ApolloClient({
      link: splitLink,
      cache: cache,
      defaultOptions: defaultOptions,
    });
  };

  useEffect(() => {
    // Create Apollo Client initially
    setClient(createApolloClient());

    const handleTokenSet = () => {
      // Recreate Apollo Client when the token is set
      setClient(createApolloClient());
    };

    // Listen for the event when the token is set
    window.addEventListener("jwtTokenSett", handleTokenSet);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("jwtTokenSett", handleTokenSet);
    };
  }, []);

  if (!client) return null; // Optionally, render a loading state or null

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
