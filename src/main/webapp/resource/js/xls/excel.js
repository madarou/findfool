/**
 * Created by liuzheng on 2014/7/13.
 */
/*
 excel read*/
function Excel($scope, $http, Data) {
    /*$scope.xlsusers = [
     {fname: 'dd', lname: 'Data.tname', email: 'liuzheng712@gmail.com', tel: '12332', test: Data.tname()},
     {fname: 'dd', lname: 'test1', email: 'liuzheng712@gmail.com', tel: '12332', test: 1}
     ];*/
    $scope.xlsusers = [
        {fname: '', lname: '', email: '', tel: '', test: Data.tname()}
    ];
    $scope.addOne = function (v) {
//        var tmp = $scope.xlsusers;
        var i = $scope.xlsusers.indexOf(v);
//        if (i > -1) {
        if ($scope.active == 'notSelect') {
            $scope.xlsusers.splice(i + 1, 0, {fname: '', lname: '', email: '', tel: '', test: ''});
        } else {
            $scope.xlsusers.splice(i + 1, 0, {fname: '', lname: '', email: '', tel: '', test: $scope.active});
        }
//        }
//      $scope.xlsusers.push({fname: '', lname: '', email: '', tel: ''}) ;
//        Data.xlsusers=$scope.xlsusers;
    };

    $scope.removeOne = function (v) {
//        var tmp = $scope.xlsusers;
        var i = $scope.xlsusers.indexOf(v);
        if (i > -1) {
            $scope.xlsusers.splice(i, 1);
        }
//        $scope.xlsusers = tmp;
//        Data.xlsusers=$scope.xlsusers;
    };
    $scope.removeTest = function (v) {
        //等待增加功能
//        var tmp = $scope.xlsusers;
//        var i = $scope.xlsusers.indexOf(v);
//        if (i > -1) {
//            $scope.xlsusers.splice(i, 1);
//        }
//        $scope.xlsusers = tmp;
    };

    $scope.clean = function () {
//        $scope.$apply();
        console.log($scope.content);
        $scope.content = ""
    }
    $scope.refresh = function () {
//    去重
        var tmp = $scope.xlsusers;
        var list = [];
        $scope.testlist = [];
        var tmpp = [];
        for (var i in tmp) {
            if ($.inArray(tmp[i].email + "::" + tmp[i].test, list) == -1) {
                list.push(tmp[i].email + "::" + tmp[i].test);
                tmpp.push(tmp[i]);

            }
            if ($.inArray(tmp[i].test, $scope.testlist) == -1) {
                if (tmp[i].test == '') {
                    if ($.inArray('notSelect', $scope.testlist) == -1) {
                        $scope.testlist.push('notSelect');
                    }
                    continue
                }
                $scope.testlist.push(tmp[i].test);
            }
        }
//        console.log($scope.testlist);

        $scope.active = $scope.testlist[0];
        $scope.selectTest = function (target) {
            $scope.active = target.getAttribute('data');
        };
        $scope.xlsusers = tmpp;
        for (t in $scope.testlist) {
            if ($scope.testlist[t] == "notSelect") {
                $scope.xlsusers.unshift({fname: '', lname: '', email: '', tel: '', test: ''});
            } else {
                $scope.xlsusers.unshift({fname: '', lname: '', email: '', tel: '', test: $scope.testlist[t]})
            }
        }
        var tmp = $scope.xlsusers;
        var tmpp = [];
        var list = [];
        for (var i in tmp) {
            if ($.inArray(tmp[i].email + "::" + tmp[i].test, list) == -1) {
                list.push(tmp[i].email + "::" + tmp[i].test);
                tmpp.push(tmp[i]);
            }
        }
        $scope.xlsusers = tmpp;
//        Data.xlsusers=$scope.xlsusers
    };
    $scope.refresh();
    $scope.tnamelist={};

    $scope.queryByName = function (tname) {
        $http({
            url:  WEBROOT+"/test/queryByName",
            method: 'POST',
            headers: {
                "Authorization": Data.token()
            },
            data: {"user": {"uid": Data.uid()}, "name": tname}
        }).success(function (data) {
            $scope.state = data["state"];//1 true or 0 false
            //Data.token = data["token"];
            $scope.message = data["message"];
//            console.log(tname);
            if ($scope.state) {
                $scope.tnamelist[tname] = $scope.message.quizid;
                console.log($scope.tnamelist)
            } else {

            }
        }).error(function (data) {

        });
    };
    $scope.testlist.forEach($scope.queryByName);
//    for (i in $scope.testlist){
//        console.log($scope.testlist[i])
//        $scope.queryByName($scope.testlist[i])
//    }

    $scope.upload = function (tname, userlist) {
        $http({
            url: WEBROOT+"/test/manage/invite",
            method: 'POST',
            headers: {
                "Authorization": Data.token()
            },
            data: {"user": {"uid": Data.uid()}, "subject": $scope.subject, "replyTo": $scope.replyTo, "quizid": $scope.tnamelist[tname], "invite": userlist, "context": $scope.content}
        }).success(function (data) {
            $scope.state = data["state"];//1 true or 0 false
            //Data.token = data["token"];
            $scope.message = data["message"];
            if ($scope.state) {
            	alert("邀请成功")
            } else {
            	alert($scope.message.msg)
            }
        }).error(function (data) {

        });
    };

    $scope.sent = function () {
//        $scope.html = document.getElementById("wmd-output").innerText;
//        console.log($scope.html);
        for (tid in $scope.testlist) {
            var tmp = [];
            if ($scope.testlist[tid] == 'notSelect') {
                continue
            }
            for (var user in $scope.xlsusers) {
//                console.log($scope.xlsusers[user])
                if ($scope.xlsusers[user].test == $scope.testlist[tid]) {
                    if ($scope.xlsusers[user].email != "")
                        tmp.push($scope.xlsusers[user]);
                }
            }
            $scope.upload($scope.testlist[tid], tmp);
        }
    }


    var use_worker = true;

    function xlsworker(data, cb) {
        var worker = new Worker('resource/js/xls/xlsworker.js');
        worker.onmessage = function (e) {
            switch (e.data.t) {
                case 'ready':
                    break;
                case 'e':
                    console.error(e.data);
                    break;
                case 'xls':
                    cb(e.data.d);
                    break;
            }
        };
        worker.postMessage(data);
    }


    function to_json(workbook) {
        var result = {};
        workbook.SheetNames.forEach(function (sheetName) {
            var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (roa.length > 0) {
                result[sheetName] = roa;
            }
        });
        return result;
    }

    function process_wb(wb) {
        if (typeof Worker !== 'undefined') XLS.SSF.load_table(wb.SSF);
        var output = "";
        output = to_json(wb);
        $scope.$apply(function () {
            $.merge($scope.xlsusers, output["Sheet1"]);
            $scope.refresh();
//            var tmp = [];
//            $.each($scope.xlsusers, function (i, el) {
//                if ($.inArray(el, tmp) === -1) tmp.push(el);
//            });
//            $scope.xlsusers = tmp;
//            $.unique($scope.xlsusers);
        });
//        console.log($scope.xlsusers);
//        console.log(output["Sheet1"]);
    }


    function handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        var files = e.dataTransfer.files;
        var i, f;
        for (i = 0, f = files[i]; i != files.length; ++i) {
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function (e) {
                var data = e.target.result;
                if (use_worker && typeof Worker !== 'undefined') {
                    xlsworker(data, process_wb);
                } else {
                    var wb = XLS.read(data, {type: 'binary'});
                    process_wb(wb);
                }
            };
            reader.readAsBinaryString(f);
        }
    }

    function handleDragover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

//        window.onload = function () {
//    $scope.aaa=function (){
    var drop = document.getElementById('drop');
    if (drop.addEventListener) {
        drop.addEventListener('dragenter', handleDragover, false);
        drop.addEventListener('dragover', handleDragover, false);
        drop.addEventListener('drop', handleDrop, false);
    }
//    console.log("excel");
//        };

}