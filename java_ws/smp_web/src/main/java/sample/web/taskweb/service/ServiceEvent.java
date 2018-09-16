package sample.web.taskweb.service;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;

import sample.web.common.define.OptimisticLockException;
import sample.web.taskweb.model.ModelEvent;
import sample.web.taskweb.model.ModelEventSummary;
import sample.web.taskweb.model.ModelRequestDelete;

public interface ServiceEvent {

	List<ModelEvent> getMonthList(int year,int month);

	List<ModelEvent> getRangeList(Date from,Date to);
	
	List<ModelEventSummary> getEventSummary(String type,Date from,Date to);
	
	ModelEvent createEvent(ModelEvent target) throws JsonProcessingException;

	ModelEvent updateEvent(ModelEvent target) throws OptimisticLockException, JsonProcessingException;

	void deleteEvent(ModelRequestDelete target) throws OptimisticLockException, JsonProcessingException;
}
