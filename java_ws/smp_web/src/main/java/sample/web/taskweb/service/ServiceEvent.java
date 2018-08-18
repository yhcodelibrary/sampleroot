package sample.web.taskweb.service;

import java.util.List;

import sample.web.common.define.OptimisticLockException;
import sample.web.taskweb.model.ModelEvent;

public interface ServiceEvent {

	List<ModelEvent> getMonthList(int year,int month);
	
	void createEvent(ModelEvent target);

	void updateEvent(ModelEvent target) throws OptimisticLockException;
}
