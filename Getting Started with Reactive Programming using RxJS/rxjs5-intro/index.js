import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/defer';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/filter';
import { loadWithFetch } from './loaders';

let output = document.getElementById('output');
let button = document.getElementById('button');
const click = Observable.fromEvent(button, 'click');

const renderMovies = (movies) => {
  movies.forEach(({ title = '' }) => {
    let div = document.createElement('div');
    div.innerText = title;
    output.appendChild(div);
  });
};

const myObserver = Subscriber.create(
  renderMovies,
  (e) => { console.error(`error: ${e}`); },
  () => { console.log('complete') }
);

click.flatMap(e => loadWithFetch('movies.json')).subscribe(myObserver);
