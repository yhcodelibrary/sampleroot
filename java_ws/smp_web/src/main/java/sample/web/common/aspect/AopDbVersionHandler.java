package sample.web.common.aspect;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import sample.web.common.define.OptimisticLockException;

@Aspect
@Component
public class AopDbVersionHandler {

	//@AfterReturning(value = "execution(int sampple.web.*..*Dao*.update*(..))", returning = "count")
	@AfterReturning(value = "execution(int sample..Dao*.update*(..))", returning = "count")
	public void afterReturningLog(JoinPoint jp, int count) throws OptimisticLockException,Throwable  {

		System.out.println("[AfterReturn]====================================");
		System.out.println("[AfterReturn]args:" + Arrays.toString(jp.getArgs()));
		System.out.println("[AfterReturn]signature:" + jp.getSignature());
		System.out.println("[AfterReturn]return:" + count);

		if(count != 1)
		{
			throw new OptimisticLockException();
		}
	}
}
