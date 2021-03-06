/**
 * Created by liuzheng on 2014/7/11.
 */
OJApp.controller('TestPage',function($scope, $http, Data,$modal) {
    $scope.url = '#/test';
    $scope.active = 1;
    $scope.template = 'page/testshow.html';
    $scope.ContentUs = 'page/contentUs.html';
    $scope.leftBar = '';
    $scope.addtest ={};
    $scope.addtest.user ={};
    $scope.addtest.testtime=70;
    $scope.panel={};
    $scope.panel.isShow=true;
    $scope.panel.isGuide=true;
    $scope.panel.body=0;
    $scope.panel.isBack=false;
    $scope.panel.trace=[];
    $scope.test={};
    $scope.test.isNewTest=false;
    $scope.guide={};
    $scope.guide.show=0; //测试
    
    $scope.guideTxt ={};
    $scope.guideTxt.webDevelope="web开发即网站开发，从技术上分为前端和后端，前端为展示给用户的界面，后端为业务逻辑，用于处理业务动作。前端的技术包括HTML，" +
    		"Javascript等；后端需掌握包括Java，Php，数据库，Linux等技术";
    $scope.guideTxt.webBase ="web后台功能主要是响应用户的访问，为用户提供网络服务，一般使用Java、PHP等技术。此外，还必须还必须掌握必要的框架，比如spring，"+
	    	"thinkphp等等。为了操作数据库还需掌握数据库知识，如果没有专业的运维人员，还需掌握Linux等技术";
    $scope.guideTxt.IOS = "这里的IOS开发指APP前台开发，后台开发与网站后台开发相同。IOS开发一般采用Object_C,苹果公司现已推出了最新的开发语言Swift，" +
    		"同时，目前也流行采取开发网页的形式，然后通过第三方工具将网页封装成IOS应用，因为网页同时也可以封装成Android应用，所以这种方式正越来越流行";
    $scope.guideTxt.Android = "Android开发一般采用java语言，采用google提供的Android API。但目前也流行采取开发网页的形式，然后通过第三方工具将网页封装成Android应用，" +
    		"因为网页同时也可以封装成IOS应用，所以这种方式正越来越流行"
    
    $scope.guideArray={
    		"webFront":"前端介绍： 最新流行的热门职业。需要具备良好的沟通能力，需要与产品经理、UI设计师、项目经理、最终用户的沟通。"
	    	+"传统意义上的前端开发需掌握HTML, Css, Javascript, Jquery。而随着移动端网页封装开发及angularjs"
	    	+"等MVC框架的兴起，前端开发正处于越来越重要的位置。需掌握的基本技能包括html,css,javascript。"
	    	+"以及一些javascript类库，包括jQuery， Anuglarjs等等。",
	    	"java":"java服务端工程师需掌握java，spring,Linux,数据库等技能",
	    	"php":"php服务端工程师不仅需掌握PHP语言，还必须掌握thinkphp，linux，数据库等知识",
	    	"allStack":"Full Stack developer：是指掌握多种技能，并能利用多种技能独立完成产品的人。互联网项目，需要用到后端开发、前端开发、界面设计、" +
	    	"产品设计、数据库、各种移动客户端、三屏兼容、restFul API设计和OAuth等等，比较前卫的项目，还会用到Single Page Application、Web Socket、" +
	    	"HTML5/CSS3这些技术以及像第三方开发像微信公众号微博应用等等",
	    	"object_c":"IOS的原生开发语言",
	    	"android":"Android的原生开发语言，主要使用google的API"
    }
    
    
    $scope.viewGuideModal = function(data){
    	console.log("view guide modal.........",data);
    	 var modalInstance = $modal.open({
		      templateUrl: 'page/guideModal.html',
		      controller: 'guideModalCtrl',
		      resolve: {
		          params:function(){
		        	  var obj ={};
		        	  obj.title="技能介绍";
		        	  obj.content = $scope.guideArray[data];
		        	  obj.data =data;
		        	  return obj;
		          }
		      }
		     })
    }
    
    $scope.goNext = function (id) {	
    	$scope.panel.trace.push($scope.panel.body);	
    	$scope.panel.body=id;
    	$scope.panel.isBack=true;
    }
    
    $scope.goBack = function () {    	
		var id= $scope.panel.trace.pop();
		$scope.panel.body=id;
    	if($scope.panel.trace.length!=0)
    		$scope.panel.isBack=true;
    	else
    		$scope.panel.isBack=false;
    }
    
    $scope.tshow = function () {
        $http({
            url: WEBROOT+"/test/show",
            method: 'POST',
            headers: {
                "Authorization": Data.token()
            },
            data: {"uid": Data.uid()}
        }).success(function (data) {
            $scope.state = data["state"];//1 true or 0 false
            $scope.message = data["message"];
            if ($scope.state) {
                $scope.tests = $scope.message.tests;
                for (var i = 0; i < $scope.tests.length; i++) {
                    $scope.tests[i].data = i;
                }
                console.log($scope.tests);
            } else {

            }
        }).error(function (data) {
            console.log("服务器错误");
        });
    };
    
    $scope.tshow();

   

/* 
 *  跳转到测试报告页面
 *   */
    $scope.report = function (test) {
        console.log("go to listreport",test);
        Data.setTid(test.quizid);
        Data.setTname(test.name);
        window.location.href="#/report" 
    };
    
/* 
 *  跳转到邀请页面
 *   */   
    $scope.inviteUser = function(test){
    	console.log("ivite user....",test);
    	  Data.setTid(test.quizid);
          Data.setTname(test.name);
          window.location.href="#/invite" 
    }

    $scope.pushTest = function(){
        //检查名字是否为空
        if($scope.addtest.name == ''){
            alert("名字不允许为空");
            return;
        }
        
        $scope.addtest.user.uid = Data.uid();

        //发送
        $http({
            url: WEBROOT+"/test/add",
            method: 'POST',
            headers: {
                "Authorization": Data.token()
            },
            data: $scope.addtest
        }).success(function (data) {
            $scope.state = data["state"];//1 true or 0 false
            $scope.message = data["message"];
            if ($scope.state) {
             
                //跳转到testdetail
                Data.setTid($scope.message.msg);
                Data.setTname($scope.addtest.name);
                $scope.testManage();
                window.location.href = '#/test/'+$scope.message.msg ;
//                $scope.template = 'testlist.html';
//                $scope.leftBar = 'leftBar.html';
            } else {
                smoke.alert('error:'+$scope.message.msg);
            }
        }).error(function (data) {
            //relogin
        });
 
    };
   


    $scope.testManage = function () {
    	//add by zpl
    	var sendData = new Object();
    	sendData.user = new Object();
    	sendData.user.uid = Data.uid();
    	sendData.quizid = Data.tid();
        $http({
            url: WEBROOT+"/test/manage",
            method: 'POST',
            headers: {
                "Authorization": Data.token()
            },
            data:sendData
        }).success(function (data) {
            $scope.state = data["state"];//1 true or 0 false
            $scope.message = data["message"];
            if ($scope.state) {
                $scope.qs = $scope.message.qs;
                $scope.testtime = $scope.message.testtime;
                $scope.extraInfo = $scope.message.extraInfo;
                $scope.emails = $scope.message.emails
            } else {

            }
        }).error(function (data) {
            alert("现在使用的是展示数据");
            $scope.qs = [
                {qid: 6, name: '测试选择', type: 0, tag: [], context: "在下面的选项中选出正确的一项", answer: []},
                {qid: 9, name: '第二个测试', type: 0, tag: ["测试", "选择题"], context: "选择下面正确的一项", answer: [
                    {text: "1+1=2", isright: "1", score: 4},
                    {text: "1+1=3", isright: "0", score: 0},
                    {text: "1+1=4", isright: "0", score: 0}
                ]}
            ];
            $scope.testtime = 70;
            $scope.extraInfo = "1,2";
            $scope.emails = "ss@ss.com,sd@ss.com"
        });
    };

})

