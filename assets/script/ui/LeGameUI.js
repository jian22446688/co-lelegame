// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
      title: {
        default: null,
        type: cc.Label,
        visible: false
      },
  },
  
  onLoad () { 
    this.title = this.node.getChildByName("title_text").getComponent(cc.Label);
  },

  /**
   * 设置title 文本
   * @param {title} title 
   */
  setTitle(title = '标题类型') {
    if(this.title) {
      this.title.string = title
    }
  },

  /**
   * ui 点击播放按钮
   * @param {func} callback 
   */
  onPlay(callback) {
    callback();
  },

  /**
   * 返回大厅 
   */
  onBack(callback) {
    callback();
  }

});
