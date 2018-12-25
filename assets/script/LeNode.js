// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

let LeNode = cc.Class({
    extends: cc.Component,
    statics : {
        _instance: null
    },
    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },

        // 所有的按钮音效
        au_btn_sound: {
            default: null,
            type: cc.AudioClip
        },

        // btn 音效 id 所有的音效都从这里播放
        au_id_btn: {
            default: null,
            visible: false
        },

        // question 所有的 问题音效都从这里播放
        au_id_question: {
            default: null,
            visible: false
        }
    },
    
    onLoad () {
        LeNode._instance = this;
        cc.game.addPersistRootNode(this.node);
    },

    /**
     * 播放 - 所有需要播放的按钮音效
     */
    auBtnPlay () {
        if(au_btn_sound) {
            this.au_id_btn = cc.audioEngine.play(clip, false);
        }
    },

    /**
     * 播放 - 所有问题的音效啊 
     * @param audio name;
     */
    auQuesPlay (audioname) {
        // res: 'main/au_help.mp3'
        cc.loader.loadRes(audioname, cc.AudioClip, (err, clip) => {
            if(!err) {
                cc.audioEngine.stop(this.au_id_question);
                this.au_id_question = cc.audioEngine.play(clip, false);
            }
        })
    },
    
    /**
     * 停止播放 问题音效
     */
    auQuesStop() {
        cc.audioEngine.stop(this.au_id_question);
    },

    /**
     * 停止所有播放
     */
    auStopAll() {
        cc.audioEngine.stopAll();
    }
});
