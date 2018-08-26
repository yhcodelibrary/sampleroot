package sample.web.taskweb.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import sample.web.taskweb.model.ModelCommonValues;

@Mapper
public interface DaoCommonValues {

	List<ModelCommonValues> selectTypeGroup(@Param("commonValueType") int commonValueType);
	 
}
