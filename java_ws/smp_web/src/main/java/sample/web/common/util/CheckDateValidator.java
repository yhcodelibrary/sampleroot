package sample.web.common.util;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.ResolverStyle;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CheckDateValidator  implements ConstraintValidator<CheckDateString,String> {

    private CheckDateString dt;
    
    @Override
    public void initialize(CheckDateString annotation) {
        this.dt = annotation;
    }
    
	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		
		System.out.println("test:" + value);
		if("".equals(value))
		{
			return false;
		}
		
		try {
			DateTimeFormatter.ofPattern("uuuu/MM/dd")
		    .withResolverStyle(ResolverStyle.STRICT)
		    .parse(value, LocalDate::from);
			
		}
		catch(DateTimeParseException e)
		{
			return false;
		}

		return true;
	}

}
