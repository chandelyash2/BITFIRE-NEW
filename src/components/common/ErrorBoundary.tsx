// components/ErrorBoundary.tsx
"use client";

import { Button, Link } from "@chakra-ui/react";
import React, { Component, ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-white flex flex-col items-center justify-center h-full gap-4">
          <h1>404 - Page Not Found</h1>
          <p className="text-center">
            Sorry, the page you are looking for does not exist.
          </p>
          <Button className="rounded" colorScheme="blue">
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
