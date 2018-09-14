package sample.web.common.logic;

import java.io.Serializable;
import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;

import sample.web.common.model.ModelSession;



@Component
public class ManageSession {

	private static final String Temporary = "Temporary";
	private static final String Never = "Never";
	
	@Autowired
	ManageJson mngJson;

	@Autowired
	HttpSession session;  

	/**
	 * @param key
	 * @param value
	 * @param typeParameterClass
	 */
	public <T extends ModelSession>  void setTemporary(String key,T value,Class<T> typeParameterClass) {
		String sessionkey = typeParameterClass.getName() + key;
		this.<T>setCommon(Temporary,sessionkey,value);
	}
	public <T extends ModelSession>  void setNever(String key,T value,Class<T> typeParameterClass) {
		String sessionkey = typeParameterClass.getName() + key;
		this.<T>setCommon(Never,sessionkey,value);
	}
		
	private <T extends ModelSession>  void setCommon(String area,String key,T value)
	{
		this.session.setAttribute("test","testes");
		System.out.println("id1:" + this.session.getId());
		
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
		return this.<T>getCommon(Temporary, sessionkey);
	}

	public <T extends ModelSession> T getNever(String key,Class<T> typeParameterClass) throws JsonProcessingException {
		String sessionkey = typeParameterClass.getName() + key;
		return this.<T>getCommon(Never, sessionkey);
	}
	
	@SuppressWarnings("unchecked")
	private <T extends ModelSession> T getCommon(String area,String key)
	{
		String test = (String)this.session.getAttribute("test");
		System.out.println("id2:" + this.session.getId());
		System.out.println("aa2:" + test);
		HashMap<String,ModelSession> hm = (HashMap<String,ModelSession>)this.session.getAttribute(area);
		if(hm == null || hm.containsKey(key)==false)
		{
			return null; 
		}
		
		return (T)hm.get(key);
	}
	
	public <T extends ModelSession> void removeTemporary(String key,Class<T> typeParameterClass)
	{
		String sessionkey = typeParameterClass.getName() + key;
		this.<T>removeCommon(Temporary, sessionkey);
	}
	public <T extends ModelSession> void removeNever(String key,Class<T> typeParameterClass)
	{
		String sessionkey = typeParameterClass.getName() + key;
		this.<T>removeCommon(Never, sessionkey);
	}

	private <T extends ModelSession> void removeCommon(String area,String key)
	{
		@SuppressWarnings("unchecked")
		HashMap<String,ModelSession> hm = (HashMap<String,ModelSession>)this.session.getAttribute(area);

		if(hm == null)
		{
			hm = new HashMap<String,ModelSession>();
		}
		if(hm.containsKey(key)) 
		{
			hm.remove(key);
		}
		
		this.session.setAttribute(area, hm);
	}

	public void clearTemporary()
	{
		this.session.removeAttribute(Temporary);
	}
	public void clearNever()
	{
		this.session.removeAttribute(Never);	
	}
	
}
