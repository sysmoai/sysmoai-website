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
    console.error("[admin/ErrorBoundary]", error, info);
  }

  private reload = () => {
    if (typeof window !== "undefined") window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div
        role="alert"
        className="min-h-screen w-full flex flex-col items-center justify-center px-4 text-center bg-slate-950 text-slate-100"
      >
        <h1 className="text-2xl font-bold mb-3">Admin error</h1>
        <p className="text-slate-400 mb-2 max-w-md">
          The admin UI hit an unexpected error.
        </p>
        {this.state.message ? (
          <pre className="text-xs text-red-300 bg-slate-900 p-3 rounded mb-6 max-w-xl overflow-auto">
            {this.state.message}
          </pre>
        ) : null}
        <button
          type="button"
          onClick={this.reload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium"
        >
          Reload
        </button>
      </div>
    );
  }
}
