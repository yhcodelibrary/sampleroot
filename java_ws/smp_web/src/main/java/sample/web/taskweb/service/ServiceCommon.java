package sample.web.taskweb.service;

import java.util.List;

import sample.web.taskweb.model.ModelCommonValues;

public interface ServiceCommon {

	List<ModelCommonValues> getTypeGroup(int type);
}
