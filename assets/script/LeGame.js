// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const LeGameUI = require('LeGameUI')

cc.Class({
    extends: cc.Component,

    properties: {
        gameUI: LeGameUI
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },
    
    start () {

    },

    onTest(event, te){
        console.log(event, te)
        let audioID = null;
        cc.loader.loadRes('main/au_help.mp3', cc.AudioClip, (err, clip) => {
            if(!err) {
                cc.audioEngine.stop(audioID);
                audioID = cc.audioEngine.play(clip, false);
            }
        })
    },

    ontest1() {
        this.onEnterScene('e', 'Le_1')
    },

    ontest2() {
        this.onEnterScene('d', 'main')
    },

    /**
     * main 进入场景
     */
    onEnterScene(event, name) {
        cc.director.preloadScene(name, () => {
            cc.director.loadScene(name);
        });
    },

    /**
     * 返回大厅 
     */
    onBackMain() {
        this.gameUI.onBack(() => {
            // todo 返回大厅
        })
    }

    // update (dt) {},
});
