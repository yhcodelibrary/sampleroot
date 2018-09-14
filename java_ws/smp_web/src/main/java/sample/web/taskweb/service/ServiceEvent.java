package sample.web.taskweb.service;

import java.util.Date;
import java.util.List;

import sample.web.common.define.OptimisticLockException;
import sample.web.taskweb.model.ModelEvent;
import sample.web.taskweb.model.ModelEventSummary;

public interface ServiceEvent {

	List<ModelEvent> getMonthList(int year,int month);

	List<ModelEvent> getRangeList(Date from,Date to);
	
	List<ModelEventSummary> getEventSummary(String type,Date from,Date to);
	
	void createEvent(ModelEvent target);

	void updateEvent(ModelEvent target) throws OptimisticLockException;
}
