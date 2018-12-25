// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
const _ = require('lodash')

cc.Class({
    extends: cc.Component,

    properties: {

        effectAnimate: {
            default: [],
            type: [cc.Animation],
        },
        
        currentAnim: {
            default: null,
            type: cc.Animation
        }
        
    },

    onLoad () {
        this.effectAnimate = this.node.getComponentsInChildren(cc.Animation)
    },

    /**
     * 播放动画
     * @param { Function } callback 
     */
    play(callback, self) {
        if(this.currentAnim) {
            this.currentAnim.node.active = false;
            this.currentAnim.off('finished')
        }
        this._tempRandom = 0
        this._random = 0
        do {
            this._random = _.random(this.effectAnimate.length - 1)
        } while (this._random == this._tempRandom);
        this._tempRandom = this._random
        this.currentAnim = this.effectAnimate[this._random]
        this.currentAnim.node.active = true;
        this.currentAnim.play();
        this.currentAnim.on('finished', () => {
            if(typeof callback == 'function') {
                callback.bind(self); 
                this._timeout = setTimeout(() => {
                    callback();
                    clearTimeout(this._timeout)
                }, 800);
            }
            this.stop()
        });
    },

    /**
     * 停止播放动画
     */
    stop() {
        if(this.currentAnim && this.currentAnim.node) {
            if(this.currentAnim.node.active) {
                this.currentAnim.node.active = false;
            }
            this.currentAnim.stop()
            this.currentAnim.off('finished')
        }
    },

    onDestroy() {
        this.stop();
    }

});
