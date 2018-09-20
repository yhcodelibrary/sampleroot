import { ErrorHandler, Injectable,Injector } from '@angular/core';
import { Router } from '@angular/router';
import { UnloginAccessError } from './UnloginAccessError';
import { ApplicationError } from './applicationError';

/**
 * 例外エラー発生時ハンドリングクラス
 *
 * @export
 * @class CommonErrorHandler
 * @extends {ErrorHandler}
 */
@Injectable()
export  class CommonErrorHandler extends  ErrorHandler {
    
    private router;
    injector: Injector;

    constructor(injector: Injector) { 
        // The true paramter tells Angular to rethrow exceptions, so operations like 'bootstrap' will result in an error
        // when an error happens. If we do not rethrow, bootstrap will always succeed.
        super();
        this.injector = injector;
    }
    
   handleError(error) {
    
        if (this.router == null) {
            this.router = this.injector.get(Router);
        }
        
        // send the error to the server
        console.debug('message：' + error.message);
        console.debug('stack：' + error.stack);

        //未ログイン時
        if(error instanceof UnloginAccessError)
        {
            this.router.navigate(['/logout']);
            // location.reload();
            return;
        }
        //マネージドエラー
        if(error instanceof ApplicationError)
        {
            this.router.navigate(['/logout']);
            location.reload();
            return;
        }
    
   }
}