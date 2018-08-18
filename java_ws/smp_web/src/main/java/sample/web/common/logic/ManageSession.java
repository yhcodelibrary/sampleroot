package sample.web.common.logic;

import java.io.Serializable;
import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;

import sample.web.common.ilogic.ManageJson;
import sample.web.common.model.ModelSession;



@Component
public class ManageSession {

	@Autowired
	ManageJson mngJson;

	@Autowired
	HttpSession session;  

	public <T extends ModelSession>  void setTemporary(String key,T value,Class<T> typeParameterClass) {
		String sessionkey = typeParameterClass.getName() + key;
		this.<T>setCommon("Temporary",sessionkey,value);
	}
	public <T extends ModelSession>  void setNever(String key,T value,Class<T> typeParameterClass) {
		String sessionkey = typeParameterClass.getName() + key;
		this.<T>setCommon("Never",sessionkey,value);
	}
		
	private <T extends ModelSession>  void setCommon(String area,String key,T value)
	{
		@SuppressWarnings("unchecked")
		HashMap<String,ModelSession> hm = (HashMap<String,ModelSession>)this.session.getAttribute(area);
		if(hm == null)
		{
			hm = new HashMap<String,ModelSession>();
		}
		
		hm.put(key, value);
		this.session.setAttribute(area, hm);
	}

	public <T extends ModelSession> T getTemporary(String key,Class<T> typeParameterClass) throws JsonProcessingException {
		String sessionkey = typeParameterClass.getName() + key;
		return this.<T>getCommon("Temporary", sessionkey);
	}

	public <T extends ModelSession> T getNever(String key,Class<T> typeParameterClass) throws JsonProcessingException {
		String sessionkey = typeParameterClass.getName() + key;
		return this.<T>getCommon("Never", sessionkey);
	}
	
	@SuppressWarnings("unchecked")
	private <T extends ModelSession> T getCommon(String area,String key)
	{
		HashMap<String,ModelSession> hm = (HashMap<String,ModelSession>)this.session.getAttribute(area);
		if(hm == null || hm.containsKey(key)==false)
		{
			return null; 
		}
		
		return (T)hm.get(key);
	}
	
//	public <T extends Object>  void SetTemporary(String key,Object value,Class<T> typeParameterClass) throws JsonProcessingException {
//		
//		ModelSession info = this.GetSession();
//		
//		ModelSessionValue m = new ModelSessionValue();
//		m.SessionKey = typeParameterClass.getName() + key;
//		m.JsonValue = mngJson.ConvertObjectToJson(m);
//		
//		info.getTemporary().put(m.SessionKey, m);
//		info.IsUpdateTemprary = true;
//	}
	
//	public <T extends Object>  T GetTemporary(String key,Class<T> typeParameterClass) throws JsonProcessingException {
//		
//		ModelSession info = this.GetSession();
//		
//		return null;
//		/*
//		String sessionKey = typeParameterClass.getName() + key;
//		
//		if(info.getTemporary().containsKey(sessionKey) == true) {
//			return info.getTemporary().get(sessionKey)info;
//		}
//		else{
//			return null;
//		}
//		
//		m.JsonValue = mngJson.ConvertObjectToJson(m);
//		
//		info.Temporary.put(m.SessionKey, m);
//		info.IsUpdateTemprary = true;
//		*/
//	}
	
	
//	private ModelSession GetSession() {
//		if(this.session != null) {
//			return this.session;
//		}
//		
//		return new ModelSession();
//	}
	
}
