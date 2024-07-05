import { User, useMeQuery } from "@/graphql/generated/schema";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Loader } from "./Loader";
interface EnrichedChildren {
  authUser?: User;
  children?: React.ReactNode;
}
function recursiveMap(
  children: React.ReactNode,
  fn: (child: React.ReactElement) => React.ReactElement<EnrichedChildren>
) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement<EnrichedChildren>(child)) {
      return child;
    }

    let elementChild: React.ReactElement<EnrichedChildren> = child;

    if (child.props.children) {
      elementChild = React.cloneElement(elementChild, {
        children: recursiveMap(child.props.children, fn),
      });
    }

    if (typeof elementChild.type === "string") {
      return elementChild;
    }

    return fn(elementChild);
  });
}
export interface IAuth {
  children?: React.ReactNode;
  isPublic?: boolean;
}
const Auth = ({ children, isPublic }: IAuth) => {
  const token = Cookies.get("jwt-token");

  const { data, loading, error, refetch } = useMeQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 4000);

    // Cleanup function to clear the interval
    return () => {
      clearInterval(interval);
    };
  }, [refetch]);

  const router = useRouter();

  if (loading) {
    return <Loader />;
  }

  const authUser = data?.me;

  if (authUser) {
    // Add authUser prop to all child elements.
    const childrenWithProps = recursiveMap(children, (child) =>
      React.cloneElement(child, { authUser })
    );
    return <>{childrenWithProps}</>;
  }

  if (isPublic) {
    return <>{children}</>;
  }

  router.push("/login");

  return <>This page is authenticated you will be now redirected</>;
};

export default Auth;
