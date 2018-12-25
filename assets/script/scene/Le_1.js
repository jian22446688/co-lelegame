const QuestionBase = require('LeQuestionBase');

cc.Class({
    extends: QuestionBase,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log('le_1.js ononload')
    },

    start () {
        this.setQues('le_1')

        // let qu = this.quesNext()
        cc.log('le_1', this.getCurrnetQuestindex())
       this.check('b')
    },
    onQuesError(ques){
        cc.log('ques: err' , ques)
    },

    onQuesCorrect(ques) {
        cc.log('ques: corr', ques)
    },

    onQuesNext(ques) {
        
    },

    onQuesTest() {
        let qu = this.quesNext()

        if(qu) {

        }else{
            cc.log('没有问题了')
        }
        this.check('b')
    }

    // update (dt) {},
});
