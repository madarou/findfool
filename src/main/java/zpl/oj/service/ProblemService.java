package zpl.oj.service;

import zpl.oj.model.request.Question;
import zpl.oj.model.requestjson.RequestAddQuestion;
import zpl.oj.model.requestjson.RequestSearch;
import zpl.oj.model.responsejson.ResponseSearchResult;

public interface ProblemService {

	//根据id查找problem
	Question getProblemById(int problemId);
	
	//增加一个problem
	int addProblem(RequestAddQuestion q);
	
	ResponseSearchResult getQuestionByTag(RequestSearch s);
}