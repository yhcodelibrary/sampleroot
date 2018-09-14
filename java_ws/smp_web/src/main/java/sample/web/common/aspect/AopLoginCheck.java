package sample.web.common.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sample.web.common.define.CommonConst;
import sample.web.common.define.UnLoginException;
import sample.web.common.logic.ManageSession;
import sample.web.common.model.ModelUser;

@Aspect
@Component
// @Order(value=100)
public class AopLoginCheck {

	@Autowired
	ManageSession session;

	@Before("execution(* sample.web.taskweb..*Controller.*(..))")
	public void beforeLoginCheck(JoinPoint jp) throws Throwable {

		System.out.println("[beforeLoginCheck]====================================");
		System.out.println("[beforeLoginCheck]class:" + jp.getTarget().getClass().toString());
		System.out.println("[beforeLoginCheck]method:" + jp.getSignature().getName());
		ModelUser user = this.session.getNever(CommonConst.SystemSession.LoginInfo, ModelUser.class);

		if (user == null) {
			throw new UnLoginException();
		}
	}
}
