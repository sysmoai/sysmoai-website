import React from "react";

interface State {
  hasError: boolean;
  message?: string;
}

interface Props {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown): State {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : String(error),
    };
  }

  componentDidCatch(error: unknown, info: unknown): void {
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary]", error, info);
  }

  private reset = () => {
    this.setState({ hasError: false, message: undefined });
    if (typeof window !== "undefined") window.location.assign("/");
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div
        role="alert"
        className="min-h-[60vh] w-full flex flex-col items-center justify-center px-4 text-center bg-background"
      >
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Something went wrong.
        </h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          The page hit an unexpected error. We&rsquo;ve logged it. Try going
          home — and if it keeps happening,{" "}
          <a href="https://wa.me/8801711638693" className="text-blue-400 underline">
            message us on WhatsApp
          </a>
          .
        </p>
        <button
          type="button"
          onClick={this.reset}
          className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-8 py-3 rounded-full font-semibold"
        >
          Go Home
        </button>
      </div>
    );
  }
}
