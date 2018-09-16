package sample.web.taskweb.dao;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import sample.web.common.define.OptimisticLockException;
import sample.web.taskweb.model.ModelEvent;
import sample.web.taskweb.model.ModelEventSummary;

/**
 * @author train
 *
 */
@Mapper
public interface DaoEvent {

	List<ModelEvent> selectBetweenEventDate(@Param("from") Date from, @Param("to") Date to);
	
	ModelEvent selectModelEvent(@Param("id") int id);

	List<ModelEventSummary> selectSummary(@Param("type") String type,@Param("from") Date from, @Param("to") Date to);
	
	/**
	 * Userテーブルへ新規登録
	 * @param target
	 */
	void createEvent(ModelEvent target);

	
	/**
	 * @param target
	 * @return
	 * @throws OptimisticLockException
	 */
	int updateEvent(ModelEvent target) throws OptimisticLockException;

	/**
	 * @param target
	 * @return
	 * @throws OptimisticLockException
	 */
	int updateDeleteEvent(ModelEvent target) throws OptimisticLockException;
}
