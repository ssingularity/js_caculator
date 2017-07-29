/**
 * Created by singularity on 2017/7/20.
 */
var numresult;
var str;
var sub_str;
var exp='';
var vector=[];


function onclickoper(oper){
    key=true;
    str = document.getElementById("expression");
    str.value = str.value + oper;
    exp=exp+' '+oper+' ';//通过空格来区分操作符以及数字
}

function onclicknum(nums) {
    str = document.getElementById("expression");
    str.value = str.value +nums;
    exp=exp+nums;
}

function onclickclear() {
    str = document.getElementById("expression");
    sub_str=document.getElementById("output");
    str.value = '';
    sub_str.value='';
    exp='';

}
//先计算括号里的内容并用这个内容替代括号得到新的表达式直到没有括号为止
function caculate(exp){
    var index1=exp.indexOf(')');
    if (index1==-1) {
        return oper(exp);
    }
    else {
        var sub_exp=exp.substring(0,index1+1);
        var index2=sub_exp.lastIndexOf('(');
        if (index2==-1) throw err;
        if (index2-index1==1) throw err;
        var _exp=exp.substring(index2+2,index1-1);
        sub_exp=exp.substring(index2-1,index1+2);
        var num=oper(_exp);
        exp=exp.replace(sub_exp,num);
        return caculate(exp);
    }
}


function oper(exp){
    exp=process(exp);
    var ivec=[];
    var cvec=[];
    var vector=[];
    vector=exp.split(' ');
    for (var i=0;i<vector.length;++i){
        if (i%2==0) {
            ivec.push(vector[i]);
        }
        else cvec.push(vector[i]);
    }
    ivec=ivec.toString();
    cvec=cvec.toString();
    return sub_calculate(ivec, cvec);

}

function process(s){
    while (true) {
        if (s.indexOf(' +  + ') != -1) {
            s=s.replace(' +  + ',' + ');
        }
        else if (s.indexOf(' -  + ') != -1) {
            s=s.replace(' -  + ',' - ');
        }
        else if (s.indexOf(' +  - ') != -1) {
            s=s.replace(' +  - ',' - ');
        }
        else if (s.indexOf(' -  - ') != -1) {
            s=s.replace(' -  - ',' + ');
        }
        else break;
    }
    if (s.indexOf(' - ')==0) {
        s=s.replace(' - ','-');
    }
    return s;
}

function sub_calculate(ivec, cvec){
    ivec=ivec.split(',');
    cvec=cvec.split(',');
    for (var i=0;i<ivec.length;++i){
        if (ivec[i]==''){
            ;
        }
    }
    for (var i=0;i<cvec.length;++i){
        if (cvec[i]=="+") {
            continue;
        }
        else if (cvec[i]=="-") {
            ivec[i+1]=-parseFloat(ivec[i+1]);
        }
        else if (cvec[i]=="*") {
            ivec[i+1]=parseFloat(ivec[i])*parseFloat(ivec[i+1]);
            ivec[i]=0;
        }
        else if (cvec[i]=="/"){
            if (ivec[i+1]==0) ;//throw err ;
            ivec[i+1]=parseFloat(ivec[i])/parseFloat(ivec[i+1]);
            ivec[i]=0;
        }

    }
    var sum=0;
    for (var i=0;i<ivec.length;++i) sum+=parseFloat(ivec[i]);
    return sum;
}

function onclickresult() {
    str = document.getElementById("expression");
    sub_str = document.getElementById("output");
    var numresult=caculate(exp);
    sub_str.value = numresult;
}


var assert = require('chai').assert;

describe('cac', function () {
    describe('oper()', function() {
        it( 'should return correct answer',function() {
            assert.equal(2,oper('1 + 1'));
            assert.equal(0,oper('1 - 1'));
            assert.equal(1,oper('1 * 1'));
            assert.equal(1,oper('1 / 1'));
        });
    });
});

describe('cac', function () {
    describe('process()', function() {
        it( 'should return correct answer',function() {
            assert.equal('1 - 1',process('1 +  - 1'));
            assert.equal('1 + 1',process('1 +  + 1'));
            assert.equal('1 + 1',process('1 -  - 1'));
            assert.equal('1 - 1',process('1 -  + 1'));
            assert.equal('1 - 1',process('1 +  -  + 1'));
        });
    });
});

describe('cac', function () {
    describe('sub_calculate()', function() {
        it( 'should return correct answer',function() {
            ivec='1,2,4';
            cvec='+,*';
            assert.equal(9,sub_calculate(ivec,cvec));
            ivec='1,2,4,0.5';
            cvec='-,/,+';
            assert.equal(1,sub_calculate(ivec,cvec));
        });
    });
});

