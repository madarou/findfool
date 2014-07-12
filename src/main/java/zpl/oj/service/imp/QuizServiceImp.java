package zpl.oj.service.imp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import zpl.oj.dao.QuizDao;
import zpl.oj.dao.QuizProblemDao;
import zpl.oj.model.common.Quiz;
import zpl.oj.model.common.QuizProblem;
import zpl.oj.model.request.Question;
import zpl.oj.model.requestjson.RequestTestMeta;
import zpl.oj.model.responsejson.ResponseQuizDetail;
import zpl.oj.service.ProblemService;
import zpl.oj.service.QuizService;
@Service
public class QuizServiceImp implements QuizService {

	@Autowired
	private QuizDao quizDao;
	
	@Autowired
	private QuizProblemDao quizProblemDao;
	
	@Autowired
	private ProblemService problemService;
	
	@Override
	public List<Quiz> getQuizByOwner(int owner) {
		return quizDao.getQuizs(owner);
	}

	@Override
	public ResponseQuizDetail getQuizDetail(int tid) {
		ResponseQuizDetail detail = new ResponseQuizDetail();
		Quiz quiz = quizDao.getQuiz(tid);
		
		detail.setEmails(quiz.getEmails());
		detail.setExtrainfo(quiz.getExtraInfo());
		detail.setTesttime(quiz.getTime());
		detail.setTid(tid);
		
		List<Question> qlist = new ArrayList<Question>();
		List<QuizProblem> qps = quizProblemDao.getQuizProblemsByQuizId(tid);
		//得到problems
		for(QuizProblem qp :qps){
			Question q = problemService.getProblemById(qp.getProblemid());
			if(q != null)
				qlist.add(q);
		}
		
		detail.setQs(qlist);
		return detail;
	}

	@Override
	public void updateQuizMetaInfo(RequestTestMeta tm) {
		Quiz quiz = quizDao.getQuiz(tm.getTid());
		if(quiz != null){
			quiz.setTime(tm.getTesttime());
			quiz.setEmails(tm.getEmails());
			quiz.setExtraInfo(tm.getExtrainfo());
			quizDao.updateQuiz(quiz);
		}
	}

	@Override
	public Quiz getQuizMetaInfo(int tid) {
		return quizDao.getQuiz(tid);
	}

	@Override
	public boolean updateQuiz(int tid, List<Integer> qids) {
		//step1:得到tid的uuid
		Quiz q = quizDao.getQuiz(tid);
		if(q == null)
			return false;
		int uuid = q.getUuid();
		//step2:构造一个quiz，其uuid为刚刚取出的quiz的值
		//step3:将这个quiz插入数据库,并且得到最新的版本的Quiz
		quizDao.insertQuiz(q);
		q = quizDao.getNewestQuizByUuid(uuid);
		for(Integer qid:qids){
			QuizProblem qp = new QuizProblem();
			qp.setDate(new Date());
			qp.setQuizid(q.getQuizid());
			qp.setProblemid(qid);
			quizProblemDao.insertQuizproblem(qp);
		}
		return true;
	}

	@Override
	public Quiz addQuiz(RequestTestMeta tm) {
		Quiz quiz = new Quiz();

		quiz.setTime(tm.getTesttime());
		quiz.setEmails(tm.getEmails());
		quiz.setExtraInfo(tm.getExtrainfo());
		quiz.setName(tm.getName());
		quiz.setDate(new Date());
		quiz.setOwner(tm.getUser().getUid());
		quizDao.insertQuiz(quiz);
		quiz = quizDao.getNewestQuizByOwner(tm.getUser().getUid());
		quiz.setUuid(quiz.getQuizid());
		if(quiz == null)
			return null;
		quizDao.updateQuiz(quiz);
		return quiz;
	}

}