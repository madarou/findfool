package zpl.oj.model.common;

import java.io.Serializable;
import java.util.Date;

public class ProblemSet implements Serializable {

	/**
	 * ${item.comment}
	 */
	private Integer problemSetId;

	/**
	 * ${item.comment}
	 */
	private String name;

	/**
	 * ${item.comment}
	 */
	private Date date;

	/**
	 * ${item.comment}
	 */
	private Integer owner;
	
	private String domainId;
	

	/**
	 * 描述
	 */
	private String comment;

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Integer getProblemSetId() {
		return problemSetId;
	}

	public void setProblemSetId(Integer problemSetId) {
		this.problemSetId = problemSetId;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Integer getOwner() {
		return owner;
	}

	public void setOwner(Integer owner) {
		this.owner = owner;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
	public String getDomainId() {
		return domainId;
	}

	public void setDomainId(String domainId) {
		this.domainId = domainId;
	}

}