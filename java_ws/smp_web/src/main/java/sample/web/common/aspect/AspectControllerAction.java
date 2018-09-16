package sample.web.common.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import sample.web.common.define.CommonConst;
import sample.web.common.define.UnLoginException;
import sample.web.common.logic.ManageSession;
import sample.web.common.model.ModelActionInfo;

@Aspect
@Component
public class AspectControllerAction {

	@Autowired
	ManageSession session;
	
	@Order(1)
	@Before("execution(* sample..controller.*Controller.*(..))")
	public void beforeRecode(JoinPoint jp) throws Throwable  {

		System.out.println("[beforeRecode]====================================");
		System.out.println("[beforeRecode]class:" + jp.getTarget().getClass().toString());
		System.out.println("[beforeRecode]method:" + jp.getSignature().getName());
		ModelActionInfo info = new ModelActionInfo();
		info.setActionName(jp.getSignature().getName());
		this.session.setNever(CommonConst.SystemSession.ActionInfo, info, ModelActionInfo.class);
		
	}

}
