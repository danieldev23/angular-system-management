export class PromiseMultipleTaskHelper<T, E> {
  private limit_one_process: number;
  private tasks: ITasks<T, E>[] = new Array();
  private queues: ITasks<T, E>[] = new Array();
  private result_common_temp: ResultPromiseMultipleTempTaskHelper<T, E>;
  private action_log_item?: IFunctionActionLogTask;
  private delay_time: number;
  private end_with_error: boolean;
  private is_running: boolean = false;
  private all_tasks: number = 0;
  private wrap_counter: number = 0;
  private wrap_counter_done: number = 0;
  private count_task_root_done: number = 0;

  constructor(limit_one_process: number, action_log_item?: IFunctionActionLogTask, delay_time?: number, end_with_error?: boolean) {
    this.limit_one_process = limit_one_process;
    this.result_common_temp = {
      datas: [],
      errs: []
    };
    this.action_log_item = action_log_item;
    this.delay_time = delay_time ? delay_time : 1000;
    this.end_with_error = end_with_error ?? false;
  }
  addTask(obj: object, task: CallbackFunction, input_params?: Array<any>, name?: string): void {
    if (this.is_running) return;
    var params: Array<any> = !input_params ? [] : input_params;

    const index = this.queues.length;

    const wrapper = (): Promise<CommonPromiseResult<T, E>> => {
      return new Promise<CommonPromiseResult<T, E>>((resolve) => {
        this.wrap_counter ++;
        task.call(obj, ...params).then((value: T) => {
          this.wrap_counter_done ++;
          this.callLog(name);
          resolve({
            status: true,
            value: value,
            index: index
          });
        }).catch((e: E) => {
          this.wrap_counter_done ++;
          this.callLog(name);
          resolve({
            status: false,
            error: e,
            index
          });
        });
      });
    };

    this.all_tasks ++;

    this.queues.push({
      task: wrapper,
      name
    });
  }

  callLog(name?: string){
    if (this.action_log_item && this.all_tasks > 0) {
      this.action_log_item.function.call({}, ...[this.wrap_counter_done, this.all_tasks, ...( this.action_log_item.params ? this.action_log_item.params : [] ), name]);
    }
  }


  start(): Promise<ResultPromiseMultipleTaskHelper<T, E>> {
    return new Promise<ResultPromiseMultipleTaskHelper<T, E>>((resolve) => {
      if (this.queues.length === 0) {
        resolve({
          datas: [],
          errs: []
        });
      }

      this.result_common_temp = {
        datas: [],
        errs: []
      };

      for (let index = 0; index < this.limit_one_process; index++) {
        const task = this.queues.shift();
        if (!task) break;
        this.tasks.push(task);
      }

      this.count_task_root_done = 0;
      this.is_running = true;

      this.runner(resolve);
    });
  }

  checker(result: CommonPromiseResult<T, E>, resolve: CallbackFunction) {
    this.count_task_root_done ++;
    if (result.status && result.value) {
      this.result_common_temp.datas.push({ index: result.index, value: result.value });
    } else if (result.error) {
      this.result_common_temp.errs.push({ index: result.index, value: result.error });
    }

    if (this.result_common_temp.errs.length > 0 && this.end_with_error) {
      this.is_running = false;
      resolve(this.makeResultObj());
    }

    if (this.count_task_root_done === this.all_tasks) {
      this.is_running = false;
      resolve(this.makeResultObj());
    }

    // push new task
    this.nextItem(resolve);
  }

  makeResultObj(): ResultPromiseMultipleTaskHelper<T, E> {
    return {
      datas: this.result_common_temp.datas.sort(function(a, b){return a.index - b.index;}).map(m => m.value),
      errs: this.result_common_temp.errs.sort(function(a, b){return a.index - b.index;}).map(m => m.value)
    };
  }

  nextItem(resolve: CallbackFunction) {
    const task = this.queues.shift();

    if (!task) {
      return;
    };

    task.task.call(this).then(result => {
      this.checker(result, resolve);
    });
  }

  private runner(resolve: CallbackFunction): void {
    if (this.tasks.length > 0) {
      this.tasks.forEach(task => {
        task.task.call(this).then(result => {
          this.checker(result, resolve);
        });
      });
    } else {
      this.is_running = false;
      resolve(this.makeResultObj());
    }
  }
}
export interface ResultPromiseMultipleTaskHelper<T, E> {
  datas: T[];
  errs: E[];
}
export interface ResultPromiseMultipleTempTaskHelper<T, E> {
  datas: {
    index: number,
    value: T
  }[];
  errs: {
    index: number,
    value: E
  }[];
}
export interface ITasks<T, E> {
  task: () => Promise<CommonPromiseResult<T, E>>;
  name?: string;
}
export interface IFunctionActionLogTask {
  function: CallbackFunction;
  params?: Array<any>;
}
export interface CommonPromiseResult<T, E> {
  status: boolean;
  value?: T;
  error?: E;
  index: number;
}
export type CallbackFunction = (...args: any[]) => any;