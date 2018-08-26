package sample.web.taskweb.service;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sample.web.common.define.OptimisticLockException;
import sample.web.common.logic.ManageUtil;
import sample.web.taskweb.dao.DaoEvent;
import sample.web.taskweb.model.ModelEvent;

@Service
public class ServiceEventImpl implements ServiceEvent {

	@Autowired
	ManageUtil mngUtil;

	@Autowired
	private DaoEvent daoEvent;
	
	@Autowired
	HttpSession session;  
	
	
	public List<ModelEvent> getMonthList(int year,int month) {

		//対象前月20と翌月10を算出して範囲検索する
		
		Date from = mngUtil.getDate(year, month - 1, 20);
		Date to = mngUtil.getDate(year, month + 1, 10);

		return this.daoEvent.selectBetweenEventDate(from, to);
	}
	
	public void createEvent(ModelEvent target) {

		this.daoEvent.createEvent(target);
	}
	
	public void updateEvent(ModelEvent target) throws OptimisticLockException {

		//target.setUpdateInfo();
		
		int count = this.daoEvent.updateEvent(target);
	}
}
