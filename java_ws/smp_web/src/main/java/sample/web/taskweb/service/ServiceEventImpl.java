package sample.web.taskweb.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;

import sample.web.common.define.CommonConst;
import sample.web.common.define.OptimisticLockException;
import sample.web.common.logic.ManageSession;
import sample.web.common.logic.ManageUtil;
import sample.web.common.model.ModelUser;
import sample.web.taskweb.dao.DaoEvent;
import sample.web.taskweb.model.ModelEvent;
import sample.web.taskweb.model.ModelEventSummary;
import sample.web.taskweb.model.ModelRequestDelete;

@Service
public class ServiceEventImpl implements ServiceEvent {

	@Autowired
	ManageUtil mngUtil;

	@Autowired
	private DaoEvent daoEvent;
	
	@Autowired
	ManageSession session;  

	@Autowired
	ManageUtil utl;  
	
	public List<ModelEvent> getMonthList(int year,int month) {

		//対象前月20と翌月10を算出して範囲検索する
		
		Date from = mngUtil.getDate(year, month - 1, 20);
		Date to = mngUtil.getDate(year, month + 1, 10);

		return this.daoEvent.selectBetweenEventDate(from, to);
	}
	

	public List<ModelEvent> getRangeList(Date from,Date to)
	{
		return this.daoEvent.selectBetweenEventDate(from, to);
	}
	

	public List<ModelEventSummary> getEventSummary(String type,Date from,Date to)
	{
		return this.daoEvent.selectSummary(type, from, to);
	}
	
	public ModelEvent createEvent(ModelEvent target) throws JsonProcessingException {

		utl.setCreateInfo(target);

		ModelUser user = this.session.getNever(CommonConst.SystemSession.LoginInfo,ModelUser.class);	
		
		target.setUserId(user.getUserId());
		
		this.daoEvent.createEvent(target);

		//更新後のデータを取得
		return this.daoEvent.selectModelEvent(target.getEventId());
	}
	
	public ModelEvent updateEvent(ModelEvent target) throws OptimisticLockException, JsonProcessingException {

		utl.setUpdateInfo(target);

		ModelUser user = this.session.getNever(CommonConst.SystemSession.LoginInfo,ModelUser.class);	
		
		target.setUserId(user.getUserId());
		
		int count = this.daoEvent.updateEvent(target);
		
		//更新後のデータを取得
		return this.daoEvent.selectModelEvent(target.getEventId());
	}

	
	public void deleteEvent(ModelRequestDelete target) throws OptimisticLockException, JsonProcessingException {

		ModelEvent input = new ModelEvent();
		
		ModelUser user = this.session.getNever(CommonConst.SystemSession.LoginInfo,ModelUser.class);	
		
		input.setEventId(target.getEventId());
		input.setUserId(user.getUserId());
		input.setSsVersion(target.getSsVersion());
		
		int count = this.daoEvent.updateDeleteEvent(input);
		
	}
}
