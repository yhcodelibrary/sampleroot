package sample.web.taskweb.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import sample.web.common.model.ModelTableCommon;
import sample.web.taskweb.model.ModelEvent;

//https://qiita.com/kazuki43zoo/items/ea79e206d7c2e990e478
@Mapper
public interface  ModelEventMapper {

    @Insert("INSERT INTO T_SMP_Event "
    		+ "(type, category, subCategory,detail,note,eventDate" + ModelTableCommon.ITEM_DEFINE + ") "
    		+ "VALUES (#{type}, #{category}, #{subCategory}, #{detail}, #{note}, #{eventDate}" + ModelTableCommon.INSERT_VALUE + ")")
    @Options(useGeneratedKeys = true)
    void insert(ModelEvent target);

    @Select("SELECT id, type, category, subCategory,detail,note,eventDate FROM T_SMP_Event WHERE id = #{id}")
    ModelEvent select(int id);

    @Select("SELECT id, type, category, subCategory,detail,note,eventDate FROM T_SMP_Event WHERE eventDate BETWEEN #{from,jdbcType=DATE} AND #{to,jdbcType=DATE} ")
    List<ModelEvent> selectBetweenEventDate(@Param("from") Date from ,@Param("to") Date to);
}
