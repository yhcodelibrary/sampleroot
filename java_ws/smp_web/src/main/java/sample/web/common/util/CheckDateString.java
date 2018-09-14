package sample.web.common.util;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy=CheckDateValidator.class)
@Documented
public @interface CheckDateString {
    String message() default "日付を入力してください"; //エラーメッセージ
    Class<?>[] groups() default {};            //引数に使う肩を宣言
    Class<? extends Payload>[] payload() default {}; //Payload荷重

}
