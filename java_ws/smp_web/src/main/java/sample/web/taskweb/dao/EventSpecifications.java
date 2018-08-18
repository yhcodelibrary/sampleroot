//package sample.web.taskweb.dao;
//
//import javax.persistence.criteria.CriteriaBuilder;
//import javax.persistence.criteria.CriteriaQuery;
//import javax.persistence.criteria.Root;
//import javax.persistence.criteria.Predicate;
//
//import org.springframework.data.jpa.domain.Specification;
//import org.springframework.util.StringUtils;
//
//import sample.web.taskweb.model.ModelEvent;
//
//public class EventSpecifications {
//
//	public Specification<ModelEvent> nameContains(String name) {
//		return StringUtils.isEmpty(name) ? null : new Specification<ModelEvent>() {
//			@Override
//			public Predicate toPredicate(Root<ModelEvent> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
//				return cb.like(root.get("name"), "%" + name + "%");
//			}
//		};
//	}
//
//	public Specification<ModelEvent> registerDateMatchYM(int year, int month) {
//		return new Specification<ModelEvent>() {
//			@Override
//			public Predicate toPredicate(Root<ModelEvent> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
//				return cb.like(root.get("name"), "%" + name + "%");
//			}
//		};
//	}
//}
