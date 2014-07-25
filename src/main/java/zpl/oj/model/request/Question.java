package zpl.oj.model.request;

import java.util.List;

public class Question {

	private Integer qid;
	private Integer setid;
	private String name;
	private Integer type;
	private List<String> tag;
	private String context;
	private List<QuestionTestCase> answer;
	public Integer getQid() {
		return qid;
	}
	public void setQid(Integer qid) {
		this.qid = qid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getContext() {
		return context;
	}
	public void setContext(String context) {
		this.context = context;
	}
	public List<QuestionTestCase> getAnswer() {
		return answer;
	}
	public void setAnswer(List<QuestionTestCase> answer) {
		this.answer = answer;
	}
	public List<String> getTag() {
		return tag;
	}
	public void setTag(List<String> tag) {
		this.tag = tag;
	}
	public Integer getSetid() {
		return setid;
	}
	public void setSetid(Integer setid) {
		this.setid = setid;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	
}
