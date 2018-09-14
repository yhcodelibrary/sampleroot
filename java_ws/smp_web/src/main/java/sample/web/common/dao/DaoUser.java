package sample.web.common.dao;

import org.apache.ibatis.annotations.Mapper;

import sample.web.common.model.ModelUser;

@Mapper
public interface DaoUser {
	
	ModelUser selectUserWithIdAndPass(ModelUser target);
}
