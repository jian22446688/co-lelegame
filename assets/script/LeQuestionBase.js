// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const LeNode = require('LeNode')
const Ques = require('LeQuestion')
const LeQuesEffect = require('LeQuesEffect')
const LeQuesAnimBase = require('LeQuesAnimBase')
const LeGameUI = require('LeGameUI')

cc.Class({
    extends: cc.Component,
    properties: {
        qcurrent: {
            default: 0,
            visible: false
        },
        questions: [ ],
        qerror: [],
        qcorrect: [],
        gameUI: LeGameUI,
        quesAnimation: {
            default: null,
            type: LeQuesAnimBase
        },

        // 外部调用 切换动画
        quesAnimEffect: {
            default: null,
            type: LeQuesEffect
        }
    },
    
    ctor() {
        cc.log('ctor ononload')
    },

    // 基类 初始化问题数据
    // 根据不通的场景, 自行重写 onLoad 初始化问题数据
    onLoad() {
        this.setQues('le_1');

        if(this.gameUI){
            this.gameUI.onPlay(() => {
                let question = this.getCurrentQues()
                if(question) return false
                LeNode._instance.auQuesPlay(question.sound)
            });
        }
    },

    /**
     * 初始化问题
     * 设置当前关卡问题
     * @param {string} cname ('le_1')
     */
    setQues(cname = 'le_1') {
        this.qcurrent = 0;
        this.qerror = [];
        this.qcorrect = [];
        if(typeof cname == 'string') {
            this.questions = Ques.leQuestion[cname];
        } else if(Array.isArray(cname)) {
            this.questions = cname;
        }else {
            this.questions = [];
        }
    },

    /**
     * 获取当前的问题 index 值
     */
    getCurrnetQuestindex() { return this.qcurrent; },

    /**
     * 获取当前问题数据
     */
    getCurrentQues() { return this.questions[this.qcurrent]; },

    getQuesError() { return this.qerror; },

    getQuesCorrect() { return this.qcorrect; },

    /**
     *  设置当前问题
     * @param {Number} index 
     */
    setCurrentQues(index = 0) {
        if(index < 0 || index >= this.questions.length) {
            return undefined;
        }
        return this.questions[index];
    },

     // 下一题
    quesNext() {
        let q = this.questions[this.qcurrent + 1]
        if(q){
            this.qcurrent++
            this.onQuesNext(q)

            // 下一题的 切换效果
            // this.quesAnimEffect.play(() => {
            //     this.onQuesNext(q)
            // })
            return q
        }
        return undefined
    },

    // 下一题
    next() {
        cc.log('cc q next')
        return {
            next: () => {
                let d = (this.qcurrent >= this.questions.length );
                let v = !d ? this.questions[this.qcurrent++] : undefined;
                return { done: d, value: v }
            }
        }
    },

    /**
     * abstract function
     * 子类必须实现
     * 问题验证 错误
     */
    onQuesError(ques) { },

    /**
     * abstract function
     * 子类必须实现
     * 问题验证 正确
     */
    onQuesCorrect(ques) { },

     /**
     * abstract function
     * 子类必须实现
     * 下一题 调用此方法
     */
    onQuesNext(ques) { },

    /**
     * 验证答案是否正确
     * @param {String} answer 
     */
    check(answer = 'a') {
        let question = this.getCurrentQues()
        if(!question) return false
        if(answer == question.correct) {
            this.onQuesCorrect(question)
            this.qcorrect.push({ select: answer, ques: question })
            return true
        }
        this.onQuesError(question)
        this.qerror.push({ select: answer, ques: question })
        return false
    },

    /**
     * 设置UI 标题
     * @param {title} title 
     */
    setGameUITitle(title) {
        if(this.gameUI) { 
            this.setTitle(title)
        }
    },

    /**
     * 播放 问题 音效
     * 初始化调用 播放音频类
     */
    playSound() {
        if(this.gameUI) {
            this.gameUI.onPlay(() => {
                let question = this.getCurrentQues()
                if(question) return false
                LeNode._instance.auQuesPlay(question.sound)
            });
        }
        return true
    },

    /**
     * 停止播放的音效
     */
    stopSound() { LeNode._instance.auQuesStop(); },

    /**
     * 销毁场景时停止所有的音效
     */
    onDestroy() { LeNode._instance.auStopAll(); }
    
});
