import { 
  ObserverInterface,
  ObserverbleInterface,
  handler,
  handlers,
  responce,
  request,
  mock,
  httpMethods,
  httpStatuses,
  subscriber,
} from "./types";

class Observer implements ObserverInterface {
  private isUnsubscribed: boolean = false
  public _unsubscribe: any

  constructor(
    public handlers: handlers,
  ) {}

  next(value: request) {
    if (this.handlers.next && !this.isUnsubscribed) {
      this.handlers.next(value);
    }
  }

  error(error: request) {
    if (!this.isUnsubscribed) {
      if (this.handlers.error) {
        this.handlers.error(error);
      }

      this.unsubscribe();
    }
  }

  complete() {
    if (!this.isUnsubscribed) {
      if (this.handlers.complete) {
        this.handlers.complete();
      }

      this.unsubscribe();
    }
  }

  unsubscribe() {
    this.isUnsubscribed = true;

    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }
}

class Observable implements ObserverbleInterface {
  private _subscribe: subscriber;

  constructor(subscribe: subscriber) {
    this._subscribe = subscribe;
  }

  static from(values: request[]): Observable {
    return new Observable((observer: ObserverInterface) => {
      values.forEach((value) => observer.next(value));

      observer.complete();

      return () => {
        console.log('unsubscribed');
      };
    });
  }

  subscribe(obs: handlers) {
    const observer = new Observer(obs);

    observer._unsubscribe = this._subscribe(observer);

    return ({
      unsubscribe() {
        observer.unsubscribe();
      }
    });
  }
}

const userMock: mock = {
  name: 'User Name',
  age: 26,
  roles: [
    'user',
    'admin'
  ],
  createdAt: new Date(),
  isDeleated: false,
};

const requestsMock: request[] = [
  {
    method: httpMethods.HTTP_POST_METHOD,
    host: 'service.example',
    path: 'user',
    body: userMock,
    params: {},
  },
  {
    method: httpMethods.HTTP_GET_METHOD,
    host: 'service.example',
    path: 'user',
    params: {
      id: '3f5h67s4s'
    },
  }
];

const handleRequest: handler = (request: request): responce => {
  // handling of request
  return {status: httpStatuses.HTTP_STATUS_OK};
};
const handleError: handler = (error : request): responce => {
  // handling of error
  return {status: httpStatuses.HTTP_STATUS_INTERNAL_SERVER_ERROR};
};

const handleComplete = () => console.log('complete');

const requests$ = Observable.from(requestsMock);

const subscription = requests$.subscribe({
  next: handleRequest,
  error: handleError,
  complete: handleComplete
});

subscription.unsubscribe();
