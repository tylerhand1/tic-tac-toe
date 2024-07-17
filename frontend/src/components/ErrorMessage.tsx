import { ErrorMessageProps } from '@/types';

const ErrorMessage = ({ error, message }: ErrorMessageProps) => {
  return (
    <p className={error ? 'error' : 'no-error'}>{message}</p>
  );
};

export default ErrorMessage;