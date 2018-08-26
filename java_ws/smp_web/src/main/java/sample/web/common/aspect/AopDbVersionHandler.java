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

	/**
	 * 1件の更新が正常に行われたかの判定を行う
	 * 
	 * @param jp
	 * @param count
	 * @throws OptimisticLockException
	 * @throws Throwable
	 */
	@AfterReturning(value = "execution(int sample..Dao*.update*(..))", returning = "count")
	public void afterReturningJudgeUpdateResult(JoinPoint jp, int count) throws OptimisticLockException,Throwable  {

		System.out.println("[afterReturningJudgeUpdateResult]====================================");
		System.out.println("[afterReturningJudgeUpdateResult]args:" + Arrays.toString(jp.getArgs()));
		System.out.println("[afterReturningJudgeUpdateResult]signature:" + jp.getSignature());
		System.out.println("[afterReturningJudgeUpdateResult]return:" + count);

		if(count != 1)
		{
			throw new OptimisticLockException();
		}
	}
}
