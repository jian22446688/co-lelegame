cc.Class({
  extends: cc.Component,
    properties: {
      crrAnim1: [cc.Animation],
      crrAnim2: [cc.Animation],
      errAnim1: [cc.Animation],
      errAnim2: [cc.Animation]
    },
    
    ctor() {

    },

    // 基类 初始化问题数据
    // 根据不通的场景, 自行重写 onLoad 初始化问题数据
    onLoad() {

    },

    /**
     * 播放正确动画
     */
    playCrr(callback) {
      if(this._randomcrr){
        this.animaCall(this.crrAnim1, callback);
        this._randomcrr = false;
      }else{
        this.animaCall(this.crrAnim2, callback);
        this._randomcrr = true;
      }
    },
    
    /**
     * 播放错误动画
     */
    playErr() {
      if(this._randomerr){
        this.animaCall(this.errAnim1, callback);
        this._randomerr = false
      }else{
        this.animaCall(this.errAnim2, callback);
        this._randomerr = true
      }
    },

    // private 动画回调
    animaCall(anims, callback) {
      let anim = {}
      if(anims.length >= 1) {
        anims.map(item => {
          item.play()
          anim[item.defaultClip.duration] = item
        })
        let man = Math.max(...Object.keys(anim))
        anim[man].on('finished', () => {
          callback();
        }, this)
      }
    },

    /**
     * 停止播放所有动画
     */
    stopAnim() {
      this.crrAnim1.map(item => {
        item.stop()
      })
      this.errAnim2.map(item => {
        item.stop()
      })
    }

})