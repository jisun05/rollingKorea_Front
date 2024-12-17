import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 fallback UI를 표시하기 위해 상태를 업데이트
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // 에러 리포팅 서비스에 에러를 기록할 수 있습니다.
    console.error('Error caught in Error Boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
 
      return <h1>Error! Please try again.</h1>;
    }

    if (React.isValidElement(this.props.children)) {
        return this.props.children; 
    } else {
        console.log(this.props.children);
        return <h1>not valid components</h1>;
    }
  }
}
export default ErrorBoundary;