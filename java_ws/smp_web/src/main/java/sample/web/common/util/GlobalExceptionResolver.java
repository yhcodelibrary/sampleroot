//package sample.web.common.util;
//
////import java.util.logging.Logger;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.web.servlet.HandlerExceptionResolver;
//import org.springframework.web.servlet.ModelAndView;
//
//public class GlobalExceptionResolver implements HandlerExceptionResolver {
//
//	private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionResolver.class);
//
//	public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object object,
//			Exception ex) {
//
//		logger.error("例外をキャッチしました。", ex);
//
//		ModelAndView mav = new ModelAndView();
//
//		// JSPに表示するメッセージをセットします。
//		mav.addObject("message", "予期せぬエラーが発生しました。" + " 詳細：【" + ex + "】");
//
//		// 遷移先のJSPを指定します。(error.jspに遷移します。)
//		mav.setViewName("error");
//		return mav;
//
//	}
//
//}