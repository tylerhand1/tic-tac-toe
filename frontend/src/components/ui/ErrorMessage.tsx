import { ErrorMessageProps } from '@/types';

const ErrorMessage = ({ error, message }: ErrorMessageProps) => {
  return (
    <div className='error-container'>
       <p className={error ? 'error' : 'no-error'}>{message}</p>
    </div>
  );
};

export default ErrorMessage;