import { Observable } from 'rxjs/Observable';

export const load = (url) => {
  return Observable.create(observer => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        observer.next(data);
        observer.complete();
      } else {
        observer.error(xhr.statusText);
      }
    });
    xhr.open('GET', url);
    xhr.send();
  }).retryWhen(retryStrategy({}));
};

export const loadWithFetch = (url) => {
  return Observable.defer(() =>
    Observable.fromPromise(fetch(url).then(r => {
      if (r.status === 200) {
        return r.json();
      }
      return Promise.reject(r);
    }))
  ).retryWhen(retryStrategy({}));
}

const retryStrategy = ({ attempts = 4, delay = 1000 }) => (errors) => (
  errors.scan((acc, value) => {
    const newAcc = acc + 1;
    if (newAcc < attempts) {
      return newAcc;
    } else {
      throw new Error(value);
    }
  }, 0)
  .delay(delay)
);
