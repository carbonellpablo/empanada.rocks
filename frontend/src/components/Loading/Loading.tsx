import './Loading.css';
import loadingGif from './loading.gif';

export default function Loading(): JSX.Element {
  return (
    <div className="Loading">
      <img alt="loading" src={loadingGif} />
    </div>
  );
}
