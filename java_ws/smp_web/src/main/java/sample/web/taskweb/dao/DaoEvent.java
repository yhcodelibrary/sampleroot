package sample.web.taskweb.dao;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import sample.web.common.define.OptimisticLockException;
import sample.web.taskweb.model.ModelEvent;

@Mapper
public interface DaoEvent {

	List<ModelEvent> selectBetweenEventDate(@Param("from") Date from, @Param("to") Date to);
	
	/**
	 * Userテーブルへ新規登録
	 * @param target
	 */
	void createEvent(ModelEvent target);

	int updateEvent(ModelEvent target) throws OptimisticLockException;
}
