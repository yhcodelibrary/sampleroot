package sample.web.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import sample.web.common.define.OptimisticLockException;
import sample.web.common.ilogic.ManageJson;
import sample.web.common.model.ModelValidErrors;
import sample.web.taskweb.model.ModelJsonResult;

@RestControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

	@Autowired
	ManageJson mngJson;

	private static final Logger LOG = LoggerFactory.getLogger(ApiExceptionHandler.class);

	// 自分で定義したMyExceptionをキャッチする
	//DB楽観ロックが発生した場合
	@ExceptionHandler(OptimisticLockException.class)
	public ResponseEntity<Object> handleMyException(OptimisticLockException ex, WebRequest request) {

		System.out.println("handleMyException");
		
		ModelJsonResult result = new ModelJsonResult();
		result.setStatus(2);
		ModelValidErrors err = new ModelValidErrors();
		err.addErrorMessage("対象のデータは別のユーザーに更新されました。再検索を行ってください。");
		result.setModelResult(err);
		
		HttpHeaders responseHeaders = new HttpHeaders();
		try {
			System.out.println(ex);
			ResponseEntity<Object> response = new ResponseEntity<Object>(this.mngJson.ConvertObjectToJson(result),
					responseHeaders, HttpStatus.OK);

			return response;
		} catch (Exception e) {

			return super.handleExceptionInternal(ex, "handleAllException", null, HttpStatus.INTERNAL_SERVER_ERROR,
					request);
		}
	}

	// すべての例外をキャッチする
	// どこにもキャッチされなかったらこれが呼ばれる
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> handleAllException(Exception ex, WebRequest request) {

		System.out.println("handleAllException");
		ModelJsonResult result = new ModelJsonResult();
		result.setStatus(99);

		HttpHeaders responseHeaders = new HttpHeaders();
		try {
			System.out.println(ex);
			ResponseEntity<Object> response = new ResponseEntity<Object>(this.mngJson.ConvertObjectToJson(result),
					responseHeaders, HttpStatus.OK);

			return response;
		} catch (Exception e) {

			return super.handleExceptionInternal(ex, "handleAllException", null, HttpStatus.INTERNAL_SERVER_ERROR,
					request);
		}

	}

	// すべてのハンドリングに共通する処理を挟みたい場合はオーバーライドする
	// ex) ログを吐くなど
	@Override
	protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers,
			HttpStatus status, WebRequest request) {

		System.out.println("handleExceptionInternal");
		// 任意の処理

		return super.handleExceptionInternal(ex, body, headers, status, request);
	}
}
