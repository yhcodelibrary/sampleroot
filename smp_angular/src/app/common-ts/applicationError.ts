/**
 * アプリケーションエラークラス拡張
 *
 * @export
 * @class ApplicationError
 * @implements {Error}
 */
export class ApplicationError implements Error {
    public name = 'ApplicationError';
  
    /**
     *Creates an instance of ApplicationError.
     * @param {string} message
     * @memberof ApplicationError
     */
    constructor(public message: string) {
    }
  
    toString() {
      return this.name + ': ' + this.message;
    }
  }