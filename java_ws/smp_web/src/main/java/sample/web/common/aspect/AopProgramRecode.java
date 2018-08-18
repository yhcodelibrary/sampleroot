//package sample.web.common.aspect;
//
//import java.util.Arrays;
//
//import org.aspectj.lang.JoinPoint;
//import org.aspectj.lang.annotation.Aspect;
//import org.aspectj.lang.annotation.Before;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//import sample.web.common.define.OptimisticLockException;
//import sample.web.common.logic.ManageSession;
//
//@Aspect
//@Component
//public class AopProgramRecode {
//
//	@Autowired
//	ManageSession session;
//	
//	@Before("execution(int sample..*Controller.*(..))")
//	public void beforeRecode(JoinPoint jp, int count) throws Throwable  {
//
//		System.out.println("[beforeRecode]====================================");
//		System.out.println("[beforeRecode]class:" + jp.getTarget().getClass().toString());
//		System.out.println("[beforeRecode]method:" + jp.getSignature().getName());
//		this.session.setNever(key, value, typeParameterClass);
//		
////methodLog(joinPoint.getTarget().getClass().toString(), joinPoint.getSignature().getName(), "start");
//	}
//}
