interface ErrorMessageProps {
  error: boolean,
  message: string
}

const ErrorMessage = ({error, message}: ErrorMessageProps) => {
  if (error) {
    return (
      <p className={error ? 'error' : 'no-error'}>{message}</p>
    );
  }
};

export default ErrorMessage;