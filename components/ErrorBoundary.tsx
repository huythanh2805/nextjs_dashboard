"useclient"
import React, { Component, ReactNode } from 'react';

// Định nghĩa kiểu cho ErrorBoundary component với children là ReactNode
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null; // Đảm bảo rằng error có thể là một đối tượng Error hoặc null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    // Cập nhật state khi xảy ra lỗi
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log lỗi khi nó xảy ra
    console.error("Error caught in boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Hiển thị UI lỗi khi có lỗi, kiểm tra nếu error là một đối tượng Error
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.message}</p> {/* Lỗi xảy ra nếu error là null */}
        </div>
      );
    }

    // Nếu không có lỗi, render children bình thường
    return this.props.children;
  }
}

export default ErrorBoundary;
