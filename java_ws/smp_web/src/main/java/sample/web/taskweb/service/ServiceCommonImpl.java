package sample.web.taskweb.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sample.web.common.ilogic.ManageUtil;
import sample.web.taskweb.dao.DaoCommonValues;
import sample.web.taskweb.model.ModelCommonValues;

@Service
public class ServiceCommonImpl {

	@Autowired
	ManageUtil mngUtil;

	@Autowired
	private DaoCommonValues daoCommonValues;

	public List<ModelCommonValues> getTypeGroup(int type)
	{
		return this.daoCommonValues.selectTypeGroup(type);
	}
	
}
