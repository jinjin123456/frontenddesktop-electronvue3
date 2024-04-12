/**
 * Vue2事件总线实现方式
    import Vue from "vue";
    const BUS = new Vue();
    export default BUS;
 */
/**
 * Vue 3.x 移除了 $on 、 $off 和 $once 这几个事件 API，
 * 使得vue3.x不能像2.x一样，不能直接使用EventBus。
 * vue3 推荐 mitt 和 tiny-emitter，这里使用mitt
 * 需要注意的是，在绝大多数情况下，不鼓励使用全局的事件总线在组件之间进行通信
 *    短期内往往是最简单的解决方案，
 *    但从长期来看，不好追溯，可维护性很差
 */
import mitt from 'mitt'

const EventBus = mitt()

export default EventBus
