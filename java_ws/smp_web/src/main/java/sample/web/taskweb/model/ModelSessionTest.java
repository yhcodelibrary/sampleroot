package sample.web.taskweb.model;

import java.io.Serializable;

import org.springframework.stereotype.Component;

//@Data
@Component
public class ModelSessionTest implements Serializable  {

    private static final long serialVersionUID = 1L;

    private String name;
    
    public ModelSessionTest() {
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
