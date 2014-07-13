package zpl.oj.model.common;

import java.io.Serializable;
import java.util.Date;

public class Set implements Serializable {

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

}