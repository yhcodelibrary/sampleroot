import { ApplicationError } from "./applicationError";

/**
 * 未ログインエラークラス拡張
 *
 * @export
 * @class UnloginAccessError
 * @extends {ApplicationError}
 */
export class UnloginAccessError extends ApplicationError {
    public name = 'ApplicationError';
  
  }
  